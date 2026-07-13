import { notFound } from "next/navigation";
import { getAllProducts } from "@/services/productService";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CategoryHero } from "@/components/collections/CategoryHero";
import { CategoryProductGrid } from "@/components/collections/CategoryProductGrid";
import { buildBreadcrumbSchema } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import type { Product } from "@/types/product";

const categoryMap: Record
  string,
  {
    number: string;
    title: string;
    titleEn: string;
    intro: string;
    contentLine: string;
    match: (p: Product) => boolean;
  }
> = {
  "face-care": {
    number: "N°01",
    title: "טיפוח פנים",
    titleEn: "Face Care",
    intro: "קרמים, סרומים ומסכות לטיפוח יומיומי - מבוססים על הרכיבים שמופיעים בכל דף מוצר.",
    contentLine: "מדע ורוגע, מרכיב אחד בכל פעם.",
    match: (p) => p.category === "מוצרי קוסמטיקה",
  },
  "essential-oils": {
    number: "N°02",
    title: "שמנים אתריים",
    titleEn: "Essential Oils",
    intro: "שמנים אתריים טהורים לשימוש קוסמטי חיצוני בלבד, כל אחד עם חומר הגלם האמיתי שממנו הופק.",
    contentLine: "11 שמנים, כל אחד עם שם לטיני משלו.",
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
  const heroImage = products[0]?.mainImage ?? allProducts[0]?.mainImage ?? "";

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

        <CategoryHero
          number={category.number}
          titleHe={category.title}
          titleEn={category.titleEn}
          description={category.intro}
          image={heroImage}
        />

        <CategoryProductGrid products={products} contentLine={category.contentLine} />
      </main>

      <Footer />
    </>
  );
}
