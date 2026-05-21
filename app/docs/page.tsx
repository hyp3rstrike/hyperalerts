import { PageFrame } from "@/app/components/page-frame";
import { DocsContent } from "@/app/components/docs-content";
import { DocsShell } from "@/app/components/docs-shell";
import { listDocs, renderMarkdown } from "@/lib/docs";

export default async function DocsPage() {
  const docs = await listDocs();
  const firstDoc = docs[0];

  if (!firstDoc) {
    return (
      <PageFrame>
        <main className="ha-shell pb-8">
          <section className="ha-panel p-8 md:p-10">
            <h1 className="text-3xl font-semibold">Documentation</h1>
            <p className="ha-muted mt-3">No docs found yet.</p>
          </section>
        </main>
      </PageFrame>
    );
  }

  const html = renderMarkdown(firstDoc.markdown);

  return (
    <PageFrame>
      <DocsShell docs={docs} activeSlug={firstDoc.slug}>
        <DocsContent html={html} />
      </DocsShell>
    </PageFrame>
  );
}
