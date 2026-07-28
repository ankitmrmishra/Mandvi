import React from "react";
import Link from "next/link";
import { getPosts } from "@/lib/request";
import { urlFor } from "@/lib/sanity";

export default async function Hero() {
  const posts = await getPosts();
  const latestPost = posts[0]; // Get the most recent article

  if (!latestPost) {
    return null;
  }

  // Resolve image url
  let imageUrl = "/placeholder.svg";
  if (latestPost.featuredImage) {
    try {
      imageUrl = urlFor(latestPost.featuredImage).width(1400).height(900).url();
    } catch {
      const img = latestPost.featuredImage as { url?: string };
      if (img && img.url) imageUrl = img.url;
    }
  }

  const category =
    latestPost.categories && latestPost.categories.length > 0
      ? latestPost.categories[0].title.toUpperCase()
      : "Latest";

  const publishDate = latestPost.publishedDate
    ? new Date(latestPost.publishedDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  const readingTime = latestPost.readingTime || "5 min";

  return (
    <section className="section-spacing">
      <div className="container-fixed">
        {/* Latest Article Hero */}
        <Link href={`/${latestPost.slug}`} className="group block">
          <article>
            {/* Category Label */}
            <div className="mb-8">
              <span className="pill-badge">{category}</span>
            </div>

            {/* Hero Title */}
            <h1 className="text-hero font-black capitalize mb-12 group-hover:opacity-70 transition-opacity">
              {latestPost.title}
            </h1>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-6 mb-12">
              <div className="flex items-center gap-2">
                <span className="meta-label">By</span>
                <span className="meta-value">
                  {latestPost.author?.name || "Mandvi Tripathi"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="meta-label">Date</span>
                <span className="meta-value">{publishDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="meta-label">Read</span>
                <span className="meta-value">{readingTime}</span>
              </div>
            </div>

            {/* Excerpt */}
            {latestPost.excerpt && (
              <p className="text-lg md:text-xl leading-[1.6] max-w-[800px] mb-12">
                {latestPost.excerpt}
              </p>
            )}

            {/* Hero Image */}
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={latestPost.title}
                className="w-full h-full object-cover  group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </article>
        </Link>
      </div>
    </section>
  );
}
