import {defineField, defineType} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero Banner',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
      description: 'The main heading of the hero section.',
      validation: (Rule) => Rule.required().error('Hero title is required.'),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 3,
      description: 'A sub-heading or introductory paragraph below the title.',
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'customImage',
      description: 'Usually a professional headshot or symbolic academic illustration.',
    }),
    defineField({
      name: 'ctas',
      title: 'Call to Actions (Buttons)',
      type: 'array',
      of: [{type: 'button'}],
      description: 'Add up to 2 call-to-action buttons.',
      validation: (Rule) => Rule.max(2).error('A maximum of 2 CTAs can be defined.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
      media: 'image',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Hero Banner',
        subtitle: subtitle || 'No tagline configured',
        media,
      }
    },
  },
})
