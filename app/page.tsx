import React from "react";
import Hero from "@/components/Hero";
import BlogSection from "@/components/BlogSection";
import Categories from "@/components/Categories";
import Features from "@/components/Features";
import WhoIAm from "@/components/WhoIAm";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/request";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export const revalidate = 60; // Revalidate pages every 60 seconds (ISR)

// SEO Metadata
export const metadata = {
  title: "Mandvi Tripathi | Legal Analysis, Essays & Book Reviews",
  description:
    "Thoughtful writing on legal frameworks, scholarly research, and critical book reviews. Explore articles by Mandvi Tripathi, researcher and legal analyst.",
  keywords: [
    "legal analysis",
    "book reviews",
    "scholarly essays",
    "research articles",
    "legal frameworks",
    "academic writing",
  ],
  authors: [{ name: "Mandvi Tripathi" }],
  openGraph: {
    title: "Mandvi Tripathi | Legal Analysis, Essays & Book Reviews",
    description:
      "Thoughtful writing on legal frameworks, scholarly research, and critical book reviews.",
    type: "website",
    locale: "en_US",
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
    },
  },
};

export default async function Home() {
  const queryClient = new QueryClient();
  const settings = await getSiteSettings();

  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Articles Section */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlogSection />
      </HydrationBoundary>

      {/* About Section */}
      <WhoIAm />

      {/* Newsletter Section */}
      <Newsletter settings={settings?.newsletterSettings} />

      {/* Footer */}
      <Footer />
    </main>
  );
}
