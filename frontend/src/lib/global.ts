import { STRAPI_URL } from 'astro:env/server';
import type { GlobalSettings } from '@/types/global';

// Nested components (footerColumns → links) are not reached by populate=*,
// so the deep query is explicit. Unknown populate keys 400 until the schema
// deploys, so we fall back to populate=* — the fields it misses just render
// their hard-coded defaults during that window.
const DEEP_POPULATE = [
  'populate[favicon]=true',
  'populate[logo]=true',
  'populate[logoWhite]=true',
  'populate[navbarLinks]=true',
  'populate[headerCta]=true',
  'populate[socialLinks]=true',
  'populate[footerColumns][populate]=*',
].join('&');

/**
 * Global site settings from Strapi; null when Strapi is down or the single
 * type is unpublished — every consumer falls back to its hard-coded default.
 */
export async function fetchGlobal(): Promise<GlobalSettings | null> {
  for (const query of [DEEP_POPULATE, 'populate=*']) {
    try {
      const res = await fetch(`${STRAPI_URL}/api/global?${query}`);
      if (!res.ok) continue;
      const { data } = (await res.json()) as { data: GlobalSettings | null };
      return data ?? null;
    } catch {
      // Strapi unreachable — try the next query, then give up.
    }
  }
  return null;
}
