/**
 * Strapi's ISO locale list has no Gilbertese ("gil"), so Kiribati content is
 * stored under "en-KI" (the only Kiribati code Strapi accepts) and exposed in
 * URLs as the friendlier `?lang=kir`.
 */
export const STRAPI_LOCALES = {
  en: 'en',
  kir: 'en-KI',
} as const;

export type Lang = keyof typeof STRAPI_LOCALES;

export const LANG_LABELS: Record<Lang, string> = {
  en: 'English',
  kir: 'Kiribati',
};

export const resolveLang = (raw: string | null): Lang => (raw === 'kir' ? 'kir' : 'en');
