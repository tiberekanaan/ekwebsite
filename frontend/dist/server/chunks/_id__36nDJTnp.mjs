import { c as createComponent } from './_astro_assets_De93nOwO.mjs';
import 'piccolore';
import { c as renderComponent, e as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './server_B71wUxTc.mjs';
import { $ as $$Layout, a as $$PageHeader } from './PageHeader_3joNX9At.mjs';
import { r as resolveLang, S as STRAPI_LOCALES, $ as $$LanguageToggle } from './LanguageToggle_Bu6fekBL.mjs';
import { marked } from 'marked';
import { S as STRAPI_URL } from './server_Cnanraoi.mjs';

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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": `${title} — Blog`, "floatingHeader": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHeader", $$PageHeader, { "eyebrow": "Blog", "title": title, "backHref": "/blog", "backLabel": "Back to blog" }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="mt-6 flex flex-wrap items-center gap-4" data-reveal data-reveal-delay="200"> ${formattedDate && renderTemplate`<time class="text-sm font-semibold uppercase tracking-widest text-[#9fb9b4]"> ${formattedDate} </time>`} ${hasTranslation && renderTemplate`${renderComponent($$result3, "LanguageToggle", $$LanguageToggle, { "current": currentLang, "path": Astro2.url.pathname })}`} </div> ` })} <div class="mx-auto max-w-7xl px-8 py-12"> <article class="text-foreground prose prose-neutral dark:prose-invert max-w-3xl leading-relaxed">${unescapeHTML(contentHtml)}</article> </div> ` })}`;
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
