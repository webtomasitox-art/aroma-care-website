"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Cart, CartLineItem } from "@/types/cart";
import { trackEvent } from "@/lib/analytics/events";

/**
 * TODO שלב ו': לחבר לוגיקה זו ל-Wix eCommerce Cart API בפועל.
 * כרגע העגלה נשמרת רק בזיכרון (React Context) ולא נשמרת בין רענוני דף -
 * זה ייפתר כשנתחבר ל-Wix, ששומר את העגלה בצד השרת.
 */

interface CartContextValue {
  cart: Cart;
  addItem: (item: CartLineItem) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLineItem[]>([]);

  const addItem = useCallback((item: CartLineItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.variantId === item.variantId
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    trackEvent("add_to_cart", { productId: item.productId, quantity: item.quantity });
  }, []);

  const removeItem = useCallback((productId: string, variantId?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.variantId === variantId))
    );
    trackEvent("remove_from_cart", { productId });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, variantId: string | undefined, quantity: number) => {
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.variantId === variantId ? { ...i, quantity } : i
        )
      );
    },
    []
  );

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const cart: Cart = { items, subtotal };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart חייב לפעול בתוך CartProvider (ראו app/layout.tsx)");
  }
  return ctx;
}
