import { c as createComponent, $ as $$Font, b as $$Image } from './_astro_assets_De93nOwO.mjs';
import 'piccolore';
import { q as createRenderInstruction, h as addAttribute, e as renderTemplate, u as unescapeHTML, m as maybeRenderHead, c as renderComponent, t as renderSlot, v as renderHead } from './server_B71wUxTc.mjs';
import { clsx } from 'clsx';
import { G as GOOGLE_SITE_VERIFICATION, B as BING_SITE_VERIFICATION, c as SITE_URL, S as STRAPI_URL } from './server_Cnanraoi.mjs';
import { twMerge } from 'tailwind-merge';
import 'react/jsx-runtime';
import 'react';
import 'react-dom';
import { cva } from 'class-variance-authority';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const siteConfig = {
  name: "Empower Kiribati",
  description: "Empower Kiribati — building skills, partnerships, and digital participation for communities across Kiribati",
  url: SITE_URL,
  phone: "+1 (555) 123-4567",
  socialLinks: [
    "https://github.com/southwellmedia"
  ],
  // Twitter metadata - update with your actual handles or remove
  // twitter: {
  //   site: '@yourhandle',
  //   creator: '@yourhandle',
  // },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
    bing: BING_SITE_VERIFICATION
  },
  // Branding: Logo files live in src/assets/branding/
  // Replace the SVG files there with your own branding
  branding: {
    favicon: {
      href: "/favicon.webp",
      type: "image/webp"
    },
    colors: {
      themeColor: "#F94C10"}
  }
};

