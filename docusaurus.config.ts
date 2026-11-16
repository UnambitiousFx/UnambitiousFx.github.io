import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { readFileSync } from "node:fs";
import { themes as prismThemes } from "prism-react-renderer";

// Written by scripts/sync-docs.mjs: the major that main currently documents.
const synapseLabel: string = JSON.parse(
  readFileSync("projects/synapse/version.json", "utf8"),
).label;

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

  // One docs instance per project; content and versions come from scripts/sync-docs.mjs.
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "synapse",
        path: "projects/synapse/docs",
        routeBasePath: "synapse",
        sidebarPath: "./projects/synapse/sidebars.json",
        lastVersion: "current",
        versions: { current: { label: synapseLabel } },
        // Older majors are git tags: only the default branch is editable.
        editUrl: ({ version, docPath }) =>
          version === "current"
            ? `https://github.com/UnambitiousFx/Synapse/edit/main/docs/docs/${docPath}`
            : undefined,
      },
    ],
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
        {
          href: "https://functional.unambitiousfx.com",
          label: "Functional",
          position: "left",
        },
        {
          type: "docSidebar",
          docsPluginId: "synapse",
          sidebarId: "tutorialSidebar",
          label: "Synapse",
          position: "left",
        },
        {
          type: "docsVersionDropdown",
          docsPluginId: "synapse",
          position: "right",
        },
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
              href: "https://functional.unambitiousfx.com",
            },
            {
              label: "Synapse",
              to: "/synapse/",
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
