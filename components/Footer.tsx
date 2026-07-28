import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="container-fixed py-16">
        <div className="mb-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="mb-6 inline-block text-sm font-black capitalize"
              style={{ letterSpacing: "0.1em" }}
            >
              MANDVI TRIPATHI
            </Link>
            <p className="max-w-sm text-sm leading-6 text-foreground/70">
              Essays, legal analysis, and book reviews grounded in careful reading and clear thinking.
            </p>
          </div>

          <div>
            <h3 className="meta-label mb-6 text-foreground/70">READ</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#articles" className="text-sm text-foreground/80 transition-opacity hover:text-foreground hover:opacity-80">
                  Latest Writing
                </Link>
              </li>
              <li>
                <Link href="/archive" className="text-sm text-foreground/80 transition-opacity hover:text-foreground hover:opacity-80">
                  Archive
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-sm text-foreground/80 transition-opacity hover:text-foreground hover:opacity-80">
                  About Mandvi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="meta-label mb-6 text-foreground/70">INFO</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/useful-links" className="text-sm text-foreground/80 transition-opacity hover:text-foreground hover:opacity-80">
                  Useful Links
                </Link>
              </li>
              <li>
                <a href="mailto:contact@mandvitripathi.com" className="text-sm text-foreground/80 transition-opacity hover:text-foreground hover:opacity-80">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="meta-label mb-6 text-foreground/70">CONNECT</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contact@mandvitripathi.com" className="text-sm text-foreground/80 transition-opacity hover:text-foreground hover:opacity-80">
                  Email
                </a>
              </li>
              <li>
                <Link href="/useful-links" className="text-sm text-foreground/80 transition-opacity hover:text-foreground hover:opacity-80">
                  Privacy & Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border/70 pt-8 md:flex-row md:items-center">
          <p className="text-xs capitalize tracking-[0.2em] text-foreground/70">
            © {currentYear} MANDVI TRIPATHI. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center space-x-4 text-foreground/80">
            <a
              href="mailto:contact@mandvitripathi.com"
              aria-label="Email"
              className="transition-opacity hover:opacity-70"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
