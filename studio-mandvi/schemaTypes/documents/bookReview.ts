import {defineField, defineType} from 'sanity'

export const bookReview = defineType({
  name: 'bookReview',
  title: 'Book Review',
  type: 'document',
  groups: [
    {name: 'content', title: 'Review Content', default: true},
    {name: 'book', title: 'Book Details'},
    {name: 'publishing', title: 'Publishing'},
    {name: 'seo', title: 'SEO Settings'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Review Title',
      type: 'string',
      group: 'content',
      description: 'Headline for the review, such as “Why this book still matters”.',
      validation: (Rule) => Rule.required().error('Review title is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'URL-friendly identifier for this review.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required.'),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Short summary shown in cards and previews.',
      validation: (Rule) => Rule.required().error('Excerpt is required.'),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'customImage',
      group: 'content',
    }),
    defineField({
      name: 'review',
      title: 'Full Review',
      type: 'blockContent',
      group: 'content',
      description: 'The body of the review.',
      validation: (Rule) => Rule.required().error('Review content is required.'),
    }),

    defineField({
      name: 'bookTitle',
      title: 'Book Title',
      type: 'string',
      group: 'book',
      validation: (Rule) => Rule.required().error('Book title is required.'),
    }),
    defineField({
      name: 'authorOfBook',
      title: 'Book Author',
      type: 'string',
      group: 'book',
    }),
    defineField({
      name: 'bookCover',
      title: 'Book Cover',
      type: 'customImage',
      group: 'book',
      description: 'Optional cover image for the book.',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      group: 'book',
      description: 'Language of the book, such as English or French.',
    }),
    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'string',
      group: 'book',
      description: 'For example: Memoir, Law, Fiction, History.',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      group: 'book',
      initialValue: 4,
      validation: (Rule) => Rule.required().min(1).max(5).precision(1).error('Rating must be between 1 and 5.'),
    }),
    defineField({
      name: 'shortSummary',
      title: 'Short Summary',
      type: 'text',
      group: 'book',
      rows: 3,
      description: 'A short summary of the book and its main idea.',
    }),

    defineField({
      name: 'author',
      title: 'Reviewer / Columnist',
      type: 'reference',
      to: [{type: 'author'}],
      group: 'publishing',
      validation: (Rule) => Rule.required().error('Please select the reviewer.'),
    }),
    defineField({
      name: 'publishedDate',
      title: 'Publish Date',
      type: 'date',
      group: 'publishing',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (Rule) => Rule.required().error('Publication date is required.'),
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string',
      group: 'publishing',
      placeholder: '5 min',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'publishing',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    }),
    defineField({
      name: 'seo',
      title: 'Search Engine Optimization',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      book: 'bookTitle',
      author: 'author.name',
      rating: 'rating',
      media: 'featuredImage',
      published: 'publishedDate',
    },
    prepare(selection) {
      const {title, book, author, rating, media, published} = selection
      const ratingStars = rating ? '⭐'.repeat(rating) : ''
      return {
        title: title || book || 'Untitled Review',
        subtitle: `${author ? `by ${author}` : 'Unknown Reviewer'} | ${ratingStars} (${published || 'Draft'})`,
        media,
      }
    },
  },
})
