import { c as createComponent, V as VALID_INPUT_FORMATS } from './_astro_assets_CL3KYVc9.mjs';
import 'piccolore';
import { n as generateCspDigest, s as spreadAttributes, u as unescapeHTML, e as renderTemplate, o as removeBase, i as isRemotePath, k as AstroError, U as UnknownContentCollectionError, c as renderComponent, m as maybeRenderHead, h as addAttribute } from './server_D-XiJHcZ.mjs';
import { $ as $$Layout } from './Layout_uAHwrxxZ.mjs';
import { r as resolveLang, S as STRAPI_LOCALES, $ as $$PageHeader, a as $$LanguageToggle } from './LanguageToggle_Cka-B2q5.mjs';
import 'html-escaper';
import { Traverse } from 'neotraverse/modern';
import * as z from 'zod/v4';
import 'clsx';
import * as devalue from 'devalue';
import { marked } from 'marked';
import { S as STRAPI_URL } from './server_B5dqAppw.mjs';

function createSvgComponent({ meta, attributes, children, styles }) {
  const hasStyles = styles.length > 0;
  const Component = createComponent({
    async factory(result, props) {
      const normalizedProps = normalizeProps(attributes, props);
      if (hasStyles && result.cspDestination) {
        for (const style of styles) {
          const hash = await generateCspDigest(style, result.cspAlgorithm);
          result._metadata.extraStyleHashes.push(hash);
        }
      }
      return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
    },
    propagation: hasStyles ? "self" : "none"
  });
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./_astro_data-layer-content_BX7ztGy8.mjs');
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

z.object({
  tags: z.array(z.string()).optional(),
  lastModified: z.date().optional()
});
function createGetCollection({
  liveCollections
}) {
  return async function getCollection(collection, filter) {
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
      });
    }
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./content-assets_DloNRoa4.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
  };
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  const copy = structuredClone(data);
  new Traverse(copy).forEach(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        if (imported.__svgData) {
          const { __svgData: svgData, ...meta } = imported;
          ctx.update(createSvgComponent({ meta, ...svgData }));
        } else {
          ctx.update(imported);
        }
      } else {
        ctx.update(src);
      }
    }
  });
  return copy;
}

// astro-head-inject

const liveCollections = {};

const getCollection = createGetCollection({
	liveCollections,
});

const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const lang = resolveLang(Astro2.url.searchParams.get("lang"));
  const projects = await getCollection("projects");
  const project = projects.find((entry) => entry.data.slug === slug);
  if (!project) return Astro2.rewrite("/404");
  const fetchLocalized = async (locale) => {
    try {
      const res = await fetch(
        `${STRAPI_URL}/api/projects/${project.id}?locale=${locale}&populate[localizations]=true`
      );
      if (!res.ok) return null;
      const { data } = await res.json();
      return data;
    } catch {
      return null;
    }
  };
  let localized = await fetchLocalized(STRAPI_LOCALES[lang]);
  if (!localized && lang !== "en") localized = await fetchLocalized(STRAPI_LOCALES.en);
  const { image, partners, testimonials } = project.data;
  const title = localized?.title ?? project.data.title;
  const description = localized?.description ?? project.data.description;
  const status = localized?.project_status ?? project.data.project_status;
  const objectives = localized?.objectives ?? project.data.objectives;
  const location = localized?.location ?? project.data.location;
  const metrics = localized?.metrics ?? project.data.metrics;
  const hasTranslation = (localized?.localizations ?? []).length > 0;
  const currentLang = localized?.locale === STRAPI_LOCALES.kir ? "kir" : "en";
  const allPartners = await getCollection("partners");
  const partnerById = new Map(allPartners.map((p) => [p.id, p.data]));
  const fixOrphanHeadings = (md) => md.replace(/^(#{1,6})[ \t]*\r?\n+(?=\S)/gm, "$1 ");
  const descriptionHtml = description ? marked.parse(fixOrphanHeadings(description)) : "";
  const objectivesHtml = objectives ? marked.parse(fixOrphanHeadings(objectives)) : "";
  const metricsHtml = metrics ? marked.parse(fixOrphanHeadings(metrics)) : "";
  const statusStyles = status === "completed" ? "border-teal-200 bg-teal-50 text-teal-800" : "border-lime-300 bg-lime-50 text-lime-800";
  const statusLabel = status === "completed" ? "Completed" : "On-going";
  const absoluteUrl = (url) => url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description ?? `${title} — an Empower Kiribati program.`, "floatingHeader": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHeader", $$PageHeader, { "eyebrow": "Program", "title": title, "backHref": "/our-programs", "backLabel": "Back to Programs" }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="mt-6 flex flex-wrap items-center gap-2.5" data-reveal data-reveal-delay="200"> ${status && renderTemplate`<span${addAttribute(`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider ${statusStyles}`, "class")}> <span aria-hidden="true" class="h-1.5 w-1.5 rounded-full bg-current"></span> ${statusLabel} </span>`} ${location && renderTemplate`<span class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700"> <svg aria-hidden="true" class="h-3.5 w-3.5 text-teal-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path> <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"></path> </svg> ${location} </span>`} ${hasTranslation && renderTemplate`${renderComponent($$result3, "LanguageToggle", $$LanguageToggle, { "current": currentLang, "path": Astro2.url.pathname })}`} </div> ` })} <section class="bg-white"> <div class="mx-auto max-w-7xl px-8 py-12"> <!-- Description + partners on the left, photo on the right --> <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-5 lg:gap-14"> <div class="lg:col-span-3" data-reveal> ${descriptionHtml && renderTemplate`<article class="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-a:text-teal-700 hover:prose-a:text-teal-900">${unescapeHTML(descriptionHtml)}</article>`} ${partners.length > 0 && renderTemplate`<div class="mt-8"> <p class="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
