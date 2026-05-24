import Link from 'next/link';
import { Tool } from '@/lib/tools';

export default function ToolCard({ tool }: { tool: Tool }) {
  const ratingStars = Math.round(tool.rating);
  const priceColors: Record<string, string> = {
    free: 'text-[var(--color-success)] border-[var(--color-success)]/30 bg-[var(--color-success)]/10',
    freemium: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    paid: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  };

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group block rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-all duration-300 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-card-hover)] hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-panel)] text-xl">
            {tool.icon}
          </span>
          <div>
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-hover)] transition-colors">
              {tool.name}
            </h3>
            <span
              className={`inline-block mt-1 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                priceColors[tool.priceType]
              }`}
            >
              {tool.priceType}
            </span>
          </div>
        </div>
        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-[var(--color-text-primary)]">{tool.rating}</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`h-3.5 w-3.5 ${i < ratingStars ? 'text-yellow-400' : 'text-[var(--color-text-muted)]'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-[var(--color-text-tertiary)] leading-relaxed line-clamp-2">
        {tool.shortDesc}
      </p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {tool.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-[var(--color-panel)] px-2.5 py-1 text-[11px] text-[var(--color-text-muted)] border border-[var(--color-border)]"
          >
            {tag}
          </span>
        ))}
        {tool.tags.length > 3 && (
          <span className="rounded-md bg-[var(--color-panel)] px-2.5 py-1 text-[11px] text-[var(--color-text-muted)]">
            +{tool.tags.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-3">
        <span className="text-xs text-[var(--color-text-muted)]">{tool.category}</span>
        <span className="text-xs text-[var(--color-text-muted)]">
          {tool.visitCount >= 1000000
            ? `${(tool.visitCount / 1000000).toFixed(1)}M visits`
            : `${(tool.visitCount / 1000).toFixed(0)}K visits`}
        </span>
      </div>
    </Link>
  );
}
