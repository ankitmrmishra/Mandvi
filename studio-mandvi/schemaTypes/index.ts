// Reusable Object Schemas
import {seo} from './objects/seo'
import {customImage} from './objects/customImage'
import {socialLink} from './objects/socialLink'
import {citation} from './objects/citation'
import {book} from './objects/book'
import {pdfFile} from './objects/pdfFile'
import {button} from './objects/button'
import {hero} from './objects/hero'
import {quote} from './objects/quote'
import {timelineItem} from './objects/timelineItem'
import {faqItem} from './objects/faqItem'
import {gallery} from './objects/gallery'
import {callout} from './objects/callout'
import {blockContent} from './objects/blockContent'

// Document Schemas
import {author} from './documents/author'
import {bookReview} from './documents/bookReview'
import {category} from './documents/category'
import {tag} from './documents/tag'
import {post} from './documents/post'
// import {publication} from './documents/publication' // DISABLED - Use Blog Posts with "Publication" category instead
// import {readingList} from './documents/readingList' // DISABLED - Optional feature
// import {researchArticle} from './documents/researchArticle' // DISABLED - Use Blog Posts with "Research" category instead
import {siteSettings} from './documents/siteSettings'

export const schemaTypes = [
  // Objects
  seo,
  customImage,
  socialLink,
  citation,
  book,
  pdfFile,
  button,
  hero,
  quote,
  timelineItem,
  faqItem,
  gallery,
  callout,
  blockContent,

  // Documents
  author,
  bookReview,
  category,
  tag,
  post,
  // publication, // DISABLED
  // readingList, // DISABLED
  // researchArticle, // DISABLED
  siteSettings,
]
