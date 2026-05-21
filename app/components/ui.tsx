"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { renderMarkdown } from "@/lib/markdown";

type PanelProps = {
  children: ReactNode;
  className?: string;
};

type HeadingProps = {
  label?: string;
  title: string;
  description?: string;
};

type CtaProps = {
  href: string;
  label: string;
  external?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  className?: string;
};

export function Panel({ children, className = "" }: PanelProps) {
  return <section className={`ha-panel p-8 md:p-10 ${className}`.trim()}>{children}</section>;
}

export function SectionHeading({ label, title, description }: HeadingProps) {
  return (
    <>
      {label ? <p className="ha-code text-sm text-[var(--accent)]">{label}</p> : null}
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{title}</h1>
      {description ? <p className="ha-muted mt-4 max-w-3xl text-lg leading-relaxed">{description}</p> : null}
    </>
  );
}

export function CtaButton({
  href,
  label,
  external = false,
  variant = "primary",
  disabled = false,
  className = "",
}: CtaProps) {
  const isExternal = external || href.startsWith("http://") || href.startsWith("https://");
  const base =
    "inline-block rounded-full px-6 py-3 font-semibold transition-colors aria-disabled:pointer-events-none aria-disabled:opacity-50";
  const styles = {
    primary: "bg-[var(--accent)] text-slate-950 hover:bg-[var(--accent-strong)]",
    secondary: "border border-zinc-700 bg-zinc-900 hover:border-zinc-500",
    ghost: "text-[var(--accent)] hover:text-[var(--accent-strong)]",
  }[variant];

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-disabled={disabled}
        onClick={(event) => {
          if (disabled) event.preventDefault();
        }}
        className={`${base} ${styles} ${className}`.trim()}
      >
        {label}
      </a>
    );
  }

  return (
    <Link aria-disabled={disabled} href={href} className={`${base} ${styles} ${className}`.trim()}>
      {label}
    </Link>
  );
}

export function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="ha-doc-content ha-markdown-compact mt-2" dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }} />
    </article>
  );
}
