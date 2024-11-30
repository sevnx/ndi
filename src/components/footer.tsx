'use client'

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full mt-auto">
      <div className="max-w-[1120px] mx-auto pt-4">
        <div className="px-4 border-t border-black/[.08] dark:border-white/[.145]">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60 py-3 md:h-12 gap-3 md:gap-0">
            <div className="text-center md:text-left">
              © {currentYear} <span className="font-bold">René Systèmes</span>. Tous droits réservés.
            </div>
            <div className="flex gap-4">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors hover:underline hover:underline-offset-4"
              >
                GitHub
              </Link>
              <Link
                href="https://u-paris.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors hover:underline hover:underline-offset-4"
              >
                Université Paris Cité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
