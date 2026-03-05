import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LoaderProvider } from '@/context/LoaderContext';
import PageLoader from '@/components/PageLoader';

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


