import {defineField, defineType} from 'sanity'

export const essay = defineType({
  name: 'essay',
  title: 'Essay',
  type: 'document',
  groups: [
    {name: 'content', title: 'Essay Content', default: true},
    {name: 'metadata', title: 'Publishing & Categorization'},
    {name: 'seo', title: 'SEO Settings'},
  ],
  fields: [
    // --- Essay Content Group ---
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().error('Essay title is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'Auto-generated from title. Crucial for the URL structure.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required.'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'content',
      description: 'An optional tagline or secondary heading for the essay.',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'customImage',
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      group: 'content',
      description: 'The body text of the essay. Supports rich formatting, citations, footnotes, etc.',
      validation: (Rule) => Rule.required().error('Essay content is required.'),
    }),

    // --- Categorization & Metadata Group ---
    defineField({
      name: 'publishedDate',
      title: 'Publish Date',
      type: 'date',
      group: 'metadata',
      validation: (Rule) => Rule.required().error('Publish date is required.'),
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      group: 'metadata',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'metadata',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
    }),
    defineField({
      name: 'readingTime',
      title: 'Estimated Reading Time',
      type: 'string',
      group: 'metadata',
      description: 'E.g., "12 mins". Can be computed automatically or overridden.',
    }),

    // --- SEO Group ---
    defineField({
      name: 'seo',
      title: 'Search Engine Optimization',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      published: 'publishedDate',
      media: 'featuredImage',
    },
    prepare(selection) {
      const {title, subtitle, published, media} = selection
      return {
        title: title || 'Untitled Essay',
        subtitle: subtitle ? `${subtitle} (${published || 'Draft'})` : `Published: ${published || 'Draft'}`,
        media,
      }
    },
  },
})
