"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-amber-gold/15">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-heading text-xl text-amber-deep tracking-wide">
          AROMA CARE
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-body text-sm text-charcoal">
          <Link href="/category/face-care" className="hover:text-amber-gold transition-colors">
            טיפוח פנים
          </Link>
          <Link href="/category/essential-oils" className="hover:text-amber-gold transition-colors">
            שמנים אתריים
          </Link>
          <Link href="/private-label" className="hover:text-amber-gold transition-colors">
            מותג משלכם
          </Link>
          <Link href="/search" className="hover:text-amber-gold transition-colors">
            חיפוש
          </Link>
        </nav>

        <Link
          href="/cart"
          aria-label="סל הקניות"
          className="relative font-body text-sm text-amber-deep border border-amber-gold/40 rounded-sm px-4 py-2 hover:bg-amber-gold/10 transition-colors"
        >
          הסל שלי
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-deep text-cream text-[11px] rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
