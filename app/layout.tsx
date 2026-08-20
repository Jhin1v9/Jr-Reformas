import type { ReactNode } from 'react';

/** Minimal root layout: the real <html>/<body> shell lives in app/[locale]/layout.tsx */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
