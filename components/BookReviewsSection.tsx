"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getBookReviews, SanityBookReview } from "@/lib/request";
import { urlFor } from "@/lib/sanity";

export default function BookReviewsSection() {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["book-reviews"],
    queryFn: getBookReviews,
  });

  const latestReviews = reviews?.slice(0, 3) ?? [];

  return (
    <section id="book-reviews" className="section-spacing border-t border-black">
      <div className="container-fixed">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black capitalize tracking-[0.3em] mb-3">Critical reading</p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black capitalize"
              style={{ letterSpacing: "-0.03em" }}
            >
              Book Reviews
            </h2>
          </div>
          {reviews && reviews.length > 3 && (
            <Link
              href="/book-reviews"
              className="inline-flex items-center gap-2 text-sm font-black capitalize tracking-[0.2em] hover:opacity-70 transition-opacity"
            >
              See all reviews <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground animate-spin"></div>
          </div>
        ) : latestReviews.length === 0 ? (
          <div className="rounded border border-border/70 p-8 text-sm text-muted-foreground">
            Book reviews will appear here once you add entries in Sanity.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {latestReviews.map((review) => (
              <BookReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}

        {reviews && reviews.length > 3 && (
          <div className="mt-12 text-center">
            <Link
              href="/book-reviews"
              className="inline-block px-8 py-4 border border-black font-black capitalize text-sm hover:bg-black hover:text-white transition-colors"
              style={{ letterSpacing: "0.1em" }}
            >
              Show more reviews
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

interface BookReviewCardProps {
  review: SanityBookReview;
}

function BookReviewCard({ review }: BookReviewCardProps) {
  let imageUrl = "/placeholder.svg";
  if (review.featuredImage) {
    try {
      imageUrl = urlFor(review.featuredImage).width(600).height(400).url();
    } catch {
      const img = review.featuredImage as { url?: string };
      if (img?.url) imageUrl = img.url;
    }
  }

  const publishDate = review.publishedDate
    ? new Date(review.publishedDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  const categoryLabel = review.categories && review.categories.length > 0
    ? review.categories[0].title.toUpperCase()
    : "BOOK REVIEW";

  return (
    <Link href={`/book-reviews/${review.slug}`} className="group block">
      <article className="h-full flex flex-col">
        <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={review.bookTitle}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="mb-4">
          <span className="pill-badge text-[10px]">{categoryLabel}</span>
        </div>

        <h3
          className="text-xl md:text-2xl font-black capitalize mb-4 group-hover:opacity-70 transition-opacity leading-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          {review.title || review.bookTitle}
        </h3>

        <p className="text-sm text-muted-foreground mb-4">
          {review.authorOfBook ? `by ${review.authorOfBook}` : review.author?.name || "Mandvi Tripathi"}
        </p>

        <p className="text-sm leading-[1.6] mb-4 line-clamp-3">
          {review.shortSummary || review.excerpt || "A detailed review is available on the dedicated book review page."}
        </p>

        <div className="flex items-center gap-4 mt-auto text-xs">
          <div className="flex items-center gap-2">
            <span className="meta-label">Date</span>
            <span className="meta-value">{publishDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="meta-label">Rating</span>
            <span className="meta-value">{review.rating}/5</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
