import Link from "next/link";
import { getPosts } from "@/lib/request";
import { urlFor } from "@/lib/sanity";

const POSTS_PER_PAGE = 9;

function formatDate(value?: string) {
  if (!value) return "Recent";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getCategoryLabel(post: Awaited<ReturnType<typeof getPosts>>[number]) {
  return post.categories && post.categories.length > 0
    ? post.categories[0].title.toUpperCase()
    : "ESSAY";
}

export default async function ArchivePage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page || 1);
  const allPosts = await getPosts();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (safePage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="section-spacing border-b border-border/70">
        <div className="container-fixed">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black capitalize tracking-[0.3em] mb-3">Archive</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black capitalize" style={{ letterSpacing: "-0.03em" }}>
                All articles
              </h1>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-black capitalize tracking-[0.2em] hover:opacity-70 transition-opacity"
            >
              Back home <span aria-hidden="true">←</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {paginatedPosts.map((post) => {
              let imageUrl = "/placeholder.svg";
              if (post.featuredImage) {
                try {
                  imageUrl = urlFor(post.featuredImage).width(600).height(400).url();
                } catch {
                  const img = post.featuredImage as { url?: string };
                  if (img?.url) imageUrl = img.url;
                }
              } else {
                const cover = post as { coverImage?: { url?: string } };
                if (cover.coverImage?.url) imageUrl = cover.coverImage.url;
              }

              return (
                <article key={post._id} className="group flex h-full flex-col border border-border/70 bg-card p-4 text-card-foreground transition-colors hover:border-foreground/40">
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-muted">
                    <img src={imageUrl} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>

                  <div className="mb-4">
                    <span className="pill-badge text-[10px]">{getCategoryLabel(post)}</span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-black capitalize leading-tight mb-4 group-hover:opacity-70 transition-opacity" style={{ letterSpacing: "-0.03em" }}>
                    {post.title}
                  </h2>

                  {post.excerpt && <p className="mb-4 text-sm leading-[1.6] line-clamp-3">{post.excerpt}</p>}

                  <div className="mt-auto flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="meta-label">Date</span>
                      <span className="meta-value">{formatDate(post.publishedDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="meta-label">Read</span>
                      <span className="meta-value">{post.readingTime || "5 min"}</span>
                    </div>
                  </div>

                  <Link href={`/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-black capitalize tracking-[0.2em] hover:opacity-70 transition-opacity">
                    Read article <span aria-hidden="true">→</span>
                  </Link>
                </article>
              );
            })}
          </div>

          {totalPages > 1 && (
            <nav className="mt-16 flex flex-wrap items-center justify-center gap-3" aria-label="Pagination">
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === safePage;
                return (
                  <Link
                    key={pageNumber}
                    href={{ pathname: "/archive", query: pageNumber === 1 ? {} : { page: pageNumber } }}
                    className={`flex h-10 w-10 items-center justify-center border text-sm font-black capitalize transition-colors ${isActive ? "border-foreground bg-foreground text-background" : "border-border/70 bg-background text-foreground hover:border-foreground/40"}`}
                  >
                    {pageNumber}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </section>
    </main>
  );
}
