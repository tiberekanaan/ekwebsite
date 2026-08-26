export interface StrapiMedia {
  url: string;
  mime?: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

export interface NavLink {
  label: string;
  url: string;
}

export interface LinkColumn {
  heading: string;
  links?: NavLink[] | null;
}

export interface GlobalSettings {
  siteName?: string | null;
  favicon?: StrapiMedia | null;
  logo?: StrapiMedia | null;
  logoWhite?: StrapiMedia | null;
  navbarLinks?: NavLink[] | null;
  headerCta?: NavLink | null;
  generalEmail?: string | null;
  partnershipEmail?: string | null;
  phone?: string | null;
  footerAddress?: string | null;
  officeLine?: string | null;
  utcNote?: string | null;
  footerBlurb?: string | null;
  footerContactHeading?: string | null;
  footerColumns?: LinkColumn[] | null;
  socialLinks?: NavLink[] | null;
  legalLine?: string | null;
  footerTagline?: string | null;
}

/** Contact details shared by the footer and the Work-with-us close section. */
export interface ContactDetails {
  generalEmail?: string | null;
  partnershipEmail?: string | null;
  phone?: string | null;
  officeLine?: string | null;
  utcNote?: string | null;
}

/** "+686 7300 5227" → "tel:+68673005227" */
export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`;
