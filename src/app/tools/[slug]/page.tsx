import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';
import { tools, getToolBySlug, getToolsByCategory } from '@/lib/tools';

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

const priceColors: Record<string, string> = {
  free: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  freemium: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  paid: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
};

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const relatedTools = getToolsByCategory(tool.category).filter((t) => t.id !== tool.id).slice(0, 3);
  const ratingStars = Math.round(tool.rating);

  return (
    <div className="min-h-screen bg-[var(--color-page)]">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <Link href="/" className="hover:text-[var(--color-text-primary)] transition-colors">Home</Link>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/#tools" className="hover:text-[var(--color-text-primary)] transition-colors">{tool.category}</Link>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[var(--color-text-secondary)]">{tool.name}</span>
          </nav>
        </div>

        {/* Tool Hero */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              {/* Icon */}
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-panel)] text-3xl shrink-0">
                {tool.icon}
              </span>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-xl font-bold text-[var(--color-text-primary)] sm:text-2xl">{tool.name}</h1>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${priceColors[tool.priceType]}`}>
                    {tool.priceType}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-4 text-xs text-[var(--color-text-muted)] flex-wrap">
                  <span className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-semibold text-[var(--color-text-primary)]">{tool.rating}</span>
                  </span>
                  <span>{tool.category}</span>
                  <span>
                    {tool.visitCount >= 1000000
                      ? `${(tool.visitCount / 1000000).toFixed(1)}M visits`
                      : `${(tool.visitCount / 1000).toFixed(0)}K visits`}
                  </span>
                  <span className="text-[var(--color-text-muted)]">{tool.price}</span>
                </div>

                <p className="mt-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">{tool.description}</p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md px-2.5 py-1 text-[10px] text-[var(--color-accent-hover)]"
                      style={{ background: 'rgba(99,102,241,0.1)' }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[var(--color-accent)] to-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-all hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg hover:shadow-[var(--color-accent)]/25"
                  >
                    Visit Website
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features + Pros/Cons */}
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Features */}
            <div className="lg:col-span-2">
              <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-3">Key Features</h2>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
                <ul className="space-y-2.5">
                  {tool.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pros & Cons */}
            <div>
              <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-3">Pros & Cons</h2>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
                <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Pros</h3>
                <ul className="space-y-2">
                  {tool.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                      <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {pro}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                  <h3 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Cons</h3>
                  <ul className="space-y-2">
                    {tool.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                        <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <div className="mt-12">
              <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-5">
                More in {tool.category}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {relatedTools.map((t) => (
                  <ToolCard key={t.id} tool={t} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
