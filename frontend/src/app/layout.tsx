import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Phone Village - Nigeria Smartphone Marketplace & Tech Hub Directory',
  description: 'Discover, buy, and sell verified brand new and clean UK-used smartphones across Computer Village Ikeja, Banex Abuja, and major Nigerian tech hubs.',
  openGraph: {
    title: 'Phone Village - Nigeria Smartphone Marketplace',
    description: 'Verified smartphones, direct dealer contacts, and safe market trade in Nigeria.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-[#021B12] text-slate-100 transition-colors duration-200" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
