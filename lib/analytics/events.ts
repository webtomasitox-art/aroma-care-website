/**
 * Data Layer לאירועי מסחר אלקטרוני (GA4 / GTM / Meta Pixel).
 *
 * TODO: לחבר בפועל ל-Google Tag Manager כאשר יתקבל Container ID מהלקוח.
 * חשוב: אירוע "purchase" חייב להישלח רק לאחר אישור תשלום אמיתי מ-Wix,
 * לעולם לא באופן אופטימי מיד אחרי לחיצה על "שלם".
 */

type EventName =
  | "view_item"
  | "view_item_list"
  | "select_item"
  | "search"
  | "add_to_cart"
  | "remove_from_cart"
  | "view_cart"
  | "begin_checkout"
  | "purchase";

export function trackEvent(name: EventName, payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  // TODO: להחליף בקריאה אמיתית ל-dataLayer.push כאשר GTM מחובר
  // window.dataLayer?.push({ event: name, ...payload });

  if (process.env.NODE_ENV !== "production") {
    console.log(`[analytics:${name}]`, payload);
  }
}
