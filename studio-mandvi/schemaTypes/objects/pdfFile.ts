import {defineField, defineType} from 'sanity'

export const pdfFile = defineType({
  name: 'pdfFile',
  title: 'PDF Upload',
  type: 'file',
  options: {
    accept: '.pdf',
  },
  fields: [
    defineField({
      name: 'description',
      title: 'Description / Title',
      type: 'string',
      description: 'E.g., Full paper PDF, Presentation slides, Preprint.',
      validation: (Rule) => Rule.required().error('Please specify a description for the PDF file.'),
    }),
  ],
  preview: {
    select: {
      title: 'description',
      filename: 'asset.originalFilename',
    },
    prepare(selection) {
      const {title, filename} = selection
      return {
        title: title || 'PDF Document',
        subtitle: filename ? `Filename: ${filename}` : 'No PDF uploaded yet',
      }
    },
  },
})
