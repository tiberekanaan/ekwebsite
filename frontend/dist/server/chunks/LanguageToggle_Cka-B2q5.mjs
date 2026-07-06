import { c as createComponent } from './_astro_assets_CL3KYVc9.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, e as renderTemplate, q as renderSlot } from './server_D-XiJHcZ.mjs';
import 'clsx';

const $$PageHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PageHeader;
  const { title, description, eyebrow, backHref, backLabel } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header class="relative overflow-hidden bg-ek-900 bg-[radial-gradient(1200px_600px_at_75%_-10%,rgba(42,128,137,0.55),transparent_60%),linear-gradient(160deg,var(--color-ek-800)_0%,var(--color-ek-900)_70%)] pt-40 pb-16 text-white"> <svg class="pointer-events-none absolute -top-[10%] right-[-6%] z-0 w-[420px] opacity-[0.06]" viewBox="0 0 200 200" aria-hidden="true"> <path d="M100 20c-25 0-45 20-45 50s20 60 45 60 45-30 45-60-20-50-45-50z" fill="#aecb3a"></path> </svg> <div class="relative z-[2] mx-auto w-full max-w-7xl px-8"> ${backHref && renderTemplate`<a${addAttribute(backHref, "href")} class="mb-7 inline-flex items-center gap-1 text-sm font-semibold text-[#9fb9b4] transition-colors hover:text-ek-lime-bright" data-reveal>
← ${backLabel ?? "Back"} </a>`} ${eyebrow && renderTemplate`<p class="mb-4 font-condensed text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-ek-lime-bright" data-reveal> ${eyebrow} </p>`} <h1 class="max-w-4xl bg-gradient-to-br from-white via-white to-ek-lime-bright bg-clip-text font-serif text-4xl font-bold leading-[1.08] text-transparent sm:text-5xl lg:text-6xl" data-reveal data-reveal-delay="80"> ${title} </h1> <span class="mt-5 block h-1 w-16 rounded-full bg-gradient-to-r from-ek-lime to-ek-500" aria-hidden="true" data-reveal data-reveal-delay="120"></span> ${description && renderTemplate`<p class="mt-5 max-w-[38em] text-lg text-[#cfe0db]" data-reveal data-reveal-delay="160"> ${description} </p>`} ${renderSlot($$result, $$slots["default"])} </div> </header>`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/PageHeader.astro", void 0);

const STRAPI_LOCALES = {
  en: "en",
  kir: "en-KI"
};
const LANG_LABELS = {
  en: "English",
  kir: "Kiribati"
};
const resolveLang = (raw) => raw === "kir" ? "kir" : "en";

const $$LanguageToggle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$LanguageToggle;
  const { current, path } = Astro2.props;
  const options = [
    { code: "en", label: LANG_LABELS.en, href: path },
    { code: "kir", label: LANG_LABELS.kir, href: `${path}?lang=kir` }
  ];
  return renderTemplate`${maybeRenderHead()}<nav aria-label="Content language" class="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1"> ${options.map((option) => renderTemplate`<a${addAttribute(option.href, "href")}${addAttribute(option.code === current ? "true" : void 0, "aria-current")}${addAttribute([
    "rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-300",
    option.code === current ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:bg-white hover:text-slate-900"
  ], "class:list")}> ${option.label} </a>`)} </nav>`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/empower/LanguageToggle.astro", void 0);

export { $$PageHeader as $, STRAPI_LOCALES as S, $$LanguageToggle as a, resolveLang as r };
