import { defineField, defineType } from 'sanity'

/**
 * Timeline Entry. Fields:
 * Title        - Required
 * Year         - Required
 * Description  - Optional
 */
export const timelineType = defineType({
  name: 'timeline',
  title: 'Timeline',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'year',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'string',
    }),
  ],
})
