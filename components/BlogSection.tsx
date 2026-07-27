"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts, SanityPost } from "@/lib/request";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";

export default function BlogSection() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <>
      {/* Latest Articles Section */}
      <section id="articles" className="section-spacing border-t border-black">
        <div className="container-fixed">
          {/* Section Header */}
          <div className="mb-12">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black uppercase"
              style={{ letterSpacing: "-0.03em" }}
            >
              LATEST WRITING
            </h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {/* Skip the first post (already shown in hero) and show next 6 */}
              {posts?.slice(1, 7).map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* More Articles Section */}
      {posts && posts.length > 7 && (
        <section className="section-spacing border-t border-black">
          <div className="container-fixed">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-12">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-black uppercase"
                style={{ letterSpacing: "-0.03em" }}
              >
                MORE ARTICLES
              </h2>
              <Link
                href="/archive"
                className="text-xs uppercase font-bold hover:opacity-70 transition-opacity"
                style={{ letterSpacing: "0.1em" }}
              >
                VIEW ALL →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {/* Show articles 8 onwards */}
              {posts?.slice(7, 13).map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>

            {/* See All Button */}
            {posts.length > 13 && (
              <div className="mt-16 text-center">
                <Link
                  href="/archive"
                  className="inline-block px-12 py-4 bg-black text-white font-black uppercase text-sm hover:bg-black/90 transition-colors"
                  style={{ letterSpacing: "0.1em" }}
                >
                  VIEW ALL ARTICLES
                </Link>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

interface BlogCardProps {
  post: SanityPost;
}

export function BlogCard({ post }: BlogCardProps) {
  // Resolve image url
  let imageUrl = "/placeholder.svg";
  if (post.featuredImage) {
    try {
      imageUrl = urlFor(post.featuredImage).width(600).height(400).url();
    } catch {
      const img = post.featuredImage as { url?: string };
      if (img && img.url) imageUrl = img.url;
    }
  } else {
    const p = post as { coverImage?: { url?: string } };
    if (p.coverImage?.url) {
      imageUrl = p.coverImage.url;
    }
  }

  // Formatting date
  const publishDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  // Category and reading time labels
  const categoryLabel =
    post.categories && post.categories.length > 0
      ? post.categories[0].title.toUpperCase()
      : "ESSAY";
  const readingTimeLabel = post.readingTime || "5 min";

  return (
    <Link href={`/${post.slug}`} className="group block">
      <article className="h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={post.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 "
          />
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="pill-badge text-[10px]">{categoryLabel}</span>
        </div>

        {/* Title */}
        <h3
          className="text-xl md:text-2xl font-black uppercase mb-4 group-hover:opacity-70 transition-opacity leading-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-sm leading-[1.6] mb-4 line-clamp-2">
            {post.excerpt}
          </p>
        )}

        {/* Meta - Label/Value pairs */}
        <div className="flex items-center gap-4 mt-auto text-xs">
          <div className="flex items-center gap-2">
            <span className="meta-label">Date</span>
            <span className="meta-value">{publishDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="meta-label">Read</span>
            <span className="meta-value">{readingTimeLabel}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
