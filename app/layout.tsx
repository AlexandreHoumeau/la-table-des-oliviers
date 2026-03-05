import { Inter, Playfair_Display } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LoaderProvider } from '@/context/LoaderContext';
import PageLoader from '@/components/PageLoader';

export const metadata: Metadata = {
  title: {
    default: 'La Table des Oliviers — Restaurant à Marseille',
    template: '%s | La Table des Oliviers',
  },
  description: 'Restaurant gastronomique à Marseille. Cuisine méditerranéenne raffinée, ouverte du jeudi au dimanche. Réservations au 04 00 00 00 00.',
  keywords: ['restaurant', 'marseille', 'gastronomique', 'méditerranéen', 'cuisine', 'oliviers'],
  authors: [{ name: 'La Table des Oliviers' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://latabledesoliviers.fr',
    siteName: 'La Table des Oliviers',
    title: 'La Table des Oliviers — Restaurant à Marseille',
    description: 'Restaurant gastronomique à Marseille. Cuisine méditerranéenne raffinée, ouverte du jeudi au dimanche.',
    images: [{ url: '/cover_1.png', width: 1200, height: 630, alt: 'La Table des Oliviers' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Table des Oliviers — Restaurant à Marseille',
    description: 'Restaurant gastronomique à Marseille. Cuisine méditerranéenne raffinée.',
    images: ['/cover_1.png'],
  },
  robots: { index: true, follow: true },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: '400'
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: '500'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <LoaderProvider>
          <PageLoader />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LoaderProvider>
      </body>
    </html>
  );
}