const $$SEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SEO;
  const {
    title,
    siteName = siteConfig.name,
    description = siteConfig.description,
    image,
    imageAlt,
    article,
    noindex = false,
    nofollow = false
  } = Astro2.props;
  const pageTitle = title && title !== siteName ? `${title} — ${siteName}` : siteName;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  let ogImage;
  if (image) {
    ogImage = image.startsWith("http") ? image : new URL(image, Astro2.site).toString();
  } else {
    const pathname = Astro2.url.pathname.replace(/^\/|\/$/g, "") || "index";
    ogImage = new URL(`/og/${pathname}.png`, Astro2.site).toString();
  }
  const robotsContent = [noindex ? "noindex" : "index", nofollow ? "nofollow" : "follow"].join(", ");
  const localeMap = {
    en: "en_US",
    fr: "fr_FR",
    de: "de_DE",
    es: "es_ES",
    it: "it_IT",
    pt: "pt_BR",
    nl: "nl_NL",
    ja: "ja_JP",
    ko: "ko_KR",
    zh: "zh_CN",
    ru: "ru_RU",
    ar: "ar_SA",
    hi: "hi_IN",
    pl: "pl_PL",
    sv: "sv_SE"
  };
  const rawLocale = Astro2.currentLocale || "en_US";
  const locale = rawLocale.includes("_") || rawLocale.includes("-") ? rawLocale.replace("-", "_") : localeMap[rawLocale] || `${rawLocale}_${rawLocale.toUpperCase()}`;
  const isGeneratedOgImage = !image;
  const extToMime = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml"
  };
  function getImageType(url) {
    const ext = url.match(/(\.\w+)(?:\?|$)/)?.[1]?.toLowerCase();
    return ext ? extToMime[ext] : void 0;
  }
  const ogImageType = isGeneratedOgImage ? "image/png" : getImageType(ogImage);
  return renderTemplate`<!-- Primary Meta Tags --><title>${pageTitle}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonicalURL.toString(), "href")}><meta name="robots"${addAttribute(robotsContent, "content")}><!-- Open Graph --><meta property="og:title"${addAttribute(pageTitle, "content")}><meta property="og:type"${addAttribute(article ? "article" : "website", "content")}><meta property="og:image"${addAttribute(ogImage, "content")}><meta property="og:url"${addAttribute(canonicalURL.toString(), "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:site_name"${addAttribute(siteName, "content")}><meta property="og:locale"${addAttribute(locale, "content")}><meta property="og:image:alt"${addAttribute(imageAlt || pageTitle, "content")}>${isGeneratedOgImage && renderTemplate`<meta property="og:image:width" content="1200">`}${isGeneratedOgImage && renderTemplate`<meta property="og:image:height" content="630">`}${ogImageType && renderTemplate`<meta property="og:image:type"${addAttribute(ogImageType, "content")}>`}<!-- Article Metadata -->${article?.publishedTime && renderTemplate`<meta property="article:published_time"${addAttribute(article.publishedTime.toISOString(), "content")}>`}${article?.modifiedTime && renderTemplate`<meta property="article:modified_time"${addAttribute(article.modifiedTime.toISOString(), "content")}>`}${article?.authors?.map((author) => renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`)}${article?.tags?.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`)}<!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(pageTitle, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(ogImage, "content")}>${siteConfig.twitter?.site && renderTemplate`<meta name="twitter:site"${addAttribute(siteConfig.twitter.site, "content")}>`}${siteConfig.twitter?.creator && renderTemplate`<meta name="twitter:creator"${addAttribute(siteConfig.twitter.creator, "content")}>`}<!-- Verification -->${siteConfig.verification?.google}${siteConfig.verification?.bing}`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/seo/SEO.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$JsonLd = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$JsonLd;
  const { schema } = Astro2.props;
  const schemas = Array.isArray(schema) ? schema : [schema];
  return renderTemplate`${schemas.map((s) => renderTemplate(_a$1 || (_a$1 = __template$1(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(s, null, 0))))}`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/seo/JsonLd.astro", void 0);

const PUBLIC_CONSENT_ENABLED = false;

const consentConfig = {
  /** Bump to force re-consent when categories change */
  version: 1,
  /** 'consent_mode_v2' = scripts load with denied defaults, cookieless pings
   *  'strict' = scripts fully blocked until consent granted */
  mode: "consent_mode_v2",
  /** localStorage key for stored preferences */
  storageKey: "velocity-consent",
  categories: {
    necessary: {
      label: "Necessary",
      description: "Essential cookies required for the website to function. These cannot be disabled.",
      required: true,
      defaultEnabled: true,
      gcmTypes: ["security_storage"]
    },
    analytics: {
      label: "Analytics",
      description: "Help us understand how visitors interact with the website by collecting anonymous usage data.",
      required: false,
      defaultEnabled: false,
      gcmTypes: ["analytics_storage"]
    },
    marketing: {
      label: "Marketing",
      description: "Used to deliver relevant ads and track ad campaign performance across websites.",
      required: false,
      defaultEnabled: false,
      gcmTypes: ["ad_storage", "ad_user_data", "ad_personalization"]
    },
    preferences: {
      label: "Preferences",
      description: "Allow the website to remember choices you make, such as language or region.",
      required: false,
      defaultEnabled: false,
      gcmTypes: ["functionality_storage", "personalization_storage"]
    }
  },
  ui: {
    heading: "Cookie Preferences",
    description: "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.",
    acceptAll: "Accept All",
    declineAll: "Decline All",
    customize: "Customize",
    savePreferences: "Save Preferences",
    settingsHeading: "Privacy Settings",
    alwaysOnLabel: "Always on",
    privacyPolicyLabel: "Privacy Policy"
  },
  /** Milliseconds before banner slides in */
  showDelay: 500
};

const $$Analytics = createComponent(($$result, $$props, $$slots) => {
  const consentEnabled = PUBLIC_CONSENT_ENABLED;
  consentConfig.mode;
  const storageKey = consentConfig.storageKey;
  const configVersion = consentConfig.version;
  const gcmDefaults = {};
  for (const [, cat] of Object.entries(consentConfig.categories)) {
    for (const gcmType of cat.gcmTypes) {
      gcmDefaults[gcmType] = cat.defaultEnabled ? "granted" : "denied";
    }
  }
  const categoryDefaults = {};
  for (const [key, cat] of Object.entries(consentConfig.categories)) {
    categoryDefaults[key] = cat.required || cat.defaultEnabled;
  }
  const categoryGcmMap = {};
  for (const [key, cat] of Object.entries(consentConfig.categories)) {
    categoryGcmMap[key] = cat.gcmTypes;
  }
  let analyticsCategoryKey = "analytics";
  for (const [key, cat] of Object.entries(consentConfig.categories)) {
    if (cat.gcmTypes.includes("analytics_storage")) {
      analyticsCategoryKey = key;
      break;
    }
  }
  const hasGtm = false;
  const hasGa = false;
  const hasAnalytics = false;
  const isV2 = consentEnabled;
  const isStrict = consentEnabled;
  JSON.stringify({
    gtmId: null,
    gaId: null,
    storageKey,
    configVersion,
    gcmDefaults,
    categoryDefaults,
    categoryGcmMap,
    analyticsCategoryKey
  });
  return renderTemplate`${hasAnalytics}${hasGtm}${hasGa}${consentEnabled}${isV2}${isV2}${isStrict}${isStrict}${isStrict}${isStrict}`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/layout/Analytics.astro", void 0);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Icon;
  const { name, size = "md", class: className, strokeWidth = 2 } = Astro2.props;
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };
  const icons = {
    // Navigation
    menu: "M4 6h16M4 12h16M4 18h16",
    x: "M18 6L6 18M6 6l12 12",
    "chevron-down": "M6 9l6 6 6-6",
    "chevron-right": "M9 18l6-6-6-6",
    "chevron-left": "M15 18l-6-6 6-6",
    "arrow-right": "M5 12h14M12 5l7 7-7 7",
    "arrow-left": "M19 12H5M12 19l-7-7 7-7",
    "arrow-up-right": "M7 17L17 7M7 7h10v10",
    "external-link": "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3",
    // Actions
    search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    plus: "M12 5v14M5 12h14",
    minus: "M5 12h14",
    check: "M20 6L9 17l-5-5",
    copy: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 2h6v4H9V2",
    download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
    upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
    eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    "eye-off": "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22",
    edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
    trash: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6",
    share: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13",
    archive: "M21 8v13H3V8M1 3h22v5H1zM10 12h4",
    // Theme
    sun: "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0z",
    moon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
    monitor: "M20 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8 21h8M12 17v4",
    // Communication
    mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
    phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
    "map-pin": "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    // Social
    github: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
    twitter: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
    linkedin: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
    // Content
    "file-text": "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
    book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
    image: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21",
    // Features
    zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    box: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12",
    layout: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM3 9h18M9 21V9",
    globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
    layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
    terminal: "M4 17l6-6-6-6M12 19h8",
    palette: "M12 2a10 10 0 0 0 0 20c.6 0 1 .4 1 1v-2a2 2 0 0 1 2-2h2c.6 0 1-.4 1-1 0-2.5-2-4.5-4.5-4.5H12a7 7 0 1 1 0-14M5 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
    settings: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    users: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM20 8v6M23 11h-6",
    heart: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    // Trends
    "trending-up": "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
    "trending-down": "M23 18l-9.5-9.5-5 5L1 6M17 18h6v-6",
    // Misc
    inbox: "M22 12h-6l-2 3H10l-2-3H2M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
    "toggle-left": "M16 5H8a7 7 0 1 0 0 14h8a7 7 0 1 0 0-14zM8 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    table: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
    // Status
    "alert-circle": "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 8v4M12 16h.01",
    "alert-triangle": "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
    "check-circle": "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3",
    "x-circle": "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM15 9l-6 6M9 9l6 6",
    info: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 16v-4M12 8h.01",
    loader: "M21 12a9 9 0 1 1-6.219-8.56",
    // Brand icons (from Simple Icons - filled, not stroked)
    "brand-astro": "M8.358 20.162c-1.186-1.07-1.532-3.316-1.038-4.944.856 1.026 2.043 1.352 3.272 1.535 1.897.283 3.76.177 5.522-.678.202-.098.388-.229.608-.36.166.473.209.95.151 1.437-.14 1.185-.738 2.1-1.688 2.794-.38.277-.782.525-1.175.787-1.205.804-1.531 1.747-1.078 3.119l.044.148a3.158 3.158 0 0 1-1.407-1.188 3.31 3.31 0 0 1-.544-1.815c-.004-.32-.004-.642-.048-.958-.106-.769-.472-1.113-1.161-1.133-.707-.02-1.267.411-1.415 1.09-.012.053-.028.104-.045.165h.002zm-5.961-4.445s3.24-1.575 6.49-1.575l2.451-7.565c.092-.366.36-.614.662-.614.302 0 .57.248.662.614l2.45 7.565c3.85 0 6.491 1.575 6.491 1.575L16.088.727C15.93.285 15.663 0 15.303 0H8.697c-.36 0-.615.285-.784.727l-5.516 14.99z",
    "brand-tailwind": "M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C10.337,13.382,8.976,12,6.001,12z",
    "brand-typescript": "M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z",
    "brand-react": "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"
  };
  const brandIcons = ["brand-astro", "brand-tailwind", "brand-typescript", "brand-react"];
  const iconPath = icons[name] || icons["x"];
  const isBrand = brandIcons.includes(name);
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"${addAttribute(isBrand ? "currentColor" : "none", "fill")}${addAttribute(isBrand ? "none" : "currentColor", "stroke")}${addAttribute(isBrand ? 0 : strokeWidth, "stroke-width")} stroke-linecap="round" stroke-linejoin="round"${addAttribute(cn(sizes[size], "shrink-0", className), "class")} aria-hidden="true"> ${isBrand ? renderTemplate`<path${addAttribute(iconPath, "d")}></path>` : iconPath.split("M").filter(Boolean).map((d) => renderTemplate`<path${addAttribute(`M${d}`, "d")}></path>`)} </svg>`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/ui/primitives/Icon/Icon.astro", void 0);

const $$Dialog = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Dialog;
  const { id, title, description, size = "md", class: className } = Astro2.props;
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  };
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(id, "id")} class="fixed inset-0 z-50 hidden" role="dialog" aria-modal="true"${addAttribute(title ? `${id}-title` : void 0, "aria-labelledby")}${addAttribute(description ? `${id}-description` : void 0, "aria-describedby")} data-dialog> <!-- Backdrop --> <div class="fixed inset-0 bg-foreground/50 backdrop-blur-sm opacity-0 transition-opacity duration-200" data-dialog-backdrop aria-hidden="true"></div> <!-- Dialog Panel --> <div class="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto"> <div${addAttribute(cn(
    "relative w-full",
    sizes[size],
    "bg-background rounded-xl border border-border shadow-xl",
    "scale-95 opacity-0 transition-all duration-200",
    className
  ), "class")} data-dialog-panel> <!-- Close Button --> <button type="button"${addAttribute(cn(
    "absolute top-4 right-4",
    "text-foreground-muted hover:text-foreground",
    "transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
  ), "class")} data-dialog-close aria-label="Close dialog"> ${renderComponent($$result, "Icon", $$Icon, { "name": "x", "class": "w-5 h-5" })} </button> <!-- Header --> ${(title || description) && renderTemplate`<div class="p-6 pb-0"> ${title && renderTemplate`<h2${addAttribute(`${id}-title`, "id")} class="text-lg font-semibold text-foreground pr-8"> ${title} </h2>`} ${description && renderTemplate`<p${addAttribute(`${id}-description`, "id")} class="mt-1 text-sm text-foreground-muted"> ${description} </p>`} </div>`} <!-- Content --> <div class="p-6"> ${renderSlot($$result, $$slots["default"])} </div> <!-- Footer (optional) --> ${renderSlot($$result, $$slots["footer"])} </div> </div> </div> ${renderScript($$result, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/ui/overlay/Dialog/Dialog.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/ui/overlay/Dialog/Dialog.astro", void 0);

function generateId(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
function isExternalUrl(url) {
  return url.startsWith("http://") || url.startsWith("https://");
}

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium rounded-md",
    "transition-all duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0"
  ],
  {
    variants: {
      variant: {
        primary: "bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98]",
        secondary: "bg-secondary text-secondary-foreground border border-border hover:bg-secondary-hover hover:border-border-strong active:scale-[0.98]",
        outline: "border border-border bg-transparent text-foreground hover:bg-secondary hover:border-border-strong active:scale-[0.98]",
        ghost: "text-foreground-secondary hover:text-foreground hover:bg-secondary active:scale-[0.98]",
        link: "text-foreground-secondary hover:text-foreground underline-offset-4 hover:underline",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98]"
      },
      size: {
        sm: "h-8 px-3 text-xs [&_svg]:h-4 [&_svg]:w-4",
        md: "h-10 px-4 text-sm [&_svg]:h-5 [&_svg]:w-5",
        lg: "h-12 px-5 text-base [&_svg]:h-5 [&_svg]:w-5"
      },
      fullWidth: {
        true: "w-full"
      },
      icon: {
        true: "rounded-md"
      }
    },
    compoundVariants: [
      { icon: true, size: "sm", class: "h-8 w-8 px-0" },
      { icon: true, size: "md", class: "h-10 w-10 px-0" },
      { icon: true, size: "lg", class: "h-12 w-12 px-0" }
    ],
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Button;
  const {
    variant = "primary",
    size = "md",
    loading = false,
    fullWidth = false,
    href,
    target,
    icon = false,
    class: className,
    disabled,
    ...attrs
  } = Astro2.props;
  const isExternal = href ? isExternalUrl(href) : false;
  const linkTarget = target ?? (isExternal ? "_blank" : void 0);
  const linkRel = isExternal ? "noopener noreferrer" : void 0;
  const Element = href ? "a" : "button";
  const isDisabled = disabled || loading;
  const isDisabledLink = href && isDisabled;
  const classes = cn(
    buttonVariants({ variant, size, fullWidth, icon }),
    isDisabledLink && "pointer-events-none",
    className
  );
  return renderTemplate`${renderComponent($$result, "Element", Element, { "class": classes, "disabled": !href ? isDisabled : void 0, "href": isDisabledLink ? void 0 : href, "target": isDisabledLink ? void 0 : linkTarget, "rel": isDisabledLink ? void 0 : linkRel, "aria-disabled": isDisabledLink ? "true" : void 0, "tabindex": isDisabledLink ? "-1" : void 0, ...attrs }, { "default": ($$result2) => renderTemplate`${loading ? renderTemplate`${maybeRenderHead()}<svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"> <path d="M21 12a9 9 0 1 1-6.219-8.56"></path> </svg>` : null}${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/ui/form/Button/Button.astro", void 0);

const $$Switch = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Switch;
  const {
    label,
    description,
    size = "md",
    checked = false,
    disabled = false,
    name,
    value,
    class: className,
    id
  } = Astro2.props;
  const switchId = id || generateId("switch");
  const trackSizes = {
    sm: "h-5 w-9",
    md: "h-6 w-11",
    lg: "h-7 w-[3.25rem]"
  };
  const thumbSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(cn("flex items-start gap-3", className), "class")} data-astro-cid-nmoqar4j> <label${addAttribute(switchId, "for")}${addAttribute(cn(
    "relative inline-flex shrink-0 cursor-pointer items-center",
    disabled && "cursor-not-allowed opacity-50"
  ), "class")} data-astro-cid-nmoqar4j> <input type="checkbox"${addAttribute(switchId, "id")} class="peer sr-only"${addAttribute(checked, "checked")}${addAttribute(disabled, "disabled")}${addAttribute(name, "name")}${addAttribute(value, "value")} role="switch"${addAttribute(checked ? "true" : "false", "aria-checked")}${addAttribute(description ? `${switchId}-description` : void 0, "aria-describedby")} data-astro-cid-nmoqar4j> <!-- Track --> <div${addAttribute(cn(
    "rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
    "bg-border-strong peer-checked:bg-foreground",
    "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
    trackSizes[size]
  ), "class")} data-astro-cid-nmoqar4j> <!-- Thumb --> <div${addAttribute(cn(
    "rounded-full bg-background shadow-sm transition-transform duration-200 ease-in-out",
    "translate-x-0",
    thumbSizes[size]
  ), "class")} data-thumb${addAttribute(size, "data-size")} data-astro-cid-nmoqar4j></div> </div> </label> ${(label || description) && renderTemplate`<div class="grid gap-0.5" data-astro-cid-nmoqar4j> ${label && renderTemplate`<label${addAttribute(switchId, "for")}${addAttribute(cn("text-sm font-medium text-foreground cursor-pointer", disabled && "cursor-not-allowed"), "class")} data-astro-cid-nmoqar4j> ${label} </label>`} ${description && renderTemplate`<p${addAttribute(`${switchId}-description`, "id")} class="text-xs text-foreground-subtle leading-normal" data-astro-cid-nmoqar4j>${description}</p>`} </div>`} </div>  ${renderScript($$result, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/ui/form/Switch/Switch.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/ui/form/Switch/Switch.astro", void 0);

cva(
  [
    "relative inline-flex shrink-0 cursor-pointer rounded-full",
    "border-2 border-transparent",
    "transition-colors duration-200 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50"
  ],
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-[3.25rem]"
      },
      checked: {
        true: "bg-foreground",
        false: "bg-border-strong"
      }
    },
    defaultVariants: {
      size: "md",
      checked: false
    }
  }
);
cva(
  [
    "pointer-events-none inline-block rounded-full bg-background shadow-sm",
    "ring-0 transition-transform duration-200 ease-in-out"
  ],
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6"
      },
      checked: {
        true: "",
        false: "translate-x-0"
      }
    },
    compoundVariants: [
      { checked: true, size: "sm", class: "translate-x-4" },
      { checked: true, size: "md", class: "translate-x-5" },
      { checked: true, size: "lg", class: "translate-x-6" }
    ],
    defaultVariants: {
      size: "md",
      checked: false
    }
  }
);

