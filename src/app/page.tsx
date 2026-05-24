import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import { tools, articles, categories, getPopularTools } from '@/lib/tools';

export default function HomePage() {
  const popularTools = getPopularTools(6);
  const latestArticles = articles.slice(0, 4);
  const featuredTool = tools.find((t) => t.slug === 'chatgpt')!;

  return (
    <div className="min-h-screen bg-[var(--color-page)]">
      <Header />

      <main>
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden border-b border-[var(--color-border)]">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0 select-none">
            <div className="absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[var(--color-accent)]/5 blur-[120px]" />
            <div className="absolute -top-20 left-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-purple-500/5 blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
            <div className="text-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-1.5 text-xs text-[var(--color-text-secondary)]">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                🎯 500+ AI Tools Curated
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
                Discover the{' '}
                <span className="bg-gradient-to-r from-[var(--color-accent)] via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Best AI Tools
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base text-[var(--color-text-muted)] sm:text-lg">
                Curated, compared, and reviewed. Find the perfect AI tool for your workflow.
              </p>

              {/* Search bar */}
              <div className="mx-auto mt-8 max-w-lg">
                <div className="relative">
                  <svg
                    className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search 500+ AI tools..."
                    readOnly
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] py-3.5 pl-11 pr-4 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none transition-all focus:border-[var(--color-accent)]/50 focus:ring-2 focus:ring-[var(--color-accent)]/20 cursor-pointer"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="mx-auto mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-[var(--color-text-muted)]">
                <span>500+ Tools</span>
                <span className="hidden sm:inline">·</span>
                <span>50+ Articles</span>
                <span className="hidden sm:inline">·</span>
                <span>11 Categories</span>
                <span className="hidden sm:inline">·</span>
                <span>Weekly Updates</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============ CATEGORIES ============ */}
        <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] sm:text-2xl">Browse Categories</h2>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">Find AI tools by category</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {categories.map((cat) => {
              const count = tools.filter((t) => t.category === cat.name).length;
              return (
                <div
                  key={cat.name}
                  className="group cursor-pointer rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{cat.icon}</span>
                    <div className="text-left">
                      <span className="block text-xs font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-hover)] transition-colors">
                        {cat.name}
                      </span>
                      <span className="block text-[10px] text-[var(--color-text-muted)] mt-0.5">{count} tools</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============ FEATURED TODAY ============ */}
        <section className="border-t border-[var(--color-border)] bg-[var(--color-panel)]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-[var(--color-accent-hover)] font-medium mb-1">
                  <span className="flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                  Featured Today
                </div>
                <h2 className="text-xl font-bold text-[var(--color-text-primary)] sm:text-2xl">Spotlight</h2>
              </div>
              <Link
                href={`/tools/${featuredTool.slug}`}
                className="hidden sm:inline-flex items-center gap-1 text-xs text-[var(--color-accent-hover)] hover:text-[var(--color-accent)] transition-colors"
              >
                View Details
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden">
              <div className="grid md:grid-cols-5">
                {/* Left: Info */}
                <div className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-panel)] text-xl">
                      {featuredTool.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-[var(--color-text-primary)]">{featuredTool.name}</h3>
                        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-emerald-400">
                          FEATURED
                        </span>
                      </div>
                      <span className="text-[10px] text-[var(--color-text-muted)]">{featuredTool.category}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{featuredTool.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {featuredTool.features.slice(0, 4).map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[10px] text-[var(--color-accent-hover)]"
                        style={{ background: 'rgba(99,102,241,0.1)' }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-4">
                    <Link
                      href={`/tools/${featuredTool.slug}`}
                      className="rounded-lg bg-gradient-to-r from-[var(--color-accent)] to-indigo-500 px-5 py-2 text-xs font-medium text-white transition-all hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg hover:shadow-[var(--color-accent)]/25"
                    >
                      Learn More
                    </Link>
                    <span className="text-[10px] text-[var(--color-text-muted)]">
                      ⭐ {featuredTool.rating} · {featuredTool.priceType}
                    </span>
                  </div>
                </div>
                {/* Right: Visual */}
                <div className="hidden md:flex md:col-span-2 items-center justify-center bg-gradient-to-br from-[var(--color-accent)]/10 to-purple-500/5 p-8">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[var(--color-accent)]/20 blur-3xl" />
                    <span className="relative block text-7xl">{featuredTool.icon}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ POPULAR TOOLS ============ */}
        <section id="tools" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] sm:text-2xl">Popular Tools</h2>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">Most visited AI tools this month</p>
            </div>
            <Link
              href="/#tools"
              className="hidden sm:inline-flex items-center gap-1 text-xs text-[var(--color-accent-hover)] hover:text-[var(--color-accent)] transition-colors"
            >
              View All
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* ============ LATEST ARTICLES ============ */}
        <section className="border-t border-[var(--color-border)] bg-[var(--color-panel)]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-[var(--color-text-primary)] sm:text-2xl">Latest Articles</h2>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">AI tool comparisons, guides & reviews</p>
              </div>
              <Link
                href="/articles"
                className="hidden sm:inline-flex items-center gap-1 text-xs text-[var(--color-accent-hover)] hover:text-[var(--color-accent)] transition-colors"
              >
                View All
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {latestArticles.slice(0, 4).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>

        {/* ============ NEWSLETTER ============ */}
        <section id="newsletter">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-8 sm:p-12">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--color-accent)]/5 blur-[100px]" />
              <div className="pointer-events-none absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-purple-500/5 blur-[80px]" />
              <div className="relative mx-auto max-w-lg text-center">
                <span className="text-3xl">📬</span>
                <h2 className="mt-4 text-xl font-bold text-[var(--color-text-primary)] sm:text-2xl">
                  Stay Ahead of the AI Curve
                </h2>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  Get weekly updates on the latest AI tools, comparisons, and tips delivered to your inbox.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    readOnly
                    className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none focus:border-[var(--color-accent)]/50 focus:ring-2 focus:ring-[var(--color-accent)]/20"
                  />
                  <button className="rounded-lg bg-gradient-to-r from-[var(--color-accent)] to-indigo-500 px-6 py-2.5 text-sm font-medium text-white transition-all hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg hover:shadow-[var(--color-accent)]/25 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
                <p className="mt-3 text-[10px] text-[var(--color-text-muted)]">No spam. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
