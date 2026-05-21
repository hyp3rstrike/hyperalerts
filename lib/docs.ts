import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

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

export function renderMarkdown(markdown: string): string {
  const renderInline = (value: string) =>
    value
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  const escaped = markdown
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const lines = escaped.split(/\r?\n/);
  const html: string[] = [];
  let inUnorderedList = false;
  let inOrderedList = false;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (!line.trim()) {
      if (inUnorderedList) {
        html.push("</ul>");
        inUnorderedList = false;
      }
      if (inOrderedList) {
        html.push("</ol>");
        inOrderedList = false;
      }
      continue;
    }

    if (line.startsWith("## ")) {
      if (inUnorderedList) {
        html.push("</ul>");
        inUnorderedList = false;
      }
      if (inOrderedList) {
        html.push("</ol>");
        inOrderedList = false;
      }
      html.push(`<h2>${renderInline(line.replace(/^##\s+/, ""))}</h2>`);
      continue;
    }

    if (line.startsWith("# ")) {
      if (inUnorderedList) {
        html.push("</ul>");
        inUnorderedList = false;
      }
      if (inOrderedList) {
        html.push("</ol>");
        inOrderedList = false;
      }
      html.push(`<h1>${renderInline(line.replace(/^#\s+/, ""))}</h1>`);
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      if (inOrderedList) {
        html.push("</ol>");
        inOrderedList = false;
      }
      if (!inUnorderedList) {
        html.push("<ul>");
        inUnorderedList = true;
      }
      html.push(`<li>${renderInline(line.replace(/^[-*]\s+/, ""))}</li>`);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      if (inUnorderedList) {
        html.push("</ul>");
        inUnorderedList = false;
      }
      if (!inOrderedList) {
        html.push("<ol>");
        inOrderedList = true;
      }
      html.push(`<li>${renderInline(line.replace(/^\d+\.\s+/, ""))}</li>`);
      continue;
    }

    if (inUnorderedList) {
      html.push("</ul>");
      inUnorderedList = false;
    }
    if (inOrderedList) {
      html.push("</ol>");
      inOrderedList = false;
    }

    html.push(`<p>${renderInline(line)}</p>`);
  }

  if (inUnorderedList) {
    html.push("</ul>");
  }
  if (inOrderedList) {
    html.push("</ol>");
  }

  return html.join("\n");
}
