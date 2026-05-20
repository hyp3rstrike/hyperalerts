import { PageFrame } from "@/app/components/page-frame";
import { InfoCard, Panel } from "@/app/components/ui";
import { features } from "@/lib/site-data";

export default function FeaturesPage() {
  return (
    <PageFrame>
      <main className="ha-shell">
        <Panel>
        <p className="ha-code text-sm text-[var(--accent)]">FEATURES</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">What Hyper Alerts offers</h1>
        <p className="ha-muted mt-4 max-w-3xl text-lg leading-relaxed">
          Everything is built to make stream alerts fast to configure, easy to brand, and stable
          while you are live.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {features.map((item) => <InfoCard key={item.title} title={item.title} body={item.body} />)}
        </div>
        </Panel>
      </main>
    </PageFrame>
  );
}
