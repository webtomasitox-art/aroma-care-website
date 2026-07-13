"use client";

import { useState, type ReactNode } from "react";

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-charcoal/10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-5 text-right"
        aria-expanded={open}
      >
        <span className="font-heading text-lg text-amber-deep">{title}</span>
        <span
          className={`font-body text-xl text-copper leading-none transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      {open && <div className="pb-6">{children}</div>}
    </div>
  );
}

export function Accordion({ children }: { children: ReactNode }) {
  return <div className="max-w-3xl mt-16">{children}</div>;
}
