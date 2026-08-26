import type { Core } from '@strapi/strapi';
import { TAG_VOCABULARY, GRANT_ARTICLES } from './seed/grants-articles';

const PUBLIC_ACTIONS = [
  'api::testimonial.testimonial.find',
  'api::testimonial.testimonial.findOne',
  'api::news-update.news-update.find',
  'api::news-update.news-update.findOne',
  'api::pillar.pillar.find',
  'api::pillar.pillar.findOne',
  'api::basic-page.basic-page.find',
  'api::basic-page.basic-page.findOne',
  'api::resource.resource.find',
  'api::resource.resource.findOne',
  'api::project.project.find',
  'api::project.project.findOne',
  'api::activity.activity.find',
  'api::activity.activity.findOne',
  'api::blog.blog.find',
  'api::blog.blog.findOne',
  'api::homepage.homepage.find',
  'api::global.global.find',
  'api::partners-page.partners-page.find',
  'api::article.article.find',
  'api::article.article.findOne',
  'api::tag.tag.find',
  'api::tag.tag.findOne',
  // Write access: the footer subscribe form posts through an Astro action
  // without an API token; email uniqueness caps abuse at one row per address.
  'api::subscriber.subscriber.create',
];

// Strapi's ISO locale list has no Gilbertese ("gil"); "en-KI" is the only
// Kiribati code it accepts, so the Kiribati content locale lives under it.
const KIRIBATI_LOCALE = { code: 'en-KI', name: 'Kiribati (Gilbertese)' };

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

const DEFAULT_PARTNERS_PAGE = {
  eyebrow: 'Partners',
  title: 'Our Partners',
  description:
    'The organizations, institutions, and community groups building alongside Empower Kiribati.',
  introHeading: 'No one builds an atoll nation alone',
  intro: [
    'No single organization can meet the scale of challenges facing Kiribati alone — especially across a nation of scattered atolls where resources, services, and opportunities are unevenly distributed. We build partnerships that respect local leadership and bring together government, community groups, churches, schools, diaspora networks, and the private sector so that solutions are coordinated, culturally grounded, and practical to deliver.',
    'Our approach is to connect strengths: local knowledge and trusted relationships, technical expertise, funding, and delivery capacity. By aligning partners around shared goals and clear roles, we reduce duplication and ensure projects are designed with communities — not simply delivered to them. Strong partnerships also help ideas move from pilot to long-term programs, with the right support systems in place for maintenance, training, and continued learning.',
    'Partnerships are also how we grow impact beyond a single project. When we collaborate openly, share evidence, and invest in long-term relationships, we can unlock better services, stronger local organizations, and more resilient livelihoods — while ensuring benefits reach women, youth, and outer island communities.',
  ].join('\n\n'),
  ctaHeading: 'Become a partner',
  ctaText:
    "Whether you bring funding, expertise, delivery capacity, or deep community roots — there's a place for you in this work. Let's talk about what we can build together.",
  ctaLabel: 'Start the conversation',
  ctaUrl: '/contact',
};

async function seedPartnersPage(strapi: Core.Strapi) {
  const existing = await strapi
    .documents('api::partners-page.partners-page')
    .findFirst({ status: 'draft' });
  if (existing) return;

  const created = await strapi
    .documents('api::partners-page.partners-page')
    .create({ data: DEFAULT_PARTNERS_PAGE });

  await strapi
    .documents('api::partners-page.partners-page')
    .publish({ documentId: created.documentId });
}

async function ensurePublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  for (const action of PUBLIC_ACTIONS) {
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

async function ensureKiribatiLocale(strapi: Core.Strapi) {
  try {
    const locales = strapi.plugin('i18n').service('locales');
    const existing = await locales.findByCode(KIRIBATI_LOCALE.code);
    if (!existing) {
      await locales.create(KIRIBATI_LOCALE);
    }
  } catch (error) {
    strapi.log.warn(
      `Could not seed the ${KIRIBATI_LOCALE.code} locale — add it manually under Settings → Internationalization. (${error})`,
    );
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

// Funders and government bodies for the landing-page marquee. Idempotent:
// creates missing records, fills in role/consent/display_order on existing
// ones only while role is unset, and never overwrites admin edits after that.
const MARQUEE_PARTNERS: {
  name: string;
  role: 'funder' | 'government';
  display_order: number;
}[] = [
  { name: 'U.S. Embassy Suva', role: 'funder', display_order: 1 },
  { name: 'New Zealand High Commission', role: 'funder', display_order: 2 },
  { name: 'Caritas', role: 'funder', display_order: 3 },
  {
    name: 'Ministry for Women, Youth, Sports & Social Affairs',
    role: 'government',
    display_order: 4,
  },
  {
    name: 'Ministry of Environment, Lands & Agricultural Development',
    role: 'government',
    display_order: 5,
  },
  { name: 'Kiribati National Library', role: 'government', display_order: 6 },
];

async function seedMarqueePartners(strapi: Core.Strapi) {
  for (const partner of MARQUEE_PARTNERS) {
    const existing = await strapi.documents('api::partner.partner').findFirst({
      filters: { name: { $eqi: partner.name } },
      status: 'draft',
    });

    if (!existing) {
      const created = await strapi.documents('api::partner.partner').create({
        data: { ...partner, consent_to_name: true },
      });
      await strapi
        .documents('api::partner.partner')
        .publish({ documentId: created.documentId });
      continue;
    }

    if (!existing.role) {
      await strapi.documents('api::partner.partner').update({
        documentId: existing.documentId,
        data: {
          role: partner.role,
          consent_to_name: true,
          display_order: partner.display_order,
        },
      });
      await strapi
        .documents('api::partner.partner')
        .publish({ documentId: existing.documentId });
    }
  }
}

async function seedTags(strapi: Core.Strapi) {
  for (const tag of TAG_VOCABULARY) {
    const existing = await strapi.documents('api::tag.tag').findFirst({
      filters: { name: tag.name },
    });
    if (!existing) {
      await strapi.documents('api::tag.tag').create({ data: tag });
    }
  }
}

async function seedGrantArticles(strapi: Core.Strapi) {
  for (const article of GRANT_ARTICLES) {
    const existing = await strapi.documents('api::article.article').findFirst({
      filters: { slug: article.slug },
      status: 'draft',
    });
    if (existing) continue;

    const tags = await strapi.documents('api::tag.tag').findMany({
      filters: { name: { $in: article.tags } },
      pagination: { limit: -1 },
    });

    const { tags: _tagNames, ...fields } = article;
    const created = await strapi.documents('api::article.article').create({
      data: {
        ...fields,
        tags: { connect: tags.map((t) => t.documentId) },
      },
    });

    await strapi
      .documents('api::article.article')
      .publish({ documentId: created.documentId });
  }
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensurePublicPermissions(strapi);
    await ensureKiribatiLocale(strapi);
    await seedDefaultPillars(strapi);
    await seedPartnersPage(strapi);
    await seedMarqueePartners(strapi);
    await seedTags(strapi);
    await seedGrantArticles(strapi);
  },
};
