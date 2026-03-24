import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Montserrat, EB_Garamond, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-eb-garamond',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Salon Aristocratic | Locație premium pentru evenimente private, ședințe foto și filmări în București',
  description:
    'Salon Aristocratic este o locație elegantă din București pentru evenimente private restrânse, ședințe foto, filmări, workshop-uri și vernisaje. Verifică disponibilitatea și trimite o cerere de rezervare online.',
  openGraph: {
    title: 'Salon Aristocratic',
    description:
      'Locație premium pentru evenimente private, ședințe foto și filmări în București.',
    images: [
      {
        url: '/images/gallery/gallery-04.png',
        width: 1200,
        height: 630,
        alt: 'Salon Aristocratic',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ro">
      <body className={`${montserrat.variable} ${ebGaramond.variable} ${cormorantGaramond.variable}`}>
        {children}
        <a
          href="https://v1.hostezi.ro"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 z-[200] flex items-center gap-2 rounded-full bg-espresso/90 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white/80 shadow-float backdrop-blur-sm transition hover:bg-espresso hover:text-white"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Prototip · Hostezi.ro
        </a>
      </body>
    </html>
  );
}
