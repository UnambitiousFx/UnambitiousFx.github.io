import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className={clsx('container', styles.heroContainer)}>
        <p className={styles.kicker}>MODULAR .NET LIBRARIES FOR WEB API DEVELOPMENT</p>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Get Started
          </Link>
          <Link className="button button--outline button--lg" to="/lib-functional/">
            Functional Docs
          </Link>
        </div>
        <div className={styles.statGrid}>
          <article className={styles.statCard}>
            <p className={styles.statTitle}>Simplicity</p>
            <p className={styles.statBody}>Clean, natural interfaces that hide complexity and stay easy to use.</p>
          </article>
          <article className={styles.statCard}>
            <p className={styles.statTitle}>Modular</p>
            <p className={styles.statBody}>Pick-and-choose independent modules — no framework lock-in.</p>
          </article>
          <article className={styles.statCard}>
            <p className={styles.statTitle}>NativeAOT Ready</p>
            <p className={styles.statBody}>Designed for AOT compilation: fast startup and minimal memory footprint.</p>
          </article>
        </div>
      </div>
    </header>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Why UnambitiousFx?
        </Heading>
        <div className={styles.featuresGrid}>
          <article className={styles.featureCard}>
            <p className={styles.featureTitle}>Simplicity first</p>
            <p className={styles.featureBody}>
              Inspired by Dr. Werner Vogels' principle of hiding complexity while exposing simplicity,
              UnambitiousFx focuses on clean, natural interfaces developers understand immediately —
              without fancy or trendy features that add cognitive overhead.
            </p>
          </article>
          <article className={styles.featureCard}>
            <p className={styles.featureTitle}>Modular by design</p>
            <p className={styles.featureBody}>
              Each library is an independent island, connected by clean interfaces and shared
              principles. Use any combination of modules or integrate individual components with your
              preferred third-party packages — no framework lock-in.
            </p>
          </article>
          <article className={styles.featureCard}>
            <p className={styles.featureTitle}>Built for Web APIs</p>
            <p className={styles.featureBody}>
              Designed to complement ASP.NET Core, not replace it. UnambitiousFx provides utilities
              that make building fast, efficient, and maintainable Web APIs more straightforward
              while leveraging ASP.NET Core's robust foundation.
            </p>
          </article>
          <article className={styles.featureCard}>
            <p className={styles.featureTitle}>NativeAOT compatible</p>
            <p className={styles.featureBody}>
              Every library is designed with Native AOT in mind, delivering faster startup times,
              reduced memory footprint, and improved runtime performance — ideal for cloud,
              containerized, and microservice deployments.
            </p>
          </article>
        </div>
      </div>
    </section>
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
            <Link className={styles.libraryLink} to="/lib-functional/">
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
        <FeaturesSection />
        <LibrariesSection />
      </main>
    </Layout>
  );
}
