"use client";

import { RELEASES_URL } from "@/lib/site-data";
import { useLatestRelease } from "@/app/components/latest-release";
import { CtaButton, Panel } from "@/app/components/ui";
import { PageFrame } from "@/app/components/page-frame";

export default function DownloadPage() {
  const latestRelease = useLatestRelease();

  return (
    <PageFrame>
      <main className="ha-shell grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <Panel>
          <p className="ha-code text-sm text-[var(--accent)]">DOWNLOAD</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Get Hyper Alerts</h1>
          <p className="ha-muted mt-4 max-w-2xl leading-relaxed">
            Download the current portable build and launch it locally. No cloud account required.
          </p>
          <CtaButton
            href={latestRelease.url}
            label={`Download v${latestRelease.version}`}
            className="mt-8"
            disabled={latestRelease.loading}
          />
          <p className="ha-muted mt-5 text-sm">
            Looking for previous versions? View full release history on GitHub.
          </p>
          <CtaButton href={RELEASES_URL} label="Open release archive" external variant="ghost" className="ha-code mt-2" />
        </Panel>

        <Panel>
          <h2 className="text-2xl font-semibold">Quick start</h2>
          <ol className="ha-muted mt-4 space-y-3 leading-relaxed">
            <li>1. Download the latest Hyper Alerts release.</li>
            <li>2. Run the executable and approve the unsigned app prompt if Windows asks.</li>
            <li>3. Set up the browser source in OBS Studio.</li>
            <li>4. Go live and start triggering alerts.</li>
          </ol>
        </Panel>
      </main>
    </PageFrame>
  );
}
