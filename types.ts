export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface NavItem {
  label: string;
  href: string;
}

export interface GalleryItem {
  id: number;
  url: string;
  title: string;
  description: string;
}

export interface Biodata {
  name: string;
  role: string;
  company: string;
  address: string;
  email: string;
  phone: string;
  dob: string;
  nationality: string;
}
