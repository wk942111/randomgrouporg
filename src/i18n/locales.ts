export const locales = {
  en: { name: 'English', dir: 'ltr' },
  zh: { name: '简体中文', dir: 'ltr' },
  'zh-Hant': { name: '繁體中文', dir: 'ltr' },
  ko: { name: '한국어', dir: 'ltr' },
  ja: { name: '日本語', dir: 'ltr' },
  pt: { name: 'Português', dir: 'ltr' },
  es: { name: 'Español', dir: 'ltr' },
  de: { name: 'Deutsch', dir: 'ltr' },
  fr: { name: 'Français', dir: 'ltr' },
  vi: { name: 'Tiếng Việt', dir: 'ltr' },
  ar: { name: 'العربية', dir: 'rtl' },
  hu: { name: 'Magyar', dir: 'ltr' },
  nl: { name: 'Nederlands', dir: 'ltr' },
  pl: { name: 'Polski', dir: 'ltr' },
  it: { name: 'Italiano', dir: 'ltr' },
  sv: { name: 'Svenska', dir: 'ltr' },
  th: { name: 'ภาษาไทย', dir: 'ltr' }
} as const;

export type Locale = keyof typeof locales; 