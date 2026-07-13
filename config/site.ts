/**
 * הגדרות מרכזיות של האתר.
 *
 * DATA_MODE קובע מאיפה מגיעים נתוני המוצרים:
 * - "mock"  -> קורא מהקובץ /mocks/products.json (בנוי מהאקסל שהלקוח סיפק)
 * - "wix"   -> קורא בזמן אמת מ-Wix Stores / Wix eCommerce
 *
 * כרגע Wix עדיין לא מחובר, לכן ברירת המחדל היא "mock".
 * כאשר יהיו פרטי חיבור ל-Wix (ראו README.md), משנים כאן ל-"wix" בלבד.
 */

export type DataMode = "mock" | "wix";

export const DATA_MODE: DataMode = (process.env.NEXT_PUBLIC_DATA_MODE as DataMode) || "mock";

export const siteConfig = {
  name: "AROMA CARE",
  defaultLocale: "he",
  direction: "rtl" as const,
  currency: "ILS",
  currencySymbol: "₪",
  // TODO: חסר מידע מהלקוח - מספר WhatsApp לכפתור יצירת קשר מהיר
  whatsappNumber: null as string | null,
  // TODO: חסר מידע מהלקוח - סף משלוח חינם (נראה 199 ש"ח בטקסט השיווקי, לאמת מול הלקוח)
  freeShippingThreshold: null as number | null,
};
