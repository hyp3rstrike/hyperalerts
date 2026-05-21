import type { ReactNode } from "react";
import { DocsSidebar, type DocNavItem } from "@/app/components/docs-sidebar";

interface DocsShellProps {
  docs: DocNavItem[];
  activeSlug: string;
  children: ReactNode;
}

export function DocsShell({ docs, activeSlug, children }: DocsShellProps) {
  return (
    <main className="ha-shell grid gap-6 pb-8 md:grid-cols-[280px_1fr]">
      <DocsSidebar docs={docs} activeSlug={activeSlug} />
      {children}
    </main>
  );
}
