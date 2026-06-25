import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { useEffect, useRef, type ReactNode } from "react";

import styles from "./index.module.css";

// ── Scroll-reveal hook ────────────────────────────────────────────────────────
// Sets data-revealed on [data-reveal] descendants when they enter the viewport.
// Reveals instantly if prefers-reduced-motion or IntersectionObserver unavailable.
function useReveal(containerRef: React.RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = Array.from(
      container.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (elements.length === 0) return;

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    if (reduced || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef]);
}

// ── Static data ───────────────────────────────────────────────────────────────
const STATS = [
  {
    title: "Simplicity",
    body: "Clean, natural interfaces that hide complexity and stay easy to use.",
    delay: 0,
  },
  {
    title: "Modular",
    body: "Pick-and-choose independent modules — no framework lock-in.",
    delay: 1,
  },
  {
    title: "NativeAOT Ready",
    body: "Designed for AOT compilation: fast startup and minimal memory footprint.",
    delay: 2,
  },
] as const;

const FEATURES = [
  {
    num: "01",
    title: "Simplicity first",
    body: "Inspired by Dr. Werner Vogels' principle of hiding complexity while exposing simplicity, UnambitiousFx focuses on clean, natural interfaces developers understand immediately — without fancy or trendy features that add cognitive overhead.",
  },
  {
    num: "02",
    title: "Modular by design",
    body: "Each library is an independent island, connected by clean interfaces and shared principles. Use any combination of modules or integrate individual components with your preferred third-party packages — no framework lock-in.",
  },
  {
    num: "03",
    title: "Built for Web APIs",
    body: "Designed to complement ASP.NET Core, not replace it. UnambitiousFx provides utilities that make building fast, efficient, and maintainable Web APIs more straightforward while leveraging ASP.NET Core's robust foundation.",
  },
  {
    num: "04",
    title: "NativeAOT compatible",
    body: "Every library is designed with Native AOT in mind, delivering faster startup times, reduced memory footprint, and improved runtime performance — ideal for cloud, containerized, and microservice deployments.",
  },
] as const;

// ── Sections ──────────────────────────────────────────────────────────────────
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className={clsx("container", styles.heroContainer)}>
        <span className={styles.kickerBadge}>.NET · Web API · Native AOT</span>
        <Heading as="h1" className={styles.heroTitle}>
          <span className={styles.gradientText}>{siteConfig.title}</span>
        </Heading>
        <p className={styles.catchPhrase}>Less framework. More you.</p>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            href="https://github.com/unambitiousfx/unambitious"
          >
            GitHub
          </Link>
          <Link
            className={clsx(
              "button button--outline button--lg",
              styles.btnSecondary,
            )}
            href="#libraries"
          >
            Explore libraries
          </Link>
        </div>
        <div className={styles.statGrid}>
          {STATS.map(({ title, body, delay }) => (
            <article
              key={title}
              className={styles.statCard}
              style={{ "--delay": delay } as React.CSSProperties}
            >
              <p className={styles.statTitle}>{title}</p>
              <p className={styles.statBody}>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </header>
  );
}

function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section className={styles.featuresSection} ref={ref}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Why UnambitiousFx?
        </Heading>
        <div className={styles.featuresGrid}>
          {FEATURES.map(({ num, title, body }, i) => (
            <article
              key={title}
              className={styles.featureCard}
              data-reveal=""
              style={{ "--delay": i } as React.CSSProperties}
            >
              <span className={styles.featureIndex}>{num}</span>
              <p className={styles.featureTitle}>{title}</p>
              <p className={styles.featureBody}>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LibrariesSection() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section className={styles.librariesSection} ref={ref}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle} id="libraries">
          Libraries
        </Heading>
        <div className={styles.libraryGrid}>
          <article
            className={styles.libraryCard}
            data-reveal=""
            style={{ "--delay": 0 } as React.CSSProperties}
          >
            <p className={styles.libraryName}>Functional</p>
            <p className={styles.libraryDesc}>
              Functional programming helpers and primitives for clear, robust
              .NET applications.
            </p>
            <Link
              className={styles.libraryLink}
              href="https://functional.unambitiousfx.com"
            >
              Explore Functional{" "}
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </Link>
          </article>
          <article
            className={styles.libraryCard}
            data-reveal=""
            style={{ "--delay": 1 } as React.CSSProperties}
          >
            <div className={styles.libraryNameRow}>
              <p className={styles.libraryName}>Synapse</p>
              <span className={styles.wipBadge}>WIP</span>
            </div>
            <p className={styles.libraryDesc}>
              A lightweight in-process mediator and message-driven primitives.
            </p>
            <Link
              className={styles.libraryLink}
              href="https://synapse.unambitiousfx.com"
            >
              Explore Synapse{" "}
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
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
      description="UnambitiousFx is a small collection of lightweight, performance-focused .NET libraries."
    >
      <HomepageHeader />
      <main>
        <FeaturesSection />
        <LibrariesSection />
      </main>
    </Layout>
  );
}
