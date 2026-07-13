"use client";

import { getWixClient, WIX_STORES_APP_ID } from "@/lib/wix/client";
import type { CartLineItem } from "@/types/cart";

/**
 * בונה שם מוצר בפורמט זהה למה שהוזן ל-Wix בקובץ הייבוא (products-import.csv),
 * כדי שנוכל למצוא את המוצר המתאים לפי שם ולקבל את ה-ID האמיתי שלו ב-Wix.
 *
 * TODO: זו שיטת התאמה זמנית לפי שם מדויק. אם שם מוצר ישתנה ב-Wix, ההתאמה תיכשל.
 * פתרון עמיד יותר לעתיד: לשמור את ה-ID האמיתי מ-Wix ישירות בקובץ המוצרים שלנו.
 */
function buildImportedName(name: string, nameEn?: string | null) {
  return nameEn ? `${name} | ${nameEn}` : name;
}

function describeError(stage: string, err: unknown): Error {
  let detail = "";
  try {
    detail = JSON.stringify(err, Object.getOwnPropertyNames(err as object));
  } catch {
    detail = String(err);
  }
  return new Error(`שלב "${stage}" נכשל: ${detail}`);
}

interface ResolveResult {
  found: CartLineItem[];
  missing: CartLineItem[];
  idsByName: Map<string, string>;
}

async function resolveWixProductIds(items: CartLineItem[]): Promise<ResolveResult> {
  const client = getWixClient();
  const found: CartLineItem[] = [];
  const missing: CartLineItem[] = [];
  const idsByName = new Map<string, string>();

  for (const item of items) {
    const searchName = buildImportedName(item.name, item.nameEn);
    if (!idsByName.has(searchName)) {
      try {
        const result = await client.products
          .queryProducts()
          .eq("name", searchName)
          .find();
        const match = result.items?.[0];
        if (match?._id) {
          idsByName.set(searchName, match._id);
        }
      } catch (err) {
        console.error("שגיאה בחיפוש מוצר ב-Wix:", searchName, err);
      }
    }

    if (idsByName.has(searchName)) {
      found.push(item);
    } else {
      missing.push(item);
    }
  }

  return { found, missing, idsByName };
}

export interface CheckoutResult {
  checkoutUrl: string;
  missingItems: CartLineItem[];
}

/**
 * זורם מלא: מוצא את המוצרים המתאימים ב-Wix, בונה עגלה אצל Wix,
 * יוצר Checkout, ומחזיר קישור לתשלום מאובטח.
 *
 * כל שלב עטוף בנפרד כדי שאם משהו נכשל, נדע בדיוק איזה שלב זה היה.
 */
export async function createWixCheckoutUrl(items: CartLineItem[]): Promise<CheckoutResult> {
  if (items.length === 0) {
    throw new Error("הסל ריק");
  }

  const client = getWixClient();

  const { found, missing, idsByName } = await resolveWixProductIds(items);

  if (found.length === 0) {
    throw new Error(
      "לא הצלחנו לשייך אף מוצר מהסל למוצר מקביל ב-Wix. ודאו שהמוצרים יובאו בהצלחה ל-Wix Stores, ושהשם ב-Wix זהה לשם באתר."
    );
  }

  const lineItems = found.map((item) => ({
    catalogReference: {
      appId: WIX_STORES_APP_ID,
      catalogItemId: idsByName.get(buildImportedName(item.name, item.nameEn))!,
    },
    quantity: item.quantity,
  }));

  console.log("שלב 1: פריטים שנשלחים ל-Wix:", JSON.stringify(lineItems));

  try {
    await client.currentCart.addToCurrentCart({ lineItems });
  } catch (err) {
    console.error("שגיאה בהוספה לעגלת Wix:", err);
    throw describeError("הוספה לעגלה (addToCurrentCart)", err);
  }

  let checkoutId: string;
  try {
    const result = await client.currentCart.createCheckoutFromCurrentCart({
      channelType: "WEB" as const,
    });
    checkoutId =
      typeof result === "string" ? result : (result as { checkoutId?: string })?.checkoutId ?? "";
    if (!checkoutId) {
      throw new Error("לא התקבל מזהה Checkout מ-Wix");
    }
  } catch (err) {
    console.error("שגיאה ביצירת Checkout:", err);
    throw describeError("יצירת תשלום (createCheckoutFromCurrentCart)", err);
  }

  try {
    const checkoutUrlResult = await client.checkout.getCheckoutUrl(checkoutId);
    const checkoutUrl =
      (checkoutUrlResult as { checkoutUrl?: string })?.checkoutUrl ??
      (checkoutUrlResult as unknown as string);

    if (!checkoutUrl || typeof checkoutUrl !== "string") {
      throw new Error("לא התקבל קישור תשלום תקין מ-Wix");
    }

    return { checkoutUrl, missingItems: missing };
  } catch (err) {
    console.error("שגיאה בקבלת קישור לתשלום:", err);
    throw describeError("קבלת קישור תשלום (getCheckoutUrl)", err);
  }
}
