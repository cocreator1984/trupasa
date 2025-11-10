import './globals.css';
import type { Metadata } from 'next';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
