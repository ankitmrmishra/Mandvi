import {defineField, defineType} from 'sanity'

export const researchArticle = defineType({
  name: 'researchArticle',
  title: 'Research Article',
  type: 'document',
  groups: [
    {name: 'details', title: 'Publication Details', default: true},
    {name: 'content', title: 'Article Body & Text'},
    {name: 'resources', title: 'Figures, Tables & Files'},
    {name: 'seo', title: 'SEO Settings'},
  ],
  fields: [
    // --- Slug Field (REQUIRED FOR ROUTING) ---
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for this research article',
      validation: (Rule) => Rule.required().error('Slug is required for the URL.'),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),

    // --- Publication Details Group ---
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      group: 'details',
      validation: (Rule) => Rule.required().error('Research article title is required.'),
    }),
    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      group: 'details',
      rows: 5,
      description:
        'The academic abstract summarizing hypothesis, methodology, results, and discussion.',
      validation: (Rule) => Rule.required().error('An abstract is required.'),
    }),
    defineField({
      name: 'authors',
      title: 'Author List (Ordered)',
      type: 'array',
      group: 'details',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1).error('At least one author must be specified.'),
    }),
    defineField({
      name: 'researchArea',
      title: 'Research Area / Field',
      type: 'string',
      group: 'details',
      description: 'E.g., "Cognitive Psychology", "Theoretical Physics", "Digital Humanities".',
    }),
    defineField({
      name: 'journal',
      title: 'Journal / Book Title',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'conference',
      title: 'Conference Venue',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'doi',
      title: 'DOI Link / ID',
      type: 'string',
      group: 'details',
      description: 'E.g., 10.1109/MC.2023.3268802',
      validation: (Rule) =>
        Rule.custom((doi) => {
          if (!doi) return true
          const doiRegex = /^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i
          return doiRegex.test(doi) ? true : 'Please enter a valid DOI.'
        }),
    }),
    defineField({
      name: 'publishedDate',
      title: 'Publication Date',
      type: 'date',
      group: 'details',
      validation: (Rule) => Rule.required().error('Publication date is required.'),
    }),
    defineField({
      name: 'citation',
      title: 'Academic Citation Style (APA/MLA/Chicago)',
      type: 'text',
      group: 'details',
      rows: 2,
      description: 'Copy-ready format for website visitors.',
    }),

    // --- Content Body Group ---
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      rows: 2,
      description: 'Brief teaser text shown in preview cards.',
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string',
      group: 'content',
      description: 'E.g., "10 min" or "15 min read"',
      placeholder: '10 min',
    }),
    defineField({
      name: 'summary',
      title: 'Layperson Summary (Impact Statement)',
      type: 'text',
      group: 'content',
      rows: 3,
      description:
        'Explain the core findings and real-world significance of this research in non-technical terms.',
    }),
    defineField({
      name: 'fullArticle',
      title: 'Full Article / Manuscript Body',
      type: 'blockContent',
      group: 'content',
      description:
        'The complete text of the paper. Use this if displaying the full manuscript directly on the page.',
    }),
    defineField({
      name: 'references',
      title: 'References / Bibliography',
      type: 'array',
      group: 'content',
      of: [{type: 'citation'}],
      description: 'List of papers and books cited in this article.',
    }),

    // --- Figures, Tables & Files Group ---
    defineField({
      name: 'pdfUpload',
      title: 'PDF Document Upload',
      type: 'pdfFile',
      group: 'resources',
      description: 'Upload the PDF version of the full research paper.',
    }),
    defineField({
      name: 'externalLink',
      title: 'External Publisher Link',
      type: 'url',
      group: 'resources',
      description: 'Link to IEEE Xplore, ScienceDirect, or SSRN.',
    }),
    defineField({
      name: 'figures',
      title: 'Figures & Illustrations',
      type: 'array',
      group: 'resources',
      of: [{type: 'customImage'}],
      description: 'Upload charts, diagrams, or images associated with this article.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'resources',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
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
      journal: 'journal',
      conference: 'conference',
      date: 'publishedDate',
    },
    prepare(selection) {
      const {title, journal, conference, date} = selection
      const venue = journal || conference || 'Preprint'
      const year = date ? `(${new Date(date).getFullYear()})` : 'Draft'
      return {
        title: title || 'Untitled Research Article',
        subtitle: `🔬 Research Article ${year} | ${venue}`,
      }
    },
  },
})
