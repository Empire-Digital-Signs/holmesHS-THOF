import { defineField, defineType } from 'sanity'

/**
 * Slideshow Entry. Fields:
 * Photo    - Required
 * Name     - Optional
 */
export const slideshowType = defineType({
  name: 'slideshow',
  title: 'Slideshow',
  type: 'document',
  fields: [
    defineField({
      name: 'photo',
      type: 'image',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'name',
      type: 'string',
    }),
  ],
})
