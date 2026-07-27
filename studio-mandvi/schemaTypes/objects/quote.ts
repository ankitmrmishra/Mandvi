import {defineField, defineType} from 'sanity'

export const quote = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Quote Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().error('Quote text is required.'),
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution / Author',
      type: 'string',
      description: 'Who said or wrote this quote.',
    }),
    defineField({
      name: 'citation',
      title: 'Citation / Source Website',
      type: 'string',
      description: 'Optional book title, speech name, or site source.',
    }),
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'attribution',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title ? `"${title.substring(0, 50)}..."` : 'Empty Quote',
        subtitle: subtitle ? `— ${subtitle}` : 'Unknown Attribution',
      }
    },
  },
})
