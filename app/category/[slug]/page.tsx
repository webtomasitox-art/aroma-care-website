import { notFound } from "next/navigation";
import { getAllProducts } from "@/services/productService";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CategoryProductGrid } from "@/components/collections/CategoryProductGrid";
import { buildBreadcrumbSchema } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import type { Product } from "@/types/product";

const categoryMap: Record<string, { title: string; titleEn: string; intro: string; match: (p: Product) => boolean }> = {
  "face-care": {
    title: "טיפוח פנים",
    titleEn: "Face Care",
    intro: "קרמים, סרומים ומסכות לטיפוח יומיומי - מבוססים על הרכיבים שמופיעים בכל דף מוצר.",
    match: (p) => p.category === "מוצרי קוסמטיקה",
  },
  "essential-oils": {
    title: "שמנים אתריים",
    titleEn: "Essential Oils",
    intro: "שמנים אתריים טהורים לשימוש קוסמטי חיצוני בלבד, כל אחד עם חומר הגלם האמיתי שממנו הופק.",
    match: (p) => p.subcategory === "שמנים אתריים",
  },
};

export function generateStaticParams() {
  return Object.keys(categoryMap).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = categoryMap[params.slug];
  if (!category) return {};
  const title = `${category.title} | ${category.titleEn} - ${siteConfig.name}`;
  return {
    title,
    description: category.intro,
    alternates: { canonical: `/category/${params.slug}` },
    openGraph: { title, description: category.intro },
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categoryMap[params.slug];
  if (!category) notFound();

  const allProducts = await getAllProducts();
  const products = allProducts.filter(category.match);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "בית", href: "/" },
    { label: category.title, href: `/category/${params.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: category.title }]} />

        <h1 className="font-heading text-3xl text-amber-deep mb-2">{category.title}</h1>
        <p className="ltr-inline font-accent italic text-sm text-amber-gold mb-4">
          {category.titleEn}
        </p>
        <p className="font-body text-sm text-charcoal/70 max-w-xl mb-10">{category.intro}</p>

        <CategoryProductGrid products={products} />
      </main>

      <Footer />
    </>
  );
}
