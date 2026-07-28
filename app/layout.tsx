import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import { Merriweather } from "next/font/google";
import { cn } from "@/lib/utils";

// Premium Typography System
const merriweather = Merriweather({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "vietnamese"],
  variable: "--font-heading",
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Mandvi Tripathi | Legal Analysis, Essays & Book Reviews",
    template: "%s | Mandvi Tripathi",
  },
  description:
    "Thoughtful writing on legal frameworks, scholarly research, and critical book reviews. Where serious writing lives.",
  keywords: [
    "legal analysis",
    "book reviews",
    "scholarly essays",
    "research articles",
    "legal frameworks",
    "academic writing",
    "critical thinking",
  ],
  authors: [{ name: "Mandvi Tripathi" }],
  creator: "Mandvi Tripathi",
  metadataBase: new URL("https://mandvi.blog"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mandvi.blog",
    title: "Mandvi Tripathi | Legal Analysis, Essays & Book Reviews",
    description:
      "Thoughtful writing on legal frameworks, scholarly research, and critical book reviews.",
    siteName: "Mandvi Tripathi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mandvi Tripathi | Legal Analysis, Essays & Book Reviews",
    description:
      "Thoughtful writing on legal frameworks, scholarly research, and critical book reviews.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(merriweather.variable)}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "antialiased dark",
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
