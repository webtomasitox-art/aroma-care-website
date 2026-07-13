import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function InfoPage({ title, note }: { title: string; note?: string }) {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="font-heading text-3xl text-amber-deep mb-6">{title}</h1>
        <p className="font-body text-sm text-charcoal/60 leading-relaxed">
          {note ?? "התוכן לעמוד זה בהכנה. TODO: להשלים עם הלקוח לפני פרסום."}
        </p>
      </main>
      <Footer />
    </>
  );
}
