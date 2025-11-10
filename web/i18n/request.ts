import {getRequestConfig} from "next-intl/server";
import {cookies} from 'next/headers';

export default getRequestConfig(async ({requestLocale}) => {
  const cookieLocale = cookies().get('NEXT_LOCALE')?.value;
  let locale = cookieLocale || (await requestLocale) || 'en';
  if (!['en','sv','so'].includes(locale)) locale = 'en';
  const common = (await import(`../locales/${locale}/common.json`)).default;
  return {locale, messages: { default: common }};
});
