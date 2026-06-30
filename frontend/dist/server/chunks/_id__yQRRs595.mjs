import { c as createComponent } from './_astro_assets_BHj8oFJj.mjs';
import 'piccolore';
import { c as renderComponent, e as renderTemplate, m as maybeRenderHead, h as addAttribute, u as unescapeHTML } from './server_DO--nj06.mjs';
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
  const fetchNewsUpdate = async (locale) => {
    try {
      const res = await fetch(
        `${STRAPI_URL}/api/news-updates/${id}?locale=${locale}&populate[photo]=true&populate[localizations]=true`
      );
      if (!res.ok) return null;
      const { data } = await res.json();
      return data;
    } catch {
      return null;
    }
  };
  let item = await fetchNewsUpdate(STRAPI_LOCALES[lang]);
  if (!item && lang !== "en") item = await fetchNewsUpdate(STRAPI_LOCALES.en);
  if (!item) return Astro2.rewrite("/404");
  const { title, summary, content, photo } = item;
  const hasTranslation = (item.localizations ?? []).length > 0;
  const currentLang = item.locale === STRAPI_LOCALES.kir ? "kir" : "en";
  const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const contentHtml = content ? marked.parse(content) : "";
  const absoluteUrl = (url) => url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": summary ?? `${title} — News update from Empower Kiribati` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto max-w-3xl px-6 py-16 lg:py-24"> <div class="mb-8 flex flex-wrap items-center justify-between gap-4"> <a href="/" class="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 transition-colors hover:text-teal-700">
← Back to home
</a> ${hasTranslation && renderTemplate`${renderComponent($$result2, "LanguageToggle", $$LanguageToggle, { "current": currentLang, "path": Astro2.url.pathname })}`} </div> ${photo && renderTemplate`<figure class="mb-10 overflow-hidden rounded-2xl shadow-xl shadow-slate-900/10" data-reveal> <img${addAttribute(absoluteUrl(photo.url), "src")}${addAttribute(photo.alternativeText ?? title, "alt")} class="aspect-[16/9] w-full object-cover" loading="eager"> </figure>`} <header class="mb-10" data-reveal> <p class="mb-3 font-accent text-3xl leading-none text-slate-700">News</p> <h1 class="font-display text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl"> ${title} </h1> <time class="mt-4 block text-sm font-semibold uppercase tracking-widest text-slate-500"> ${formattedDate} </time> </header> ${summary && renderTemplate`<p class="mb-10 border-l-4 border-teal-500 pl-5 text-lg leading-relaxed text-slate-700" data-reveal> ${summary} </p>`} ${contentHtml && renderTemplate`<article class="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-a:text-teal-700 hover:prose-a:text-teal-900" data-reveal>${unescapeHTML(contentHtml)}</article>`} </div> ` })}`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/pages/news/[id].astro", void 0);

const $$file = "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/pages/news/[id].astro";
const $$url = "/news/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
