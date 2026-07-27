import {defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  groups: [
    {name: 'content', title: 'Post Content', default: true},
    {name: 'publishing', title: 'Publishing Settings'},
    {name: 'metadata', title: 'Metadata & Relations'},
    {name: 'seo', title: 'SEO Settings'},
  ],
  fields: [
    // --- Post Content Group ---
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'Keep the title punchy and clear.',
      validation: (Rule) => Rule.required().error('Blog title is required.'),
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
      description: 'A secondary heading or teaser line.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'A brief summary of the post (50 to 200 characters) shown on blog list cards.',
      validation: (Rule) =>
        Rule.required()
          .min(50)
          .warning('An excerpt of at least 50 characters is recommended for SEO.')
          .max(200)
          .error('The excerpt must be 200 characters or less.'),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'customImage',
      group: 'content',
      description: 'Primary banner image for the post. Requires alternative description.',
    }),
    defineField({
      name: 'content',
      title: 'Content Body',
      type: 'blockContent',
      group: 'content',
      description: 'The body of the blog post. Add text, headings, code, callouts, lists, or tables.',
      validation: (Rule) => Rule.required().error('Post content is required.'),
    }),

    // --- Publishing Settings Group ---
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      group: 'publishing',
      validation: (Rule) => Rule.required().error('Please select an author.'),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'publishing',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
          {title: 'Scheduled', value: 'scheduled'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required().error('Please select a publication status.'),
    }),
    defineField({
      name: 'publishedDate',
      title: 'Publish Date',
      type: 'datetime',
      group: 'publishing',
      validation: (Rule) => Rule.required().error('Publish date is required.'),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'datetime',
      group: 'publishing',
      description: 'Optional update timestamp if this post has been revised later.',
    }),
    defineField({
      name: 'featuredPost',
      title: 'Featured Post?',
      type: 'boolean',
      group: 'publishing',
      description: 'If active, this post will be prominently highlighted on the homepage.',
      initialValue: false,
    }),
    defineField({
      name: 'allowComments',
      title: 'Allow Comments?',
      type: 'boolean',
      group: 'publishing',
      description: 'Enable or disable interactive commentary for this post.',
      initialValue: true,
    }),

    // --- Metadata & Relations Group ---
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'metadata',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'metadata',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
    }),
    defineField({
      name: 'series',
      title: 'Series Name',
      type: 'string',
      group: 'metadata',
      description: 'E.g., "AI Ethics Series Part 1". Group related articles together.',
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      group: 'metadata',
      of: [{type: 'reference', to: [{type: 'post'}]}],
      description: 'Explicitly recommend other blog posts for the reader.',
    }),
    defineField({
      name: 'tableOfContents',
      title: 'Generate Table of Contents?',
      type: 'boolean',
      group: 'metadata',
      description: 'If active, the frontend will automatically construct a clickable section index.',
      initialValue: true,
    }),
    defineField({
      name: 'readingTime',
      title: 'Estimated Reading Time',
      type: 'string',
      group: 'metadata',
      description: 'E.g., "5 mins". Leave blank for auto-calculation on the frontend.',
    }),
    defineField({
      name: 'viewCount',
      title: 'View Count',
      type: 'number',
      group: 'metadata',
      description: 'Stat track showing views on the frontend. Read-only in Studio.',
      readOnly: true,
      initialValue: 0,
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
      author: 'author.name',
      status: 'status',
      published: 'publishedDate',
      media: 'featuredImage',
      featured: 'featuredPost',
    },
    prepare(selection) {
      const {title, author, status, published, media, featured} = selection
      const featuredBadge = featured ? '🔥 ' : ''
      const statusIcon: Record<string, string> = {
        draft: '📝 Draft',
        published: '🌐 Published',
        scheduled: '⏰ Scheduled',
      }
      const pubStr = published ? new Date(published).toLocaleDateString() : 'No date'
      return {
        title: `${featuredBadge}${title || 'Untitled Post'}`,
        subtitle: `by ${author || 'Unknown'} | ${statusIcon[status] || 'Draft'} (${pubStr})`,
        media,
      }
    },
  },
})
