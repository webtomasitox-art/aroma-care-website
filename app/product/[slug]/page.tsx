import { notFound } from "next/navigation";
import { getAllProducts, getProductById } from "@/services/productService";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { ProductCard } from "@/components/product/ProductCard";
import { buildProductMetadata, buildProductSchema, buildBreadcrumbSchema } from "@/lib/seo/metadata";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductById(params.slug);
  if (!product) return {};
  return buildProductMetadata(product);
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductById(params.slug);
  if (!product) notFound();

  const allProducts = await getAllProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const categorySlug = product.category === "מוצרי קוסמטיקה" ? "face-care" : "essential-oils";
  const productSchema = buildProductSchema(product);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "בית", href: "/" },
    { label: product.category, href: `/category/${categorySlug}` },
    { label: product.name },
  ]);

  const descriptionRemainder = product.fullDescription.startsWith(product.shortDescription)
    ? product.fullDescription.slice(product.shortDescription.length).trim()
    : product.fullDescription;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <main className="max-w-6xl mx-auto px-6 py-10 pb-28 md:pb-10">
        <Breadcrumbs
          items={[
            { label: "בית", href: "/" },
            { label: product.category, href: `/category/${categorySlug}` },
            { label: product.name },
          ]}
        />

        <div className="grid md:grid-cols-2 gap-12">
          <ProductGallery
            image={product.mainImage}
            alt={product.name}
            additionalImages={product.additionalImages ?? undefined}
          />
          <ProductPurchasePanel product={product} />
        </div>

        <Accordion>
          {descriptionRemainder && (
            <AccordionItem title="על המוצר" defaultOpen>
              <p className="font-body text-sm text-charcoal/75 leading-relaxed whitespace-pre-line">
                {descriptionRemainder}
              </p>
            </AccordionItem>
          )}

          {product.ingredients && product.ingredients.length > 0 && (
            <AccordionItem title="רכיבים עיקריים ויתרונותיהם">
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {product.ingredients.map((ing, i) => (
                  <li key={i} className="font-body text-sm text-charcoal/75">
                    <span className="text-amber-deep font-medium">{ing}</span>
                    {product.benefits?.[i] && (
                      <span className="text-charcoal/60"> - {product.benefits[i]}</span>
                    )}
                  </li>
                ))}
              </ul>
            </AccordionItem>
          )}

          {product.usageInstructions && (
            <AccordionItem title="הוראות שימוש">
              <p className="font-body text-sm text-charcoal/75 leading-relaxed whitespace-pre-line">
                {product.usageInstructions}
              </p>
            </AccordionItem>
          )}

          {product.warnings && (
            <AccordionItem title="אזהרות">
              <p className="font-body text-sm text-charcoal/75 leading-relaxed">
                {product.warnings}
              </p>
            </AccordionItem>
          )}

          {product.recipe && (
            <AccordionItem title="מתכון לשימוש ביתי">
              <p className="font-body text-sm text-charcoal/75 leading-relaxed whitespace-pre-line">
                {product.recipe}
              </p>
            </AccordionItem>
          )}

          <AccordionItem title="למה לקנות אצלנו">
            <ul className="font-body text-sm text-charcoal/75 leading-relaxed space-y-2">
              <li>רישיון יצרן ממשרד הבריאות ותקן איכות ISO 22716 (NSP - Natural Skin Products).</li>
              <li>רשימת רכיבים מלאה בכל דף מוצר, ללא הסתרה.</li>
              <li>תשלום מאובטח דרך Checkout מוצפן של Wix.</li>
            </ul>
          </AccordionItem>
        </Accordion>

        {/* מוצרים דומים */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="font-heading text-xl text-amber-deep mb-6">מוצרים מאותה קטגוריה</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
