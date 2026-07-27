import {defineField, defineType} from 'sanity'

export const customImage = defineType({
  name: 'customImage',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative Text (Alt)',
      type: 'string',
      description: 'Crucial for accessibility (screen readers) and SEO. Describe the image content.',
      validation: (Rule) =>
        Rule.custom((alt, context: any) => {
          // If the image asset is selected, alt text must be provided.
          if (context?.parent?.asset && !alt) {
            return 'Alternative text is required when an image is uploaded.'
          }
          return true
        }),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'The text displayed below the image on the page.',
    }),
    defineField({
      name: 'credit',
      title: 'Credit / Source',
      type: 'string',
      description: 'Organization, agency, or book where this image is sourced (if applicable).',
    }),
    defineField({
      name: 'photographer',
      title: 'Photographer',
      type: 'string',
      description: 'The person who took the photo.',
    }),
  ],
  preview: {
    select: {
      media: 'asset',
      title: 'caption',
      subtitle: 'alt',
    },
    prepare(selection) {
      const {media, title, subtitle} = selection
      return {
        title: title || 'Image',
        subtitle: subtitle || 'No alt text provided',
        media,
      }
    },
  },
})
