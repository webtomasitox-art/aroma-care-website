/**
 * חיבור ל-Wix Headless.
 *
 * הקוד הזה משתמש ב-Client ID כדי לדבר עם Wix Stores ו-Wix eCommerce.
 * זה לא קובע מאיפה מגיעים המוצרים לתצוגה באתר (זה נשאר ב-mocks/products.json) -
 * זה משמש רק לרגע התשלום: לבנות עגלה אצל Wix ולקבל קישור לתשלום מאובטח.
 *
 * TODO: לא נבדק מול חשבון Wix אמיתי בסביבת הפיתוח הזו (אין גישת אינטרנט כאן) -
 * יש לבדוק בפועל אחרי הדיפלוי ולתקן יחד אם יש שגיאות, בדיוק כמו שעשינו עם Netlify.
 */

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products } from "@wix/stores";
import { currentCart, checkout } from "@wix/ecom";

// המזהה הקבוע של אפליקציית Wix Stores - נדרש בכל הפניה למוצר מהקטלוג
export const WIX_STORES_APP_ID = "215238eb-22a5-4c36-9e7b-e7c08025e04e";

let wixClient: ReturnType<typeof createClient> | null = null;

export function getWixClient() {
  if (wixClient) return wixClient;

  const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID;

  if (!clientId) {
    throw new Error(
      "NEXT_PUBLIC_WIX_CLIENT_ID חסר. הוסיפו אותו במשתני הסביבה של Netlify כדי לאפשר תשלום דרך Wix."
    );
  }

  wixClient = createClient({
    modules: { products, currentCart, checkout },
    auth: OAuthStrategy({ clientId }),
  });

  return wixClient;
}
