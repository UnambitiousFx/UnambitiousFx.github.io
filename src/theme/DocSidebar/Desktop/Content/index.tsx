import {
    useActiveDocContext,
    useActivePlugin,
    useVersions,
} from '@docusaurus/plugin-content-docs/client';
import { ThemeClassNames } from '@docusaurus/theme-common';
import {
    useAnnouncementBar,
    useScrollPosition,
} from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/DocSidebar/Desktop/Content';
import {
    resolveTargetVersionPath,
    shouldShowVersionSelector,
} from '@theme/DocSidebar/versioning';
import DocSidebarItems from '@theme/DocSidebarItems';
import clsx from 'clsx';
import React, { type ReactNode, useState } from 'react';

import styles from './styles.module.css';

function useShowAnnouncementBar() {
  const {isActive} = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);

  useScrollPosition(
    ({scrollY}) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive],
  );
  return isActive && showAnnouncementBar;
}

export default function DocSidebarDesktopContent({
  path,
  sidebar,
  className,
}: Props): ReactNode {
  const showAnnouncementBar = useShowAnnouncementBar();
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

    window.location.pathname = nextPath;
  };

  return (
    <nav
      aria-label={translate({
        id: 'theme.docs.sidebar.navAriaLabel',
        message: 'Docs sidebar',
        description: 'The ARIA label for the sidebar navigation',
      })}
      className={clsx(
        'menu thin-scrollbar',
        styles.menu,
        showAnnouncementBar && styles.menuWithAnnouncementBar,
        className,
      )}>
      {shouldRenderSelector && activeVersionName && versions.length > 0 && (
        <div className={styles.versionControl}>
          <label className={styles.versionLabel} htmlFor="docs-version-select">
            Version
          </label>
          <select
            id="docs-version-select"
            className={styles.versionSelect}
            value={activeVersionName}
            onChange={handleVersionChange}>
            {versions.map((version) => (
              <option key={version.name} value={version.name}>
                {version.label}
              </option>
            ))}
          </select>
        </div>
      )}
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems items={sidebar} activePath={path} level={1} />
      </ul>
    </nav>
  );
}
