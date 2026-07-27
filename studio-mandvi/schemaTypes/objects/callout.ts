import {defineField, defineType} from 'sanity'

export const callout = defineType({
  name: 'callout',
  title: 'Callout Box',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Callout Type',
      type: 'string',
      options: {
        list: [
          {title: 'Info Box (Blue)', value: 'info'},
          {title: 'Warning Box (Yellow)', value: 'warning'},
          {title: 'Success / Tip Box (Green)', value: 'success'},
          {title: 'Note Box (Gray)', value: 'note'},
        ],
        layout: 'radio',
      },
      initialValue: 'info',
    }),
    defineField({
      name: 'title',
      title: 'Callout Title',
      type: 'string',
      description: 'Optional heading for the callout box.',
    }),
    defineField({
      name: 'content',
      title: 'Callout Content',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().error('Callout content is required.'),
    }),
  ],
  preview: {
    select: {
      type: 'type',
      title: 'title',
      content: 'content',
    },
    prepare(selection) {
      const {type, title, content} = selection
      const typeIcons: Record<string, string> = {
        info: 'ℹ️',
        warning: '⚠️',
        success: '✅',
        note: '📝',
      }
      const icon = typeIcons[type] || '🔔'
      return {
        title: `${icon} ${title || `${type.charAt(0).toUpperCase() + type.slice(1)} Callout`}`,
        subtitle: content ? content.substring(0, 60) : 'No content',
      }
    },
  },
})
