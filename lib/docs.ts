import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { renderMarkdown } from "@/lib/markdown";

const docsDir = path.join(process.cwd(), "content", "docs");

export interface DocItem {
  slug: string;
  title: string;
  markdown: string;
}

function extractTitle(markdown: string, fallback: string): string {
  const line = markdown.split(/\r?\n/).find((entry) => entry.trim().startsWith("# "));
  if (!line) return fallback;
  return line.replace(/^#\s+/, "").trim() || fallback;
}

function toTitleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((part) => (part ? `${part[0].toUpperCase()}${part.slice(1)}` : part))
    .join(" ");
}

export async function listDocs(): Promise<DocItem[]> {
  const entries = await readdir(docsDir, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".md"));

  const docs = await Promise.all(
    files.map(async (file) => {
      const slug = file.name.replace(/\.md$/i, "");
      const markdown = await readFile(path.join(docsDir, file.name), "utf8");
      const fallbackTitle = toTitleFromSlug(slug);
      const title = extractTitle(markdown, fallbackTitle);
      return { slug, title, markdown };
    }),
  );

  return docs.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getDocBySlug(slug: string): Promise<DocItem | null> {
  const filePath = path.join(docsDir, `${slug}.md`);
  try {
    const markdown = await readFile(filePath, "utf8");
    return { slug, title: extractTitle(markdown, toTitleFromSlug(slug)), markdown };
  } catch {
    return null;
  }
}

export { renderMarkdown };
