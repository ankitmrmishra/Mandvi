import {defineField, defineType} from 'sanity'

export const gallery = defineType({
  name: 'gallery',
  title: 'Image Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'customImage'}],
      options: {
        layout: 'grid',
      },
      validation: (Rule) =>
        Rule.required().min(2).error('An image gallery must contain at least 2 images.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      images: 'images',
    },
    prepare(selection) {
      const {title, images} = selection
      const imageCount = images ? images.length : 0
      return {
        title: title || 'Image Gallery',
        subtitle: `${imageCount} image${imageCount === 1 ? '' : 's'}`,
      }
    },
  },
})
