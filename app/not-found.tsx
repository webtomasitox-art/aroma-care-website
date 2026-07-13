import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="max-w-lg mx-auto px-6 py-24 text-center">
        <p className="font-heading text-5xl text-amber-deep mb-4">404</p>
        <p className="font-body text-base text-charcoal/70 mb-8">
          העמוד שחיפשת לא נמצא.
        </p>
        <Button href="/">חזרה לעמוד הבית</Button>
      </main>
      <Footer />
    </>
  );
}
