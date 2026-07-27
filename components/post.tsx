/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getPostBySlug, getPosts, subscribeToNewsletter } from "../lib/request";
import { useQuery } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  slug: string;
};

// Custom serializers for Portable Text rendering
const portableTextComponents = {
  types: {
    customImage: ({ value }: any) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value).width(800).url();

      return (
        <figure className="my-8 md:my-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={value.alt || ""}
            className="w-full max-w-2xl object-contain"
          />
          {value.caption && (
            <figcaption className="text-center text-xs text-muted-foreground mt-3 md:mt-4">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    quote: ({ value }: any) => {
      return (
        <blockquote className="my-12 md:my-16 py-6 md:py-8">
          <p
            className="text-2xl md:text-4xl lg:text-5xl font-black uppercase leading-[0.95]"
            style={{ letterSpacing: "-0.03em" }}
          >
            &ldquo;{value.text}&rdquo;
          </p>
          {value.attribution && (
            <cite
              className="block mt-4 md:mt-6 text-xs uppercase font-bold not-italic"
              style={{ letterSpacing: "0.1em" }}
            >
              — {value.attribution}
            </cite>
          )}
        </blockquote>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1
        className="text-2xl md:text-3xl lg:text-4xl font-black uppercase mb-6 mt-10 first:mt-0 leading-[0.95]"
        style={{ letterSpacing: "-0.03em" }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2
        className="text-xl md:text-2xl lg:text-3xl font-black uppercase mb-5 mt-8 leading-[0.95]"
        style={{ letterSpacing: "-0.03em" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3
        className="text-lg md:text-xl lg:text-2xl font-black uppercase mb-4 mt-6 leading-[0.95]"
        style={{ letterSpacing: "-0.03em" }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4
        className="text-base md:text-lg lg:text-xl font-black uppercase mb-3 mt-6 leading-[0.95]"
        style={{ letterSpacing: "-0.03em" }}
      >
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-sm md:text-base leading-[1.6] my-4 md:my-6 max-w-[600px]">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote
        className="my-12 md:my-16 py-6 md:py-8 text-2xl md:text-4xl lg:text-5xl font-black uppercase leading-[0.95]"
        style={{ letterSpacing: "-0.03em" }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 my-4 md:my-6 space-y-2 md:space-y-3 max-w-[600px] text-sm md:text-base">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 my-4 md:my-6 space-y-2 md:space-y-3 max-w-[600px] text-sm md:text-base">
        {children}
      </ol>
    ),
  },
};

export default function Post({ slug }: Props) {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPostBySlug(slug),
  });

  // Fetch latest posts for sidebar
  const { data: latestPosts } = useQuery({
    queryKey: ["latest-posts"],
    queryFn: getPosts,
  });

  // Newsletter state
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setNewsletterStatus("loading");
    try {
      await subscribeToNewsletter(email);
      setNewsletterStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch {
      setNewsletterStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-foreground/20 border-t-foreground"></div>
      </div>
    );
  }

  if (!data) return notFound();

  // Resolve cover image
  let coverImageUrl = "";
  if (data.featuredImage) {
    try {
      coverImageUrl = urlFor(data.featuredImage).width(1400).height(800).url();
    } catch {
      const img = data.featuredImage as { url?: string };
      if (img && img.url) coverImageUrl = img.url;
    }
  }

  // Resolve author photo
  let authorPhotoUrl = "";
  if (data.author?.photo) {
    try {
      authorPhotoUrl = urlFor(data.author.photo).width(80).height(80).url();
    } catch {
      // ignore
    }
  }

  const publishDate = new Date(
    data.publishedDate || Date.now(),
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const category =
    data.categories && data.categories.length > 0
      ? data.categories[0].title.toUpperCase()
      : "ARTICLE";

  // Generate share URLs
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://mandvi.vercel.app';
  const articleUrl = `${baseUrl}/${slug}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${data.title} by Mandvi Tripathi`)}&url=${encodeURIComponent(articleUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;

  return (
    <div className="min-h-screen pt-0 bg-background">
      {/* Header Section */}
      <div className="container-fixed pt-8 md:pt-12 pb-6 md:pb-8">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          {/* Back Link */}
          <button onClick={() => router.back()} className="back-link text-xs">
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
            GO BACK
          </button>

          {/* Section Label */}
          <span className="meta-label text-[10px] md:text-xs">{category}</span>
        </div>

        {/* Title */}
        <div className="mb-6 md:mb-8">
          <h1
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase leading-[0.95] mb-0"
            style={{ letterSpacing: "-0.03em" }}
          >
            {data.title}
          </h1>
        </div>

        {/* Meta Row: Author, Date, Read Time, Label Badge */}
        <div className="flex flex-wrap items-center gap-3 md:gap-6 pt-4 md:pt-6 border-t border-black text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span className="meta-label text-[10px] md:text-xs">Text</span>
            <span className="meta-value text-[10px] md:text-xs">
              {data.author?.name || "Mandvi Tripathi"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="meta-label text-[10px] md:text-xs">Date</span>
            <span className="meta-value text-[10px] md:text-xs">
              {publishDate}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="meta-label text-[10px] md:text-xs">Read</span>
            <span className="meta-value text-[10px] md:text-xs">
              {data.readingTime || "5 min"}
            </span>
          </div>
          <div className="ml-auto">
            <span className="pill-badge text-[9px] md:text-[10px] px-2 md:px-3 py-0.5 md:py-1">
              {category}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      {coverImageUrl && (
        <div className="container-fixed mb-12 md:mb-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImageUrl}
            alt={data.title}
            className="w-full object-cover "
          />
        </div>
      )}

      {/* Article Content Layout */}
      <div className="container-fixed pb-16 md:pb-24">
        {/* Mobile Layout: Article Content First, then Author Info */}
        <div className="lg:hidden">
          {/* Article Content */}
          <article className="mb-12 md:mb-16">
            <div className="blog-content">
              {data.content ? (
                <PortableText
                  value={data.content as any}
                  components={portableTextComponents}
                />
              ) : (
                <p className="text-muted-foreground italic text-sm">
                  No content available.
                </p>
              )}
            </div>
          </article>

          {/* Author Info - Mobile */}
          <div className="border-t border-black pt-8 mb-12 md:mb-16">
            <div className="flex items-start gap-4 mb-6">
              {authorPhotoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={authorPhotoUrl}
                  alt={data.author?.name || "Author"}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover  flex-shrink-0"
                />
              ) : (
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-black text-white flex items-center justify-center font-black uppercase text-lg md:text-xl flex-shrink-0">
                  {data.author?.name ? data.author.name.charAt(0) : "M"}
                </div>
              )}
              <div>
                <p
                  className="font-black uppercase text-xs md:text-sm mb-2"
                  style={{ letterSpacing: "0.1em" }}
                >
                  {data.author?.name || "Mandvi Tripathi"}
                </p>
                <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <span className="meta-label">Date</span>
                    <span className="meta-value">{publishDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <span className="meta-label">Read</span>
                    <span className="meta-value">
                      {data.readingTime || "5 min"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="meta-label mb-2 text-[10px] md:text-xs">Share</p>
              <div className="flex items-center gap-3">
                <a 
                  href={twitterShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  href={linkedinShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
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

          {/* Newsletter - Mobile */}
          <div className="border-t border-black pt-8">
            <h3
              className="font-black uppercase text-sm mb-4"
              style={{ letterSpacing: "0.1em" }}
            >
              Newsletter
            </h3>
            <p className="text-sm leading-[1.6] mb-4">
              Get thoughtful essays and legal analysis delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full px-4 py-3 bg-white text-black border border-black focus:outline-none focus:ring-1 focus:ring-black text-sm"
              />
              <button
                type="submit"
                disabled={newsletterStatus === "loading"}
                className="w-full px-6 py-3 bg-black text-white font-black text-sm hover:bg-black/90 transition-colors disabled:opacity-50 uppercase"
                style={{ letterSpacing: "0.1em" }}
              >
                {newsletterStatus === "loading" ? "..." : "Subscribe"}
              </button>
            </form>
            {message && (
              <p
                className={`text-sm mt-3 ${
                  newsletterStatus === "success" ? "text-black" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Desktop Layout: 3-Column Grid */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12">
          {/* Left Sidebar - Author Info */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24">
              {/* Author Photo */}
              <div className="mb-4">
                {authorPhotoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={authorPhotoUrl}
                    alt={data.author?.name || "Author"}
                    className="w-20 h-20 rounded-full object-cover "
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center font-black uppercase text-2xl">
                    {data.author?.name ? data.author.name.charAt(0) : "M"}
                  </div>
                )}
              </div>

              {/* Author Name */}
              <div className="mb-4 pb-4 border-b border-black">
                <p
                  className="font-black uppercase text-sm mb-1"
                  style={{ letterSpacing: "0.1em" }}
                >
                  {data.author?.name || "Mandvi Tripathi"}
                </p>
              </div>

              {/* Metadata */}
              <div className="space-y-4">
                <div>
                  <p className="meta-label mb-1">Date</p>
                  <p className="meta-value">{publishDate}</p>
                </div>
                <div>
                  <p className="meta-label mb-1">Read</p>
                  <p className="meta-value">{data.readingTime || "5 min"}</p>
                </div>
                <div>
                  <p className="meta-label mb-2">Share</p>
                  <div className="flex items-center gap-3">
                    <a 
                      href={twitterShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
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
                      href={linkedinShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
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
            </div>
          </aside>

          {/* Center - Article Content */}
          <article className="lg:col-span-6">
            <div className="blog-content">
              {data.content ? (
                <PortableText
                  value={data.content as any}
                  components={portableTextComponents}
                />
              ) : (
                <p className="text-muted-foreground italic">
                  No content available.
                </p>
              )}
            </div>
          </article>

          {/* Right Sidebar - Newsletter + Latest Articles */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-12">
              {/* Newsletter Section */}
              <div>
                <h3
                  className="font-black uppercase text-sm mb-4"
                  style={{ letterSpacing: "0.1em" }}
                >
                  Newsletter
                </h3>
                <p className="text-xs leading-[1.6] mb-4">
                  Get thoughtful essays and legal analysis delivered to your
                  inbox.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full px-3 py-2 bg-white text-black border border-black focus:outline-none focus:ring-1 focus:ring-black text-xs"
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === "loading"}
                    className="w-full px-4 py-2 bg-black text-white font-black text-xs hover:bg-black/90 transition-colors disabled:opacity-50 uppercase"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    {newsletterStatus === "loading" ? "..." : "Subscribe"}
                  </button>
                </form>
                {message && (
                  <p
                    className={`text-xs mt-3 ${
                      newsletterStatus === "success"
                        ? "text-black"
                        : "text-red-600"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </div>

              {/* Latest Articles Section - Title Only, No Images */}
              <div className="pt-8 border-t border-black">
                <h3
                  className="font-black uppercase text-sm mb-6"
                  style={{ letterSpacing: "0.1em" }}
                >
                  Latest Articles
                </h3>
                <div className="space-y-6">
                  {latestPosts?.slice(0, 4).map((post) => {
                    return (
                      <Link
                        key={post._id}
                        href={`/${post.slug}`}
                        className="group block pb-6 border-b border-black/10 last:border-0 last:pb-0"
                      >
                        <article>
                          <h4 className="text-xs font-black uppercase leading-tight mb-2 group-hover:opacity-70 transition-opacity">
                            {post.title}
                          </h4>
                          <p className="text-xs meta-value">
                            {post.readingTime || "5 min"}
                          </p>
                        </article>
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href="/"
                  className="inline-block mt-6 text-xs uppercase font-bold hover:opacity-70 transition-opacity"
                  style={{ letterSpacing: "0.1em" }}
                >
                  View All →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Hairline before latest posts */}
      <div className="hairline"></div>
    </div>
  );
}
