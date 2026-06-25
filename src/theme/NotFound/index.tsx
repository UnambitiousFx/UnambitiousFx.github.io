import NotFoundContent from "@theme/NotFound/Content";
import Layout from "@theme/Layout";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

// Redirect map: internal route prefix → external subdomain root
const REDIRECTS: Array<{ prefix: string; target: string }> = [
  { prefix: "/lib-functional/", target: "https://functional.unambitiousfx.com" },
  { prefix: "/lib-synapse/", target: "https://synapse.unambitiousfx.com" },
  { prefix: "/docs/", target: "https://functional.unambitiousfx.com" },
];

function tryRedirect(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  const pathname = window.location.pathname;
  for (const { prefix, target } of REDIRECTS) {
    if (pathname.startsWith(prefix)) {
      // Preserve the sub-path after the prefix so deep links keep working
      const rest = pathname.slice(prefix.length - 1); // keeps leading "/"
      window.location.replace(target + rest);
      return true;
    }
  }
  return false;
}

export default function NotFound(): ReactNode {
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    setRedirecting(tryRedirect());
  }, []);

  if (redirecting) {
    return null;
  }

  return (
    <Layout>
      <NotFoundContent />
    </Layout>
  );
}
