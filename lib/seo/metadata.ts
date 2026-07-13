import type { Metadata } from "next";
import type { Product } from "@/types/product";
import { siteConfig } from "@/config/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.netlify.app";

export function buildProductMetadata(product: Product): Metadata {
  const title = `${product.name}${product.nameEn ? ` | ${product.nameEn}` : ""} - ${siteConfig.name}`;
  const description = product.shortDescription.slice(0, 155);
  const url = `${SITE_URL}/product/${product.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: product.mainImage }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.mainImage],
    },
  };
}

export function buildProductSchema(product: Product) {
  // Product Schema (JSON-LD) - לא ממציא דירוגים/ביקורות, כפי שנדרש בבריף
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.mainImage,
    sku: product.sku ?? undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: siteConfig.currency,
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };
}
