import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({ children, href, onClick, variant = "primary", className = "" }: ButtonProps) {
  const base =
    "inline-block font-body text-[13px] tracking-wide px-6 py-3 rounded-sm transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "bg-amber-deep text-cream hover:bg-charcoal"
      : "bg-transparent text-amber-deep border border-amber-gold/60 hover:bg-amber-gold/10";

  if (href) {
    return (
      <Link href={href} className={`${base} ${styles} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}
