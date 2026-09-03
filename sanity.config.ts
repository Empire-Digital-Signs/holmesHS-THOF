'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'

// Makes slideshow a singleton to ensure only one slideshow exists in Sanity,
// so there is only one document to query for.
const SINGLETON_TYPES = new Set(['slideshow'])
const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    // Controls what documents to show in Studio
    structureTool({
      structure: S =>
        S.list()
          .title('Content')
          .items([
            // Explicitly create a slideshow to edit with a determined id
            S.listItem()
              .title('Home Slideshow')
              .id('mainSlideshow')
              .child(
                S.document()
                  .schemaType('slideshow')
                  .documentId('mainSlideshow'),
              ),
            // List all other items to complete the editor
            ...S.documentTypeListItems().filter(
              listItem => !SINGLETON_TYPES.has(listItem.getId() || ''),
            ),
          ]),
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    newDocumentOptions: (prev, context) => {
      if (context.creationContext.type === 'global') {
        return prev.filter(item => !SINGLETON_TYPES.has(item.templateId))
      }
      return prev
    },
    actions: (prev, context) => {
      if (SINGLETON_TYPES.has(context.schemaType)) {
        return prev.filter(
          ({ action }) => action && SINGLETON_ACTIONS.has(action),
        )
      }
      return prev
    },
  },
})
