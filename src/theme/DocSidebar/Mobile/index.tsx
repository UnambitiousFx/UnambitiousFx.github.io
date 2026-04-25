import {
  useActiveDocContext,
  useActivePlugin,
  useVersions,
} from '@docusaurus/plugin-content-docs/client';
import {
  NavbarSecondaryMenuFiller,
  ThemeClassNames,
  type NavbarSecondaryMenuComponent,
} from '@docusaurus/theme-common';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import type { Props } from '@theme/DocSidebar/Mobile';
import {
  resolveTargetVersionPath,
  shouldShowVersionSelector,
} from '@theme/DocSidebar/versioning';
import DocSidebarItems from '@theme/DocSidebarItems';
import clsx from 'clsx';
import React from 'react';

// eslint-disable-next-line react/function-component-definition
const DocSidebarMobileSecondaryMenu: NavbarSecondaryMenuComponent<Props> = ({
  sidebar,
  path,
}) => {
  const mobileSidebar = useNavbarMobileSidebar();
  const activePlugin = useActivePlugin();
  const docsPluginId = activePlugin?.pluginId;
  const shouldRenderSelector = shouldShowVersionSelector(docsPluginId);
  const versions = useVersions(docsPluginId);
  const activeDocContext = useActiveDocContext(docsPluginId);
  const activeVersionName =
    activeDocContext.activeVersion?.name ?? versions[0]?.name;

  const handleVersionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVersionName = event.target.value;
    const targetVersion = versions.find(
      (version) => version.name === selectedVersionName,
    );

    if (!targetVersion) {
      return;
    }

    const nextPath = resolveTargetVersionPath({
      targetVersion,
      activeDocContext,
    });

    mobileSidebar.toggle();
    window.location.pathname = nextPath;
  };

  return (
    <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
      {shouldRenderSelector && activeVersionName && versions.length > 0 && (
        <li className="menu__list-item docsVersionSidebarSelector">
          <label className="docsVersionSidebarSelectorLabel" htmlFor="docs-version-select-mobile">
            Version
          </label>
          <select
            id="docs-version-select-mobile"
            className="docsVersionSidebarSelectorInput"
            value={activeVersionName}
            onChange={handleVersionChange}>
            {versions.map((version) => (
              <option key={version.name} value={version.name}>
                {version.label}
              </option>
            ))}
          </select>
        </li>
      )}
      <DocSidebarItems
        items={sidebar}
        activePath={path}
        onItemClick={(item) => {
          // Mobile sidebar should only be closed if the category has a link
          if (item.type === 'category' && item.href) {
            mobileSidebar.toggle();
          }
          if (item.type === 'link') {
            mobileSidebar.toggle();
          }
        }}
        level={1}
      />
    </ul>
  );
};

function DocSidebarMobile(props: Props) {
  return (
    <NavbarSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}

export default React.memo(DocSidebarMobile);
