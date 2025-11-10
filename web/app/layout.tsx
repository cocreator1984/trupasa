import './globals.css';
import type { Metadata } from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';
import {cookies} from 'next/headers';
import CookieConsent from '../components/CookieConsent';

export const metadata: Metadata = {
  metadataBase: new URL('https://trupasa.example'),
  title: 'Trupasa - Sovereign Digital Reserves for Public Prosperity',
  description:
    "Trupasa enables governments to create non-inflationary digital reserves backed by U.S. Treasury Bills to fund public development projects.",
  openGraph: {
    title: 'Trupasa - Sovereign Digital Reserves for Public Prosperity',
    description:
      'Sovereign digital reserve platform enabling risk-free yield for public projects.',
    images: ['/trupasa.jpeg'],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trupasa - Sovereign Digital Reserves',
    description:
      'Non-inflationary digital reserves backed by U.S. Treasuries.',
    images: ['/trupasa.jpeg']
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieLocale = cookies().get('NEXT_LOCALE')?.value;
  const detected = await getLocale();
  const locale = (cookieLocale && ['en','sv','so'].includes(cookieLocale)) ? cookieLocale : detected;
  const common = (await import(`../locales/${locale}/common.json`)).default;
  const consentGiven = cookies().get('cookie_consent')?.value === 'true';
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={{default: common}}>
          {children}
          <CookieConsent />
        </NextIntlClientProvider>
        {consentGiven && (
          <script id="ga-placeholder" dangerouslySetInnerHTML={{ __html: 'window.GA_CONSENTED = true;' }} />
        )}
      </body>
    </html>
  );
}
