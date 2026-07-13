/**
 * שכבת השירות למוצרים.
 *
 * זהו המקום היחיד שרכיבי ה-UI פונים אליו כדי לקבל נתוני מוצרים.
 * כך, כאשר נתחבר ל-Wix בפועל, נצטרך לשנות קוד רק כאן - לא בכל עמוד ועמוד.
 */

import { DATA_MODE } from "@/config/site";
import type { Product } from "@/types/product";
import mockProducts from "@/mocks/products.json";

export async function getAllProducts(): Promise<Product[]> {
  if (DATA_MODE === "mock") {
    return mockProducts as unknown as Product[];
  }

  // TODO: להשלים לאחר חיבור Wix - שלוף מוצרים אמיתיים דרך lib/wix/client.ts
  throw new Error("WIX LIVE MODE עדיין לא מומש. עברו ל-DATA_MODE=mock או השלימו את lib/wix/client.ts");
}

export async function getProductById(id: string): Promise<Product | null> {
  const list = await getAllProducts();
  return list.find((p) => p.id === id) ?? null;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const list = await getAllProducts();
  return list.filter((p) => p.category === category);
}
