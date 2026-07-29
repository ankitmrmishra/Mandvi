import Link from "next/link";

export const metadata = {
  title: "Useful Links",
  description: "A simple collection of useful links for readers and visitors.",
};

export default function UsefulLinksPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="section-spacing">
        <div className="container-fixed">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-black capitalize tracking-[0.3em] text-foreground/70">Resources</p>
              <h1 className="text-4xl font-black capitalize md:text-5xl" style={{ letterSpacing: "-0.03em" }}>
                Useful links
              </h1>
            </div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-black capitalize tracking-[0.2em] transition-opacity hover:opacity-70">
              Back home <span aria-hidden="true">←</span>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-border/70 bg-card p-6 text-card-foreground">
              <h2 className="mb-3 text-xl font-black capitalize">Reading</h2>
              <p className="mb-4 text-sm leading-6 text-foreground/70">
                Browse the latest writing or explore the full archive of essays and reviews.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/archive" className="text-sm font-black capitalize tracking-[0.2em] transition-opacity hover:opacity-70">
                  Archive
                </Link>
                <Link href="/#articles" className="text-sm font-black capitalize tracking-[0.2em] transition-opacity hover:opacity-70">
                  Latest Writing
                </Link>
              </div>
            </div>

            <div className="border border-border/70 bg-card p-6 text-card-foreground">
              <h2 className="mb-3 text-xl font-black capitalize">Contact</h2>
              <p className="mb-4 text-sm leading-6 text-foreground/70">
                If you want to get in touch, send an email directly.
              </p>
              <a href="mailto:lawgicalinsights@gmail.com" className="text-sm font-black capitalize tracking-[0.2em] transition-opacity hover:opacity-70">
                lawgicalinsights@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