In partnership with
</p> <div class="flex flex-wrap items-center gap-2"> ${partners.map((partnerRef) => {
    const fullPartner = partnerById.get(partnerRef.documentId);
    return renderTemplate`<a${addAttribute(`/our-partners/${partnerRef.documentId}`, "href")} class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800"> ${fullPartner?.logo ? renderTemplate`<img${addAttribute(absoluteUrl(fullPartner.logo.url), "src")}${addAttribute(fullPartner.logo.alternativeText ?? partnerRef.name, "alt")} class="h-6 w-6 rounded-full object-contain" loading="lazy">` : renderTemplate`<span aria-hidden="true" class="h-6 w-6 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500"></span>`} <span>${partnerRef.name}</span> </a>`;
  })} </div> </div>`} </div> <figure class="lg:col-span-2" data-reveal> ${image ? renderTemplate`<img${addAttribute(absoluteUrl(image.url), "src")}${addAttribute(image.alternativeText ?? title, "alt")} class="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl shadow-slate-900/15 ring-1 ring-slate-900/5" loading="eager">` : renderTemplate`<div aria-hidden="true" class="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-600"></div>`} </figure> </div> ${objectivesHtml && renderTemplate`<section class="mt-16 rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50/70 to-white p-8 lg:p-12" data-reveal> <div class="grid grid-cols-1 gap-8 lg:grid-cols-3"> <div> <p class="mb-4 font-condensed text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-ek-olive">
Objectives
</p> <h2 class="bg-gradient-to-r from-ek-800 to-ek-500 bg-clip-text font-serif text-3xl font-bold tracking-tight text-transparent">
What this program sets out to do
</h2> <span class="mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-ek-lime to-ek-500" aria-hidden="true"></span> </div> <article class="prose prose-slate max-w-none lg:col-span-2 prose-headings:font-display prose-li:marker:text-teal-600 prose-a:text-teal-700 hover:prose-a:text-teal-900">${unescapeHTML(objectivesHtml)}</article> </div> </section>`} </div> </section> ${metricsHtml && renderTemplate`<section class="bg-ek-900 bg-[radial-gradient(1200px_600px_at_75%_-10%,rgba(42,128,137,0.35),transparent_60%)]"> <div class="mx-auto max-w-7xl px-8 py-16 lg:py-20" data-reveal> <p class="mb-4 font-condensed text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-ek-lime-bright">
Impact
</p> <h2 class="bg-gradient-to-br from-white via-white to-ek-lime-bright bg-clip-text font-serif text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
Key metrics &amp; results
</h2> <article class="prose mt-10 max-w-none columns-1 gap-12 text-slate-300 md:columns-2 [&>*]:break-inside-avoid [&_h2]:font-display [&_h2]:text-lime-300 [&_h3]:font-display [&_h3]:text-lg [&_h3]:uppercase [&_h3]:tracking-wider [&_h3]:text-lime-300 [&_h4]:text-lime-300 [&_p]:text-slate-300 [&_li]:text-slate-300 [&_li::marker]:text-lime-400 [&_strong]:text-white [&_a]:text-lime-300">${unescapeHTML(metricsHtml)}</article> </div> </section>`}${testimonials.length > 0 && renderTemplate`<section class="bg-white"> <div class="mx-auto max-w-7xl px-8 py-16 lg:py-20" data-reveal> <p class="mb-4 font-condensed text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-ek-olive">
Voices
</p> <h2 class="bg-gradient-to-r from-ek-800 to-ek-500 bg-clip-text font-serif text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
What people are saying
</h2> <ul class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"> ${testimonials.map((testimonial) => renderTemplate`<li class="flex h-full flex-col rounded-xl border border-slate-200 bg-slate-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-slate-900/10"> <svg aria-hidden="true" class="h-8 w-8 text-teal-600/40" fill="currentColor" viewBox="0 0 24 24"> <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"></path> </svg> <blockquote class="mt-4 flex-1 text-lg leading-relaxed text-slate-700">
“${testimonial.quote}”
</blockquote> <footer class="mt-6"> <p class="font-bold text-slate-900">${testimonial.author}</p> ${testimonial.role && renderTemplate`<p class="text-sm text-slate-500">${testimonial.role}</p>`} </footer> </li>`)} </ul> </div> </section>`}` })}`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/pages/projects/[slug].astro", void 0);

const $$file = "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/pages/projects/[slug].astro";
const $$url = "/projects/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
