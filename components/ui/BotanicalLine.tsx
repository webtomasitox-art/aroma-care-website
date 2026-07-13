interface BotanicalLineProps {
  className?: string;
}

export function BotanicalLine({ className = "" }: BotanicalLineProps) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 30C20 30 24 10 40 10C56 10 58 26 78 26C96 26 100 6 118 6"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <circle cx="40" cy="10" r="1.5" fill="currentColor" />
      <circle cx="78" cy="26" r="1.5" fill="currentColor" />
      <path d="M40 10C40 10 36 4 30 4" stroke="currentColor" strokeWidth="0.6" />
      <path d="M78 26C78 26 82 32 88 33" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  );
}
