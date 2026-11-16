import type { Options as DocsOptions } from "@docusaurus/plugin-content-docs";
import type * as Preset from "@docusaurus/preset-classic";
import type { Config, PluginConfig } from "@docusaurus/types";
import { readFileSync } from "node:fs";
import { themes as prismThemes } from "prism-react-renderer";

// One docs instance per project, served at /<id>/; scripts/sync-docs.mjs writes its
// content, its older majors and version.json (the major that main currently documents).
const projectDocs = (id: string, repo: string): PluginConfig => [
  "@docusaurus/plugin-content-docs",
  {
    id,
    path: `projects/${id}/docs`,
    routeBasePath: id,
    sidebarPath: `./projects/${id}/sidebars.json`,
    lastVersion: "current",
    versions: {
      current: {
        label: JSON.parse(readFileSync(`projects/${id}/version.json`, "utf8")).label,
      },
    },
    // Older majors are git tags: only the default branch is editable.
    editUrl: ({ version, docPath }) =>
      version === "current"
        ? `https://github.com/UnambitiousFx/${repo}/edit/main/docs/docs/${docPath}`
        : undefined,
  } satisfies DocsOptions,
];

const projectNavItems = (id: string, label: string) => [
  {
    type: "docSidebar",
    docsPluginId: id,
    sidebarId: "tutorialSidebar",
    label,
    position: "left",
  } as const,
  // Hidden outside this project's docs by src/theme/NavbarItem/DocsVersionDropdownNavbarItem.
  { type: "docsVersionDropdown", docsPluginId: id, position: "right" } as const,
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

  plugins: [
    projectDocs("functional", "Functional"),
    projectDocs("synapse", "Synapse"),
    projectDocs("engram", "Engram"),
    projectDocs("myelin", "Myelin"),
  ],

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
        ...projectNavItems("functional", "Functional"),
        ...projectNavItems("synapse", "Synapse"),
        ...projectNavItems("engram", "Engram"),
        ...projectNavItems("myelin", "Myelin"),
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
          items: [
            {
              label: "Functional",
              to: "/functional/",
            },
            {
              label: "Synapse",
              to: "/synapse/",
            },
            {
              label: "Engram",
              to: "/engram/",
            },
            {
              label: "Myelin",
              to: "/myelin/",
            },
          ],
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
