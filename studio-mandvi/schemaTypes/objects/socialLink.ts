import {defineField, defineType} from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social / External Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform / Type',
      type: 'string',
      options: {
        list: [
          {title: 'Google Scholar', value: 'googleScholar'},
          {title: 'ORCID', value: 'orcid'},
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'Twitter / X', value: 'twitter'},
          {title: 'GitHub', value: 'github'},
          {title: 'ResearchGate', value: 'researchgate'},
          {title: 'Email', value: 'email'},
          {title: 'Website', value: 'website'},
        ],
      },
      validation: (Rule) => Rule.required().error('Please select a platform type.'),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string', // Use string so it can support mailto: as well as standard URLs
      description: 'Use absolute URLs (e.g., https://linkedin.com/in/...) or mailto:email@domain.com for email links.',
      validation: (Rule) =>
        Rule.required()
          .custom((url) => {
            if (!url) return 'URL is required.'
            if (url.startsWith('mailto:')) {
              const email = url.replace('mailto:', '')
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
              return emailRegex.test(email) ? true : 'Please enter a valid email address after mailto:'
            }
            try {
              new URL(url)
              return true
            } catch (_) {
              return 'Please enter a valid absolute URL (e.g., https://example.com)'
            }
          }),
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
      url: 'url',
    },
    prepare(selection) {
      const {platform, url} = selection
      const formatPlatform = (val: string) => {
        if (!val) return 'Unknown Link'
        return val.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
      }
      return {
        title: formatPlatform(platform),
        subtitle: url || 'No URL specified',
      }
    },
  },
})
