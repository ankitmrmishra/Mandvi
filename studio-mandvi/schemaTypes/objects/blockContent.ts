import {defineType, defineArrayMember, defineField} from 'sanity'

export const blockContent = defineType({
  title: 'Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1 (Main Heading)', value: 'h1'},
        {title: 'H2 (Section)', value: 'h2'},
        {title: 'H3 (Sub-section)', value: 'h3'},
        {title: 'H4 (Detail)', value: 'h4'},
        {title: 'Quote Block', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet List', value: 'bullet'},
        {title: 'Numbered List', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong (Bold)', value: 'strong'},
          {title: 'Emphasis (Italic)', value: 'em'},
          {title: 'Underline', value: 'underline'},
          {title: 'Strike', value: 'strike-through'},
          {title: 'Code', value: 'code'},
        ],
        annotations: [
          // External link
          {
            title: 'External Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: true,
              },
            ],
          },
          // Internal Link
          {
            title: 'Internal Link',
            name: 'internalLink',
            type: 'object',
            fields: [
              {
                title: 'Reference',
                name: 'reference',
                type: 'reference',
                to: [
                  {type: 'post'},
                  {type: 'author'},
                ],
              },
            ],
          },
          // Academic Citation
          {
            title: 'Academic Citation',
            name: 'academicCitation',
            type: 'object',
            fields: [
              {
                title: 'Citation / Source Reference',
                name: 'citation',
                type: 'reference',
                to: [{type: 'post'}],
              },
              {
                title: 'Page / Section / Note',
                name: 'detail',
                type: 'string',
                description: 'E.g., "p. 45" or "Section 3.2".',
              },
            ],
          },
          // Footnote
          {
            title: 'Footnote',
            name: 'footnote',
            type: 'object',
            fields: [
              {
                title: 'Text',
                name: 'text',
                type: 'text',
                rows: 2,
                validation: (Rule) => Rule.required().error('Footnote content is required.'),
              },
            ],
          },
        ],
      },
    }),
    // Custom media/block embeds
    defineArrayMember({
      type: 'customImage',
    }),
    defineArrayMember({
      type: 'callout',
    }),
    defineArrayMember({
      type: 'quote',
    }),
    defineArrayMember({
      type: 'gallery',
    }),
    defineArrayMember({
      title: 'Code Block',
      name: 'codeBlock',
      type: 'object',
      fields: [
        defineField({
          name: 'language',
          title: 'Language',
          type: 'string',
          options: {
            list: [
              {title: 'JavaScript', value: 'javascript'},
              {title: 'TypeScript', value: 'typescript'},
              {title: 'Python', value: 'python'},
              {title: 'HTML', value: 'html'},
              {title: 'CSS', value: 'css'},
              {title: 'JSON', value: 'json'},
              {title: 'Bash / Shell', value: 'bash'},
              {title: 'Markdown', value: 'markdown'},
              {title: 'LaTeX', value: 'latex'},
            ],
          },
          initialValue: 'javascript',
        }),
        defineField({
          name: 'filename',
          title: 'Filename',
          type: 'string',
          description: 'E.g., index.ts, main.py',
        }),
        defineField({
          name: 'code',
          title: 'Code',
          type: 'text',
          rows: 10,
          validation: (Rule) => Rule.required().error('Code content cannot be empty.'),
        }),
      ],
      preview: {
        select: {
          language: 'language',
          filename: 'filename',
          code: 'code',
        },
        prepare(selection) {
          const {language, filename, code} = selection
          return {
            title: `💻 Code: ${filename || language}`,
            subtitle: code ? code.substring(0, 60) : 'No code content',
          }
        },
      },
    }),
    defineArrayMember({
      title: 'YouTube Video Embed',
      name: 'youtubeEmbed',
      type: 'object',
      fields: [
        defineField({
          name: 'url',
          title: 'YouTube URL',
          type: 'url',
          description: 'Paste the full YouTube link (e.g., https://www.youtube.com/watch?v=...)',
          validation: (Rule) =>
            Rule.required()
              .uri({scheme: ['http', 'https']})
              .custom((url) => {
                if (!url) return true
                const isYoutube = url.includes('youtube.com') || url.includes('youtu.be')
                return isYoutube ? true : 'Please enter a valid YouTube video link.'
              }),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
      preview: {
        select: {
          url: 'url',
        },
        prepare(selection) {
          return {
            title: '🎥 YouTube Video Embed',
            subtitle: selection.url || 'No URL configured',
          }
        },
      },
    }),
    defineArrayMember({
      title: 'Twitter / X Tweet Embed',
      name: 'tweetEmbed',
      type: 'object',
      fields: [
        defineField({
          name: 'url',
          title: 'Tweet URL',
          type: 'url',
          description: 'Paste the full Tweet/Post link (e.g., https://twitter.com/username/status/...)',
          validation: (Rule) =>
            Rule.required()
              .uri({scheme: ['http', 'https']})
              .custom((url) => {
                if (!url) return true
                const isTweet = url.includes('twitter.com') || url.includes('x.com')
                return isTweet ? true : 'Please enter a valid Twitter/X post link.'
              }),
        }),
      ],
      preview: {
        select: {
          url: 'url',
        },
        prepare(selection) {
          return {
            title: '🐦 Tweet Embed',
            subtitle: selection.url || 'No URL configured',
          }
        },
      },
    }),
    defineArrayMember({
      title: 'Simple Table',
      name: 'simpleTable',
      type: 'object',
      fields: [
        defineField({
          name: 'headerRow',
          title: 'Use First Row as Header',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'rows',
          title: 'Rows',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'tableRow',
              fields: [
                {
                  name: 'cells',
                  title: 'Cells',
                  type: 'array',
                  of: [{type: 'string'}],
                },
              ],
            },
          ],
        }),
      ],
      preview: {
        select: {
          rows: 'rows',
        },
        prepare(selection) {
          const rowCount = selection.rows ? selection.rows.length : 0
          return {
            title: '📊 Simple Table',
            subtitle: `${rowCount} row${rowCount === 1 ? '' : 's'}`,
          }
        },
      },
    }),
  ],
})
