import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { articles } from '@/lib/tools';

export default function ArticlesPage() {
  const categories = [...new Set(articles.map((a) => a.category))];

  return (
    <div className="min-h-screen bg-[var(--color-page)]">
      <Header />
      <main>
        {/* Breadcrumb + Header */}
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--color-text-primary)] transition-colors">
              Home
            </Link>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[var(--color-text-tertiary)]">Articles</span>
          </nav>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Articles & Guides
            </h1>
            <p className="mt-3 text-[var(--color-text-tertiary)] max-w-2xl">
              In-depth comparisons, reviews, and guides to help you navigate the AI tools landscape and make informed
              decisions.
            </p>
          </div>
        </div>

        {/* Category filter pills */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-lg border border-[var(--color-accent)]/50 bg-[var(--color-accent)]/10 px-4 py-2 text-sm font-medium text-[var(--color-accent-hover)]">
              All
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-sm text-[var(--color-text-tertiary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-secondary)] transition-all cursor-pointer"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Articles grid */}
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
