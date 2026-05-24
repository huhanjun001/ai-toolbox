import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';
import { tools, getToolBySlug, getToolsByCategory } from '@/lib/tools';

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const relatedTools = getToolsByCategory(tool.category).filter((t) => t.id !== tool.id).slice(0, 3);
  const ratingStars = Math.round(tool.rating);

  const priceColors: Record<string, string> = {
    free: 'text-[var(--color-success)] border-[var(--color-success)]/30 bg-[var(--color-success)]/10',
    freemium: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    paid: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  };

  return (
    <div className="min-h-screen bg-[var(--color-page)]">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <Link href="/" className="hover:text-[var(--color-text-primary)] transition-colors">
              Home
            </Link>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/#tools" className="hover:text-[var(--color-text-primary)] transition-colors">
              Tools
            </Link>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[var(--color-text-tertiary)]">{tool.name}</span>
          </nav>
        </div>

        {/* Tool Header */}
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Icon + Info */}
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-panel)] text-3xl">
                    {tool.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">{tool.name}</h1>
                      <span
                        className={`rounded-full border px-3 py-0.5 text-xs font-medium uppercase tracking-wider ${
                          priceColors[tool.priceType]
                        }`}
                      >
                        {tool.priceType}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
                      <span className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${i < ratingStars ? 'text-yellow-400' : 'text-[var(--color-text-muted)]'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 font-semibold text-[var(--color-text-primary)]">{tool.rating}</span>
                      </span>
                      <span>{tool.category}</span>
                      <span>
                        {tool.visitCount >= 1000000
                          ? `${(tool.visitCount / 1000000).toFixed(1)}M visits`
                          : `${(tool.visitCount / 1000).toFixed(0)}K visits`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-6 text-[var(--color-text-tertiary)] leading-relaxed">{tool.description}</p>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] px-3 py-1 text-xs text-[var(--color-text-muted)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[var(--color-accent-hover)] hover:shadow-lg hover:shadow-[var(--color-accent)]/25"
                  >
                    Visit {tool.name}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                  <span className="inline-flex items-center text-sm text-[var(--color-text-muted)]">
                    {tool.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features + Pros/Cons */}
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Features */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Key Features</h2>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
                <ul className="space-y-3">
                  {tool.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pros/Cons */}
            <div>
              {/* Pros */}
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Pros</h2>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 mb-6">
                <ul className="space-y-3">
                  {tool.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Cons</h2>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
                <ul className="space-y-3">
                  {tool.cons.map((con) => (
                    <li key={con} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-red-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <div className="mt-16">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">
                More in {tool.category}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
