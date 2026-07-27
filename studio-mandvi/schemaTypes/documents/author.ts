import {defineField, defineType} from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Author Profile',
  type: 'document',
  groups: [
    {name: 'profile', title: 'Basic Profile', default: true},
    {name: 'academic', title: 'Academic Profile'},
    {name: 'contact', title: 'Contact & Socials'},
    {name: 'cv', title: 'CV & Milestones'},
  ],
  fields: [
    // --- Basic Profile Group ---
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      group: 'profile',
      validation: (Rule) => Rule.required().error('Name is required.'),
    }),
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'customImage',
      group: 'profile',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'blockContent',
      group: 'profile',
      description: 'A detailed narrative biography for the author page.',
    }),

    // --- Academic Profile Group ---
    defineField({
      name: 'position',
      title: 'Academic Title / Position',
      type: 'string',
      group: 'academic',
      description: 'E.g., Professor of Sociology, Chair of Computer Science Department.',
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      group: 'academic',
    }),
    defineField({
      name: 'university',
      title: 'University / Institution',
      type: 'string',
      group: 'academic',
    }),
    defineField({
      name: 'orcid',
      title: 'ORCID iD',
      type: 'string',
      group: 'academic',
      description: '16-digit academic identifier (e.g., 0000-0002-1825-0097).',
      validation: (Rule) =>
        Rule.custom((orcid) => {
          if (!orcid) return true
          const orcidRegex = /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/
          return orcidRegex.test(orcid) ? true : 'Please enter a valid ORCID iD format (e.g., 0000-0002-1825-0097).'
        }),
    }),
    defineField({
      name: 'googleScholar',
      title: 'Google Scholar ID / URL',
      type: 'string',
      group: 'academic',
      description: 'Paste your Google Scholar profile URL or User ID.',
    }),
    defineField({
      name: 'researchInterests',
      title: 'Research Interests',
      type: 'array',
      group: 'academic',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),

    // --- Contact & Socials Group ---
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.email().error('Please enter a valid email address.'),
    }),
    defineField({
      name: 'website',
      title: 'Personal Website URL',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media & Profile Links',
      type: 'array',
      group: 'contact',
      of: [{type: 'socialLink'}],
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'string',
      group: 'contact',
      description: 'E.g., Tuesdays 2:00 PM - 4:00 PM in Room 402, or by appointment.',
    }),

    // --- CV & Milestones Group ---
    defineField({
      name: 'education',
      title: 'Education history',
      type: 'array',
      group: 'cv',
      of: [{type: 'timelineItem'}],
      description: 'Add degrees, research fellowships, or universities attended.',
    }),
    defineField({
      name: 'awards',
      title: 'Awards & Honors',
      type: 'array',
      group: 'cv',
      of: [{type: 'timelineItem'}],
      description: 'Add prominent academic awards, grants, or recognitions.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'photo',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Unnamed Author',
        subtitle: subtitle || 'No academic position specified',
        media,
      }
    },
  },
})
