import { notFound } from "next/navigation";
import { getAllProducts, getProductById } from "@/services/productService";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
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

        {/* תיאור מלא - רק החלק שלא כבר מוצג כתיאור הקצר מעל */}
        {(() => {
          const remainder = product.fullDescription.startsWith(product.shortDescription)
            ? product.fullDescription.slice(product.shortDescription.length).trim()
            : product.fullDescription;
          return remainder ? (
            <section className="max-w-3xl mt-16">
              <h2 className="font-heading text-xl text-amber-deep mb-4">על המוצר</h2>
              <p className="font-body text-sm text-charcoal/75 leading-relaxed whitespace-pre-line">
                {remainder}
              </p>
            </section>
          ) : null;
        })()}

        {/* רכיבים - רק אם זוהו רכיבים מובנים */}
        {product.ingredients && product.ingredients.length > 0 && (
          <section className="max-w-3xl mt-12">
            <h2 className="font-heading text-xl text-amber-deep mb-4">רכיבים עיקריים ויתרונותיהם</h2>
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
          </section>
        )}

        {/* הוראות שימוש - רק אם קיימות */}
        {product.usageInstructions && (
          <section className="max-w-3xl mt-12">
            <h2 className="font-heading text-xl text-amber-deep mb-4">הוראות שימוש</h2>
            <p className="font-body text-sm text-charcoal/75 leading-relaxed whitespace-pre-line">
              {product.usageInstructions}
            </p>
          </section>
        )}

        {/* אזהרות - רק אם קיימות במקור */}
        {product.warnings && (
          <section className="max-w-3xl mt-12">
            <h2 className="font-heading text-xl text-amber-deep mb-4">אזהרות</h2>
            <p className="font-body text-sm text-charcoal/75 leading-relaxed">{product.warnings}</p>
          </section>
        )}

        {/* מתכון שימוש ביתי - רק אם קיים במקור, מוצג כטאב סגור */}
        {product.recipe && (
          <section className="max-w-3xl mt-12">
            <details className="group">
              <summary className="font-heading text-xl text-amber-deep cursor-pointer list-none flex items-center gap-2">
                <span className="inline-block transition-transform group-open:rotate-90">›</span>
                מתכון לשימוש ביתי
              </summary>
              <p className="font-body text-sm text-charcoal/75 leading-relaxed whitespace-pre-line mt-4">
                {product.recipe}
              </p>
            </details>
          </section>
        )}

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