const $$ConsentBanner = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ConsentBanner;
  const {
    position = "bottom",
    ui: uiOverrides,
    alwaysOnLabel: alwaysOnLabelProp,
    class: className
  } = Astro2.props;
  const consentEnabled = PUBLIC_CONSENT_ENABLED;
  ({ ...consentConfig.ui, ...uiOverrides });
  const categoryGcmMap = {};
  for (const [key, cat] of Object.entries(consentConfig.categories)) {
    categoryGcmMap[key] = cat.gcmTypes;
  }
  JSON.stringify(categoryGcmMap);
  JSON.stringify(consentConfig);
  return renderTemplate`${consentEnabled}`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/ui/overlay/ConsentBanner/ConsentBanner.astro", void 0);

const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/node_modules/astro/components/ClientRouter.astro", void 0);

function createWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`
      },
      "query-input": {
        "@type": "PropertyValueSpecification",
        valueRequired: true,
        valueName: "search_term_string"
      }
    }
  };
}
function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: siteConfig.socialLinks,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer service"
    } 
  };
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title,
    description,
    image,
    imageAlt,
    article,
    noindex = false,
    nofollow = false,
    includeOrgSchema = false,
    siteName,
    favicon
  } = Astro2.props;
  const schemas = [createWebsiteSchema()];
  if (includeOrgSchema) {
    schemas.push(createOrganizationSchema());
  }
  return renderTemplate(_a || (_a = __template(['<html lang="en" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"', '><!-- Favicon --><link rel="icon"', "", '><link rel="manifest" href="/manifest.webmanifest"><meta name="theme-color"', "><!-- Fonts (Astro Fonts API: emits @font-face + preload, self-hosted) -->", "", "", "", "<!-- SEO -->", '<!-- RSS Feed --><link rel="alternate" type="application/rss+xml"', ' href="/rss.xml"><!-- JSON-LD Structured Data -->', "<!-- Analytics (loads if PUBLIC_GA_MEASUREMENT_ID or PUBLIC_GTM_ID is set) -->", "<!-- Client-side routing for view transitions -->", "<!-- Theme script (runs before render to prevent flash) --><script>\n      (function () {\n        const theme = localStorage.getItem('theme');\n        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;\n\n        if (theme === 'dark' || (!theme && systemDark)) {\n          document.documentElement.classList.add('dark');\n        } else {\n          document.documentElement.classList.remove('dark');\n        }\n      })();\n    <\/script>", '</head> <body class="font-sans flex min-h-screen flex-col bg-background text-foreground antialiased"> <!-- Skip to content link --> <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">\nSkip to content\n</a> ', ' <main id="main-content" class="flex-1" data-pagefind-body> ', " </main> ", " ", " </body></html>"])), addAttribute(Astro2.generator, "content"), addAttribute(favicon?.type ?? siteConfig.branding.favicon.type, "type"), addAttribute(favicon?.href ?? siteConfig.branding.favicon.href, "href"), addAttribute(siteConfig.branding.colors.themeColor, "content"), renderComponent($$result, "Font", $$Font, { "cssVariable": "--font-inter", "preload": true }), renderComponent($$result, "Font", $$Font, { "cssVariable": "--font-ubuntu", "preload": true }), renderComponent($$result, "Font", $$Font, { "cssVariable": "--font-saira", "preload": true }), renderComponent($$result, "Font", $$Font, { "cssVariable": "--font-playfair", "preload": true }), renderComponent($$result, "SEO", $$SEO, { "title": title, "siteName": siteName, "description": description, "image": image, "imageAlt": imageAlt, "article": article, "noindex": noindex, "nofollow": nofollow }), addAttribute(`${siteConfig.name} RSS Feed`, "title"), renderComponent($$result, "JsonLd", $$JsonLd, { "schema": schemas }), renderComponent($$result, "Analytics", $$Analytics, {}), renderComponent($$result, "ClientRouter", $$ClientRouter, {}), renderHead(), renderSlot($$result, $$slots["header"]), renderSlot($$result, $$slots["default"]), renderSlot($$result, $$slots["footer"]), renderComponent($$result, "ConsentBanner", $$ConsentBanner, {}));
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/layouts/BaseLayout.astro", void 0);

const logoFullColor = new Proxy({"src":"/_astro/empower-logo-full.HCEy9XcC.webp","width":3000,"height":1637,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/assets/branding/empower-logo-full.webp";
							}
							
							return target[name];
						}
					});

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Header;
  const { floating = false, logo, links } = Astro2.props;
  const defaultNav = [
    { label: "About", href: "/about" },
    { label: "Our Work", href: "/#our-work" },
    { label: "Resources", href: "/resources" },
    { label: "Blog", href: "/blog" },
    { label: "Events", href: "/events" },
    { label: "Contact", href: "/contact" }
  ];
  const nav = links && links.length > 0 ? links.map((link) => ({ label: link.label, href: link.url })) : defaultNav;
  const currentPath = Astro2.url.pathname;
  const isActive = (href) => {
    if (href.startsWith("#") || href.startsWith("/#")) return false;
    if (href === "/") return currentPath === "/";
    return currentPath === href || currentPath.startsWith(`${href}/`);
  };
  return renderTemplate`${maybeRenderHead()}<header${addAttribute([
    floating ? "absolute inset-x-0 top-6 z-50 mx-auto w-[96%] max-w-[1600px] rounded-xl bg-white px-8 py-4 shadow-md" : "sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur"
  ], "class:list")}> <div${addAttribute(["flex items-center justify-between", !floating && "mx-auto max-w-7xl px-6 py-3"], "class:list")}> <a href="/" class="inline-flex items-center transition-transform duration-300 hover:scale-[1.03]" aria-label="Empower Kiribati home"> ${logo ? renderTemplate`<img${addAttribute(logo.url, "src")}${addAttribute(logo.alternativeText || "Empower Kiribati", "alt")} class="h-12 w-auto sm:h-14" loading="eager">` : renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": logoFullColor, "alt": "Empower Kiribati", "height": 56, "widths": [144, 216, 288], "sizes": "(min-width: 1024px) 216px, 168px", "class": "h-12 w-auto sm:h-14", "loading": "eager" })}`} </a> <nav class="hidden items-center gap-8 md:flex" aria-label="Primary"> ${nav.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(isActive(item.href) ? "page" : void 0, "aria-current")}${addAttribute([
    "relative font-serif text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-lime-400 after:transition-transform after:duration-300 hover:after:scale-x-100",
    isActive(item.href) ? "text-slate-900 after:scale-x-100" : "text-slate-700 hover:text-slate-900"
  ], "class:list")}> ${item.label} </a>`)} </nav> <div class="flex items-center gap-3"> <button type="button" data-search-open class="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900" aria-label="Search the site"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"></path> </svg> </button> <a href="/our-programs" class="hidden rounded-full bg-lime-300 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-lime-400 hover:shadow-md hover:shadow-lime-400/40 sm:inline-flex">
Build your skills
</a> <button type="button" class="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden" aria-controls="empower-mobile-nav" aria-expanded="false" data-mobile-toggle> <span class="sr-only">Open menu</span> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> </div> <div id="empower-mobile-nav"${addAttribute(["hidden border-t border-slate-200 bg-white md:hidden", floating && "rounded-b-3xl"], "class:list")}> <nav class="flex flex-col gap-1 px-6 py-4" aria-label="Mobile"> ${nav.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="rounded-md px-3 py-2 font-serif text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"> ${item.label} </a>`)} <a href="/our-programs" class="mt-2 inline-flex w-full items-center justify-center rounded-full bg-lime-300 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-lime-400 sm:hidden">
Build your skills
</a> </nav> </div> </header> ${renderScript($$result, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/empower/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/empower/Header.astro", void 0);

const logoWhite = new Proxy({"src":"/_astro/empower-logo-white.B1Cb_FQE.webp","width":3000,"height":1637,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/assets/branding/empower-logo-white.webp";
							}
							
							return target[name];
						}
					});

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const primaryNav = [
    { label: "About", href: "/about" },
    { label: "Our Work", href: "/#our-work" },
    { label: "Resources", href: "/resources" },
    { label: "Blog", href: "/blog" },
    { label: "Events", href: "/events" },
    { label: "Contact", href: "/contact" }
  ];
  const socials = [
    {
      label: "Facebook",
      href: "https://facebook.com/empowerkiribati",
      icon: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z"
    },
    {
      label: "YouTube",
      href: "https://youtube.com/@empowerkiribati",
      icon: "M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31.4 31.4 0 0 0 .5 12 31.4 31.4 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1c.4-1.5.5-4.5.5-4.5s-.1-3-.5-4.5ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z"
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/empowerkiribati",
      icon: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.1c.5-1 1.9-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9.5Z"
    }
  ];
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="border-t border-slate-200 bg-slate-900 text-slate-200"> <div class="mx-auto max-w-7xl px-6 py-12"> <div class="grid gap-10 lg:grid-cols-[1.2fr_1fr_1.3fr] lg:items-start"> <div class="max-w-sm"> <a href="/" class="inline-flex items-center transition-transform duration-300 hover:scale-[1.03]" aria-label="Empower Kiribati home"> ${renderComponent($$result, "Image", $$Image, { "src": logoWhite, "alt": "Empower Kiribati", "height": 56, "widths": [140, 200, 260], "sizes": "(min-width: 1024px) 200px, 160px", "class": "h-12 w-auto sm:h-14", "loading": "lazy" })} </a> <p class="mt-4 text-sm text-slate-400">
A Kiribati-led NGO building a self-sustaining ecosystem of digital trust and economic
          opportunity by 2030 — built by I-Kiribati, for I-Kiribati.
