import Image from "next/image";
import { getAllProducts } from "@/services/productService";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { CategoryCard } from "@/components/collections/CategoryCard";
import { Button } from "@/components/ui/Button";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

export default async function HomePage() {
  const products = await getAllProducts();

  const bySlug = (slug: string) => products.find((p) => p.id === slug);

  const heroProduct = bySlug("benzoin-essential-oil");

  const topProducts = [
    bySlug("day-cream"),
    bySlug("gold-mask"),
    bySlug("rejuvenate-retinol-serum"),
    bySlug("power-peptides-moisturizing-cream"),
  ].filter(Boolean);

  const faceCareProducts = products.filter((p) => p.category === "מוצרי קוסמטיקה");
  const oilProducts = products.filter((p) => p.subcategory === "שמנים אתריים");

  const needs = [
    {
      title: "יובש והזנה",
      description: "קרם לחות ליום, מסכת רימונים ורכיבים כמו חמאת שיאה וחומצה היאלורונית.",
      slug: "day-cream",
    },
    {
      title: "חידוש והצערה",
      description: "רטינול ופפטידים - סרום הרטינול וקרם הלחות עם קומפלקס הפפטידים.",
      slug: "rejuvenate-retinol-serum",
    },
    {
      title: "ניקוי וטיהור",
      description: "חימר ירוק ומי פנים ארומטיים לעור נקי ומאוזן.",
      slug: "product-270",
    },
    {
      title: "ארומתרפיה ורוגע",
      description: "11 שמנים אתריים טהורים - מאנג'ליקה מרגיעה ועד בזיליקום מרענן.",
      slug: "benzoin-essential-oil",
    },
  ];

  return (
    <>
      <Header />

      <main>
        {/* Hero - העוגן העיצובי: תמונת מוצר אמיתית עם חומר הגלם הגולמי שלה */}
        <section className="max-w-6xl mx-auto px-6 pt-12 pb-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-label text-[11px] tracking-[0.15em] text-olive mb-4">
              AROMA CARE · טיפוח וארומתרפיה
            </p>
            <h1 className="font-heading text-4xl md:text-5xl text-amber-deep leading-[1.15] mb-6">
              כל מוצר כאן מתחיל
              <br />
              בחומר גלם אחד אמיתי
            </h1>
            <p className="font-body text-base text-charcoal/80 leading-relaxed max-w-md mb-8">
              רטינול, פפטידים וחומצה היאלורונית לצד שמן רימונים, חמאת שיאה ו-11 שמנים אתריים
              טהורים. לא מבטיחים קסם - מראים בדיוק מה בפנים.
            </p>
            <div className="flex gap-4">
              <Button href="/category/face-care">טיפוח פנים</Button>
              <Button href="/category/essential-oils" variant="secondary">
                שמנים אתריים
              </Button>
            </div>
          </div>

          {heroProduct && (
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white">
              <Image
                src={heroProduct.mainImage}
                alt={heroProduct.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-6"
                priority
              />
            </div>
          )}
        </section>

        {/* גישת המותג */}
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-heading text-2xl text-amber-deep mb-4">
              איזון בין מעבדה לטבע
            </h2>
            <p className="font-body text-sm text-charcoal/75 leading-relaxed max-w-2xl mx-auto">
              חלק מהמוצרים שלנו נשענים על רכיבים פעילים מוכרים כמו רטינול וטריפפטיד-1.
              אחרים נשענים על חומרי גלם טבעיים - שמן חוחובה, קלנדולה, אבקת זהב וקאולין.
              אנחנו לא מסתירים איזה מוצר שייך לאיזו גישה - שני העולמות מופיעים בדף המוצר,
              עם רשימת הרכיבים המלאה כפי שהיא.
            </p>
          </div>
        </section>

        {/* מוצרים מובילים */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-heading text-2xl text-amber-deep">מוצרים נבחרים</h2>
            <a href="/category/face-care" className="font-body text-sm text-amber-gold hover:underline">
              לכל המוצרים
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {topProducts.map((p) => p && <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Private Label - חלק קריטי במותג, קישור לעמוד הייעודי */}
        <section className="max-w-6xl mx-auto px-6 py-4">
          <a
            href="/private-label"
            className="group block bg-charcoal rounded-2xl px-8 py-12 md:py-16 text-center hover:bg-[#241d19] transition-colors"
          >
            <p className="font-label text-[11px] tracking-[0.2em] text-amber-gold mb-4">
              PRIVATE LABEL
            </p>
            <p className="font-heading text-3xl md:text-4xl text-cream mb-3">
              מותג משלכם
            </p>
            <p className="font-body text-sm text-cream/70 max-w-md mx-auto mb-6">
              20 שנות מומחיות בייצור קוסמטיקה, רישיון יצרן ממשרד הבריאות ותקן ISO 22716 -
              אנחנו בונים את המותג הפרטי שלך.
            </p>
            <span className="inline-block font-body text-[13px] tracking-wide text-cream border border-amber-gold/50 rounded-sm px-6 py-3 group-hover:bg-amber-gold/10 transition-colors">
              קראו עוד
            </span>
          </a>
        </section>

        {/* קולקציות */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <h2 className="font-heading text-2xl text-amber-deep mb-8">קולקציות</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <CategoryCard
              title="טיפוח פנים"
              titleEn="Face Care"
              description={`${faceCareProducts.length} מוצרים - קרמים, סרומים ומסכות`}
              image={faceCareProducts[0]?.mainImage ?? ""}
              href="/category/face-care"
            />
            <CategoryCard
              title="שמנים אתריים"
              titleEn="Essential Oils"
              description={`${oilProducts.length} שמנים טהורים לשימוש קוסמטי`}
              image={oilProducts[0]?.mainImage ?? ""}
              href="/category/essential-oils"
            />
          </div>
        </section>

        {/* התאמה לפי צורך */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="font-heading text-2xl text-amber-deep mb-2">מצאו את הטיפול שלכם</h2>
          <p className="font-body text-sm text-charcoal/60 mb-8">לפי הצורך, לא לפי המדף.</p>
          <div className="grid md:grid-cols-4 gap-5">
            {needs.map((need) => (
              <a
                key={need.slug}
                href={`/product/${need.slug}`}
                className="block bg-white rounded-xl p-5 border border-amber-gold/15 hover:border-amber-gold/40 transition-colors"
              >
                <p className="font-heading text-base text-amber-deep mb-2">{need.title}</p>
                <p className="font-body text-xs text-charcoal/65 leading-relaxed">
                  {need.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* סדרת השמנים האתריים */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-heading text-2xl text-amber-deep mb-2">עולם השמנים האתריים</h2>
            <p className="font-body text-sm text-charcoal/60 mb-8">
              11 שמנים טהורים, כל אחד עם חומר הגלם האמיתי שממנו הופק.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
              {oilProducts.slice(0, 5).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* יתרונות קנייה */}
        <section className="max-w-5xl mx-auto px-6 py-20 grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <p className="font-heading text-lg text-amber-deep mb-2">משלוח חינם</p>
            <p className="font-body text-xs text-charcoal/60">בקנייה מעל 199 ₪ (כפי שצוין בחומרי המקור)</p>
          </div>
          <div>
            <p className="font-heading text-lg text-amber-deep mb-2">תשלום מאובטח</p>
            <p className="font-body text-xs text-charcoal/60">Checkout מאובטח דרך Wix</p>
          </div>
          <div>
            <p className="font-heading text-lg text-amber-deep mb-2">רשימת רכיבים מלאה</p>
            <p className="font-body text-xs text-charcoal/60">בכל דף מוצר, ללא הסתרה</p>
          </div>
        </section>

        <div className="pb-20 px-6">
          <NewsletterSignup />
        </div>
      </main>

      <Footer />
    </>
  );
}
