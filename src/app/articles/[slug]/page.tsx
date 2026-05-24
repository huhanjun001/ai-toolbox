import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { articles, getArticleBySlug } from '@/lib/tools';

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedArticles = articles.filter((a) => a.id !== article.id).slice(0, 3);

  // Simple markdown-like rendering: split by double newlines and format headings
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('## ')) {
        return (
          <h2 key={i} className="mt-8 mb-4 text-xl font-bold text-[var(--color-text-primary)]">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('**')) {
        const text = line.replace(/\*\*/g, '');
        return (
          <p key={i} className="mt-6 mb-2 font-semibold text-[var(--color-text-primary)]">
            {text}
          </p>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="ml-6 text-[var(--color-text-tertiary)] leading-relaxed">
            {line.replace('- ', '')}
          </li>
        );
      }
      if (line.trim() === '') return <br key={i} />;
      return (
        <p key={i} className="text-[var(--color-text-tertiary)] leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-page)]">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--color-text-primary)] transition-colors">
              Home
            </Link>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/articles" className="hover:text-[var(--color-text-primary)] transition-colors">
              Articles
            </Link>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[var(--color-text-tertiary)] truncate">{article.title}</span>
          </nav>
        </div>

        {/* Article */}
        <article className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-card)] text-2xl">
                {article.image}
              </span>
              <div>
                <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                  <span className="rounded-md border border-[var(--color-border)] bg-[var(--color-card)] px-2 py-0.5">
                    {article.category}
                  </span>
                  <span>{article.readTime}</span>
                </div>
                <h1 className="mt-2 text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl leading-tight">
                  {article.title}
                </h1>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] border-b border-[var(--color-border)] pb-6">
              <span className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-accent)]/20 text-xs text-[var(--color-accent-hover)] font-medium">
                  {article.author.charAt(0)}
                </span>
                {article.author}
              </span>
              <span>{article.date}</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div className="space-y-1">{renderContent(article.content)}</div>
          </div>

          {/* Tags */}
          <div className="mt-10 flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1 text-xs text-[var(--color-text-muted)]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Share */}
          <div className="mt-8 flex items-center gap-3">
            <span className="text-sm text-[var(--color-text-muted)]">Share this article:</span>
            {['Twitter', 'LinkedIn', 'Copy Link'].map((action) => (
              <button
                key={action}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-xs text-[var(--color-text-tertiary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)] transition-all"
              >
                {action}
              </button>
            ))}
          </div>
        </article>

        {/* Related Articles */}
        <div className="border-t border-[var(--color-border)] bg-[var(--color-panel)]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-8">Related Articles</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
