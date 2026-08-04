import { client } from "./sanity";

// Types corresponding to Sanity schemas
export interface SanityAuthor {
  name: string;
  position?: string;
  photo?: unknown;
  bio?: unknown;
  orcid?: string;
  googleScholar?: string;
}

export interface SanityCategory {
  title: string;
  slug: string;
  icon?: string;
  color?: string;
}

export interface SanityPost {
  _id: string;
  _type: string;
  title: string;
  slug: string;
  subtitle?: string;
  excerpt?: string;
  featuredImage?: unknown;
  publishedDate: string;
  readingTime?: string;
  author?: SanityAuthor;
  categories?: SanityCategory[];
  content?: unknown;
}

export interface SanityBookReview {
  _id: string;
  _type: string;
  title?: string;
  slug: string;
  bookTitle: string;
  authorOfBook?: string;
  featuredImage?: unknown;
  bookCover?: unknown;
  excerpt?: string;
  rating: number;
  shortSummary?: string;
  publishedDate: string;
  readingTime?: string;
  genre?: string;
  review?: unknown;
  author?: SanityAuthor;
  categories?: SanityCategory[];
}

export async function getPosts(): Promise<SanityPost[]> {
  try {
    // Fetch only posts (simplified - all content is posts with categories)
    const query = `*[
      _type == "post" 
      && !(_id in path("drafts.**"))
    ] | order(publishedDate desc) {
      _id,
      _type,
      title,
      "slug": slug.current,
      subtitle,
      excerpt,
      featuredImage,
      publishedDate,
      readingTime,
      author-> {
        name,
        photo
      },
      categories[]-> {
        title,
        "slug": slug.current
      }
    }`;
    const posts = await client.fetch(query);
    return posts || [];
  } catch (error) {
    console.error("Failed to fetch posts from Sanity.", error);
  }
  return [];
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  try {
    // Fetch only from posts
    const query = `*[
      _type == "post" 
      && slug.current == $slug
    ][0] {
      _id,
      _type,
      title,
      "slug": slug.current,
      subtitle,
      excerpt,
      featuredImage,
      publishedDate,
      readingTime,
      author-> {
        name,
        photo
      },
      categories[]-> {
        title,
        "slug": slug.current
      },
      content
    }`;
    const post = await client.fetch(query, { slug });
    return post || null;
  } catch (error) {
    console.error("Failed to fetch post by slug from Sanity.", error);
  }
  return null;
}

export async function getBookReviews(): Promise<SanityBookReview[]> {
  try {
    const query = `*[_type == "bookReview" && !(_id in path("drafts.**"))] | order(publishedDate desc) {
      _id,
      _type,
      title,
      "slug": slug.current,
      bookTitle,
      authorOfBook,
      featuredImage,
      bookCover,
      excerpt,
      rating,
      shortSummary,
      publishedDate,
      readingTime,
      genre,
      review,
      author-> {
        name,
        photo
      },
      categories[]-> {
        title,
        "slug": slug.current
      }
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch book reviews from Sanity.", error);
    return [];
  }
}

export async function getBookReviewBySlug(slug: string): Promise<SanityBookReview | null> {
  try {
    const query = `*[_type == "bookReview" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      "slug": slug.current,
      bookTitle,
      authorOfBook,
      featuredImage,
      bookCover,
      genre,
      excerpt,
      readingTime,
      rating,
      shortSummary,
      review,
      publishedDate,
      author-> {
        name,
        photo
      },
      categories[]-> {
        title,
        "slug": slug.current
      }
    }`;
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Failed to fetch book review by slug from Sanity.", error);
    return null;
  }
}

export async function getSiteSettings() {
  try {
    const query = `*[_type == "siteSettings"][0] {
      siteName,
      tagline,
      logo,
      homepageHero,
      footerText,
      socialLinks,
      newsletterSettings
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch site settings from Sanity.", error);
    return null;
  }
}

export async function getAuthorProfile(): Promise<unknown> {
  try {
    const query = `*[_type == "author"][0] {
      name,
      position,
      university,
      department,
      photo,
      bio,
      email,
      website,
      officeHours,
      education[] {
        year,
        title,
        institution,
        description
      },
      awards[] {
        year,
        title,
        institution,
        description
      }
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch author profile from Sanity.", error);
    return null;
  }
}

export async function subscribeToNewsletter(email: string): Promise<unknown> {
  console.log("Newsletter subscription request for:", email);
  // Simulating successful registration
  return { status: "success" };
}
