import React from "react";

/**
 * Structured Data Components for SEO
 *
 * These components generate JSON-LD structured data that helps search engines
 * understand the content and context of the website.
 */

interface PersonSchemaProps {
  name: string;
  jobTitle?: string;
  description?: string;
  url: string;
  email?: string;
  image?: string;
  sameAs?: string[]; // Social media profiles
}

export function PersonSchema({
  name,
  jobTitle,
  description,
  url,
  email,
  image,
  sameAs = [],
}: PersonSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    ...(jobTitle && { jobTitle }),
    ...(description && { description }),
    url,
    ...(email && { email }),
    ...(image && { image }),
    ...(sameAs.length > 0 && { sameAs }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebsiteSchemaProps {
  name: string;
  description: string;
  url: string;
}

export function WebsiteSchema({ name, description, url }: WebsiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  headline: string;
  description?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  image?: string[];
  url: string;
  publisher: {
    name: string;
    logo: {
      url: string;
      width: number;
      height: number;
    };
  };
}

export function ArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  author,
  image = [],
  url,
  publisher,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    ...(description && { description }),
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author.name,
      ...(author.url && { url: author.url }),
    },
    ...(image.length > 0 && { image }),
    url,
    publisher: {
      "@type": "Organization",
      name: publisher.name,
      logo: {
        "@type": "ImageObject",
        url: publisher.logo.url,
        width: publisher.logo.width,
        height: publisher.logo.height,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface OrganizationSchemaProps {
  name: string;
  description: string;
  url: string;
  logo: string;
  sameAs?: string[];
  contactPoint?: {
    email: string;
    contactType: string;
  };
}

export function OrganizationSchema({
  name,
  description,
  url,
  logo,
  sameAs = [],
  contactPoint,
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    url,
    logo,
    ...(sameAs.length > 0 && { sameAs }),
    ...(contactPoint && {
      contactPoint: {
        "@type": "ContactPoint",
        email: contactPoint.email,
        contactType: contactPoint.contactType,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Usage Example:
 *
 * In app/layout.tsx or app/page.tsx:
 *
 * <PersonSchema
 *   name="Mandvi Tripathi"
 *   jobTitle="Legal Analyst & Researcher"
 *   description="Thoughtful writing on legal frameworks, scholarly research, and critical book reviews."
 *   url="https://mandvi.blog"
 *   email="lawgicalinsights@gmail.com"
 *   image="https://mandvi.blog/photo.jpg"
 *   sameAs={[
 *     "https://x.com/MandviTripathi8",
 *     "https://www.instagram.com/lawgical.insights",
 *   ]}
 * />
 *
 * <WebsiteSchema
 *   name="Mandvi Tripathi"
 *   description="Legal analysis, essays, and book reviews"
 *   url="https://mandvi.blog"
 * />
 */
