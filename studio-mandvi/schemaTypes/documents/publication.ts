import {defineField, defineType} from 'sanity'

export const publication = defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  groups: [
    {name: 'details', title: 'Publication Details', default: true},
    {name: 'identifiers', title: 'Files & Identifiers'},
    {name: 'content', title: 'Abstract & Metadata'},
  ],
  fields: [
    // --- Details Group ---
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'details',
      validation: (Rule) => Rule.required().error('Publication title is required.'),
    }),
    defineField({
      name: 'publicationType',
      title: 'Publication Type',
      type: 'string',
      group: 'details',
      options: {
        list: [
          {title: 'Journal Article', value: 'journal'},
          {title: 'Conference Paper', value: 'conference'},
          {title: 'Book Chapter', value: 'bookChapter'},
          {title: 'Whole Book', value: 'book'},
          {title: 'Preprint', value: 'preprint'},
          {title: 'Technical Report', value: 'report'},
        ],
      },
      validation: (Rule) => Rule.required().error('Publication type is required.'),
      initialValue: 'journal',
    }),
    defineField({
      name: 'authors',
      title: 'Author List (Ordered)',
      type: 'array',
      group: 'details',
      of: [{type: 'string'}],
      description: 'Add authors in order of contribution (e.g. "John Smith", "Jane Doe").',
      validation: (Rule) => Rule.required().min(1).error('At least one author is required.'),
    }),
    defineField({
      name: 'journal',
      title: 'Journal Name',
      type: 'string',
      group: 'details',
      hidden: ({parent}) => parent?.publicationType !== 'journal',
      validation: (Rule) =>
        Rule.custom((val, context) => {
          const parent = context.parent as any
          if (parent?.publicationType === 'journal' && !val) return 'Journal name is required.'
          return true
        }),
    }),
    defineField({
      name: 'conference',
      title: 'Conference Name / Proceedings',
      type: 'string',
      group: 'details',
      hidden: ({parent}) => parent?.publicationType !== 'conference',
      validation: (Rule) =>
        Rule.custom((val, context) => {
          const parent = context.parent as any
          if (parent?.publicationType === 'conference' && !val) return 'Conference name is required.'
          return true
        }),
    }),
    defineField({
      name: 'publisher',
      title: 'Publisher',
      type: 'string',
      group: 'details',
      description: 'E.g., Springer, Elsevier, MIT Press.',
    }),
    defineField({
      name: 'volume',
      title: 'Volume',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'issue',
      title: 'Issue',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'pages',
      title: 'Page Range',
      type: 'string',
      group: 'details',
      description: 'E.g., 123-145.',
    }),
    defineField({
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
      group: 'details',
      validation: (Rule) => Rule.required().error('Publication date is required.'),
    }),

    // --- Files & Identifiers Group ---
    defineField({
      name: 'doi',
      title: 'DOI (Digital Object Identifier)',
      type: 'string',
      group: 'identifiers',
      description: 'E.g., 10.1016/j.chb.2023.107890',
      validation: (Rule) =>
        Rule.custom((doi) => {
          if (!doi) return true
          // DOI validation regex (starts with 10. followed by 4 or more digits and a slash, followed by identifier)
          const doiRegex = /^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i
          return doiRegex.test(doi) ? true : 'Please enter a valid DOI (e.g., 10.1016/j.chb.2023.107890).'
        }),
    }),
    defineField({
      name: 'externalUrl',
      title: 'Publisher / External URL',
      type: 'url',
      group: 'identifiers',
      description: 'Link to the publication landing page at the publisher site.',
    }),
    defineField({
      name: 'pdf',
      title: 'Full PDF Document',
      type: 'pdfFile',
      group: 'identifiers',
      description: 'Upload preprint or postprint PDF file.',
    }),

    // --- Abstract & Metadata Group ---
    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      group: 'content',
      rows: 5,
      description: 'Full scientific abstract summarizing the publication.',
    }),
    defineField({
      name: 'citation',
      title: 'Pre-formatted Citation (APA/MLA)',
      type: 'text',
      group: 'content',
      rows: 2,
      description: 'Copy-paste citation format for readers (e.g., Smith, J., & Doe, J. (2024). Journal Title...).',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      group: 'content',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pubType: 'publicationType',
      journal: 'journal',
      conference: 'conference',
      date: 'publicationDate',
    },
    prepare(selection) {
      const {title, pubType, journal, conference, date} = selection
      const year = date ? `(${new Date(date).getFullYear()})` : ''
      const venue = pubType === 'journal' ? journal : conference
      const venueStr = venue ? `in ${venue}` : ''
      
      const typeIcons: Record<string, string> = {
        journal: '📄 Journal',
        conference: '🎤 Conference',
        bookChapter: '🔖 Book Chapter',
        book: '📚 Book',
        preprint: '🧪 Preprint',
        report: '📋 Report',
      }
      const typeIcon = typeIcons[pubType] || '📝 Publication'

      return {
        title: title || 'Untitled Publication',
        subtitle: `${typeIcon} ${year} ${venueStr}`,
      }
    },
  },
})
