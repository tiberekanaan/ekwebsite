import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { STRAPI_URL } from 'astro:env/server';

type StrapiEntry = {
  documentId: string;
  id: number;
  [key: string]: unknown;
};

type StrapiResponse<T> = {
  data: T[];
  meta: unknown;
};

async function fetchStrapi<T extends StrapiEntry>(path: string): Promise<T[]> {
  const res = await fetch(`${STRAPI_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Strapi request failed: ${path} → ${res.status} ${res.statusText}`);
  }
  const { data } = (await res.json()) as StrapiResponse<T>;
  return data;
}

async function softFetchStrapi<T extends StrapiEntry>(path: string): Promise<T[]> {
  const res = await fetch(`${STRAPI_URL}${path}`);
  if (res.status === 403 || res.status === 404) {
    console.warn(
      `Strapi ${path} returned ${res.status} — falling back to []. Check the collection exists and the Public role has 'find' permission.`,
    );
    return [];
  }
  if (!res.ok) {
    throw new Error(`Strapi request failed: ${path} → ${res.status} ${res.statusText}`);
  }
  const { data } = (await res.json()) as StrapiResponse<T>;
  return data;
}

const strapiImage = z
  .object({
    url: z.string(),
    alternativeText: z.string().nullable().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    formats: z.unknown().optional(),
  })
  .nullable()
  .optional();

// Strapi-backed collections (Content Loader API → Strapi 5 Document Service)
const blogs = defineCollection({
  loader: async () => {
    const entries = await fetchStrapi('/api/blogs');
    return entries.map(({ documentId, id: _strapiNumericId, ...rest }) => ({
      id: documentId,
      ...rest,
    }));
  },
  schema: z.object({
    title: z.string(),
    content: z.string().nullable().optional(),
    publish_date: z.coerce.date().nullable().optional(),
    publishedAt: z.coerce.date().nullable().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    locale: z.string().optional(),
  }),
});

const events = defineCollection({
  loader: async () => {
    const entries = await fetchStrapi('/api/events?populate=*');
    return entries.map(({ documentId, id: _strapiNumericId, ...rest }) => ({
      id: documentId,
      ...rest,
    }));
  },
  schema: z.object({
    date: z.coerce.date(),
    location: z.string(),
    details: z.string().nullable().optional(),
    image: strapiImage,
    publishedAt: z.coerce.date().nullable().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    locale: z.string().optional(),
  }),
});

const contentBlock = z.discriminatedUnion('__component', [
  z.object({
    __component: z.literal('content-blocks.video'),
    id: z.number(),
    url: z.string(),
  }),
  z.object({
    __component: z.literal('content-blocks.download'),
    id: z.number(),
    file: z
      .object({
        url: z.string(),
        name: z.string().nullable().optional(),
        mime: z.string().nullable().optional(),
        ext: z.string().nullable().optional(),
        size: z.number().optional(),
        alternativeText: z.string().nullable().optional(),
      })
      .nullable()
      .optional(),
  }),
  z.object({
    __component: z.literal('content-blocks.article'),
    id: z.number(),
    external_link: z.string(),
  }),
]);

export type ContentBlock = z.infer<typeof contentBlock>;

const partnerRef = z.object({
  documentId: z.string(),
  id: z.number().optional(),
  name: z.string(),
});

// A partner's involvement in one programme, with its per-programme role.
// `partner` is nullable so builds tolerate the populate=* fallback (which
// returns the component without its nested relation) and dangling links.
const programmePartnerLink = z.object({
  id: z.number().optional(),
  partner_role: z.enum(['funder', 'co_implementer']).nullable().optional(),
  partner: partnerRef.nullable().optional(),
});

const projectRef = z.object({
  documentId: z.string(),
  id: z.number().optional(),
  title: z.string(),
  description: z.string().nullable().optional(),
});

const pillarRef = z.object({
  documentId: z.string(),
  id: z.number().optional(),
  title: z.string(),
});

const activityRef = z.object({
  documentId: z.string(),
  id: z.number().optional(),
  title: z.string(),
  date: z.coerce.date(),
  end_date: z.coerce.date().nullable().optional(),
  venue: z.string().nullable().optional(),
  island: z.string().nullable().optional(),
  attendance: z.number().nullable().optional(),
  count_method: z.enum(['register', 'estimate']).nullable().optional(),
  delivered: z.boolean().nullable().optional(),
  not_delivered_reason: z.string().nullable().optional(),
});

const testimonialRef = z.object({
  documentId: z.string(),
  id: z.number().optional(),
  quote: z.string(),
  author: z.string(),
  role: z.string().nullable().optional(),
});

const partners = defineCollection({
  loader: async () => {
    const entries = await fetchStrapi('/api/partners?populate=*');
    return entries.map(({ documentId, id: _strapiNumericId, ...rest }) => ({
      id: documentId,
      ...rest,
    }));
  },
  schema: z.object({
    name: z.string(),
    website_url: z.string().nullable().optional(),
    logo: strapiImage,
    // Marquee fields; nullable so builds tolerate production before the
    // partner schema deploys.
    role: z.enum(['funder', 'government', 'civil_society', 'community']).nullable().optional(),
    consent_to_name: z.boolean().nullable().optional(),
    display_order: z.number().nullable().optional(),
    projects: z.array(projectRef).default([]),
    publishedAt: z.coerce.date().nullable().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    locale: z.string().optional(),
  }),
});

