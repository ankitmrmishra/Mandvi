import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {name: 'general', title: 'General & Branding', default: true},
    {name: 'navigation', title: 'Navigation & Footer'},
    {name: 'seo', title: 'Default SEO Settings'},
    {name: 'integrations', title: 'Integrations & Tracking'},
  ],
  fields: [
    // --- General & Branding ---
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required().error('Site name is required.'),
      initialValue: 'Academic Personal Website',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline / Academic Description',
      type: 'string',
      group: 'general',
      description: 'E.g., "Professor of Sociology specializing in Urban Culture & Digital Inequality."',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'customImage',
      group: 'general',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon Icon',
      type: 'image',
      group: 'general',
      description: 'Must be a square file (PNG or ICO, recommended 32x32px or 48x48px).',
    }),
    defineField({
      name: 'homepageHero',
      title: 'Homepage Hero Section',
      type: 'hero',
      group: 'general',
      description: 'The banner text and Call to Actions displayed at the top of the homepage.',
    }),
    defineField({
      name: 'contactInformation',
      title: 'Contact Information',
      type: 'object',
      group: 'general',
      fields: [
        {name: 'officeLocation', title: 'Office Location', type: 'string', description: 'E.g., Room 405, Science Hall'},
        {name: 'officePhone', title: 'Office Phone', type: 'string'},
        {name: 'contactEmail', title: 'Contact Email', type: 'string', validation: (Rule) => Rule.email()},
      ],
    }),

    // --- Navigation & Footer ---
    defineField({
      name: 'navigationMenu',
      title: 'Main Navigation Menu',
      type: 'array',
      group: 'navigation',
      description: 'Define the links shown in the top navigation bar of the site.',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Navigation Link',
          fields: [
            {name: 'label', title: 'Link Label', type: 'string', validation: (Rule) => Rule.required()},
            {
              name: 'linkType',
              title: 'Link Destination Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Home Page', value: 'home'},
                  {title: 'Blog / News', value: 'blog'},
                  {title: 'Research & Publications', value: 'research'},
                  {title: 'Book Reviews', value: 'reviews'},
                  {title: 'Essays', value: 'essays'},
                  {title: 'Custom Internal Document', value: 'internal'},
                  {title: 'External Link', value: 'external'},
                ],
              },
              initialValue: 'internal',
            },
            {
              name: 'reference',
              title: 'Internal Reference',
              type: 'reference',
              to: [
                {type: 'post'},
                {type: 'author'},
              ],
              hidden: ({parent}) => parent?.linkType !== 'internal',
            },
            {
              name: 'externalUrl',
              title: 'External URL',
              type: 'url',
              hidden: ({parent}) => parent?.linkType !== 'external',
            },
          ],
          preview: {
            select: {
              title: 'label',
              linkType: 'linkType',
              externalUrl: 'externalUrl',
            },
            prepare(selection) {
              const {title, linkType, externalUrl} = selection
              const dest = linkType === 'external' ? externalUrl : `Preset: ${linkType}`
              return {
                title: title || 'Unnamed Navigation Item',
                subtitle: dest,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Copyright Text',
      type: 'text',
      group: 'navigation',
      rows: 2,
      description: 'E.g., "© 2026 Academic Name. All rights reserved."',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Global Social / Directory Links',
      type: 'array',
      group: 'navigation',
      of: [{type: 'socialLink'}],
      description: 'These will be displayed in both header and footer widgets.',
    }),
    defineField({
      name: 'newsletterSettings',
      title: 'Newsletter Subscription Widget',
      type: 'object',
      group: 'navigation',
      fields: [
        {name: 'enabled', title: 'Enable Newsletter Signup', type: 'boolean', initialValue: false},
        {name: 'headline', title: 'Headline', type: 'string', initialValue: 'Subscribe to my newsletter'},
        {name: 'description', title: 'Sub-headline / Text', type: 'string', initialValue: 'Get quarterly updates on research articles, essays, and reviews.'},
        {name: 'actionUrl', title: 'Form Action URL (Substack, Mailchimp, ConvertKit)', type: 'url'},
      ],
    }),

    // --- Default SEO ---
    defineField({
      name: 'defaultSeo',
      title: 'Fallback SEO Settings',
      type: 'seo',
      group: 'seo',
      description: 'These settings are used if a specific page does not have its own SEO config defined.',
    }),

    // --- Integrations & Tracking ---
    defineField({
      name: 'googleAnalytics',
      title: 'Google Analytics Tracking ID',
      type: 'string',
      group: 'integrations',
      description: 'E.g., G-XXXXXX. Paste your measurement ID.',
    }),
    defineField({
      name: 'googleSearchConsoleVerification',
      title: 'Google Search Console Verification Token',
      type: 'string',
      group: 'integrations',
      description: 'The content attribute value from the verification meta tag.',
    }),
    defineField({
      name: 'themeSettings',
      title: 'Theme Branding Colors',
      type: 'object',
      group: 'general',
      fields: [
        {
          name: 'primaryColor',
          title: 'Primary Branding Color',
          type: 'string',
          options: {
            list: [
              {title: 'Crimson Burgundy (Yale/Harvard theme)', value: 'burgundy'},
              {title: 'Oxford Blue', value: 'oxfordBlue'},
              {title: 'Classic Slate Black', value: 'slate'},
              {title: 'Forest Academic Green', value: 'forestGreen'},
            ],
          },
          initialValue: 'oxfordBlue',
        },
        {
          name: 'enableDarkMode',
          title: 'Support Dark Mode Toggle',
          type: 'boolean',
          initialValue: true,
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      subtitle: 'tagline',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Site Settings',
        subtitle: selection.subtitle || 'Global configurations',
      }
    },
  },
})
