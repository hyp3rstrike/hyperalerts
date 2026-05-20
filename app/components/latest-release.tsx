"use client";

import { useEffect, useMemo, useState } from "react";
import { CtaButton, Panel } from "@/app/components/ui";

type LatestManifest = {
  version: string;
  publishedAt: string;
  notes: string;
  windows: {
    url: string;
    sha256: string;
    size: number;
  };
};

export function useLatestRelease() {
  const [data, setData] = useState<LatestManifest | null>(null);

  useEffect(() => {
    fetch(`/hyper-alerts-site/latest.json?ts=${Date.now()}`, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((json: LatestManifest) => setData(json))
      .catch(() => {
        fetch(`/latest.json?ts=${Date.now()}`, { cache: "no-store" })
          .then((response) => (response.ok ? response.json() : Promise.reject()))
          .then((json: LatestManifest) => setData(json))
          .catch(() => undefined);
      });
  }, []);

  const formattedDate = useMemo(() => {
    if (!data) {
      return "Checking for latest release...";
    }
    const parsed = Date.parse(data.publishedAt);
    if (Number.isNaN(parsed)) {
      return data.publishedAt;
    }
    return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(parsed);
  }, [data]);

  return {
    loading: data === null,
    version: data?.version ?? "...",
    publishedAt: formattedDate,
    notes: data?.notes ?? "Loading release notes...",
    url: data?.windows.url ?? "#",
  };
}

export function LatestReleasePanel() {
  const latestRelease = useLatestRelease();

  return (
    <Panel>
      <p className="ha-code text-sm text-[var(--accent)]">CURRENT BUILD</p>
      <h2 className="mt-3 text-3xl font-semibold">v{latestRelease.version}</h2>
      <p className="ha-muted mt-1">Published {latestRelease.publishedAt}</p>
      <p className="ha-muted mt-5 leading-relaxed">{latestRelease.notes}</p>
      <CtaButton
        href={latestRelease.url}
        label="Direct download"
        variant="ghost"
        className="mt-7 border border-[var(--accent)]"
        disabled={latestRelease.loading}
      />
    </Panel>
  );
}