</p> <ul class="mt-6 flex items-center gap-3" aria-label="Social media"> ${socials.map((s) => renderTemplate`<li> <a${addAttribute(s.href, "href")} target="_blank" rel="noopener noreferrer"${addAttribute(s.label, "aria-label")} class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:bg-lime-300 hover:text-slate-900"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"> <path${addAttribute(s.icon, "d")}></path> </svg> </a> </li>`)} </ul> </div> <nav class="grid grid-cols-2 gap-x-10 gap-y-3" aria-label="Footer"> ${primaryNav.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="text-sm font-medium text-slate-300 transition-colors hover:text-lime-300"> ${item.label} </a>`)} </nav> <div> <h2 class="text-sm font-bold uppercase tracking-widest text-white">Stay in the loop</h2> <p class="mt-2 text-sm text-slate-400">
Get programme updates, partner stories, and event invites from the team.
</p> <form class="mt-4 flex flex-col gap-2 sm:flex-row" name="newsletter" data-newsletter-form> <label for="newsletter-email" class="sr-only">Email address</label> <input id="newsletter-email" type="email" name="email" required placeholder="you@example.com" class="w-full rounded-full border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300/40"> <button type="submit" class="inline-flex items-center justify-center rounded-full bg-lime-300 px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-lime-400">
Subscribe
</button> </form> <p data-newsletter-message class="mt-2 hidden text-xs text-lime-300" role="status"></p> </div> </div> <div class="mt-10 flex flex-col gap-3 border-t border-slate-700 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between"> <p>&copy; ${year} Empower Kiribati. All rights reserved.</p> <p class="font-medium uppercase tracking-widest text-teal-300">Mauri from Kiribati</p> </div> </div> </footer> ${renderScript($$result, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/empower/Footer.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/empower/Footer.astro", void 0);

const $$Motion = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<noscript><style>
    [data-reveal] {
      opacity: 1;
      transform: none;
      transition: none;
    }
  </style></noscript>${renderScript($$result, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/empower/Motion.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/empower/Motion.astro", void 0);

const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="search-modal" class="fixed inset-0 z-[100] hidden items-start justify-center bg-slate-900/60 px-4 pt-24 backdrop-blur-sm sm:pt-32" role="dialog" aria-modal="true" aria-label="Site search"> <div class="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200" data-search-panel> <div class="flex items-center justify-between border-b border-slate-100 px-5 py-3"> <span class="text-xs font-bold uppercase tracking-widest text-slate-500">Search</span> <button type="button" data-search-close class="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900" aria-label="Close search"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path> </svg> </button> </div> <div class="max-h-[70vh] overflow-y-auto p-5"> <div id="pagefind-search"></div> </div> </div> </div> ${renderScript($$result, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/empower/Search.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/empower/Search.astro", void 0);

const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description,
    image,
    imageAlt,
    article,
    noindex,
    nofollow,
    includeOrgSchema,
    floatingHeader = false
  } = Astro2.props;
  let global = null;
  try {
    const res = await fetch(`${STRAPI_URL}/api/global?populate=*`);
    if (res.ok) {
      const { data } = await res.json();
      global = data;
    }
  } catch {
    global = null;
  }
  const absoluteUrl = (path) => path ? path.startsWith("http") ? path : `${STRAPI_URL}${path}` : void 0;
  const favicon = global?.favicon?.url !== void 0 ? { href: absoluteUrl(global.favicon.url), type: global.favicon.mime } : void 0;
  const logo = global?.logo?.url ? { url: absoluteUrl(global.logo.url), alternativeText: global.logo.alternativeText } : void 0;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "image": image, "imageAlt": imageAlt, "article": article, "noindex": noindex, "nofollow": nofollow, "includeOrgSchema": includeOrgSchema, "siteName": global?.siteName ?? void 0, "favicon": favicon }, { "default": async ($$result2) => renderTemplate`  ${renderSlot($$result2, $$slots["default"])}  ${renderComponent($$result2, "Search", $$Search, {})} ${renderComponent($$result2, "Motion", $$Motion, {})} `, "footer": async ($$result2) => renderTemplate`${renderComponent($$result2, "Footer", $$Footer, { "slot": "footer" })}`, "header": async ($$result2) => renderTemplate`${renderComponent($$result2, "Header", $$Header, { "slot": "header", "floating": floatingHeader, "logo": logo, "links": global?.navbarLinks ?? void 0 })}` })}`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/layouts/Layout.astro", void 0);

const $$PageHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PageHeader;
  const { title, description, eyebrow, backHref, backLabel } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header class="relative overflow-hidden bg-ek-900 bg-[radial-gradient(1200px_600px_at_75%_-10%,rgba(42,128,137,0.55),transparent_60%),linear-gradient(160deg,var(--color-ek-800)_0%,var(--color-ek-900)_70%)] pt-40 pb-16 text-white"> <svg class="pointer-events-none absolute -top-[10%] right-[-6%] z-0 w-[420px] opacity-[0.06]" viewBox="0 0 200 200" aria-hidden="true"> <path d="M100 20c-25 0-45 20-45 50s20 60 45 60 45-30 45-60-20-50-45-50z" fill="#aecb3a"></path> </svg> <div class="relative z-[2] mx-auto w-full max-w-7xl px-8"> ${backHref && renderTemplate`<a${addAttribute(backHref, "href")} class="mb-7 inline-flex items-center gap-1 text-sm font-semibold text-[#9fb9b4] transition-colors hover:text-ek-lime-bright" data-reveal>
← ${backLabel ?? "Back"} </a>`} ${eyebrow && renderTemplate`<p class="mb-4 font-condensed text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-ek-lime-bright" data-reveal> ${eyebrow} </p>`} <h1 class="max-w-4xl bg-gradient-to-br from-white via-white to-ek-lime-bright bg-clip-text font-serif text-4xl font-bold leading-[1.08] text-transparent sm:text-5xl lg:text-6xl" data-reveal data-reveal-delay="80"> ${title} </h1> <span class="mt-5 block h-1 w-16 rounded-full bg-gradient-to-r from-ek-lime to-ek-500" aria-hidden="true" data-reveal data-reveal-delay="120"></span> ${description && renderTemplate`<p class="mt-5 max-w-[38em] text-lg text-[#cfe0db]" data-reveal data-reveal-delay="160"> ${description} </p>`} ${renderSlot($$result, $$slots["default"])} </div> </header>`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/components/PageHeader.astro", void 0);

export { $$Layout as $, $$PageHeader as a };
