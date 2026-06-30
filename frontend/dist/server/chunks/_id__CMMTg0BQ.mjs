import { c as createComponent } from './_astro_assets_BHj8oFJj.mjs';
import 'piccolore';
import { c as renderComponent, e as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './server_DO--nj06.mjs';
import { $ as $$Layout } from './Layout_CKhng6WL.mjs';
import { r as resolveLang, S as STRAPI_LOCALES, $ as $$LanguageToggle } from './LanguageToggle_VzDdfZeW.mjs';
import { marked } from 'marked';
import { S as STRAPI_URL } from './server_DIHSIf4J.mjs';

const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const lang = resolveLang(Astro2.url.searchParams.get("lang"));
  const fetchBlog = async (locale) => {
    try {
      const res = await fetch(
        `${STRAPI_URL}/api/blogs/${id}?locale=${locale}&populate[localizations]=true`
      );
      if (!res.ok) return null;
      const { data } = await res.json();
      return data;
    } catch {
      return null;
    }
  };
  let post = await fetchBlog(STRAPI_LOCALES[lang]);
  if (!post && lang !== "en") post = await fetchBlog(STRAPI_LOCALES.en);
  if (!post) return Astro2.rewrite("/404");
  const { title, content, publish_date, publishedAt } = post;
  const hasTranslation = (post.localizations ?? []).length > 0;
  const currentLang = post.locale === STRAPI_LOCALES.kir ? "kir" : "en";
  const displayDate = publish_date ?? publishedAt ?? null;
  const formattedDate = displayDate ? new Date(displayDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }) : "";
  const contentHtml = content ? marked.parse(content) : "";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": `${title} — Blog` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto max-w-3xl px-6 py-16"> <div class="mb-8 flex flex-wrap items-center justify-between gap-4"> <a href="/blog" class="text-foreground-muted hover:text-brand-500 inline-block text-sm transition-colors">
← Back to blog
</a> ${hasTranslation && renderTemplate`${renderComponent($$result2, "LanguageToggle", $$LanguageToggle, { "current": currentLang, "path": Astro2.url.pathname })}`} </div> <header class="mb-10"> <h1 class="font-display text-foreground mb-4 text-4xl font-bold leading-tight"> ${title} </h1> ${formattedDate && renderTemplate`<time class="text-foreground-muted text-sm">${formattedDate}</time>`} </header> <article class="text-foreground prose prose-neutral dark:prose-invert max-w-none leading-relaxed">${unescapeHTML(contentHtml)}</article> </div> ` })}`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/pages/blog/[id].astro", void 0);

const $$file = "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/pages/blog/[id].astro";
const $$url = "/blog/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
