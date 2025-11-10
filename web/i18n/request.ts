import {getRequestConfig} from "next-intl/server";

export default getRequestConfig(async ({requestLocale}) => {
  const l = (await requestLocale) as string || 'en';
  const safe = (['en','sv','so'].includes(l) ? l : 'en') as 'en'|'sv'|'so';
  const messages = (await import(`../locales/${safe}/common.json`)).default;
  return { locale: safe, messages: { default: messages } };
});
