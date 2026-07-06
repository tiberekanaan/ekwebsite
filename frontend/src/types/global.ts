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

export interface GlobalSettings {
  siteName?: string | null;
  favicon?: StrapiMedia | null;
  logo?: StrapiMedia | null;
  navbarLinks?: NavLink[] | null;
}
