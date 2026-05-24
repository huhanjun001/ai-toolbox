import Link from 'next/link';
import { Article } from '@/lib/tools';

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-all duration-300 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-card-hover)] hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5"
    >
      {/* Icon + Meta */}
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-panel)] text-lg">
          {article.image}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <span className="rounded-md border border-[var(--color-border)] bg-[var(--color-panel)] px-2 py-0.5">
              {article.category}
            </span>
            <span>{article.readTime}</span>
          </div>
          <h3 className="mt-2 text-base font-semibold text-[var(--color-text-primary)] leading-snug group-hover:text-[var(--color-accent-hover)] transition-colors line-clamp-2">
            {article.title}
          </h3>
        </div>
      </div>

      {/* Excerpt */}
      <p className="mt-3 text-sm text-[var(--color-text-tertiary)] leading-relaxed line-clamp-2">
        {article.excerpt}
      </p>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-3">
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)]/20 text-[10px] text-[var(--color-accent-hover)] font-medium">
            {article.author.charAt(0)}
          </span>
          {article.author}
        </div>
        <span className="text-xs text-[var(--color-text-muted)]">{article.date}</span>
      </div>
    </Link>
  );
}
