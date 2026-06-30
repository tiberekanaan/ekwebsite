import { c as createComponent } from './_astro_assets_wvPx3sBL.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, e as renderTemplate } from './server_COI8VqC6.mjs';
import 'clsx';

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

export { $$LanguageToggle as $, STRAPI_LOCALES as S, resolveLang as r };
