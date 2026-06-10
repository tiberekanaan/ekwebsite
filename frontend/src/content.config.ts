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

const projectRef = z.object({
  documentId: z.string(),
  id: z.number().optional(),
  title: z.string(),
  description: z.string().nullable().optional(),
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
    projects: z.array(projectRef).default([]),
    publishedAt: z.coerce.date().nullable().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    locale: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: async () => {
    const entries = await fetchStrapi('/api/projects?populate=*');
    return entries.map(({ documentId, id: _strapiNumericId, ...rest }) => ({
      id: documentId,
      ...rest,
    }));
  },
  schema: z.object({
    title: z.string(),
    description: z.string().nullable().optional(),
    image: strapiImage,
    partners: z.array(partnerRef).default([]),
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
  partners,
  projects,
  testimonials,
  news,
  blog,
  pages,
  authors,
  faqs,
};
