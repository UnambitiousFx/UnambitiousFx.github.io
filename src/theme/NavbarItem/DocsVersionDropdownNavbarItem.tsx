import { useActivePlugin } from "@docusaurus/plugin-content-docs/client";
import type { WrapperProps } from "@docusaurus/types";
import DocsVersionDropdownNavbarItem from "@theme-original/NavbarItem/DocsVersionDropdownNavbarItem";
import type DocsVersionDropdownNavbarItemType from "@theme/NavbarItem/DocsVersionDropdownNavbarItem";
import type { ReactNode } from "react";

type Props = WrapperProps<typeof DocsVersionDropdownNavbarItemType>;

// The navbar holds one version dropdown per project: only show the one for the docs being read.
export default function DocsVersionDropdownNavbarItemWrapper(props: Props): ReactNode {
  const activePlugin = useActivePlugin();
  if (activePlugin?.pluginId !== props.docsPluginId) {
    return null;
  }
  return <DocsVersionDropdownNavbarItem {...props} />;
}
