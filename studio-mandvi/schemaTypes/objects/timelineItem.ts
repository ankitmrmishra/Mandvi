import {defineField, defineType} from 'sanity'

export const timelineItem = defineType({
  name: 'timelineItem',
  title: 'Timeline Item',
  type: 'object',
  fields: [
    defineField({
      name: 'year',
      title: 'Year or Period',
      type: 'string',
      description: 'E.g., "2024", "2018 - 2022", "Present".',
      validation: (Rule) => Rule.required().error('Year or period is required.'),
    }),
    defineField({
      name: 'title',
      title: 'Title / Role / Milestone',
      type: 'string',
      description: 'E.g., "Ph.D. in Computer Science", "Assistant Professor", "Award for Excellence".',
      validation: (Rule) => Rule.required().error('Title is required.'),
    }),
    defineField({
      name: 'institution',
      title: 'Institution / Organization',
      type: 'string',
      description: 'E.g., "Stanford University", "IEEE Association".',
    }),
    defineField({
      name: 'description',
      title: 'Details / Description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      year: 'year',
      title: 'title',
      institution: 'institution',
    },
    prepare(selection) {
      const {year, title, institution} = selection
      return {
        title: `[${year}] ${title}`,
        subtitle: institution || '',
      }
    },
  },
})
