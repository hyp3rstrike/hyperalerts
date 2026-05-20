import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { features } from "@/lib/site-data";

export default function FeaturesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="ha-shell ha-panel p-8 md:p-10">
        <p className="ha-code text-sm text-[var(--accent)]">FEATURES</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">What Hyper Alerts offers</h1>
        <p className="ha-muted mt-4 max-w-3xl text-lg leading-relaxed">
          Everything is built to make stream alerts fast to configure, easy to brand, and stable
          while you are live.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {features.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="ha-muted mt-3 leading-relaxed">{item.body}</p>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
