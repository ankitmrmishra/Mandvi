import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="container-fixed py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <Link
              href="/"
              className="font-black uppercase text-sm inline-block mb-6"
              style={{ letterSpacing: "0.1em" }}
            >
              MANDVI TRIPATHI
            </Link>
          </div>

          {/* Column 1: Content Topics */}
          <div>
            <h3 className="meta-label text-white mb-6">TOPICS</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#"
                  className="text-sm hover:opacity-70 transition-opacity"
                >
                  Legal Analysis
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-sm hover:opacity-70 transition-opacity"
                >
                  Essays
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-sm hover:opacity-70 transition-opacity"
                >
                  Book Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Site Sections */}
          <div>
            <h3 className="meta-label text-white mb-6">SECTIONS</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#articles"
                  className="text-sm hover:opacity-70 transition-opacity"
                >
                  Latest Writing
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-sm hover:opacity-70 transition-opacity"
                >
                  About Mandvi
                </Link>
              </li>
              <li>
                <Link
                  href="/archive"
                  className="text-sm hover:opacity-70 transition-opacity"
                >
                  Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Info */}
          <div>
            <h3 className="meta-label text-white mb-6">INFO</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-sm hover:opacity-70 transition-opacity"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm hover:opacity-70 transition-opacity"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm hover:opacity-70 transition-opacity"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h3 className="meta-label text-white mb-6">FOLLOW</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:opacity-70 transition-opacity"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:opacity-70 transition-opacity"
                >
                  Twitter/X
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:opacity-70 transition-opacity"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs uppercase" style={{ letterSpacing: "0.1em" }}>
            © {currentYear} MANDVI TRIPATHI. ALL RIGHTS RESERVED.
          </p>

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:opacity-70 transition-opacity"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter/X"
              className="hover:opacity-70 transition-opacity"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:opacity-70 transition-opacity"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
