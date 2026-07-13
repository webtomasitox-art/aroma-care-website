import type { Metadata } from "next";
import { Rubik, Cormorant_Garamond, Assistant } from "next/font/google";
import { CartProvider } from "@/hooks/useCart";
import "./globals.css";

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500"],
  variable: "--font-heading",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-accent",
});

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "AROMA CARE",
  description:
    "AROMA CARE - טיפוח וארומתרפיה. TODO: להשלים תיאור סופי מאושר לפני פרסום.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${rubik.variable} ${cormorant.variable} ${assistant.variable}`}>
      <body className="bg-cream text-charcoal font-body">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
