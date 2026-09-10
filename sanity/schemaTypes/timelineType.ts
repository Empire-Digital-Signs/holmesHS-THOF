import { defineField, defineType } from 'sanity'

/**
 * Timeline Entry. Fields:
 * Title        - Required
 * Year         - Required
 * Description  - Optional
 */
export const timelineType = defineType({
  name: 'timeline',
  title: 'Timeline Entry',
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
      type: 'text',
    }),
  ],
})
