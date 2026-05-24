'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { name: 'Tools', href: '/#tools' },
  { name: 'Articles', href: '/articles' },
  { name: 'Ranking', href: '/#popular' },
  { name: 'About', href: '/#about' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-page)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">⚡</span>
          <span className="text-xl font-bold bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent">
            AI Toolbox
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Submit Tool button */}
        <div className="hidden md:flex items-center gap-4">
          <button className="rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[var(--color-accent-hover)] hover:shadow-lg hover:shadow-[var(--color-accent)]/25">
            Submit Tool
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-panel)]">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm text-[var(--color-text-tertiary)] hover:bg-[var(--color-card)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <button className="mt-3 w-full rounded-lg bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white transition-all hover:bg-[var(--color-accent-hover)]">
              Submit Tool
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
