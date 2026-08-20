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
  return (
    <svg viewBox="0 0 24 18" className={className} aria-hidden="true" role="img">
      <rect width="24" height="18" fill="#FF0000" />
      <rect width="9.6" height="18" fill="#046A38" />
      <circle cx="9.6" cy="9" r="3.4" fill="#FFE900" stroke="#000" strokeWidth="0.4" />
      <circle cx="9.6" cy="9" r="2" fill="#FF0000" />
    </svg>
  );
}
