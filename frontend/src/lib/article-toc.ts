export interface TocItem {
  id: string;
  text: string;
}

export interface TocSection extends TocItem {
  children: TocItem[];
}

const slugify = (text: string) =>
  text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const plainText = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .trim();

/**
 * marked (v8+) no longer emits heading ids. Stamp a slug id on every h2/h3 in
 * the rendered article and return the nested outline the page uses for the
 * "On this page" navigation. Duplicate headings get a numeric suffix so every
 * anchor stays unique.
 */
export function buildArticleToc(html: string): { html: string; sections: TocSection[] } {
  const seen = new Map<string, number>();
  const sections: TocSection[] = [];

  const withIds = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_match, level: string, inner: string) => {
    const text = plainText(inner);
    const base = slugify(text) || 'section';
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;

    const item: TocItem = { id, text };
    const parent = sections.at(-1);
    if (level === '2' || !parent) sections.push({ ...item, children: [] });
    else parent.children.push(item);

    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

  return { html: withIds, sections };
}
