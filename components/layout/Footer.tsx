import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "צור קשר" },
  { href: "/faq", label: "שאלות נפוצות" },
  { href: "/shipping", label: "משלוחים" },
  { href: "/returns", label: "החזרות וביטולים" },
  { href: "/privacy", label: "מדיניות פרטיות" },
  { href: "/terms", label: "תנאי שימוש" },
  { href: "/accessibility", label: "נגישות" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <p className="font-heading text-lg text-cream mb-6">AROMA CARE</p>

        <nav className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm hover:text-amber-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="font-label text-[11px] text-cream/40">
          © {new Date().getFullYear()} AROMA CARE.
        </p>
      </div>
    </footer>
  );
}
