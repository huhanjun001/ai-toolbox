import Link from 'next/link';
import { Article } from '@/lib/tools';

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5"
    >
      {/* Category badge + emoji */}
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-panel)] text-sm">
          {article.image}
        </span>
        <span
          className="rounded-md px-2 py-0.5 text-[10px] font-medium text-[var(--color-accent-hover)]"
          style={{ background: 'rgba(99,102,241,0.1)' }}
        >
          {article.category}
        </span>
        <span className="text-[10px] text-[var(--color-text-muted)] ml-auto">{article.readTime}</span>
      </div>

      {/* Title */}
      <h3 className="mt-3 text-sm font-semibold text-[var(--color-text-primary)] leading-snug group-hover:text-[var(--color-accent-hover)] transition-colors line-clamp-2">
        {article.title}
      </h3>

      {/* Excerpt - 2 lines */}
      <p className="mt-2 text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
        {article.excerpt}
      </p>

      {/* Footer: author + date */}
      <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-3">
        <div className="flex items-center gap-2 text-[10px] text-[var(--color-text-muted)]">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)]/20 text-[9px] text-[var(--color-accent-hover)] font-medium">
            {article.author.charAt(0)}
          </span>
          {article.author}
        </div>
        <span className="text-[10px] text-[var(--color-text-muted)]">{article.date}</span>
      </div>
    </Link>
  );
}
