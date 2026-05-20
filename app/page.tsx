import Link from "next/link";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { features, RELEASES_URL } from "@/lib/site-data";
import { LatestReleasePanel } from "./components/latest-release";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="ha-shell grid gap-8 pb-8 md:grid-cols-[1.1fr_0.9fr]">
        <section className="ha-panel p-8 md:p-10">
          <p className="ha-code text-sm text-[var(--accent)]">LOCAL-FIRST STREAM ALERTS</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Hyper Alerts</h1>
          <p className="ha-muted mt-5 max-w-xl text-lg leading-relaxed">
            Build animated stream alerts that run on your machine, integrate with Streamer.bot,
            and stay fully under your control.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/download"
              className="rounded-full bg-[var(--accent)] px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-[var(--accent-strong)]"
            >
              Download latest
            </Link>
            <a
              href={RELEASES_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/30 px-6 py-3 font-semibold transition-colors hover:border-white"
            >
              Browse releases
            </a>
          </div>
        </section>

        <LatestReleasePanel />

        <section className="ha-panel p-8 md:col-span-2 md:p-10">
          <h2 className="text-2xl font-semibold">Feature Highlights</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {features.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="ha-muted mt-2 leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
