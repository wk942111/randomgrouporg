import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from './locales';

export const defaultLocale = 'en' as const;
export type Locale = keyof typeof locales;

export const pathnames = {
  '/': '/',
  '/about': {
    en: '/about',
    zh: '/about',
    'zh-Hant': '/about',
    ko: '/about',
    ja: '/about',
    pt: '/about',
    es: '/about',
    de: '/about',
    fr: '/about',
    vi: '/about',
    ar: '/about',
    hu: '/about',
    nl: '/about',
    pl: '/about',
    it: '/about',
    sv: '/about',
    th: '/about'
  },
  '/legal': {
    en: '/legal',
    zh: '/legal',
    'zh-Hant': '/legal',
    ko: '/legal',
    ja: '/legal',
    pt: '/legal',
    es: '/legal',
    de: '/legal',
    fr: '/legal',
    vi: '/legal',
    ar: '/legal',
    hu: '/legal',
    nl: '/legal',
    pl: '/legal',
    it: '/legal',
    sv: '/legal',
    th: '/legal'
  },
  '/legal/terms': {
    en: '/legal/terms',
    zh: '/legal/terms',
    'zh-Hant': '/legal/terms',
    ko: '/legal/terms',
    ja: '/legal/terms',
    pt: '/legal/terms',
    es: '/legal/terms',
    de: '/legal/terms',
    fr: '/legal/terms',
    vi: '/legal/terms',
    ar: '/legal/terms',
    hu: '/legal/terms',
    nl: '/legal/terms',
    pl: '/legal/terms',
    it: '/legal/terms',
    sv: '/legal/terms',
    th: '/legal/terms'
  },
  '/legal/privacy': {
    en: '/legal/privacy',
    zh: '/legal/privacy',
    'zh-Hant': '/legal/privacy',
    ko: '/legal/privacy',
    ja: '/legal/privacy',
    pt: '/legal/privacy',
    es: '/legal/privacy',
    de: '/legal/privacy',
    fr: '/legal/privacy',
    vi: '/legal/privacy',
    ar: '/legal/privacy',
    hu: '/legal/privacy',
    nl: '/legal/privacy',
    pl: '/legal/privacy',
    it: '/legal/privacy',
    sv: '/legal/privacy',
    th: '/legal/privacy'
  }
} as const;

export const { Link, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation({
  locales: Object.keys(locales) as Locale[],
  pathnames,
  localePrefix: 'as-needed'
}); 