import type {
  WebSite,
  BlogPosting,
  BreadcrumbList,
  FAQPage,
  WithContext,
  NGO,
  NewsArticle,
} from 'schema-dts';
import siteConfig from '@/config/site.config';

/**
 * WebSite schema (every page). No SearchAction: the site has no /search URL
 * (search is the in-page Pagefind modal), and a claimed one is a broken signal.
 */
export function createWebsiteSchema(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { '@id': `${siteConfig.url}/#organization` },
  };
}

/**
 * Organization schema (homepage + About): a registered NGO, so Google can
 * build an information panel for "Empower Kiribati".
 */
export function createOrganizationSchema(): WithContext<NGO> {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: 'Digital Kiribati Inc',
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    foundingDate: '2024-05-06',
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address?.street,
      addressLocality: siteConfig.address?.city,
      addressCountry: siteConfig.address?.country,
    },
    areaServed: { '@type': 'Country', name: 'Kiribati' },
    sameAs: siteConfig.socialLinks,
  };
}

/**
 * NewsArticle schema for /news/[slug].
 */
export function createNewsArticleSchema(article: {
  title: string;
  description?: string | null;
  url: string;
  image?: string | null;
  datePublished: string;
  dateModified?: string | null;
}): WithContext<NewsArticle> {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.description ?? undefined,
    url: article.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': article.url },
    image: article.image ?? `${siteConfig.url}/logo.png`,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/logo.png` },
    },
  };
}

/**
 * Create BlogPosting schema for blog posts
 */
export function createBlogPostSchema(post: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: Date;
  dateModified?: Date;
  author: { name: string; url?: string };
}): WithContext<BlogPosting> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: post.url,
    image: post.image,
    datePublished: post.datePublished.toISOString(),
    dateModified: post.dateModified?.toISOString() || post.datePublished.toISOString(),
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: post.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url,
    },
  };
}

/**
 * Create BreadcrumbList schema
 */
export function createBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Create FAQPage schema
 */
export function createFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
