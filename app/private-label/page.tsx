import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "מותג משלכם - Private Label | AROMA CARE",
  description:
    "NSP - Natural Skin Products: 20 שנות מומחיות בייצור ואספקת מוצרי קוסמטיקה לבניית מותגים פרטיים.",
};

const whyUs = [
  "אנחנו ותיקים, מנוסים ומקצוענים בפיתוח ובייצור מוצרי קוסמטיקה.",
  "מומחיות שיווקית נרחבת בישראל ובשווקים גלובליים.",
  "אנחנו נותנים לך שרות מלא ומקצועי בכל התחומים: פיתוח, ייצור, שיווק.",
  "יחס אישי לכל לקוח. כל לקוח מקבל את המענה המלא לפי צרכיו.",
  "אנחנו לא מגבילים בכמויות. ניתן להזמין כמויות קטנות במוצרים מסוימים או כמויות גדולות (קונטיינר).",
];

const process = [
  "הכרות עם הצרכים השיווקיים והמקצועיים של הלקוח.",
  "ייעוץ בבחירת המוצרים עבור הלקוח (מתוך מאות מוצרים פוטנציאליים).",
  "מציאת ייחודיות לכל לקוח.",
  'הכנת דוגמאות של המוצרים עפ"י בחירת הלקוח ועל פי הייחוד שנקבע.',
  "ביצוע מחקר/סקר שביעות רצון מהמוצרים.",
  "הכנת המסמכים על פי דרישות הרגולציה של משרד הבריאות.",
  "קבלת רישיונות לייצור על פי הנחיות והוראות משרד הבריאות, עם שמות המוצרים שנקבעים על ידי הלקוח.",
  "מתן הדרכה לגבי אריזות המוצר, עיצוב ומיתוג.",
  "ייצור שוטף למוצרי הלקוח במפעל שלנו.",
];

export default function PrivateLabelPage() {
  return (
    <>
      <Header />

      <main>
        <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
          <p className="font-label text-[11px] tracking-[0.2em] text-olive mb-4">
            PRIVATE LABEL
          </p>
          <h1 className="font-heading text-4xl md:text-5xl text-amber-deep leading-[1.2] mb-4">
            מותג משלכם
          </h1>
          <p className="font-body text-lg text-charcoal/80">
            המותג שלך, המומחיות שלנו!
          </p>
        </section>

        <section className="bg-white py-14">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="font-body text-[15px] text-charcoal/80 leading-relaxed mb-6">
              NSP - Natural Skin Products מתגאה ב-20 שנות מומחיות בייצור ואספקת מוצרי קוסמטיקה
              באיכות גבוהה עבור שווקים מגוונים.
            </p>
            <p className="font-body text-[15px] text-charcoal/80 leading-relaxed">
              אנחנו בעלי רישיון יצרן מטעם משרד הבריאות ותעודת איכות ISO 22716 ממכון התקנים
              לייצור מוצרי קוסמטיקה, לחברה התמחות בבניית קווי מוצר למותגים פרטיים.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-14 text-center">
          <p className="font-body text-[15px] text-charcoal/80 leading-relaxed mb-4">
            אנחנו עומדים כשותפים מהימנים במסע המותג שלך. אנו מציעים את הגמישות לייצר כמויות
            התואמות את הצרכים שלך, הכל תחת שם המותג שלך.
          </p>
          <p className="font-body text-[15px] text-charcoal/80 leading-relaxed">
            מבחר הקוסמטיקה הנרחב שלנו כולל מוצרים טיפוליים, מוצרי טיפוח לפנים וגוף, פתרונות
            טיפוח לשיער, מוצרי ספא, מוצרים אורגניים ועוד.
          </p>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-heading text-2xl text-amber-deep text-center mb-10">
              למה כדאי לבחור בנו?
            </h2>
            <ul className="space-y-4 max-w-2xl mx-auto">
              {whyUs.map((item, i) => (
                <li key={i} className="flex gap-3 items-start font-body text-sm text-charcoal/80 leading-relaxed">
                  <span className="text-amber-gold mt-1 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="font-heading text-2xl text-amber-deep text-center mb-2">
            תהליך העבודה שלנו
          </h2>
          <p className="font-body text-sm text-charcoal/60 text-center mb-10">
            הפעילויות שבהן אנחנו מטפלים בתחום ה-Private Label
          </p>
          <ol className="space-y-4 max-w-2xl mx-auto">
            {process.map((item, i) => (
              <li key={i} className="flex gap-4 items-start font-body text-sm text-charcoal/80 leading-relaxed">
                <span className="font-heading text-amber-gold shrink-0 w-6 text-left">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-white py-16 text-center">
          <h2 className="font-heading text-2xl text-amber-deep mb-4">בואו נתחיל</h2>
          <p className="font-body text-sm text-charcoal/70 mb-8 max-w-md mx-auto">
            ספרו לנו על המותג שלכם ונחזור אליכם עם ההתאמה המקצועית הנכונה.
          </p>
          <Button href="/contact">צרו קשר</Button>
        </section>
      </main>

      <Footer />
    </>
  );
}
