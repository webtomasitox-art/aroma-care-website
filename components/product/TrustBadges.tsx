const badges = [
  { label: "רישיון יצרן ממשרד הבריאות", note: "NSP - Natural Skin Products" },
  { label: "תקן איכות ISO 22716", note: "ממכון התקנים לייצור קוסמטיקה" },
  { label: "תשלום מאובטח", note: "Checkout מוצפן דרך Wix" },
  { label: "שקיפות מלאה ברכיבים", note: "ללא הסתרה, בכל דף מוצר" },
];

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-amber-gold/15">
      {badges.map((b) => (
        <div key={b.label}>
          <p className="font-body text-xs font-medium text-charcoal">{b.label}</p>
          <p className="font-label text-[11px] text-charcoal/50 mt-0.5">{b.note}</p>
        </div>
      ))}
    </div>
  );
}
