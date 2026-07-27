import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'The title displayed in search engine results. Recommended length: under 60 characters.',
      validation: (Rule) =>
        Rule.max(60).warning('Titles longer than 60 characters may be truncated by search engines.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'A brief summary of the page for search engine snippets. Recommended length: 50-160 characters.',
      validation: (Rule) =>
        Rule.max(160).warning('Descriptions longer than 160 characters may be truncated by search engines.'),
    }),
    defineField({
      name: 'shareImage',
      title: 'Share Image',
      type: 'image',
      description: 'Used for social sharing previews (OpenGraph / Twitter cards). Recommended size: 1200x630px.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'The preferred URL of this page, used to prevent duplicate content issues.',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).error('Please enter a valid absolute URL (e.g., https://example.edu/page)'),
    }),
  ],
})
