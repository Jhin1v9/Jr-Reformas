/** Banderas SVG hechas a mano (sin emojis ni imágenes externas). */

export function FlagES({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 18" className={className} aria-hidden="true" role="img">
      <rect width="24" height="18" fill="#AA151B" />
      <rect y="4.5" width="24" height="9" fill="#F1BF00" />
    </svg>
  );
}

export function FlagGB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 18" className={className} aria-hidden="true" role="img">
      <rect width="24" height="18" fill="#012169" />
      <path d="M0 0l24 18M24 0L0 18" stroke="#fff" strokeWidth="3.4" />
      <path d="M0 0l24 18M24 0L0 18" stroke="#C8102E" strokeWidth="1.6" />
      <path d="M12 0v18M0 9h24" stroke="#fff" strokeWidth="5.4" />
      <path d="M12 0v18M0 9h24" stroke="#C8102E" strokeWidth="3.2" />
    </svg>
  );
}

export function FlagPT({ className }: { className?: string }) {
  // Brasil — conforme exigido pelo cliente (nunca Portugal).
  return (
    <svg viewBox="0 0 24 18" className={className} aria-hidden="true" role="img">
      <rect width="24" height="18" fill="#009C3B" />
      <path d="M12 2l9 7-9 7-9-7z" fill="#FFDF00" />
      <circle cx="12" cy="9" r="4" fill="#002776" />
      <path d="M8.5 9c2.5-1.5 5-1.5 7 0-2 1.5-4.5 1.5-7 0z" fill="#FFFFFF" />
    </svg>
  );
}

export function FlagCA({ className }: { className?: string }) {
  // Senyera (Catalunya).
  return (
    <svg viewBox="0 0 24 18" className={className} aria-hidden="true" role="img">
      <rect width="24" height="18" fill="#FCDD09" />
      <rect y="2" width="24" height="1.4" fill="#DA121A" />
      <rect y="5.6" width="24" height="1.4" fill="#DA121A" />
      <rect y="9.2" width="24" height="1.4" fill="#DA121A" />
      <rect y="12.8" width="24" height="1.4" fill="#DA121A" />
      <rect y="16" width="24" height="1.4" fill="#DA121A" />
    </svg>
  );
}
