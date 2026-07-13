"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics/events";
import { createWixCheckoutUrl } from "@/lib/wix/checkout";
import { siteConfig } from "@/config/site";

export default function CartPage() {
  const { cart, removeItem, updateQuantity } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  async function handleCheckout() {
    setCheckoutError(null);
    setIsCheckingOut(true);
    trackEvent("begin_checkout", { itemCount: cart.items.length, subtotal: cart.subtotal });

    try {
      const { checkoutUrl, missingItems } = await createWixCheckoutUrl(cart.items);
      if (missingItems.length > 0) {
        console.warn(
          "המוצרים הבאים לא נמצאו ב-Wix ולא נכללו בתשלום:",
          missingItems.map((i) => i.name)
        );
      }
      window.location.href = checkoutUrl;
    } catch (err) {
      setCheckoutError(
        err instanceof Error
          ? err.message
          : "לא הצלחנו להתחבר לתשלום כרגע. נסו שוב בעוד רגע."
      );
      setIsCheckingOut(false);
    }
  }

  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-14">
        <h1 className="font-heading text-2xl text-amber-deep mb-8">הסל שלי</h1>

        {cart.items.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-heading text-lg text-amber-deep mb-3">הסל שלך ריק</p>
            <p className="font-body text-sm text-charcoal/60 mb-8">
              בואי לגלות את המוצרים שלנו.
            </p>
            <Button href="/category/face-care">לטיפוח פנים</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-5">
              {cart.items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId ?? "default"}`}
                  className="flex gap-4 bg-white rounded-xl p-4 border border-amber-gold/15"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-cream shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </div>

                  <div className="flex-1">
                    <p className="font-heading text-sm text-amber-deep">{item.name}</p>
                    {item.variantLabel && (
                      <p className="font-label text-xs text-charcoal/50 mt-0.5">
                        {item.variantLabel}
                      </p>
                    )}
                    <p className="font-body text-sm text-charcoal mt-1">{item.price} ₪</p>

                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-amber-gold/30 rounded-sm">
                        <button
                          aria-label="הפחתת כמות"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.variantId,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="w-7 h-7 text-sm hover:bg-amber-gold/10"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          aria-label="הוספת כמות"
                          onClick={() =>
                            updateQuantity(item.productId, item.variantId, item.quantity + 1)
                          }
                          className="w-7 h-7 text-sm hover:bg-amber-gold/10"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="font-body text-xs text-charcoal/50 hover:text-amber-deep underline"
                      >
                        הסרה
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 border border-amber-gold/15 h-fit">
              <div className="flex justify-between font-body text-sm mb-3">
                <span className="text-charcoal/60">סכום ביניים</span>
                <span>{cart.subtotal} ₪</span>
              </div>
              {siteConfig.freeShippingThreshold && (
                <p className="font-label text-[11px] text-olive mb-4">
                  משלוח חינם מעל {siteConfig.freeShippingThreshold} ₪
                </p>
              )}
              <div className="flex justify-between font-body text-base font-medium border-t border-amber-gold/15 pt-3 mb-6">
                <span>סה&quot;כ</span>
                <span>{cart.subtotal} ₪</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full font-body text-sm bg-amber-deep text-cream px-6 py-3 rounded-sm hover:bg-charcoal transition-colors disabled:opacity-60"
              >
                {isCheckingOut ? "מעביר אותך לתשלום..." : "מעבר לתשלום"}
              </button>
              {checkoutError && (
                <p className="font-body text-xs text-red-700 mt-3 text-center">{checkoutError}</p>
              )}

              <Link
                href="/category/face-care"
                className="block text-center font-body text-xs text-amber-gold mt-4 hover:underline"
              >
                המשך בקנייה
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
