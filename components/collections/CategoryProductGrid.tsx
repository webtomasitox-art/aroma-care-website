"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

type SortOption = "default" | "price-asc" | "price-desc" | "name";

export function CategoryProductGrid({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortOption>("default");

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "name":
        return list.sort((a, b) => a.name.localeCompare(b.name, "he"));
      default:
        return list;
    }
  }, [products, sort]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <p className="font-body text-sm text-charcoal/60">{products.length} מוצרים</p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="font-body text-sm border border-amber-gold/30 rounded-sm px-3 py-2 bg-white"
        >
          <option value="default">מיון: מומלץ</option>
          <option value="price-asc">מחיר: מהנמוך לגבוה</option>
          <option value="price-desc">מחיר: מהגבוה לנמוך</option>
          <option value="name">שם</option>
        </select>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-heading text-lg text-amber-deep mb-2">אין מוצרים להצגה כרגע</p>
          <p className="font-body text-sm text-charcoal/60">נסו קטגוריה אחרת או חזרו לעמוד הבית.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
