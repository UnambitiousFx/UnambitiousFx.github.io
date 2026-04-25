import type {
    ActiveDocContext,
    GlobalVersion,
} from '@docusaurus/plugin-content-docs/client';

const SUPPORTED_PLUGIN_IDS = new Set(['lib-functional', 'lib-synapse']);

export function shouldShowVersionSelector(pluginId: string | undefined): boolean {
  if (!pluginId) {
    return false;
  }

  return SUPPORTED_PLUGIN_IDS.has(pluginId);
}

export function resolveTargetVersionPath(params: {
  targetVersion: GlobalVersion;
  activeDocContext: ActiveDocContext;
}): string {
  const {targetVersion, activeDocContext} = params;

  const alternateDoc = activeDocContext.alternateDocVersions[targetVersion.name];
  return alternateDoc?.path ?? targetVersion.path;
}