import {defineField, defineType} from 'sanity'

export const button = defineType({
  name: 'button',
  title: 'Call to Action Button',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Button Label',
      type: 'string',
      validation: (Rule) => Rule.required().error('Button label is required.'),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'Internal Page / Document', value: 'internal'},
          {title: 'External Website', value: 'external'},
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
    }),
    defineField({
      name: 'internalLink',
      title: 'Internal Link',
      type: 'reference',
      to: [
        {type: 'post'},
        {type: 'author'},
      ],
      hidden: ({parent}) => parent?.linkType !== 'internal',
      validation: (Rule) =>
        Rule.custom((ref, context) => {
          const parent = context.parent as any
          if (parent?.linkType === 'internal' && !ref) {
            return 'Internal link reference is required.'
          }
          return true
        }),
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'external',
      validation: (Rule) =>
        Rule.custom((url, context) => {
          const parent = context.parent as any
          if (parent?.linkType === 'external' && !url) {
            return 'External link URL is required.'
          }
          return true
        }),
    }),
    defineField({
      name: 'style',
      title: 'Button Style',
      type: 'string',
      options: {
        list: [
          {title: 'Primary (Filled)', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Outline', value: 'outline'},
        ],
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      linkType: 'linkType',
      externalLink: 'externalLink',
      internalLink: 'internalLink.title',
    },
    prepare(selection) {
      const {label, linkType, externalLink, internalLink} = selection
      const destination = linkType === 'external' ? externalLink : `Internal: ${internalLink || 'Document reference'}`
      return {
        title: label || 'CTA Button',
        subtitle: destination || 'No link configured',
      }
    },
  },
})
