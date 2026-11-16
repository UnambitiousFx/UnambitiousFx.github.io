import type { Options as DocsOptions } from "@docusaurus/plugin-content-docs";
import type * as Preset from "@docusaurus/preset-classic";
import type { Config, PluginConfig } from "@docusaurus/types";
import { readFileSync } from "node:fs";
import { themes as prismThemes } from "prism-react-renderer";

// Each library repo's docs, served at /<id>/. scripts/sync-docs.mjs pulls their content
// (main + the latest tag of each older major) and writes version.json, the major main documents.
const projects = [
  {
    id: "functional",
    name: "Functional",
    llms: {
      includeOrder: [
        "index.mdx",
        "getting-started.mdx",
        "result/index.mdx",
        "result/api-reference.mdx",
        "maybe/index.mdx",
        "maybe/api-reference.mdx",
        "failures-and-metadata.mdx",
        "aspnetcore/index.mdx",
        "xunit/index.mdx",
      ],
      customLLMFiles: [
        {
          filename: "llms-result.txt",
          includePatterns: ["result/**", "maybe/**", "failures-and-metadata.mdx"],
          fullContent: true,
          title: "Functional — Result, Maybe & Failures",
          description:
            "The Result and Maybe types, railway-oriented composition, and the failure model.",
        },
        {
          filename: "llms-testing.txt",
          includePatterns: ["xunit/**"],
          fullContent: true,
          title: "Functional — Testing with Functional.xunit",
          description: "Fluent assertions for Result and Maybe in xUnit tests.",
        },
      ],
    },
  },
  {
    id: "synapse",
    name: "Synapse",
    llms: {
      includeOrder: [
        "index.mdx",
        "getting-started.mdx",
        "commands-and-queries.mdx",
        "events.mdx",
        "pipelines.mdx",
      ],
      customLLMFiles: [
        {
          filename: "llms-pipelines.txt",
          includePatterns: [
            "pipelines.mdx",
            "validation.mdx",
            "authorization.mdx",
            "error-handling.mdx",
          ],
          fullContent: true,
          title: "Synapse Pipelines & Behaviors",
          description: "Pipeline behaviors, validation, authorization, and error handling.",
        },
        {
          filename: "llms-outbox.txt",
          includePatterns: [
            "outbox.mdx",
            "outbox-entityframeworkcore.mdx",
            "events.mdx",
            "observability.mdx",
          ],
          fullContent: true,
          title: "Synapse Events, Outbox & Observability",
          description: "Event publishing, the outbox pattern, and observability.",
        },
      ],
    },
  },
  {
    id: "engram",
    name: "Engram",
    llms: {
      includeOrder: ["index.mdx", "getting-started.mdx", "canonicalization.mdx", "fingerprints.mdx"],
      customLLMFiles: [],
    },
  },
  {
    id: "myelin",
    name: "Myelin",
    llms: {
      includeOrder: [
        "index.mdx",
        "getting-started.mdx",
        "address-policy.mdx",
        "safe-http-client.mdx",
        "http-client-factory.mdx",
      ],
      customLLMFiles: [],
    },
  },
];

const latestLabel = (id: string): string =>
  JSON.parse(readFileSync(`projects/${id}/version.json`, "utf8")).label;

const projectDocs = ({ id, name }: (typeof projects)[number]): PluginConfig => [
  "@docusaurus/plugin-content-docs",
  {
    id,
    path: `projects/${id}/docs`,
    routeBasePath: id,
    sidebarPath: `./projects/${id}/sidebars.json`,
    lastVersion: "current",
    versions: { current: { label: latestLabel(id) } },
    // Older majors are git tags: only the default branch is editable.
    editUrl: ({ version, docPath }) =>
      version === "current"
        ? `https://github.com/UnambitiousFx/${name}/edit/main/docs/docs/${docPath}`
        : undefined,
  } satisfies DocsOptions,
];

// One set of llms files per project under /<id>/ (llms.txt, llms-full.txt and its custom
// files), from the docs main currently serves. The plugin's "versions" are its output sets.
const llms: PluginConfig = [
  "docusaurus-plugin-llms",
  {
    generateLLMsTxt: true,
    generateLLMsFullTxt: true,
    excludeImports: true,
    removeDuplicateHeadings: true,
    includeUnmatchedLast: true,
    versions: projects.map(({ id, name, llms }) => ({
      name: id,
      label: `${name} ${latestLabel(id)}`,
      docsDir: [{ path: `projects/${id}/docs`, routeBasePath: id }],
      path: id,
      routePrefix: "",
      ...llms,
    })),
  },
];

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "UnambitiousFx",
  tagline:
    "A collection of lightweight, modular .NET libraries designed to simplify web API development — with Native AOT support and zero unnecessary overhead.",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://unambitiousfx.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "unambitiousfx", // Usually your GitHub org/user name.
  projectName: "unambitiousfx.github.io", // Usually your repo name.

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        type: "image/svg+xml",
        href: "/img/favicon.svg",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/img/apple-touch-icon.png",
      },
    },
  ],

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [...projects.map(projectDocs), llms],

  themes: ["@docusaurus/theme-mermaid"],
  markdown: { mermaid: true },

  themeConfig: {
    // Replace with your project's social card
    image: "img/unambitiousfx-social-card.png",
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "UnambitiousFx",
      logo: {
        alt: "UnambitiousFx Logo",
        src: "img/unambitiousfx-icon-light.svg",
        srcDark: "img/unambitiousfx-icon-dark.svg",
      },
      items: [
        ...projects.flatMap(({ id, name }) => [
          {
            type: "docSidebar",
            docsPluginId: id,
            sidebarId: "tutorialSidebar",
            label: name,
            position: "left",
          } as const,
          // Hidden outside this project's docs by src/theme/NavbarItem/DocsVersionDropdownNavbarItem.
          { type: "docsVersionDropdown", docsPluginId: id, position: "right" } as const,
        ]),
        {
          href: "https://github.com/unambitiousfx/unambitiousfx.github.io",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Libraries",
          items: projects.map(({ id, name }) => ({ label: name, to: `/${id}/` })),
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/unambitiousfx",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} UnambitiousFx. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["csharp"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
