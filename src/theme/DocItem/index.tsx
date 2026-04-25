import { DocProvider } from '@docusaurus/plugin-content-docs/client';
import { HtmlClassNameProvider } from '@docusaurus/theme-common';
import type { Props } from '@theme/DocItem';
import DocItemLayout from '@theme/DocItem/Layout';
import DocItemMetadata from '@theme/DocItem/Metadata';
import NotFoundContent from '@theme/NotFound/Content';
import { type ReactNode } from 'react';

export default function DocItem(props: Props): ReactNode {
  const content = props.content;

  if (!content?.metadata?.id) {
    return <NotFoundContent />;
  }

  const docHtmlClassName = `docs-doc-id-${content.metadata.id}`;
  const MDXComponent = content;

  return (
    <DocProvider content={content}>
      <HtmlClassNameProvider className={docHtmlClassName}>
        <DocItemMetadata />
        <DocItemLayout>
          <MDXComponent />
        </DocItemLayout>
      </HtmlClassNameProvider>
    </DocProvider>
  );
}
