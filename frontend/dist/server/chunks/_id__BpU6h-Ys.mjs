import { c as createComponent } from './_astro_assets_wvPx3sBL.mjs';
import 'piccolore';
import { c as renderComponent, e as renderTemplate, m as maybeRenderHead, h as addAttribute } from './server_COI8VqC6.mjs';
import { $ as $$Layout } from './Layout_BmhoDivJ.mjs';
import { r as resolveLang, S as STRAPI_LOCALES, $ as $$LanguageToggle } from './LanguageToggle_qLKMDzxY.mjs';
import { S as STRAPI_URL } from './server_Y3o-OI4_.mjs';

const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const lang = resolveLang(Astro2.url.searchParams.get("lang"));
  const fetchResource = async (locale) => {
    try {
      const res = await fetch(
        `${STRAPI_URL}/api/resources/${id}?locale=${locale}&populate[content_blocks][populate]=*&populate[localizations]=true`
      );
      if (!res.ok) return null;
      const { data } = await res.json();
      return data;
    } catch {
      return null;
    }
  };
  let resource = await fetchResource(STRAPI_LOCALES[lang]);
  if (!resource && lang !== "en") resource = await fetchResource(STRAPI_LOCALES.en);
  if (!resource) return Astro2.rewrite("/404");
  const { title, description } = resource;
  const content_blocks = resource.content_blocks ?? [];
  const hasTranslation = (resource.localizations ?? []).length > 0;
  const currentLang = resource.locale === STRAPI_LOCALES.kir ? "kir" : "en";
  const absoluteUrl = (url) => url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
  function toEmbedUrl(url) {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtube.com") && u.pathname === "/watch") {
        const v = u.searchParams.get("v");
        return v ? `https://www.youtube.com/embed/${v}` : null;
      }
      if (u.hostname === "youtu.be") {
        return `https://www.youtube.com/embed${u.pathname}`;
      }
      if (u.hostname.includes("youtube.com") && u.pathname.startsWith("/embed/")) {
        return url;
      }
      if (u.hostname.includes("vimeo.com") && /^\/\d+$/.test(u.pathname)) {
        return `https://player.vimeo.com/video${u.pathname}`;
      }
      if (u.hostname.includes("player.vimeo.com")) {
        return url;
      }
      return null;
    } catch {
      return null;
    }
  }
  const formatBytes = (bytes) => {
    if (!bytes && bytes !== 0) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description ?? `${title} — Community Resource` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto max-w-3xl px-6 py-16"> <div class="mb-8 flex flex-wrap items-center justify-between gap-4"> <a href="/resources" class="inline-block text-sm text-slate-500 transition-colors hover:text-teal-700">
← Back to resources
</a> ${hasTranslation && renderTemplate`${renderComponent($$result2, "LanguageToggle", $$LanguageToggle, { "current": currentLang, "path": Astro2.url.pathname })}`} </div> <header class="mb-10"> <p class="mb-2 font-accent text-3xl leading-none text-slate-700">Resource</p> <h1 class="font-display text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl"> ${title} </h1> ${description && renderTemplate`<p class="mt-4 text-base text-slate-600">${description}</p>`} </header> ${content_blocks.length > 0 && renderTemplate`<section class="flex flex-col gap-6"> ${content_blocks.map((block) => {
    if (block.__component === "content-blocks.video") {
      const embed = toEmbedUrl(block.url);
      if (embed) {
        return renderTemplate`<div class="overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm"> <div class="aspect-video w-full"> <iframe${addAttribute(embed, "src")} title="Embedded video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="h-full w-full border-0"></iframe> </div> </div>`;
      }
      return renderTemplate`<a${addAttribute(block.url, "href")} target="_blank" rel="noopener noreferrer" class="group flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-teal-500"> <div class="flex items-center gap-4"> <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-white"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path d="M8 5v14l11-7z"></path> </svg> </span> <div> <p class="text-xs font-bold uppercase tracking-wider text-teal-700">Video</p> <p class="text-base font-semibold text-slate-900">Watch Video</p> </div> </div> <span aria-hidden="true" class="text-slate-400 group-hover:text-teal-700">→</span> </a>`;
    }
    if (block.__component === "content-blocks.download") {
      const file = block.file;
      if (!file) return null;
      const href = absoluteUrl(file.url);
      return renderTemplate`<a${addAttribute(href, "href")}${addAttribute(file.name ?? void 0, "download")} target="_blank" rel="noopener noreferrer" class="group flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-lime-500"> <div class="flex items-center gap-4"> <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-lime-300"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v12m0 0 4-4m-4 4-4-4M4 20h16"></path> </svg> </span> <div> <p class="text-xs font-bold uppercase tracking-wider text-slate-500"> ${file.ext ? file.ext.replace(".", "").toUpperCase() : "Download"} ${file.size ? ` · ${formatBytes(file.size)}` : ""} </p> <p class="text-base font-semibold text-slate-900"> ${file.name ?? "Download File"} </p> </div> </div> <span aria-hidden="true" class="text-slate-400 group-hover:text-lime-600">↓</span> </a>`;
    }
    if (block.__component === "content-blocks.article") {
      return renderTemplate`<a${addAttribute(block.external_link, "href")} target="_blank" rel="noopener noreferrer" class="group flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-sky-500"> <div class="flex items-center gap-4"> <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-700 text-white"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M14 3h7v7m0-7L10 14M5 5h6v2H7v10h10v-4h2v6H5z"></path> </svg> </span> <div> <p class="text-xs font-bold uppercase tracking-wider text-sky-700">External Article</p> <p class="text-base font-semibold text-slate-900">Read External Article</p> </div> </div> <span aria-hidden="true" class="text-slate-400 group-hover:text-sky-700">↗</span> </a>`;
    }
    return null;
  })} </section>`} </div> ` })}`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/pages/resources/[id].astro", void 0);

const $$file = "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/pages/resources/[id].astro";
const $$url = "/resources/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
