import type { CollectionEntry } from 'astro:content';

export type ProgrammePartnerRole = 'funder' | 'co_implementer';

export const ROLE_GROUP_LABELS: Record<ProgrammePartnerRole, string> = {
  funder: 'Funded by',
  co_implementer: 'Delivered with',
};

type ProgrammeData = CollectionEntry<'projects'>['data'];

export interface ProgrammePartnerRef {
  documentId: string;
  name: string;
  role: ProgrammePartnerRole | null;
}

/**
 * A programme's partners with their per-programme role. The role-carrying
 * `partner_links` component is the source of truth; the legacy `partners`
 * M2M is the roleless fallback until the data migration
 * (backend/apply-partner-roles.js) has run against the target Strapi.
 */
export function programmePartners(programme: ProgrammeData): ProgrammePartnerRef[] {
  const refs: ProgrammePartnerRef[] = [];
  const seen = new Set<string>();
  for (const link of programme.partner_links) {
    const partner = link.partner;
    if (!partner || seen.has(partner.documentId)) continue;
    seen.add(partner.documentId);
    refs.push({
      documentId: partner.documentId,
      name: partner.name,
      role: link.partner_role ?? null,
    });
  }
  if (refs.length > 0) return refs;
  return programme.partners.map((partner) => ({
    documentId: partner.documentId,
    name: partner.name,
    role: null,
  }));
}

/** Whether a programme lists the partner, through either the role links or the legacy M2M. */
export function programmeHasPartner(programme: ProgrammeData, partnerDocumentId: string): boolean {
  return (
    programme.partner_links.some((link) => link.partner?.documentId === partnerDocumentId) ||
    programme.partners.some((partner) => partner.documentId === partnerDocumentId)
  );
}
