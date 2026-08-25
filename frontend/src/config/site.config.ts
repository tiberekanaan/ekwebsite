import { SITE_URL, GOOGLE_SITE_VERIFICATION, BING_SITE_VERIFICATION } from 'astro:env/server';

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  author: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  socialLinks: string[];
  twitter?: {
    site: string;
    creator: string;
  };
  verification?: {
    google?: string;
    bing?: string;
  };
  /**
   * Branding configuration
   * Logo files: Replace SVGs in src/assets/branding/
   * Favicon: Replace in public/favicon.webp
   */
  branding: {
    /** Logo alt text for accessibility */
    logo: {
      alt: string;
    };
    /** Favicon path (lives in public/) */
    favicon: {
      href: string;
      type: string;
    };
    /** Theme colors for manifest and browser UI */
    colors: {
      /** Browser toolbar color (hex) */
      themeColor: string;
      /** PWA splash screen background (hex) */
      backgroundColor: string;
    };
  };
}

const siteConfig: SiteConfig = {
  name: 'Empower Kiribati',
  description:
    'Empower Kiribati is a platform for community initiatives. We partner with ministries, funders and community organisations to design, deliver and measure work that cultivates the conditions for a resilient Kiribati.',
  url: SITE_URL || 'https://empower.org.ki',
  ogImage: '/og-default.png',
  author: 'Empower Kiribati',
  email: 'externalaffairs@empower.org.ki',
  phone: '+686 7300 5227',
  address: {
    street: 'Te Kimatore CS Compound',
    city: 'Bikenibeu, South Tarawa',
    state: '',
    zip: '',
    country: 'KI',
  },
  socialLinks: [
    'https://facebook.com/empowerkiribati',
    'https://linkedin.com/company/empowerkiribati',
  ],
  // Twitter metadata - update with your actual handles or remove
  // twitter: {
  //   site: '@yourhandle',
  //   creator: '@yourhandle',
  // },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
    bing: BING_SITE_VERIFICATION,
  },
  // Branding: Logo files live in src/assets/branding/
  // Replace the SVG files there with your own branding
  branding: {
    logo: {
      alt: 'Empower Kiribati',
    },
    favicon: {
      href: '/favicon.webp',
      type: 'image/webp',
    },
    colors: {
      themeColor: '#F94C10',
      backgroundColor: '#ffffff',
    },
  },
};

export default siteConfig;
