/**
 * חיבור ל-Wix Headless.
 *
 * הקובץ הזה עדיין לא פעיל בפועל - הוא מוכן לשלב שבו יתקבלו פרטי החיבור מהלקוח:
 * - WIX_CLIENT_ID
 * - WIX_API_KEY (אם נדרש עבור פעולות בצד שרת)
 * - WIX_SITE_ID
 *
 * כל עוד הפרטים האלה לא קיימים ב-.env, המערכת פועלת ב-MOCK MODE
 * (ראו config/site.ts ו-mocks/products.json).
 *
 * TODO: להשלים לאחר קבלת Credentials מהלקוח.
 */

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products } from "@wix/stores";

let wixClient: ReturnType<typeof createClient> | null = null;

export function getWixClient() {
  if (wixClient) return wixClient;

  const clientId = process.env.WIX_CLIENT_ID;

  if (!clientId) {
    throw new Error(
      "WIX_CLIENT_ID חסר. הוסיפו אותו לקובץ .env כדי לעבור ל-WIX LIVE MODE. " +
      "עד אז השתמשו ב-services/productService.ts שקורא מ-mocks/products.json."
    );
  }

  wixClient = createClient({
    modules: { products },
    auth: OAuthStrategy({ clientId }),
  });

  return wixClient;
}
