/** Shared helpers for the News Update surfaces (hero line, homepage block, /news pages). */

export const newsHref = (slug: string) => `/news/${slug}`;

/**
 * Strapi `date` fields arrive as plain YYYY-MM-DD strings, which Zod coerces to
 * UTC midnight — format in UTC so a Vercel region west of Greenwich does not
 * shift the day backwards.
 */
export const formatNewsDate = (date: Date, style: 'long' | 'short' = 'long') =>
  date.toLocaleDateString(
    'en-GB',
    style === 'long'
      ? { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }
      : { day: 'numeric', month: 'short', timeZone: 'UTC' },
  );

type Dated = { data: { date: Date; publishedAt?: Date | null } };

/** Newest first by the editorial date, then by publish time for same-day items. */
export const byNewest = <T extends Dated>(a: T, b: T) =>
  b.data.date.valueOf() - a.data.date.valueOf() ||
  (b.data.publishedAt?.valueOf() ?? 0) - (a.data.publishedAt?.valueOf() ?? 0);
