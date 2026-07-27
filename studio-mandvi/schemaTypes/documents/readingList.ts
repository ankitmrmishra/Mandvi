import {defineField, defineType} from 'sanity'

export const readingList = defineType({
  name: 'readingList',
  title: 'Reading List',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'List Title',
      type: 'string',
      description: 'E.g., "Recommended Reading for Intro to Sociology" or "Favorite Philosophy Books".',
      validation: (Rule) => Rule.required().error('Reading list title is required.'),
    }),
    defineField({
      name: 'description',
      title: 'Description / Context',
      type: 'text',
      rows: 3,
      description: 'Describe the theme, goal, or target audience for this reading list.',
    }),
    defineField({
      name: 'books',
      title: 'Books In List',
      type: 'array',
      of: [{type: 'book'}],
      description: 'Add books to this reading list and order them.',
      validation: (Rule) => Rule.required().min(1).error('At least one book must be added to the list.'),
    }),
    defineField({
      name: 'priority',
      title: 'Priority Level',
      type: 'string',
      options: {
        list: [
          {title: 'Low (Optional Reading)', value: 'low'},
          {title: 'Medium (Highly Recommended)', value: 'medium'},
          {title: 'High (Required Core Reading)', value: 'high'},
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'difficulty',
      title: 'Reading Difficulty',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner (Introductory)', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced (Scholarly/Technical)', value: 'advanced'},
        ],
      },
      initialValue: 'beginner',
    }),
    defineField({
      name: 'estimatedTime',
      title: 'Estimated Completion Time',
      type: 'string',
      description: 'E.g., "1 semester", "4 weeks", "10-15 hours".',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      books: 'books',
      priority: 'priority',
      difficulty: 'difficulty',
    },
    prepare(selection) {
      const {title, books, priority, difficulty} = selection
      const bookCount = books ? books.length : 0
      
      const priorityLabel: Record<string, string> = {
        low: '🟢 Low',
        medium: '🟡 Medium',
        high: '🔴 High',
      }
      const difficultyLabel: Record<string, string> = {
        beginner: '🟢 Easy',
        intermediate: '🟡 Medium',
        advanced: '🔴 Hard',
      }

      const metaStr = [
        `${bookCount} book${bookCount === 1 ? '' : 's'}`,
        priority ? `Priority: ${priorityLabel[priority] || priority}` : '',
        difficulty ? `Diff: ${difficultyLabel[difficulty] || difficulty}` : '',
      ].filter(Boolean).join(' | ')

      return {
        title: title || 'Untitled Reading List',
        subtitle: metaStr,
      }
    },
  },
})
