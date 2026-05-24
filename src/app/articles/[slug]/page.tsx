import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { articles, getArticleBySlug } from '@/lib/tools';

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inList = false;
  const listItems: React.ReactNode[] = [];

  lines.forEach((line, i) => {
    if (line.startsWith('## ')) {
      if (inList) {
        elements.push(<ul key={`list-${i}`} className="space-y-1.5 mb-6">{listItems}</ul>);
        listItems.length = 0;
        inList = false;
      }
      elements.push(
        <h2 key={`h2-${i}`} className="mt-8 mb-3 text-lg font-bold text-[var(--color-text-primary)]">
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      if (inList) {
        elements.push(<ul key={`list-${i}`} className="space-y-1.5 mb-6">{listItems}</ul>);
        listItems.length = 0;
        inList = false;
      }
      elements.push(
        <p key={`bold-${i}`} className="mt-4 mb-2 text-sm font-semibold text-[var(--color-text-primary)]">
          {line.replace(/\*\*/g, '')}
        </p>
      );
    } else if (line.startsWith('- ')) {
      inList = true;
      listItems.push(
        <li key={`li-${i}`} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-text-muted)]" />
          {line.replace('- ', '')}
        </li>
      );
    } else if (line.trim() === '') {
      if (inList) {
        elements.push(<ul key={`list-${i}`} className="space-y-1.5 mb-6">{listItems}</ul>);
        listItems.length = 0;
        inList = false;
      }
    } else {
      if (inList) {
        elements.push(<ul key={`list-${i}`} className="space-y-1.5 mb-6">{listItems}</ul>);
        listItems.length = 0;
        inList = false;
      }
      elements.push(
        <p key={`p-${i}`} className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
          {line}
        </p>
      );
    }
  });

  if (inList) {
    elements.push(<ul key="list-end" className="space-y-1.5 mb-6">{listItems}</ul>);
  }

  return elements;
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedArticles = articles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--color-page)]">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--color-text-primary)] transition-colors">Home</Link>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/articles" className="hover:text-[var(--color-text-primary)] transition-colors">Articles</Link>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[var(--color-text-secondary)] truncate">{article.title}</span>
          </nav>
        </div>

        {/* Article */}
        <article className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-card)] text-xl">
                {article.image}
              </span>
              <div>
                <div className="flex items-center gap-2 text-[10px] text-[var(--color-text-muted)]">
                  <span
                    className="rounded-md px-2 py-0.5 text-[10px] font-medium text-[var(--color-accent-hover)]"
                    style={{ background: 'rgba(99,102,241,0.1)' }}
                  >
                    {article.category}
                  </span>
                  <span>{article.readTime}</span>
                </div>
                <h1 className="mt-2 text-xl font-bold text-[var(--color-text-primary)] sm:text-2xl leading-tight">
                  {article.title}
                </h1>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] border-b border-[var(--color-border)] pb-5">
              <span className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)]/20 text-[9px] text-[var(--color-accent-hover)] font-medium">
                  {article.author.charAt(0)}
                </span>
                {article.author}
              </span>
              <span>{article.date}</span>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-none">
            {renderContent(article.content)}
          </div>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-1.5 border-t border-[var(--color-border)] pt-5">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md px-2.5 py-1 text-[10px] text-[var(--color-accent-hover)]"
                style={{ background: 'rgba(99,102,241,0.1)' }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Share */}
          <div className="mt-6 flex items-center gap-3">
            <span className="text-xs text-[var(--color-text-muted)]">Share:</span>
            {['Twitter', 'LinkedIn', 'Copy Link'].map((action) => (
              <button
                key={action}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-[10px] text-[var(--color-text-muted)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)] transition-all"
              >
                {action}
              </button>
            ))}
          </div>
        </article>

        {/* Related Articles */}
        <div className="border-t border-[var(--color-border)] bg-[var(--color-panel)]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="text-base font-bold text-[var(--color-text-primary)] mb-6">Related Articles</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
