import {defineField, defineType} from 'sanity'

export const book = defineType({
  name: 'book',
  title: 'Book Reference',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Book Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Book title is required.'),
    }),
    defineField({
      name: 'author',
      title: 'Author of Book',
      type: 'string',
      validation: (Rule) => Rule.required().error('Book author is required.'),
    }),
    defineField({
      name: 'cover',
      title: 'Book Cover',
      type: 'customImage',
    }),
    defineField({
      name: 'publisher',
      title: 'Publisher',
      type: 'string',
    }),
    defineField({
      name: 'publicationYear',
      title: 'Publication Year',
      type: 'number',
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
      description: 'ISBN-10 or ISBN-13 format.',
      validation: (Rule) =>
        Rule.custom((isbn) => {
          if (!isbn) return true
          // Clean ISBN
          const cleanIsbn = isbn.replace(/[- ]/g, '')
          // Match standard ISBN-10 or ISBN-13
          const isbn10Regex = /^(?:\d[\d- ]{7,11}\d|[\dX]{10})$/
          const isbn13Regex = /^(?:97[89][\d- ]{9,13}\d|\d{13})$/
          
          if (cleanIsbn.length === 10 && isbn10Regex.test(cleanIsbn)) {
            return true
          }
          if (cleanIsbn.length === 13 && isbn13Regex.test(cleanIsbn)) {
            return true
          }
          return 'Please enter a valid ISBN-10 or ISBN-13.'
        }),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      description: 'Your rating for the book.',
      validation: (Rule) => Rule.min(1).max(5).error('Rating must be between 1 and 5.'),
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'cover',
    },
    prepare(selection) {
      const {title, author, media} = selection
      return {
        title: title || 'Untitled Book',
        subtitle: author ? `by ${author}` : 'Unknown Author',
        media,
      }
    },
  },
})
