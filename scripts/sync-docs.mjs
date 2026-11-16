// Pulls each project's docs out of its git history into the file layout that
// Docusaurus multi-instance versioning expects, so no snapshot is ever committed here.
//
//   projects/<id>/docs + sidebars.json      ← default branch, served as the latest major
//   projects/<id>/version.json              ← its label, from the latest stable tag
//   <id>_versions.json                      ← older majors (latest stable tag of each)
//   <id>_versioned_docs/version-<N>.x/
//   <id>_versioned_sidebars/version-<N>.x-sidebars.json
//
// Every release is tagged on merge to main, so main *is* the latest major plus
// unreleased `docs:` fixes; snapshotting its tag would only hide those fixes.
//
// Local preview of uncommitted docs: SYNAPSE_REPO=../Synapse pnpm start
// (the variable is the id upper-cased, non-word characters as `_`: NUGET_RELEASER_REPO)
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const projects = [
  {
    id: 'synapse',
    repo: 'https://github.com/UnambitiousFx/Synapse.git',
    docs: 'docs/docs',
    sidebars: 'docs/sidebars.ts',
  },
  {
    id: 'functional',
    repo: 'https://github.com/UnambitiousFx/Functional.git',
    docs: 'docs/docs',
    sidebars: 'docs/sidebars.ts',
  },
  {
    id: 'engram',
    repo: 'https://github.com/UnambitiousFx/Engram.git',
    docs: 'docs/docs',
    sidebars: 'docs/sidebars.ts',
  },
  {
    id: 'myelin',
    repo: 'https://github.com/UnambitiousFx/Myelin.git',
    docs: 'docs/docs',
    sidebars: 'docs/sidebars.ts',
  },
  {
    id: 'nuget-releaser',
    repo: 'https://github.com/UnambitiousFx/nuget-releaser.git',
    docs: 'docs/docs',
    sidebars: 'docs/sidebars.ts',
  },
];

const site = path.resolve(import.meta.dirname, '..');
const cache = path.join(site, '.projects-cache');

const git = (cwd, ...args) =>
  execFileSync('git', args, { cwd, encoding: 'utf8', maxBuffer: 1 << 28 });

function openRepo(project) {
  const local = process.env[`${project.id.toUpperCase().replace(/\W/g, '_')}_REPO`];
  if (local) {
    return { dir: path.resolve(local), current: null };
  }
  const dir = path.join(cache, project.id);
  if (fs.existsSync(dir)) {
    git(dir, 'fetch', '--tags', '--force', '--prune', 'origin');
  } else {
    fs.mkdirSync(cache, { recursive: true });
    // Blobless + no checkout: only the blobs `git archive` asks for are downloaded.
    git(cache, 'clone', '--filter=blob:none', '--no-checkout', project.repo, project.id);
  }
  return { dir, current: 'origin/HEAD' };
}

const hasPath = (dir, ref, p) => {
  try {
    execFileSync('git', ['cat-file', '-e', `${ref}:${p}`], { cwd: dir, stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

// Latest stable tag per major, newest major first.
function pickVersions(dir) {
  const latest = new Map();
  for (const tag of git(dir, 'tag', '--list', 'v*').split('\n')) {
    const m = /^v(\d+)\.(\d+)\.(\d+)$/.exec(tag.trim());
    if (!m) {
      continue;
    }
    const [major, minor, patch] = m.slice(1).map(Number);
    const best = latest.get(major);
    if (!best || minor > best.minor || (minor === best.minor && patch > best.patch)) {
      latest.set(major, { tag: m[0], minor, patch });
    }
  }
  return [...latest.entries()]
    .sort(([a], [b]) => b - a)
    .map(([major, { tag }]) => ({ name: `${major}.x`, tag }));
}

function exportDocs(dir, ref, docsPath, dest, base) {
  fs.rmSync(dest, { recursive: true, force: true });
  if (ref === null) {
    fs.cpSync(path.join(dir, docsPath), dest, { recursive: true });
  } else {
    fs.mkdirSync(dest, { recursive: true });
    const tar = path.join(cache, 'export.tar');
    git(dir, 'archive', '--format=tar', '-o', tar, ref, docsPath);
    execFileSync('tar', ['-xf', tar, '-C', dest, `--strip-components=${docsPath.split('/').length}`]);
    fs.rmSync(tar);
  }
  rewriteRootLinks(dest, base);
}

// Projects used to be served from their own subdomain root, so their docs (old tags
// included) link to `/docs/...`; point those links at this version's route instead.
function rewriteRootLinks(dir, base) {
  for (const file of fs.readdirSync(dir, { recursive: true })) {
    if (!/\.mdx?$/.test(file)) {
      continue;
    }
    const p = path.join(dir, file);
    const text = fs.readFileSync(p, 'utf8');
    const out = text.replace(/(\]\(|href=")\/docs\//g, `$1${base}/`);
    if (out !== text) {
      fs.writeFileSync(p, out);
    }
  }
}

// sidebars.ts only uses `import type`, so Node's built-in type stripping can load it.
async function exportSidebars(dir, ref, sidebarsPath, dest) {
  const source =
    ref === null
      ? fs.readFileSync(path.join(dir, sidebarsPath), 'utf8')
      : git(dir, 'show', `${ref}:${sidebarsPath}`);
  fs.mkdirSync(cache, { recursive: true });
  const tmp = path.join(cache, `sidebars-${process.pid}-${Date.now()}.mts`);
  fs.writeFileSync(tmp, source);
  try {
    const { default: sidebars } = await import(pathToFileURL(tmp).href);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, JSON.stringify(sidebars, null, 2));
  } finally {
    fs.rmSync(tmp);
  }
}

for (const project of projects) {
  const { dir, current } = openRepo(project);
  // The latest tag only names main's version; older majors are served from their tag, so need docs there.
  const [latest, ...older] = pickVersions(dir);
  const versions = older.filter((v) => hasPath(dir, v.tag, project.docs));
  const projectDir = path.join(site, 'projects', project.id);
  const versionedDocs = path.join(site, `${project.id}_versioned_docs`);
  const versionedSidebars = path.join(site, `${project.id}_versioned_sidebars`);

  exportDocs(dir, current, project.docs, path.join(projectDir, 'docs'), `/${project.id}`);
  await exportSidebars(dir, current, project.sidebars, path.join(projectDir, 'sidebars.json'));
  const label = latest?.name ?? 'Next';
  fs.writeFileSync(path.join(projectDir, 'version.json'), JSON.stringify({ label }));

  fs.rmSync(versionedDocs, { recursive: true, force: true });
  fs.rmSync(versionedSidebars, { recursive: true, force: true });
  for (const { name, tag } of versions) {
    exportDocs(
      dir,
      tag,
      project.docs,
      path.join(versionedDocs, `version-${name}`),
      `/${project.id}/${name}`,
    );
    await exportSidebars(
      dir,
      tag,
      project.sidebars,
      path.join(versionedSidebars, `version-${name}-sidebars.json`),
    );
  }
  fs.writeFileSync(
    path.join(site, `${project.id}_versions.json`),
    JSON.stringify(versions.map((v) => v.name), null, 2),
  );

  console.log(`${project.id}: ${label} (main) + ${versions.map((v) => `${v.name} (${v.tag})`).join(', ')}`);
}
