import {defineField, defineType} from 'sanity'

export const bookReview = defineType({
  name: 'bookReview',
  title: 'Book Review',
  type: 'document',
  groups: [
    {name: 'bookInfo', title: 'Book Details', default: true},
    {name: 'reviewContent', title: 'Review Content'},
    {name: 'metadata', title: 'Publishing & Tags'},
    {name: 'seo', title: 'SEO Settings'},
  ],
  fields: [
    // --- Slug Field (REQUIRED FOR ROUTING) ---
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for this book review (e.g., "the-fault-in-our-stars")',
      validation: (Rule) => Rule.required().error('Slug is required for the URL.'),
      options: {
        source: 'bookTitle',
        maxLength: 96,
      },
    }),

    // --- Book Details Group ---
    defineField({
      name: 'bookTitle',
      title: 'Book Title',
      type: 'string',
      group: 'bookInfo',
      validation: (Rule) => Rule.required().error('Book title is required.'),
    }),
    defineField({
      name: 'authorOfBook',
      title: 'Author of Book',
      type: 'string',
      group: 'bookInfo',
      validation: (Rule) => Rule.required().error('Book author is required.'),
    }),
    defineField({
      name: 'bookCover',
      title: 'Book Cover Image',
      type: 'customImage',
      group: 'bookInfo',
    }),
    defineField({
      name: 'publisher',
      title: 'Publisher',
      type: 'string',
      group: 'bookInfo',
    }),
    defineField({
      name: 'publicationYear',
      title: 'Publication Year',
      type: 'number',
      group: 'bookInfo',
      validation: (Rule) =>
        Rule.integer()
          .min(1000)
          .max(new Date().getFullYear() + 2)
          .error('Please enter a valid publication year.'),
    }),
    defineField({
      name: 'isbn',
      title: 'ISBN',
      type: 'string',
      group: 'bookInfo',
      description: 'ISBN-10 or ISBN-13 format.',
      validation: (Rule) =>
        Rule.custom((isbn) => {
          if (!isbn) return true
          const cleanIsbn = isbn.replace(/[- ]/g, '')
          const isbn10Regex = /^(?:\d[\d- ]{7,11}\d|[\dX]{10})$/
          const isbn13Regex = /^(?:97[89][\d- ]{9,13}\d|\d{13})$/

          if (cleanIsbn.length === 10 && isbn10Regex.test(cleanIsbn)) return true
          if (cleanIsbn.length === 13 && isbn13Regex.test(cleanIsbn)) return true
          return 'Please enter a valid ISBN-10 or ISBN-13.'
        }),
    }),
    defineField({
      name: 'pages',
      title: 'Number of Pages',
      type: 'number',
      group: 'bookInfo',
      validation: (Rule) => Rule.positive().integer(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      group: 'bookInfo',
      initialValue: 'English',
    }),
    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'string',
      group: 'bookInfo',
      description: 'E.g., Biography, History, Computer Science, Fiction.',
    }),

    // --- Review Content Group ---
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'reviewContent',
      rows: 2,
      description:
        'Brief teaser text shown in preview cards (auto-generated from short summary if left empty).',
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string',
      group: 'reviewContent',
      description: 'E.g., "5 min" or "10 min read"',
      placeholder: '5 min',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5 Stars)',
      type: 'number',
      group: 'reviewContent',
      description: 'Select your rating from 1 (Poor) to 5 (Outstanding).',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .precision(1)
          .error('Rating is required and must be between 1 and 5.'),
    }),
    defineField({
      name: 'shortSummary',
      title: 'Short Summary',
      type: 'text',
      group: 'reviewContent',
      rows: 3,
      description: 'A 2-3 sentence overview of what the book is about.',
      validation: (Rule) => Rule.required().error('A short summary is required.'),
    }),
    defineField({
      name: 'review',
      title: 'Full Review Analysis',
      type: 'blockContent',
      group: 'reviewContent',
      description: 'Your detailed breakdown, arguments, and commentary on the book.',
      validation: (Rule) => Rule.required().error('The review content is required.'),
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      group: 'reviewContent',
      of: [{type: 'string'}],
      description: 'Main points or lessons you learned from reading this book.',
    }),
    defineField({
      name: 'favoriteQuotes',
      title: 'Favorite Quotes',
      type: 'array',
      group: 'reviewContent',
      of: [{type: 'quote'}],
    }),
    defineField({
      name: 'pros',
      title: 'Pros / What Was Done Well',
      type: 'array',
      group: 'reviewContent',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'cons',
      title: 'Cons / Areas of Criticism',
      type: 'array',
      group: 'reviewContent',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'whoShouldRead',
      title: 'Who Should Read This Book?',
      type: 'text',
      group: 'reviewContent',
      rows: 2,
      description: 'Describe the target audience or who would benefit most from this book.',
    }),
    defineField({
      name: 'recommendation',
      title: 'Final Recommendation & Verdict',
      type: 'text',
      group: 'reviewContent',
      rows: 2,
      description: 'A concluding summary statement of your recommendation.',
    }),

    // --- Metadata Group ---
    defineField({
      name: 'publishedDate',
      title: 'Publish Date',
      type: 'date',
      group: 'metadata',
      validation: (Rule) => Rule.required().error('Publication date is required.'),
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'metadata',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'metadata',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
    }),

    // --- SEO Group ---
    defineField({
      name: 'seo',
      title: 'Search Engine Optimization',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'bookTitle',
      author: 'authorOfBook',
      rating: 'rating',
      media: 'bookCover',
      published: 'publishedDate',
    },
    prepare(selection) {
      const {title, author, rating, media, published} = selection
      const ratingStars = rating ? '⭐'.repeat(rating) : ''
      return {
        title: title || 'Untitled Review',
        subtitle: `${author ? `by ${author}` : 'Unknown Author'} | ${ratingStars} (${published || 'Draft'})`,
        media,
      }
    },
  },
})
