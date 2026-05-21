import { PageFrame } from "./components/page-frame";
import { features, RELEASES_URL, testimonials } from "@/lib/site-data";
import { LatestReleasePanel } from "./components/latest-release";
import { CtaButton, InfoCard, Panel } from "./components/ui";
import { renderMarkdown } from "@/lib/markdown";

export default function Home() {
  return (
    <PageFrame>
      <main className="ha-shell grid gap-8 pb-8 md:grid-cols-[1.1fr_0.9fr]">
        <Panel>
          <p className="ha-code text-sm text-[var(--accent)]">LOCAL-FIRST STREAM ALERTS</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Hyper Alerts</h1>
          <p className="ha-muted mt-5 max-w-xl text-lg leading-relaxed">
            Build animated stream alerts that run on your machine, integrate with Streamer.bot,
            and stay fully under your control.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <CtaButton href="/download" label="Download latest" />
            <CtaButton href={RELEASES_URL} label="Browse releases" external variant="secondary" />
          </div>
        </Panel>

        <LatestReleasePanel />

        <Panel className="md:col-span-2">
          <h2 className="text-2xl font-semibold">Feature Highlights</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {features.map((item) => <InfoCard key={item.title} title={item.title} body={item.body} />)}
          </div>
        </Panel>

        <Panel className="md:col-span-2">
          <h2 className="text-2xl font-semibold">What creators are saying</h2>
          <div className="mt-6 grid gap-4">
            {testimonials.map((item) => (
              <article key={item.quote} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <div
                  className="ha-doc-content ha-markdown-compact ha-muted"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(`\"${item.quote}\"`) }}
                />
                <p className="mt-4 text-sm font-semibold text-zinc-300">
                  -{" "}
                  {item.authorUrl ? (
                    <a href={item.authorUrl} target="_blank" rel="noreferrer" className="text-[var(--accent)] hover:text-[var(--accent-strong)]">
                      {item.author}
                    </a>
                  ) : (
                    item.author
                  )}
                </p>
              </article>
            ))}
          </div>
        </Panel>

      </main>
    </PageFrame>
  );
}
