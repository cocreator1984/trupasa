import {NextIntlClientProvider} from 'next-intl';
import {unstable_setRequestLocale} from 'next-intl/server';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{locale:'en'},{locale:'sv'},{locale:'so'}];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const locale = ['en','sv','so'].includes(params.locale) ? params.locale : 'en';
  unstable_setRequestLocale(locale);
  const messages = (await import(`../../locales/${locale}/common.json`)).default;
  return (
    <NextIntlClientProvider locale={locale} messages={{default: messages}}>
      {children}
    </NextIntlClientProvider>
  );
}