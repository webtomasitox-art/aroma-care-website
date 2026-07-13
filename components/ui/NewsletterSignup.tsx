"use client";

import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: לחבר לספק דיוור אמיתי (כרגע אין פרטי חיבור מהלקוח)
    setSubmitted(true);
  }

  return (
    <section className="bg-white border border-amber-gold/20 rounded-xl px-6 py-10 text-center max-w-xl mx-auto">
      <p className="font-heading text-xl text-amber-deep mb-2">הצטרפו לרשימת התפוצה</p>
      <p className="font-body text-sm text-charcoal/70 mb-6">
        עדכונים על מוצרים חדשים ותכנים על טיפוח וארומתרפיה.
      </p>

      {submitted ? (
        <p className="font-body text-sm text-olive">נרשמתם בהצלחה.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="כתובת האימייל שלך"
            className="font-body text-sm px-4 py-3 rounded-sm border border-amber-gold/30 bg-cream focus:outline-none focus:border-amber-gold flex-1"
          />
          <button
            type="submit"
            className="font-body text-sm bg-amber-deep text-cream px-6 py-3 rounded-sm hover:bg-charcoal transition-colors"
          >
            הרשמה
          </button>
        </form>
      )}
    </section>
  );
}
