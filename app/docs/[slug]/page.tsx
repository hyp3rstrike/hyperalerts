import { notFound } from "next/navigation";
import { PageFrame } from "@/app/components/page-frame";
import { DocsContent } from "@/app/components/docs-content";
import { DocsShell } from "@/app/components/docs-shell";
import { getDocBySlug, listDocs, renderMarkdown } from "@/lib/docs";

interface DocDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const docs = await listDocs();
  return docs.map((doc) => ({ slug: doc.slug }));
}

export default async function DocDetailPage({ params }: DocDetailProps) {
  const { slug } = await params;
  const docs = await listDocs();
  const doc = await getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const html = renderMarkdown(doc.markdown);

  return (
    <PageFrame>
      <DocsShell docs={docs} activeSlug={slug}>
        <DocsContent html={html} />
      </DocsShell>
    </PageFrame>
  );
}
