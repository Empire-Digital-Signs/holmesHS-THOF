import {defineField, defineType} from 'sanity'

/**
 * History Entry. Fields:
 * Title        - Required
 * Year         - Required
 * Description  - Optional
 * Photo        - Optional
 */
export const historyType = defineType({
  name: 'history',
  title: 'History',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      type: 'image',
    }),
  ],
})