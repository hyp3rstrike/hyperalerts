export function renderMarkdown(markdown: string): string {
  const normalizedMarkdown = markdown
    .replace(/^\\#\s+/gm, "# ")
    .replace(/^\\##\s+/gm, "## ")
    .replace(/\\\*\*/g, "**")
    .replace(/\\`/g, "`");

  const renderInline = (value: string) =>
    value
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  const escaped = normalizedMarkdown
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
