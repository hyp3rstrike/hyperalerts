"use client";

import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { RELEASES_URL } from "@/lib/site-data";
import { useLatestRelease } from "@/app/components/latest-release";

export default function DownloadPage() {
  const latestRelease = useLatestRelease();

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="ha-shell grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <section className="ha-panel p-8 md:p-10">
          <p className="ha-code text-sm text-[var(--accent)]">DOWNLOAD</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Get Hyper Alerts</h1>
          <p className="ha-muted mt-4 max-w-2xl leading-relaxed">
            Download the current portable build and launch it locally. No cloud account required.
          </p>
          <a
            href={latestRelease.url}
            aria-disabled={latestRelease.loading}
            onClick={(event) => {
              if (latestRelease.loading) {
                event.preventDefault();
              }
            }}
            className="mt-8 inline-block rounded-full bg-[var(--accent)] px-7 py-3 font-semibold text-slate-950 transition-colors hover:bg-[var(--accent-strong)] aria-disabled:pointer-events-none aria-disabled:opacity-50"
          >
            Download v{latestRelease.version}
          </a>
          <p className="ha-muted mt-5 text-sm">
            Looking for previous versions? View full release history on GitHub.
          </p>
          <a href={RELEASES_URL} target="_blank" rel="noreferrer" className="ha-code mt-2 inline-block text-[var(--accent)] hover:text-[var(--accent-strong)]">
            Open release archive
          </a>
        </section>

        <section className="ha-panel p-8 md:p-10">
          <h2 className="text-2xl font-semibold">Quick start</h2>
          <ol className="ha-muted mt-4 space-y-3 leading-relaxed">
            <li>1. Download the portable executable.</li>
            <li>2. Launch and open the configuration view.</li>
            <li>3. Connect Streamer.bot endpoint settings.</li>
            <li>4. Add your media and test alert events.</li>
          </ol>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
