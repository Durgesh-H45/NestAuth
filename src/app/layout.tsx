import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import ColdStartBanner from '@/components/ColdStartBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NestJS + Prisma Auth Client',
  description: 'Next.js frontend for NestJS + Prisma + PostgreSQL API deployed on Render',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-zinc-950 text-zinc-100 antialiased flex flex-col`}>
        <AuthProvider>
          <ColdStartBanner />
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-500">
            <p>Next.js Frontend &bull; NestJS 10 + Prisma 5.22 + Render PostgreSQL</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
