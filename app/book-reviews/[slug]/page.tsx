import { getBookReviewBySlug, getPosts } from "@/lib/request";
import { urlFor } from "@/lib/sanity";
import { PortableText, type PortableTextProps } from "@portabletext/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

type PortableTextImageValue = {
  asset?: unknown;
  alt?: string;
  caption?: string;
};

type PortableTextQuoteValue = {
  text?: string;
  attribution?: string;
};

type PortableTextChildrenProps = {
  children?: ReactNode;
};

type PortableTextValueProps = {
  value?: PortableTextImageValue | PortableTextQuoteValue;
};

function formatDate(value?: string) {
  if (!value) return "Recent";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const portableTextComponents = {
  types: {
    customImage: ({ value }: PortableTextValueProps) => {
      const typedValue = value as PortableTextImageValue | undefined;
      if (!typedValue?.asset) return null;
      const imageUrl = urlFor(typedValue).width(900).url();
      return (
        <figure className="my-8 md:my-12">
          <img src={imageUrl} alt={typedValue.alt || "Book review illustration"} className="w-full max-w-2xl object-contain" />
          {typedValue.caption && <figcaption className="mt-3 text-center text-xs text-muted-foreground">{typedValue.caption}</figcaption>}
        </figure>
      );
    },
    quote: ({ value }: PortableTextValueProps) => {
      const typedValue = value as PortableTextQuoteValue | undefined;
      return (
        <blockquote className="my-12 py-6 md:py-8">
          <p className="text-2xl md:text-4xl font-black capitalize leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>
            “{typedValue?.text || ""}”
          </p>
          {typedValue?.attribution && <cite className="mt-4 block text-xs font-bold uppercase tracking-[0.2em]">— {typedValue.attribution}</cite>}
        </blockquote>
      );
    },
  },
  block: {
    h1: ({ children }: PortableTextChildrenProps) => <h1 className="text-2xl md:text-3xl lg:text-4xl font-black capitalize mb-6 mt-10 leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>{children}</h1>,
    h2: ({ children }: PortableTextChildrenProps) => <h2 className="text-xl md:text-2xl lg:text-3xl font-black capitalize mb-5 mt-8 leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>{children}</h2>,
    h3: ({ children }: PortableTextChildrenProps) => <h3 className="text-lg md:text-xl lg:text-2xl font-black capitalize mb-4 mt-6 leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>{children}</h3>,
    normal: ({ children }: PortableTextChildrenProps) => <p className="text-sm md:text-base leading-[1.7] my-4 md:my-6 max-w-[700px]">{children}</p>,
  },
  list: {
    bullet: ({ children }: PortableTextChildrenProps) => <ul className="list-disc pl-6 my-4 md:my-6 space-y-2 max-w-[700px] text-sm md:text-base">{children}</ul>,
    number: ({ children }: PortableTextChildrenProps) => <ol className="list-decimal pl-6 my-4 md:my-6 space-y-2 max-w-[700px] text-sm md:text-base">{children}</ol>,
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const data = await getBookReviewBySlug(params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mandvi.blog";
  const reviewUrl = `${baseUrl}/book-reviews/${params.slug}`;

  return {
    title: data ? `${data.bookTitle} | Book Review` : "Book Review",
    description: data?.shortSummary || data?.excerpt || "Detailed book review by Mandvi Tripathi",
    openGraph: {
      title: data ? `${data.bookTitle} | Book Review` : "Book Review",
      description: data?.shortSummary || data?.excerpt || "Detailed book review by Mandvi Tripathi",
      url: reviewUrl,
      type: "article",
    },
  };
}

export default async function BookReviewDetailPage({ params }: { params: { slug: string } }) {
  const review = await getBookReviewBySlug(params.slug);
  const latestPosts = await getPosts();

  if (!review) return notFound();

  let coverImageUrl = "";
  const coverImage = review.bookCover || review.featuredImage;
  if (coverImage) {
    try {
      coverImageUrl = urlFor(coverImage).width(1400).height(800).url();
    } catch {
      const img = coverImage as { url?: string };
      if (img?.url) coverImageUrl = img.url;
    }
  }

  let authorPhotoUrl = "";
  if (review.author?.photo) {
    try {
      authorPhotoUrl = urlFor(review.author.photo).width(120).height(120).url();
    } catch {
      // ignore
    }
  }

  const reviewerName = review.author?.name || "Mandvi Tripathi";
  const bookAuthorName = review.authorOfBook || "Unknown";
  const category = review.categories && review.categories.length > 0 ? review.categories[0].title.toUpperCase() : "BOOK REVIEW";
  const hasReviewContent = Boolean(review.review);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container-fixed pt-8 md:pt-12 pb-8 md:pb-12">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <Link href="/book-reviews" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
            Back to reviews
          </Link>
          <span className="meta-label text-[10px] md:text-xs">{category}</span>
        </div>

        <div className="mb-8 md:mb-10">
          <p className="text-xs font-black uppercase tracking-[0.3em] mb-3">Book Review</p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black capitalize leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>
            {review.title || review.bookTitle}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Reviewed by {reviewerName}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:gap-6 border-t border-black pt-4 md:pt-6 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span className="meta-label">Date</span>
            <span className="meta-value">{formatDate(review.publishedDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="meta-label">Rating</span>
            <span className="meta-value">{review.rating}/5</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="meta-label">Genre</span>
            <span className="meta-value">{review.genre || "Book Review"}</span>
          </div>
        </div>

        {coverImageUrl && (
          <div className="mt-8 md:mt-12">
            <img src={coverImageUrl} alt={review.bookTitle} className="w-full max-h-[480px] object-cover" />
          </div>
        )}

        <div className="mt-10 md:mt-14 hidden lg:grid lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-3">
            <div className="sticky top-24">
              <div className="mb-4">
                {authorPhotoUrl ? (
                  <img src={authorPhotoUrl} alt={reviewerName} className="w-20 h-20 rounded-full object-cover" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center font-black capitalize text-2xl">
                    {reviewerName.charAt(0)}
                  </div>
                )}
              </div>

              <div className="mb-4 pb-4 border-b border-black">
                <p className="font-black capitalize text-sm mb-1" style={{ letterSpacing: "0.1em" }}>
                  {reviewerName}
                </p>
                <p className="text-xs text-muted-foreground">Reviewer / Columnist</p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="meta-label mb-1">Date</p>
                  <p className="meta-value">{formatDate(review.publishedDate)}</p>
                </div>
                <div>
                  <p className="meta-label mb-1">Rating</p>
                  <p className="meta-value">{review.rating}/5</p>
                </div>
                <div>
                  <p className="meta-label mb-1">Genre</p>
                  <p className="meta-value">{review.genre || "Book Review"}</p>
                </div>
              </div>
            </div>
          </aside>

          <article className="lg:col-span-6">
            <div className="space-y-6">
              <div className="rounded border border-border/70 p-6 md:p-8 bg-card">
                <p className="text-sm font-black uppercase tracking-[0.2em] mb-3">Summary</p>
                <p className="text-sm md:text-base leading-[1.7]">{review.shortSummary || review.excerpt}</p>
              </div>
              {hasReviewContent ? (
                <div className="prose prose-neutral max-w-none">
                  <PortableText value={review.review as PortableTextProps["value"]} components={portableTextComponents} />
                </div>
              ) : null}
            </div>
          </article>

          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-8">
              <div className="rounded border border-border/70 p-6 bg-card">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4">About the book</h2>
                <div className="space-y-2 text-sm leading-[1.6]">
                  <p><span className="meta-label">Title</span> {review.bookTitle}</p>
                  {bookAuthorName ? <p><span className="meta-label">Author</span> {bookAuthorName}</p> : null}
                  {review.genre ? <p><span className="meta-label">Genre</span> {review.genre}</p> : null}
                  <p><span className="meta-label">Rating</span> {review.rating}/5</p>
                </div>
              </div>

              <div className="pt-8 border-t border-black">
                <h3 className="font-black capitalize text-sm mb-6" style={{ letterSpacing: "0.1em" }}>
                  Latest Articles
                </h3>
                <div className="space-y-6">
                  {latestPosts.slice(0, 4).map((post) => (
                    <Link key={post._id} href={`/${post.slug}`} className="group block pb-6 border-b border-black/10 last:border-0 last:pb-0">
                      <article>
                        <h4 className="text-xs font-black capitalize leading-tight mb-2 group-hover:opacity-70 transition-opacity">
                          {post.title}
                        </h4>
                        <p className="text-xs meta-value">{post.readingTime || "5 min"}</p>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-10 md:mt-14 lg:hidden space-y-8">
          <div className="border-t border-black pt-8">
            <div className="flex items-start gap-4 mb-6">
              {authorPhotoUrl ? (
                <img src={authorPhotoUrl} alt={reviewerName} className="w-14 h-14 rounded-full object-cover" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center font-black capitalize text-lg">
                  {reviewerName.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-black capitalize text-sm mb-1" style={{ letterSpacing: "0.1em" }}>
                  {reviewerName}
                </p>
                <p className="text-xs text-muted-foreground">Reviewer / Columnist</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded border border-border/70 p-6 bg-card">
              <p className="text-sm font-black uppercase tracking-[0.2em] mb-3">Summary</p>
              <p className="text-sm leading-[1.7]">{review.shortSummary || review.excerpt}</p>
            </div>
            {hasReviewContent ? (
              <div className="prose prose-neutral max-w-none">
                <PortableText value={review.review as PortableTextProps["value"]} components={portableTextComponents} />
              </div>
            ) : null}
          </div>

          <div className="rounded border border-border/70 p-6 bg-card">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4">About the book</h2>
            <div className="space-y-2 text-sm leading-[1.6]">
              <p><span className="meta-label">Title</span> {review.bookTitle}</p>
              {bookAuthorName ? <p><span className="meta-label">Author</span> {bookAuthorName}</p> : null}
              {review.genre ? <p><span className="meta-label">Genre</span> {review.genre}</p> : null}
              <p><span className="meta-label">Rating</span> {review.rating}/5</p>
            </div>
          </div>

          <div className="pt-8 border-t border-black">
            <h3 className="font-black capitalize text-sm mb-6" style={{ letterSpacing: "0.1em" }}>
              Latest Articles
            </h3>
            <div className="space-y-6">
              {latestPosts.slice(0, 4).map((post) => (
                <Link key={post._id} href={`/${post.slug}`} className="group block pb-6 border-b border-black/10 last:border-0 last:pb-0">
                  <article>
                    <h4 className="text-xs font-black capitalize leading-tight mb-2 group-hover:opacity-70 transition-opacity">
                      {post.title}
                    </h4>
                    <p className="text-xs meta-value">{post.readingTime || "5 min"}</p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
