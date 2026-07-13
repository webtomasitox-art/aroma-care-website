export interface CartLineItem {
  productId: string;
  variantId?: string;
  name: string;
  nameEn?: string | null;
  variantLabel?: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartLineItem[];
  subtotal: number;
}
