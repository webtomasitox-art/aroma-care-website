import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // "פס המרכיב" - האלמנט הייחודי מהקונספט: 2-3 רכיבים אמיתיים מתחת לשם
  const featuredIngredients = product.ingredients?.slice(0, 2) ?? [];

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block bg-cream rounded-xl p-4 border border-amber-gold/15 hover:border-amber-gold/40 transition-colors duration-300"
    >
      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-white mb-4">
        <Image
          src={product.mainImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <p className="font-heading text-[15px] text-amber-deep leading-snug">{product.name}</p>
      {product.nameEn && (
        <p className="ltr-inline font-accent italic text-xs text-amber-gold mt-0.5">
          {product.nameEn}
        </p>
      )}

      {featuredIngredients.length > 0 && (
        <p className="font-label text-[10px] tracking-wide text-olive mt-2">
          {featuredIngredients.join(" · ")}
        </p>
      )}

      <div className="flex items-center justify-between mt-3">
        <span className="font-body text-sm font-medium text-charcoal">{product.price} ₪</span>
        {product.volume && (
          <span className="font-label text-[11px] text-charcoal/50">{product.volume}</span>
        )}
      </div>
    </Link>
  );
}
