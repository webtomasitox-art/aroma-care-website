"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { trackEvent } from "@/lib/analytics/events";
import type { Product } from "@/types/product";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants?.[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const selectedVariant = product.variants?.find((v) => v.id === selectedVariantId);
  const displayPrice = selectedVariant?.priceOverride ?? product.price;

  useEffect(() => {
    trackEvent("view_item", { productId: product.id, price: displayPrice });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAddToCart() {
    addItem({
      productId: product.id,
      variantId: selectedVariant?.id,
      name: product.name,
      nameEn: product.nameEn,
      variantLabel: selectedVariant?.label,
      price: displayPrice,
      quantity,
      image: product.mainImage,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    trackEvent("add_to_cart", { productId: product.id, quantity });
  }

  return (
    <div>
      <p className="font-heading text-2xl text-amber-deep leading-snug">{product.name}</p>
      {product.nameEn && (
        <p className="ltr-inline font-accent italic text-base text-amber-gold mt-1">
          {product.nameEn}
        </p>
      )}

      {/* תיאור המוצר - מיד מתחת לשם */}
      <p className="font-body text-[15px] text-charcoal/85 leading-[1.8] mt-4">
        {product.shortDescription}
      </p>

      <div className="flex items-baseline gap-3 mt-5">
        <span className="font-body text-2xl font-medium text-charcoal">{displayPrice} ₪</span>
        {!selectedVariant && product.volume && (
          <span className="font-label text-sm text-charcoal/50">{product.volume}</span>
        )}
      </div>

      {product.variants && product.variants.length > 0 && (
        <div className="mt-6">
          <p className="font-body text-xs text-charcoal/60 mb-2">נפח</p>
          <div className="flex gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariantId(v.id)}
                className={`font-body text-sm px-4 py-2 rounded-sm border transition-colors ${
                  v.id === selectedVariantId
                    ? "border-amber-deep bg-amber-deep text-cream"
                    : "border-amber-gold/40 text-charcoal hover:bg-amber-gold/10"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mt-6">
        <div className="flex items-center border border-amber-gold/30 rounded-sm">
          <button
            aria-label="הפחתת כמות"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-9 h-9 text-charcoal hover:bg-amber-gold/10"
          >
            −
          </button>
          <span className="w-8 text-center font-body text-sm">{quantity}</span>
          <button
            aria-label="הוספת כמות"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-9 h-9 text-charcoal hover:bg-amber-gold/10"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex-1 font-body text-sm tracking-wide bg-amber-deep text-cream px-6 py-3 rounded-sm hover:bg-charcoal transition-colors"
        >
          {added ? "נוסף לסל" : "הוסיפי לסל"}
        </button>
      </div>

      <p className="font-label text-[11px] text-olive mt-4">
        {product.inStock ? "במלאי" : "אזל מהמלאי"}
      </p>

      {/* Sticky Add to Cart במובייל בלבד */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-cream/95 backdrop-blur border-t border-amber-gold/20 p-3 flex items-center gap-3">
        <span className="font-body text-sm font-medium text-charcoal shrink-0">
          {displayPrice} ₪
        </span>
        <button
          onClick={handleAddToCart}
          className="flex-1 font-body text-sm tracking-wide bg-amber-deep text-cream px-6 py-3 rounded-sm"
        >
          {added ? "נוסף לסל" : "הוסיפי לסל"}
        </button>
      </div>
    </div>
  );
}
