import type { CollectionEntry } from 'astro:content';

type Article = CollectionEntry<'articles'>;

const tagNames = (article: Article, group?: 'stage' | 'topic' | 'audience') =>
  new Set(
    article.data.tags
      .filter((tag) => !group || tag.group === group)
      .map((tag) => tag.name.toLowerCase()),
  );

const shares = (a: Set<string>, b: Set<string>) => {
  for (const name of a) if (b.has(name)) return true;
  return false;
};

/**
 * Related-articles rule from the tag guide, in order:
 * 1. articles sharing the same stage tag (what the reader needs next)
 * 2. then articles sharing a topic tag
 * 3. then anything else tagged `grants`
 * Capped at four — any more and people stop clicking.
 */
export function relatedArticles(current: Article, all: Article[], limit = 4): Article[] {
  const stage = tagNames(current, 'stage');
  const topics = tagNames(current, 'topic');

  const tier = (candidate: Article): number => {
    if (shares(stage, tagNames(candidate, 'stage'))) return 0;
    if (shares(topics, tagNames(candidate, 'topic'))) return 1;
    if (tagNames(candidate).has('grants')) return 2;
    return 3;
  };

  return all
    .filter((candidate) => candidate.id !== current.id)
    .map((candidate) => ({ candidate, tier: tier(candidate) }))
    .filter(({ tier: t }) => t < 3)
    .sort(
      (a, b) =>
        a.tier - b.tier ||
        (b.candidate.data.publishedAt?.valueOf() ?? 0) -
          (a.candidate.data.publishedAt?.valueOf() ?? 0),
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
