export interface CartLineItem {
  productId: string;
  variantId?: string;
  name: string;
  variantLabel?: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartLineItem[];
  subtotal: number;
}
