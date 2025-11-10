import {getRequestConfig} from "next-intl/server";

export default getRequestConfig(async ({requestLocale}) => {
  let locale = (await requestLocale) || 'en';
  if (!['en','sv','so'].includes(locale)) locale = 'en';
  const messages = (await import(`../locales/${locale}/common.json`)).default;
  return {locale, messages};
});