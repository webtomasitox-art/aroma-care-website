"use client";

import { useState, useMemo, Fragment } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { CategoryContentTile } from "@/components/collections/CategoryContentTile";
import type { Product } from "@/types/product";

type SortOption = "default" | "price-asc" | "price-desc" | "name";

export function CategoryProductGrid({
  products,
  contentLine,
}: {
  products: Product[];
  contentLine?: string;
}) {
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
      <div className="flex items-center justify-between mb-10 pb-4 border-b border-charcoal/10">
        <p className="font-body text-sm text-charcoal/50">{products.length} מוצרים</p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="font-body text-sm bg-transparent border-0 border-b border-charcoal/20 rounded-none px-0 py-1 focus:outline-none focus:border-copper cursor-pointer"
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-14 md:gap-y-16">
          {sorted.map((p, i) => (
            <Fragment key={p.id}>
              <ProductCard product={p} index={i} featured={i === 0} />
              {contentLine && i === 4 && (
                <div className="col-span-2 md:col-span-1 flex items-center">
                  <CategoryContentTile line={contentLine} />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
