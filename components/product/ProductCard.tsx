"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { trackEvent } from "@/lib/analytics/events";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  index?: number;
  featured?: boolean;
}

export function ProductCard({ product, index, featured = false }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const hasVariants = !!product.variants && product.variants.length > 0;
  const numberTag = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      nameEn: product.nameEn,
      price: product.price,
      quantity: 1,
      image: product.mainImage,
    });
    trackEvent("add_to_cart", { productId: product.id, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className={`group block ${featured ? "md:col-span-2" : ""}`}
    >
      <div
        className={`relative overflow-hidden bg-warmWhite rounded-[3px] ${
          featured ? "aspect-[16/10]" : "aspect-[4/5]"
        }`}
      >
        <Image
          src={product.mainImage}
          alt={product.name}
          fill
          sizes={featured ? "100vw" : "(max-width: 768px) 50vw, 25vw"}
          className="object-contain p-6 md:p-10 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        {numberTag && (
          <span className="absolute top-3 right-3 font-label text-[10px] tracking-[0.15em] text-copper">
            N&deg;{numberTag}
          </span>
        )}

        {/* Quick Add - hover on desktop, always visible small link on mobile */}
        {!hasVariants && (
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-label text-[11px] tracking-[0.1em] bg-amber-deep text-cream px-4 py-2 rounded-[2px]"
          >
            {added ? "נוסף" : "+ הוסיפי לסל"}
          </button>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-heading text-[15px] text-charcoal leading-snug">{product.name}</p>
          {(product.nameEn || product.latinName) && (
            <p className="ltr-inline font-accent italic text-[13px] text-copper mt-0.5">
              {product.latinName ?? product.nameEn}
            </p>
          )}
        </div>
        <span className="font-body text-sm text-charcoal/70 shrink-0 mt-0.5">{product.price} ₪</span>
      </div>

      {(product.volume || hasVariants) && (
        <p className="font-label text-[10px] text-charcoal/40 mt-1">
          {hasVariants ? "מספר נפחים לבחירה" : product.volume}
        </p>
      )}
    </Link>
  );
}
