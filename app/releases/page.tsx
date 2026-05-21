"use client";

import { useEffect, useMemo, useState } from "react";
import { PageFrame } from "@/app/components/page-frame";
import { CtaButton, Panel } from "@/app/components/ui";
import { RELEASES_URL } from "@/lib/site-data";
import { renderMarkdown } from "@/lib/markdown";

type GithubRelease = {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  prerelease: boolean;
  draft: boolean;
};

export default function ReleasesPage() {
  const [releases, setReleases] = useState<GithubRelease[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/repos/hyp3rstrike/hyperalerts/releases?per_page=12", {
      cache: "no-store",
    })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((json: GithubRelease[]) => {
        const published = json.filter((release) => !release.draft && !release.prerelease);
        setReleases(published);
      })
      .catch(() => setReleases([]))
      .finally(() => setLoading(false));
  }, []);

  const hasReleases = useMemo(() => releases.length > 0, [releases]);

  return (
    <PageFrame>
      <main className="ha-shell">
        <Panel>
        <p className="ha-code text-sm text-[var(--accent)]">RELEASES</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Release history</h1>
        <p className="ha-muted mt-4 max-w-3xl leading-relaxed">
          Track what changed and download any published build from the public release channel.
        </p>
        <div className="mt-8 space-y-4">
          {loading && <p className="ha-muted">Loading published releases...</p>}
          {!loading && !hasReleases && (
            <p className="ha-muted">No published releases were found yet. Check back soon.</p>
          )}
          {!loading &&
            releases.map((release) => (
              <article key={release.id} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-xl font-semibold">{release.tag_name}</h2>
                  <span className="ha-code text-sm ha-muted">
                    {new Date(release.published_at).toLocaleDateString("en-US")}
                  </span>
                </div>
                <div
                  className="ha-doc-content ha-markdown-compact mt-3"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown((release.body || "No release notes provided.").split("\n\n")[0]) }}
                />
                <CtaButton href={release.html_url} label="Open release" external variant="ghost" className="mt-4 text-sm" />
              </article>
            ))}
        </div>
        <CtaButton href={RELEASES_URL} label="View all GitHub releases" external variant="ghost" className="mt-8 border border-[var(--accent)]" />
        </Panel>
      </main>
    </PageFrame>
  );
}
