import type { Core } from '@strapi/strapi';

const PUBLIC_READ_ACTIONS = [
  'api::testimonial.testimonial.find',
  'api::testimonial.testimonial.findOne',
  'api::news-update.news-update.find',
  'api::news-update.news-update.findOne',
  'api::pillar.pillar.find',
  'api::pillar.pillar.findOne',
];

const DEFAULT_PILLARS: Array<{ title: string; description: string }> = [
  {
    title: 'Empowering Leaders & Communities',
    description:
      'We strengthen local capability and leadership pathways so communities can lead change on their own terms — investing in mentoring, civic capability, and the kinds of skills that let leaders emerge from every atoll.',
  },
  {
    title: 'Building Partnership for Impact',
    description:
      'We build trusted relationships with ministries, councils, NGOs, and donors to coordinate and sustain investment — so that programmes complement each other instead of duplicating effort.',
  },
  {
    title: 'Creating Conditions for Innovation',
    description:
      'We back experimentation and support entrepreneurs to develop locally relevant business models — from small pilots to repeatable approaches that strengthen livelihoods on outer islands.',
  },
  {
    title: 'Enabling Digital Participation',
    description:
      'We grow trust in the digital world by strengthening safety, standards, and digital confidence on every atoll — closing connectivity gaps and helping people use digital services for real needs.',
  },
];

async function ensurePublicReadPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  for (const action of PUBLIC_READ_ACTIONS) {
    const existing = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: publicRole.id } });

    if (!existing) {
      await strapi.db
        .query('plugin::users-permissions.permission')
        .create({ data: { action, role: publicRole.id } });
    }
  }
}

async function seedDefaultPillars(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::pillar.pillar').findMany({
    fields: ['title'],
    status: 'draft',
    pagination: { limit: -1 },
  });
  const existingTitles = new Set(
    existing.map((p) => (p.title ?? '').trim().toLowerCase()),
  );

  for (const pillar of DEFAULT_PILLARS) {
    if (existingTitles.has(pillar.title.trim().toLowerCase())) continue;

    const created = await strapi.documents('api::pillar.pillar').create({
      data: { title: pillar.title, description: pillar.description },
    });

    await strapi.documents('api::pillar.pillar').publish({ documentId: created.documentId });
  }
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensurePublicReadPermissions(strapi);
    await seedDefaultPillars(strapi);
  },
};
