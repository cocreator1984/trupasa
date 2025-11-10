export const locales = ['en', 'sv', 'so'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export default {locales, defaultLocale};
