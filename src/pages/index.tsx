import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className={clsx('container', styles.heroContainer)}>
        <p className={styles.kicker}>LIGHTWEIGHT .NET BUILDING BLOCKS</p>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Get Started
          </Link>
          <Link className="button button--outline button--lg" to="/docs/functional/">
            Functional Docs
          </Link>
        </div>
        <div className={styles.statGrid}>
          <article className={styles.statCard}>
            <p className={styles.statTitle}>Simplicity</p>
            <p className={styles.statBody}>Minimal APIs designed for everyday use.</p>
          </article>
          <article className={styles.statCard}>
            <p className={styles.statTitle}>Correctness</p>
            <p className={styles.statBody}>Predictable behavior and practical safety by default.</p>
          </article>
          <article className={styles.statCard}>
            <p className={styles.statTitle}>Low allocations</p>
            <p className={styles.statBody}>Performance-focused internals for efficient apps.</p>
          </article>
        </div>
      </div>
    </header>
  );
}

function LibrariesSection() {
  return (
    <section className={styles.librariesSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Libraries
        </Heading>
        <div className={styles.libraryGrid}>
          <article className={styles.libraryCard}>
            <p className={styles.libraryName}>Functional</p>
            <p className={styles.libraryDesc}>
              Functional programming helpers and primitives for clear, robust .NET applications.
            </p>
            <Link className={styles.libraryLink} to="/docs/functional/">
              Explore Functional
            </Link>
          </article>
          <article className={styles.libraryCard}>
            <p className={styles.libraryName}>Synapse</p>
            <p className={styles.libraryDesc}>
              A lightweight in-process mediator and message-driven primitives. Work in progress.
            </p>
            <Link
              className={styles.libraryLink}
              href="https://github.com/unambitiousfx/unambitious/tree/main/Synapse">
              See Synapse source
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Lightweight .NET Libraries`}
      description="UnambitiousFx is a small collection of lightweight, performance-focused .NET libraries.">
      <HomepageHeader />
      <main>
        <LibrariesSection />
      </main>
    </Layout>
  );
}
