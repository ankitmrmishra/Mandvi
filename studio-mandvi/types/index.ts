/**
 * TypeScript Definitions for Mandvi Sanity CMS Content Models
 * Integrate these into your Next.js frontend code.
 */

export interface SanityReference {
  _type: 'reference'
  _ref: string
}

export interface SanityAsset {
  _ref: string
  _type: 'reference'
}

export interface SanityImageHotspot {
  x: number
  y: number
  height: number
  width: number
}

export interface SanityImageCrop {
  top: number
  bottom: number
  left: number
  right: number
}

export interface SanityImage {
  _type: 'image'
  asset: SanityAsset
  hotspot?: SanityImageHotspot
  crop?: SanityImageCrop
}

export interface CustomImage extends Omit<SanityImage, '_type'> {
  _type: 'customImage'
  alt?: string
  caption?: string
  credit?: string
  photographer?: string
}

export interface SanitySEO {
  _type: 'seo'
  metaTitle?: string
  metaDescription?: string
  shareImage?: SanityImage
  canonicalUrl?: string
}

export interface SanitySocialLink {
  _type: 'socialLink'
  platform:
    | 'googleScholar'
    | 'orcid'
    | 'linkedin'
    | 'twitter'
    | 'github'
    | 'researchgate'
    | 'email'
    | 'website'
  url: string
}

export interface SanityCitation {
  _type: 'citation'
  text: string
  identifier?: string
  url?: string
}

export interface SanityBook {
  _type: 'book'
  title: string
  author: string
  cover?: CustomImage
  publisher?: string
  publicationYear?: number
  isbn?: string
  rating?: number
  summary?: string
}

export interface SanityPDFFile {
  _type: 'pdfFile'
  asset: SanityAsset
  description: string
}

export interface SanityButton {
  _type: 'button'
  label: string
  linkType: 'internal' | 'external'
  internalLink?: SanityReference
  externalLink?: string
  style: 'primary' | 'secondary' | 'outline'
}

export interface SanityHero {
  _type: 'hero'
  title: string
  tagline?: string
  image?: CustomImage
  ctas?: SanityButton[]
}

export interface SanityQuote {
  _type: 'quote'
  text: string
  attribution?: string
  citation?: string
}

export interface SanityTimelineItem {
  _type: 'timelineItem'
  year: string
  title: string
  institution?: string
  description?: string
}

export interface SanityFAQItem {
  _type: 'faqItem'
  question: string
  answer: string
}

export interface SanityGallery {
  _type: 'gallery'
  title?: string
  images: CustomImage[]
}

export interface SanityCallout {
  _type: 'callout'
  type: 'info' | 'warning' | 'success' | 'note'
  title?: string
  content: string
}

export type SanityBlockContent = Array<{
  _type:
    | 'block'
    | 'customImage'
    | 'callout'
    | 'quote'
    | 'gallery'
    | 'codeBlock'
    | 'youtubeEmbed'
    | 'tweetEmbed'
    | 'simpleTable'
  [key: string]: any
}>

// ==========================================
// DOCUMENT SCHEMAS
// ==========================================

export interface BaseDocument {
  _id: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface Author extends BaseDocument {
  _type: 'author'
  name: string
  photo?: CustomImage
  bio?: SanityBlockContent
  position?: string
  department?: string
  university?: string
  orcid?: string
  googleScholar?: string
  researchInterests?: string[]
  email?: string
  website?: string
  socialLinks?: SanitySocialLink[]
  officeHours?: string
  education?: SanityTimelineItem[]
  awards?: SanityTimelineItem[]
}

export interface Category extends BaseDocument {
  _type: 'category'
  title: string
  slug: {current: string}
  description?: string
  icon?: string
  color?: string
}

export interface Tag extends BaseDocument {
  _type: 'tag'
  name: string
  slug: {current: string}
}

export interface Post extends BaseDocument {
  _type: 'post'
  title: string
  slug: {current: string}
  subtitle?: string
  excerpt: string
  featuredImage?: CustomImage
  content: SanityBlockContent
  author: SanityReference
  status: 'draft' | 'published' | 'scheduled'
  publishedDate: string
  lastUpdated?: string
  featuredPost: boolean
  allowComments: boolean
  categories?: SanityReference[]
  tags?: SanityReference[]
  series?: string
  relatedPosts?: SanityReference[]
  tableOfContents: boolean
  readingTime?: string
  viewCount: number
  seo?: SanitySEO
}

export interface ReadingList extends BaseDocument {
  _type: 'readingList'
  title: string
  description?: string
  books: SanityBook[]
  priority: 'low' | 'medium' | 'high'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime?: string
}

export interface SiteSettings extends BaseDocument {
  _type: 'siteSettings'
  siteName: string
  tagline?: string
  logo?: CustomImage
  favicon?: SanityImage
  homepageHero?: SanityHero
  contactInformation?: {
    officeLocation?: string
    officePhone?: string
    contactEmail?: string
  }
  navigationMenu?: Array<{
    label: string
    linkType: 'home' | 'blog' | 'research' | 'reviews' | 'essays' | 'internal' | 'external'
    reference?: SanityReference
    externalUrl?: string
  }>
  footerText?: string
  socialLinks?: SanitySocialLink[]
  newsletterSettings?: {
    enabled: boolean
    headline?: string
    description?: string
    actionUrl?: string
  }
  defaultSeo?: SanitySEO
  googleAnalytics?: string
  googleSearchConsoleVerification?: string
  themeSettings?: {
    primaryColor: 'burgundy' | 'oxfordBlue' | 'slate' | 'forestGreen'
    enableDarkMode: boolean
  }
}
