import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Mandvi Academic Studio',

  projectId: 'dewq3ezo',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Restrict templates so that siteSettings cannot be created via the "New document" menu
    templates: (templates) =>
      templates.filter(({schemaType}) => schemaType !== 'siteSettings'),
  },

  document: {
    // Restrict actions on singleton document (only allow publish, discard, and restore)
    actions: (prev, context) => {
      if (context.schemaType === 'siteSettings') {
        return prev.filter(
          ({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action)
        )
      }
      return prev
    },
  },
})
