import Link from 'next/link';

const footerLinks = {
  Tools: [
    { name: 'All Tools', href: '/#tools' },
    { name: 'Popular Tools', href: '/#popular' },
    { name: 'Categories', href: '/#categories' },
    { name: 'Submit Tool', href: '/#submit' },
  ],
  Resources: [
    { name: 'Articles', href: '/articles' },
    { name: 'Comparisons', href: '/articles' },
    { name: 'Ranking', href: '/#popular' },
    { name: 'Newsletter', href: '/#newsletter' },
  ],
  Company: [
    { name: 'About', href: '/#about' },
    { name: 'Privacy', href: '/#privacy' },
    { name: 'Terms', href: '/#terms' },
    { name: 'Contact', href: '/#contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-panel)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <span className="text-lg font-bold bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent">
                AI Toolbox
              </span>
            </Link>
            <p className="mt-4 text-sm text-[var(--color-text-tertiary)] leading-relaxed max-w-xs">
              Curating the best AI tools to help you work smarter, create faster, and stay ahead of the curve.
            </p>
            <div className="mt-6 flex gap-4">
              {['Twitter', 'GitHub', 'Discord'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-xs text-[var(--color-text-tertiary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)] transition-all"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[var(--color-border)] pt-8">
          <p className="text-center text-xs text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} AI Toolbox. All rights reserved. Made with ⚡ for the AI community.
          </p>
        </div>
      </div>
    </footer>
  );
}
