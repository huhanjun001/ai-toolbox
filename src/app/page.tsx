import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import { tools, articles, categories, getPopularTools } from '@/lib/tools';

export default function HomePage() {
  const popularTools = getPopularTools(8);
  const latestArticles = articles.slice(0, 3);
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

          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="text-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-1.5 text-sm text-[var(--color-text-tertiary)]">
                <span className="flex h-2 w-2 rounded-full bg-[var(--color-success)]" />
                500+ Tools Curated
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-accent-hover)] to-[var(--color-accent)] bg-clip-text text-transparent">
                  Discover the Best
                </span>
                <br />
                <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent">
                  AI Tools
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-tertiary)] sm:text-xl">
                10x your productivity with the right AI tools. Curated, compared, and reviewed — find your perfect AI
                companion.
              </p>

              {/* Search bar */}
              <div className="mx-auto mt-10 max-w-xl">
                <div className="relative">
                  <svg
                    className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-muted)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search AI tools..."
                    readOnly
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] py-4 pl-12 pr-4 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none transition-all focus:border-[var(--color-accent)]/50 focus:ring-2 focus:ring-[var(--color-accent)]/20 cursor-pointer"
                  />
                  <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 rounded-md border border-[var(--color-border)] bg-[var(--color-panel)] px-2 py-1 text-[10px] text-[var(--color-text-muted)]">
                    ⌘K
                  </kbd>
                </div>
              </div>

              {/* Stats */}
              <div className="mx-auto mt-12 flex flex-wrap justify-center gap-8 sm:gap-12">
                {[
                  { value: '500+', label: 'Tools' },
                  { value: '50+', label: 'Articles' },
                  { value: '11', label: 'Categories' },
                  { value: 'Weekly', label: 'Updates' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">{stat.value}</div>
                    <div className="mt-1 text-sm text-[var(--color-text-muted)]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ CATEGORIES ============ */}
        <section id="categories" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">Browse Categories</h2>
              <p className="mt-2 text-sm text-[var(--color-text-tertiary)]">Find AI tools by category</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="group cursor-pointer rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 text-center transition-all duration-300 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-card-hover)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
              >
                <span className="text-2xl sm:text-3xl block">{cat.icon}</span>
                <span className="mt-2 block text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ============ FEATURED TODAY ============ */}
        <section className="border-t border-[var(--color-border)] bg-[var(--color-panel)]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 text-sm text-[var(--color-accent-hover)] font-medium mb-2">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Featured Today
                </div>
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">Spotlight</h2>
              </div>
              <Link
                href={`/tools/${featuredTool.slug}`}
                className="hidden sm:inline-flex items-center gap-1 text-sm text-[var(--color-accent-hover)] hover:text-[var(--color-accent)] transition-colors"
              >
                View Details
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Left: Info */}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-panel)] text-2xl">
                      {featuredTool.icon}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{featuredTool.name}</h3>
                      <span className="text-xs text-[var(--color-text-muted)]">{featuredTool.category}</span>
                    </div>
                  </div>
                  <p className="text-[var(--color-text-tertiary)] leading-relaxed">{featuredTool.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {featuredTool.features.slice(0, 4).map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)]"
                      >
                        <svg className="h-3 w-3 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center gap-4">
                    <Link
                      href={`/tools/${featuredTool.slug}`}
                      className="rounded-lg bg-[var(--color-accent)] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[var(--color-accent-hover)]"
                    >
                      Learn More
                    </Link>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      ⭐ {featuredTool.rating} · {featuredTool.priceType}
                    </span>
                  </div>
                </div>
                {/* Right: Visual */}
                <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[var(--color-accent)]/10 to-purple-500/5 p-10">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[var(--color-accent)]/20 blur-3xl" />
                    <span className="relative block text-8xl">{featuredTool.icon}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ POPULAR TOOLS ============ */}
        <section id="popular" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">Popular Tools</h2>
              <p className="mt-2 text-sm text-[var(--color-text-tertiary)]">Most visited AI tools this month</p>
            </div>
            <Link
              href="/#tools"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-[var(--color-accent-hover)] hover:text-[var(--color-accent)] transition-colors"
            >
              View All
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* ============ LATEST ARTICLES ============ */}
        <section className="border-t border-[var(--color-border)] bg-[var(--color-panel)]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">Latest Articles</h2>
                <p className="mt-2 text-sm text-[var(--color-text-tertiary)]">AI tool comparisons, guides & reviews</p>
              </div>
              <Link
                href="/articles"
                className="hidden sm:inline-flex items-center gap-1 text-sm text-[var(--color-accent-hover)] hover:text-[var(--color-accent)] transition-colors"
              >
                All Articles
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>

        {/* ============ NEWSLETTER ============ */}
        <section id="newsletter" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-card)] via-[var(--color-card)] to-[var(--color-accent)]/5 p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--color-accent)]/5 blur-[100px]" />
            <div className="relative">
              <div className="mx-auto max-w-xl text-center">
                <span className="text-3xl">📬</span>
                <h2 className="mt-4 text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
                  Stay Ahead of the AI Curve
                </h2>
                <p className="mt-3 text-sm text-[var(--color-text-tertiary)]">
                  Get weekly updates on the latest AI tools, comparisons, and tips delivered to your inbox.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    readOnly
                    className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none focus:border-[var(--color-accent)]/50 focus:ring-2 focus:ring-[var(--color-accent)]/20"
                  />
                  <button className="rounded-xl bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[var(--color-accent-hover)] hover:shadow-lg hover:shadow-[var(--color-accent)]/25">
                    Subscribe
                  </button>
                </div>
                <p className="mt-4 text-xs text-[var(--color-text-muted)]">No spam. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
