import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { articles } from '@/lib/tools';

export default function ArticlesPage() {
  const categories = ['All', ...new Set(articles.map((a) => a.category))];

  return (
    <div className="min-h-screen bg-[var(--color-page)]">
      <Header />
      <main>
        {/* Breadcrumb + Header */}
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--color-text-primary)] transition-colors">Home</Link>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[var(--color-text-secondary)]">Articles</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
              Articles & Guides
            </h1>
            <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-2xl">
              In-depth comparisons, reviews, and guides to help you navigate the AI tools landscape and make informed decisions.
            </p>
          </div>
        </div>

        {/* Category filter pills */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  cat === 'All'
                    ? 'border-[var(--color-accent)]/50 bg-[var(--color-accent)]/10 text-[var(--color-accent-hover)]'
                    : 'border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-muted)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-secondary)]'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Articles grid */}
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
