"use client";

import { getWixClient } from "@/lib/wix/client";

function buildImportedName(name: string, nameEn?: string | null) {
  return nameEn ? `${name} | ${nameEn}` : name;
}

/**
 * בודק את מצב המלאי האמיתי ב-Wix עבור מוצר, לפי שם.
 * מחזיר null אם לא הצלחנו לבדוק (למשל המוצר לא נמצא) - במקרה כזה
 * הרכיב שקורא לפונקציה הזו אמור להישאר עם מצב המלאי שכבר יש לו (mock).
 */
export async function checkLiveStock(
  name: string,
  nameEn?: string | null
): Promise<boolean | null> {
  try {
    const client = getWixClient();
    const searchName = buildImportedName(name, nameEn);
    const result = await client.products.queryProducts().eq("name", searchName).find();
    const match = result.items?.[0] as
      | { stock?: { inStock?: boolean; quantity?: number } }
      | undefined;

    if (!match) return null;
    if (typeof match.stock?.inStock === "boolean") {
      return match.stock.inStock;
    }
    return null;
  } catch (err) {
    console.error("שגיאה בבדיקת מלאי חי מ-Wix:", err);
    return null;
  }
}
