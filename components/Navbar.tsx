"use client";
import React from "react";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";

const Navbar = () => {
  return (
    <>
      <nav className="bg-background sticky top-0 z-50 border-b border-border">
        <div className="container-fixed">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="font-black capitalize text-sm hover:opacity-70 transition-opacity"
              style={{ letterSpacing: "0.1em" }}
            >
              MANDVI
            </Link>

            {/* Right Side: Nav Links + Divider + Social Icons + Theme Switcher */}
            <div className="flex items-center gap-6 md:gap-8">
              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-8">
                <Link
                  href="/#articles"
                  className="text-xs capitalize font-bold hover:opacity-70 transition-opacity"
                  style={{ letterSpacing: "0.1em" }}
                >
                  Essays
                </Link>
                <Link
                  href="/#about"
                  className="text-xs capitalize font-bold hover:opacity-70 transition-opacity"
                  style={{ letterSpacing: "0.1em" }}
                >
                  About
                </Link>
                {/* <Link
                  href="/#newsletter"
                  className="text-xs capitalize font-bold hover:opacity-70 transition-opacity"
                  style={{ letterSpacing: "0.1em" }}
                >
                  Newsletter
                </Link> */}
              </div>

              {/* Vertical Divider */}
              <div className="hidden md:block w-px h-6 bg-border"></div>

              {/* Social Icons + Theme Switcher */}
              <div className="flex items-center gap-3 md:gap-4">
                <ThemeSwitcher />
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Instagram"
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
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Twitter/X"
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
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                  aria-label="YouTube"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </a>
                <a
                  href="/rss.xml"
                  className="hover:opacity-70 transition-opacity"
                  aria-label="RSS Feed"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 11a9 9 0 019 9" />
                    <path d="M4 4a16 16 0 0116 16" />
                    <circle cx="5" cy="19" r="1" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* 1px horizontal rule under nav */}
      <div className="hairline"></div>
    </>
  );
};

export default Navbar;
