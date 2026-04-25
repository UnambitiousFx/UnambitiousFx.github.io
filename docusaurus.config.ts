import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

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
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

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

  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs",
          routeBasePath: "docs",
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/unambitiousfx/unambitiousfx.github.io/tree/main/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/unambitiousfx/unambitiousfx.github.io/tree/main/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "lib-functional",
        path: "lib-functional_docs",
        routeBasePath: "lib-functional",
        includeCurrentVersion: false,
        lastVersion: "v2.0",
        versions: {
          "v2.0": {
            label: "v2.0",
          },
          "v1.0": {
            label: "v1.0",
          },
        },
        sidebarPath: "./sidebarsLibFunctional.js",
        editUrl:
          "https://github.com/unambitiousfx/unambitiousfx.github.io/tree/main/",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "lib-synapse",
        path: "lib-synapse_docs",
        routeBasePath: "lib-synapse",
        includeCurrentVersion: false,
        lastVersion: "v1.0",
        versions: {
          "v1.0": {
            label: "v1.0 (pre-release)",
            banner: "unreleased",
          },
        },
        sidebarPath: "./sidebarsLibSynapse.js",
        editUrl:
          "https://github.com/unambitiousfx/unambitiousfx.github.io/tree/main/",
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        createRedirects(existingPath) {
          if (
            existingPath.startsWith("/lib-functional/v1.0") ||
            existingPath.startsWith("/lib-functional/v2.0")
          ) {
            return undefined;
          }

          if (existingPath.startsWith("/lib-functional/")) {
            return [
              existingPath.replace("/lib-functional/", "/lib-functional/v2.0/"),
            ];
          }

          if (existingPath.startsWith("/lib-synapse/v1.0")) {
            return undefined;
          }

          if (existingPath.startsWith("/lib-synapse/")) {
            return [
              existingPath.replace("/lib-synapse/", "/lib-synapse/v1.0/"),
            ];
          }

          return undefined;
        },
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "UnambitiousFx",
      logo: {
        alt: "UnambitiousFx Logo",
        src: "img/unambitiousfx_logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          docsPluginId: "default",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Get Started",
        },
        {
          type: "docSidebar",
          label: "Functional",
          docsPluginId: "lib-functional",
          sidebarId: "libFunctionalSidebar",
          position: "left",
          to: "/lib-functional/",
        },
        {
          type: "docSidebar",
          label: "Synapse",
          docsPluginId: "lib-synapse",
          sidebarId: "libSynapseSidebar",
          position: "left",
          to: "/lib-synapse/",
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
              to: "/lib-functional/",
            },
            {
              label: "Synapse",
              to: "/lib-synapse/",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/unambitiousfx/unambitiousfx.github.io",
            },
            {
              label: "Main Repository",
              href: "https://github.com/unambitiousfx/unambitious",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} UnambitiousFx. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
