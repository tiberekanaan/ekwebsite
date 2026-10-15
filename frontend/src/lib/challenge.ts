import { STRAPI_URL } from 'astro:env/server';
import type { ChallengeCycleBlockData } from '@/components/blocks/ChallengeCycleBlock.astro';

/**
 * The Challenge cycle's copy lives once, on the Homepage single type's
 * `blocks.challenge-cycle` entry. The homepage renders a teaser from it and
 * the About page renders the full cycle, so both read the same entry.
 * Returns {} (component fallbacks apply) when Strapi or the entry is missing.
 */
export async function fetchChallengeCycle(): Promise<ChallengeCycleBlockData> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/homepage?populate[blocks][on][blocks.challenge-cycle][populate]=*`,
    );
    if (!res.ok) return {};
    const json = (await res.json()) as {
      data: { blocks?: Array<{ __component: string } & ChallengeCycleBlockData> } | null;
    };
    return json.data?.blocks?.find((b) => b.__component === 'blocks.challenge-cycle') ?? {};
  } catch {
    return {};
  }
}
