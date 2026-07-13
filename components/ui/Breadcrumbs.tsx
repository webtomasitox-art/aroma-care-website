import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="ניווט מיקום" className="font-body text-xs text-charcoal/60 mb-6">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {item.href ? (
              <Link href={item.href} className="hover:text-amber-gold transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-amber-deep">{item.label}</span>
            )}
            {i < items.length - 1 && <span className="mx-1 text-charcoal/30">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
