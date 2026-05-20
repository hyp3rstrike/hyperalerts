"use client";

import { useEffect, useMemo, useState } from "react";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { RELEASES_URL } from "@/lib/site-data";

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
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="ha-shell ha-panel p-8 md:p-10">
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
              <article key={release.id} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-xl font-semibold">{release.tag_name}</h2>
                  <span className="ha-code text-sm ha-muted">
                    {new Date(release.published_at).toLocaleDateString("en-US")}
                  </span>
                </div>
                <p className="ha-muted mt-3 leading-relaxed">
                  {(release.body || "No release notes provided.").split("\n")[0]}
                </p>
                <a
                  href={release.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-strong)]"
                >
                  Open release
                </a>
              </article>
            ))}
        </div>
        <a href={RELEASES_URL} target="_blank" rel="noreferrer" className="mt-8 inline-block rounded-full border border-[var(--accent)] px-6 py-3 font-semibold text-[var(--accent)] hover:text-[var(--accent-strong)]">
          View all GitHub releases
        </a>
      </main>
      <SiteFooter />
    </div>
  );
}
