import { defineField, defineType } from 'sanity'

/**
 * History Entry. Fields:
 * Title        - Required
 * Year         - Required
 * Description  - Optional
 * Photo        - Optional
 */
export const historyType = defineType({
  name: 'history',
  title: 'History Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
    }),
  ],
})