const slugify = (value: string) =>
  value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const projects = defineCollection({
  loader: async () => {
    // partner_links is a component whose nested relation needs an explicit
    // deep populate; that key 400s while the target Strapi still runs the
    // pre-partner-roles schema, so fall back to populate=* (partner_links
    // then arrives without partners and the legacy M2M takes over).
    const deepPopulate =
      '/api/projects?' +
      [
        'populate[image]=true',
        'populate[partners]=true',
        'populate[strategy]=true',
        'populate[pillars]=true',
        'populate[activities]=true',
        'populate[testimonials]=true',
        'populate[partner_links][populate][partner]=true',
      ].join('&');
    let entries: (StrapiEntry & { title: string })[];
    try {
      entries = await fetchStrapi<StrapiEntry & { title: string }>(deepPopulate);
    } catch {
      entries = await fetchStrapi<StrapiEntry & { title: string }>('/api/projects?populate=*');
    }
    return entries.map(({ documentId, id: _strapiNumericId, ...rest }) => ({
      id: documentId,
      slug: slugify(rest.title),
      ...rest,
    }));
  },
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().nullable().optional(),
    image: strapiImage,
    // 'on-going' is the pre-spine value; tolerated until the data migration
    // (backend/apply-spine.js) has run against the target Strapi.
    project_status: z
      .enum(['running', 'completed', 'planned', 'agreed_not_started', 'on-going'])
      .nullable()
      .optional(),
    objectives: z.string().nullable().optional(),
    location: z.string().nullable().optional(),
    metrics: z.string().nullable().optional(),
    partners: z.array(partnerRef).default([]),
    partner_links: z.array(programmePartnerLink).default([]),
    strategy: pillarRef.nullable().optional(),
    pillars: z.array(pillarRef).default([]),
    activities: z.array(activityRef).default([]),
    testimonials: z.array(testimonialRef).default([]),
    publishedAt: z.coerce.date().nullable().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    locale: z.string().optional(),
  }),
});

const pillars = defineCollection({
  loader: async () => {
    const entries = await softFetchStrapi<StrapiEntry & { title: string }>('/api/pillars');
    return entries.map(({ documentId, id: _strapiNumericId, ...rest }) => ({
      id: documentId,
      slug: slugify(rest.title),
      ...rest,
    }));
  },
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().nullable().optional(),
    publishedAt: z.coerce.date().nullable().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    locale: z.string().optional(),
  }),
});

const testimonials = defineCollection({
  loader: async () => {
    const entries = await softFetchStrapi('/api/testimonials?populate=*');
    return entries.map(({ documentId, id: _strapiNumericId, ...rest }) => ({
      id: documentId,
      ...rest,
    }));
  },
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string().nullable().optional(),
    image: strapiImage,
    publishedAt: z.coerce.date().nullable().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    locale: z.string().optional(),
  }),
});

const news = defineCollection({
  loader: async () => {
    const entries = await softFetchStrapi('/api/news-updates?populate=*');
    return entries.map(({ documentId, id: _strapiNumericId, ...rest }) => ({
      id: documentId,
      ...rest,
    }));
  },
  schema: z.object({
    title: z.string(),
    summary: z.string().nullable().optional(),
    content: z.string().nullable().optional(),
    date: z.coerce.date(),
    photo: strapiImage,
    publishedAt: z.coerce.date().nullable().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    locale: z.string().optional(),
  }),
});

const resources = defineCollection({
  loader: async () => {
    const entries = await fetchStrapi('/api/resources?populate[content_blocks][populate]=*');
    return entries.map(({ documentId, id: _strapiNumericId, ...rest }) => ({
      id: documentId,
      ...rest,
    }));
  },
  schema: z.object({
    title: z.string(),
    description: z.string().nullable().optional(),
    content_blocks: z.array(contentBlock).default([]),
    publishedAt: z.coerce.date().nullable().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    locale: z.string().optional(),
  }),
});

const tagRef = z.object({
  documentId: z.string(),
  id: z.number().optional(),
  name: z.string(),
  group: z.enum(['stage', 'topic', 'audience']),
});

export type TagRef = z.infer<typeof tagRef>;

const articles = defineCollection({
  loader: async () => {
    const entries = await softFetchStrapi('/api/articles?populate=*');
    return entries.map(({ documentId, id: _strapiNumericId, ...rest }) => ({
      id: documentId,
      ...rest,
    }));
  },
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.string().nullable().optional(),
    excerpt: z.string().nullable().optional(),
    meta_description: z.string().nullable().optional(),
    body: z.string().nullable().optional(),
    author: z.string().nullable().optional(),
    reading_time: z.number().nullable().optional(),
    last_reviewed: z.string().nullable().optional(),
    tags: z.array(tagRef).default([]),
    publishedAt: z.coerce.date().nullable().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    locale: z.string().optional(),
  }),
});

// Local Markdown/JSON collections shipped with the Velocity boilerplate
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(100),
      description: z.string().max(200),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      author: z.string().default('Team'),
      image: image().optional(),
      imageAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      locale: z.enum(['en', 'es', 'fr']).default('en'),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updatedAt: z.coerce.date().optional(),
    locale: z.enum(['en', 'es', 'fr']).default('en'),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/authors' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      bio: z.string(),
      avatar: image().optional(),
      social: z
        .object({
          twitter: z.string().optional(),
          github: z.string().optional(),
          linkedin: z.string().optional(),
        })
        .optional(),
    }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/faqs' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string().optional(),
    order: z.number().default(0),
    locale: z.enum(['en', 'es', 'fr']).default('en'),
  }),
});

export const collections = {
  blogs,
  events,
  resources,
  articles,
  partners,
  projects,
  pillars,
  testimonials,
  news,
  blog,
  pages,
  authors,
  faqs,
};
