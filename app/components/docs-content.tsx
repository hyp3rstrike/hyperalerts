interface DocsContentProps {
  html: string;
}

export function DocsContent({ html }: DocsContentProps) {
  return (
    <article className="ha-panel min-h-[420px] p-8 md:p-10">
      <div className="ha-doc-content" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
