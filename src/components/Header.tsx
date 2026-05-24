'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { name: 'Tools', href: '/#tools' },
  { name: 'Articles', href: '/articles' },
  { name: 'About', href: '/#about' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-page)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-purple-600 text-sm">
            ⚡
          </span>
          <span className="text-lg font-bold bg-gradient-to-r from-[var(--color-accent)] to-purple-400 bg-clip-text text-transparent">
            AI Toolbox
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search icon */}
          <button className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-card)] transition-all">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {/* Submit button */}
          <button className="rounded-lg bg-gradient-to-r from-[var(--color-accent)] to-indigo-500 px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg hover:shadow-[var(--color-accent)]/25">
            Submit Tool
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                className="block rounded-lg px-4 py-3 text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-card)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <button className="mt-3 w-full rounded-lg bg-gradient-to-r from-[var(--color-accent)] to-indigo-500 px-5 py-3 text-sm font-medium text-white transition-all hover:from-indigo-500 hover:to-purple-500">
              Submit Tool
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
