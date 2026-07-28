"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAuthorProfile } from "@/lib/request";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { Mail, ExternalLink } from "lucide-react";

export default function WhoIAm() {
  const { data: authorRaw } = useQuery({
    queryKey: ["authorProfile"],
    queryFn: getAuthorProfile,
  });

  const author = authorRaw as {
    name?: string;
    position?: string;
    university?: string;
    email?: string;
    website?: string;
    officeHours?: string;
    photo?: unknown;
    bio?: unknown;
  } | null;

  if (!author) return null;

  // Resolve author photo
  let photoUrl = "";
  if (author?.photo) {
    try {
      photoUrl = urlFor(author.photo).width(500).height(600).url();
    } catch {
      // ignore
    }
  }

  const name = author.name || "Mandvi Tripathi";
  const position = author.position || "";
  const university = author.university || "";
  const contactEmail = author.email || "";

  return (
    <section id="about" className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <span className="h-px w-8 bg-foreground/20"></span>
            <span className="text-xs capitalize tracking-widest text-muted-foreground font-medium">
              About
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {name}
          </h2>
          {(position || university) && (
            <p className="text-lg text-muted-foreground mt-2">
              {position}
              {position && university && " · "}
              {university}
            </p>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Bio Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              {author.bio ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <PortableText value={author.bio as any} />
              ) : (
                <p className="text-muted-foreground">
                  Biography content coming soon.
                </p>
              )}
            </div>

            {author.officeHours && (
              <div className="mt-8 p-6 border border-border rounded-sm">
                <h3 className="text-sm font-semibold capitalize tracking-wider text-muted-foreground mb-2">
                  Office Hours
                </h3>
                <p className="text-foreground">{author.officeHours}</p>
              </div>
            )}

            {/* Contact Buttons */}
            <div className="flex flex-wrap gap-3 mt-8">
              {contactEmail && (
                <Button variant="default" asChild>
                  <a href={`mailto:${contactEmail}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Get in Touch
                  </a>
                </Button>
              )}
              {author.website && (
                <Button variant="outline" asChild>
                  <a
                    href={author.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Website
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Photo */}
          {photoUrl && (
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <img
                  src={photoUrl}
                  alt={name}
                  className="w-full aspect-[3/4] object-cover rounded-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
