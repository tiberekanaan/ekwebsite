import { c as createComponent } from './_astro_assets_CL3KYVc9.mjs';
import 'piccolore';
import { c as renderComponent, e as renderTemplate, m as maybeRenderHead, h as addAttribute, u as unescapeHTML } from './server_D-XiJHcZ.mjs';
import { $ as $$Layout } from './Layout_uAHwrxxZ.mjs';
import { r as resolveLang, S as STRAPI_LOCALES, $ as $$PageHeader, a as $$LanguageToggle } from './LanguageToggle_Cka-B2q5.mjs';
import { marked } from 'marked';
import { S as STRAPI_URL } from './server_B5dqAppw.mjs';

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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": summary ?? `${title} — News update from Empower Kiribati`, "floatingHeader": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHeader", $$PageHeader, { "eyebrow": "News", "title": title, "description": summary ?? void 0, "backHref": "/", "backLabel": "Back to home" }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="mt-6 flex flex-wrap items-center gap-4" data-reveal data-reveal-delay="200"> <time class="text-sm font-semibold uppercase tracking-widest text-[#9fb9b4]"> ${formattedDate} </time> ${hasTranslation && renderTemplate`${renderComponent($$result3, "LanguageToggle", $$LanguageToggle, { "current": currentLang, "path": Astro2.url.pathname })}`} </div> ` })} <div class="mx-auto max-w-7xl px-8 py-12"> <div class="max-w-3xl"> ${photo && renderTemplate`<figure class="mb-10 overflow-hidden rounded-2xl shadow-xl shadow-slate-900/10" data-reveal> <img${addAttribute(absoluteUrl(photo.url), "src")}${addAttribute(photo.alternativeText ?? title, "alt")} class="aspect-[16/9] w-full object-cover" loading="eager"> </figure>`} ${contentHtml && renderTemplate`<article class="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-a:text-teal-700 hover:prose-a:text-teal-900" data-reveal>${unescapeHTML(contentHtml)}</article>`} </div> </div> ` })}`;
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
