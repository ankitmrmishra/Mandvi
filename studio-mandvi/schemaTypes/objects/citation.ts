import {defineField, defineType} from 'sanity'

export const citation = defineType({
  name: 'citation',
  title: 'Citation / Reference',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Full Citation Text',
      type: 'text',
      rows: 2,
      description: 'The complete academic citation in APA, MLA, or Harvard style (e.g., Smith, J. (2024). Title of the Paper...)',
      validation: (Rule) => Rule.required().error('Citation text is required.'),
    }),
    defineField({
      name: 'identifier',
      title: 'Short Citation / Key',
      type: 'string',
      description: 'E.g., (Smith, 2024) or [1]. Used for inline references.',
    }),
    defineField({
      name: 'url',
      title: 'Citation Link',
      type: 'url',
      description: 'Direct link to the cited paper, publisher, or book.',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).error('Please enter a valid absolute URL.'),
    }),
  ],
  preview: {
    select: {
      text: 'text',
      identifier: 'identifier',
    },
    prepare(selection) {
      const {text, identifier} = selection
      return {
        title: identifier || 'Citation',
        subtitle: text || 'No citation text',
      }
    },
  },
})
