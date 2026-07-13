import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

/**
 * TODO שלב ז': עמוד זה יוצג רק לאחר אישור תשלום אמיתי מ-Wix.
 * אירוע ה-"purchase" בגוגל אנליטיקס יישלח רק בהתבסס על אישור אמיתי מ-Wix Checkout,
 * לעולם לא באופן אוטומטי מעצם הגעה לעמוד הזה.
 */
export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="max-w-lg mx-auto px-6 py-24 text-center">
        <p className="font-heading text-3xl text-amber-deep mb-4">תודה על הרכישה</p>
        <p className="font-body text-sm text-charcoal/70 mb-8">
          ההזמנה שלך התקבלה. פרטי המשלוח יישלחו לכתובת האימייל שלך.
        </p>
        <Button href="/">חזרה לעמוד הבית</Button>
      </main>
      <Footer />
    </>
  );
}
