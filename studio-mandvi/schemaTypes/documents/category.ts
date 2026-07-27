import {defineField, defineType} from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Category title is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required.'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'A brief description of this category (useful for index headers).',
    }),
    defineField({
      name: 'icon',
      title: 'Icon / Emoji',
      type: 'string',
      description: 'E.g., 📚, 🔬, 🧠, 💬 to represent this category in navigation.',
    }),
    defineField({
      name: 'color',
      title: 'Color Accent',
      type: 'string',
      description: 'Select an accent color (e.g., #3b82f6 for blue, or a color name) for UI badge rendering.',
      options: {
        list: [
          {title: 'Blue', value: 'blue'},
          {title: 'Indigo', value: 'indigo'},
          {title: 'Purple', value: 'purple'},
          {title: 'Pink', value: 'pink'},
          {title: 'Red', value: 'red'},
          {title: 'Orange', value: 'orange'},
          {title: 'Amber/Yellow', value: 'amber'},
          {title: 'Green', value: 'green'},
          {title: 'Teal', value: 'teal'},
          {title: 'Gray', value: 'gray'},
        ],
      },
      initialValue: 'blue',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
      description: 'description',
    },
    prepare(selection) {
      const {title, icon, description} = selection
      return {
        title: `${icon || '📁'} ${title || 'Unnamed Category'}`,
        subtitle: description || 'No description',
      }
    },
  },
})
