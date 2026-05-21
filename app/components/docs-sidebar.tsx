import Link from "next/link";

export interface DocNavItem {
  slug: string;
  title: string;
}

interface DocsSidebarProps {
  docs: DocNavItem[];
  activeSlug: string;
}

export function DocsSidebar({ docs, activeSlug }: DocsSidebarProps) {
  return (
    <aside className="ha-panel h-fit p-5">
      <p className="ha-code text-xs text-[var(--accent)]">DOCS</p>
      <nav className="mt-3 space-y-2">
        {docs.map((doc) => {
          const active = doc.slug === activeSlug;
          return (
            <Link
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              className={`block rounded-lg border px-3 py-2 text-sm transition-colors ${
                active
                  ? "border-[var(--accent)] bg-zinc-900 text-zinc-100"
                  : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-600"
              }`}
            >
              {doc.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
