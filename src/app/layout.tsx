import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AI Toolbox — Discover the Best AI Tools',
  description:
    'Curated directory of the best AI tools. Find, compare, and discover AI tools for chat, coding, image generation, productivity, and more. 10x your productivity with the right AI tools.',
  keywords: [
    'AI tools',
    'artificial intelligence',
    'ChatGPT',
    'Claude',
    'AI directory',
    'AI coding',
    'AI image generation',
    'productivity tools',
  ],
  openGraph: {
    title: 'AI Toolbox — Discover the Best AI Tools',
    description: 'Curated directory of the best AI tools. Find, compare, and discover AI tools for every need.',
    type: 'website',
    siteName: 'AI Toolbox',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Toolbox — Discover the Best AI Tools',
    description: 'Curated directory of the best AI tools for chat, coding, image generation, and more.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
