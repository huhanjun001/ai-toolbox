import Link from 'next/link';
import { Tool } from '@/lib/tools';

const priceColors: Record<string, string> = {
  free: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  freemium: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  paid: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const ratingStars = Math.round(tool.rating);

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group block rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5"
    >
      {/* Header: icon + name + price badge + rating */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-panel)] text-lg shrink-0">
            {tool.icon}
          </span>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-hover)] transition-colors leading-tight">
              {tool.name}
            </h3>
            <span
              className={`inline-block mt-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${priceColors[tool.priceType]}`}
            >
              {tool.priceType}
            </span>
          </div>
        </div>
        {/* Star rating */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-xs font-semibold text-[var(--color-text-primary)]">{tool.rating}</span>
          <span className="text-yellow-400 text-xs">★</span>
        </div>
      </div>

      {/* Description - truncated to 1 line */}
      <p className="mt-3 text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-1">
        {tool.shortDesc}
      </p>

      {/* Feature tags (2-3 pills) */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tool.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md px-2 py-0.5 text-[10px] text-[var(--color-accent-hover)]"
            style={{ background: 'rgba(99,102,241,0.1)' }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom: category badge + visit count */}
      <div className="mt-3 flex items-center justify-between border-t border-[var(--color-border)] pt-3">
        <span className="text-[10px] text-[var(--color-text-muted)]">{tool.category}</span>
        <span className="text-[10px] text-[var(--color-text-muted)]">
          {tool.visitCount >= 1000000
            ? `${(tool.visitCount / 1000000).toFixed(1)}M`
            : `${(tool.visitCount / 1000).toFixed(0)}K`}{' '}
          visits
        </span>
      </div>
    </Link>
  );
}
