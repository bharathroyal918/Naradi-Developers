import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/providers/Providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import FloatingControls from '@/components/floating/FloatingControls';

export const metadata: Metadata = {
  metadataBase: new URL('https://naradidevelopers.com'),
  title: {
    default: 'Naradi Developers — Broker-Free Verified Land & Property Marketplace',
    template: '%s | Naradi Developers',
  },
  description:
    'India\'s most trusted broker-free real estate marketplace founded by G.R Narendra Reddy. Headquartered at 8th Main Rd, Judicial Layout, Yelahanka, Bengaluru, Karnataka. Discover verified plots, commercial land, agricultural land, farm houses, villas, and apartments with DTCP, BDA, RERA approvals.',
  keywords: [
    'real estate',
    'plots for sale Bengaluru',
    'land for sale Yelahanka',
    'Judicial Layout plots',
    'broker free',
    'BDA approved plots',
    'DTCP plots',
    'agricultural land Karnataka',
    'commercial land Bengaluru',
    'farm house',
    'NRI property',
    'Bengaluru real estate',
    'verified properties',
    'Naradi Developers',
    'G.R Narendra Reddy',
  ],
  authors: [{ name: 'G.R Narendra Reddy, Founder & CEO, Naradi Developers' }],
  creator: 'G.R Narendra Reddy — Naradi Developers',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://naradidevelopers.com',
    siteName: 'Naradi Developers',
    title: 'Naradi Developers — Broker-Free Verified Land & Property Marketplace',
    description: 'India\'s most trusted broker-free real estate marketplace.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Naradi Developers Real Estate Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naradi Developers',
    description: 'India\'s trusted broker-free land & property marketplace.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0F5132" />
      </head>
      <body className="antialiased">
        <Providers>
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <MobileBottomNav />
          <FloatingControls />
        </Providers>
      </body>
    </html>
  );
}
