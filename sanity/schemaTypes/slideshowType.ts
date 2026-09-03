import { defineField, defineType } from 'sanity'

/**
 * Slideshow Entry. Fields:
 * Slide
 * L Photo              - Required
 * L Name               - Optional
 * L Duration           - Optional
 * L Start Date         - Optional
 * L End Date           - Optional
 *
 * Name                 - Optional
 * Transition Duration  - Optional
 */
export const slideshowType = defineType({
  name: 'slideshow',
  title: 'Slideshow',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      readOnly: true,
      initialValue: 'Home Slideshow',
      description: '',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [{
        name: 'slide',
        title: 'Slide',
        type: 'object',
        fields: [
          defineField({
            name: 'photo',
            title: 'Photo',
            type: 'image',
          }),
          defineField({
            name: 'name',
            title: 'Name',
            description: 'Not shown in the app.',
            type: 'string',
          }),
          defineField({
            name: 'startDate',
            title: 'Start Date',
            description: 'When to start showing this slide. Always shown by default.',
            type: 'date',
          }),
          defineField({
            name: 'endDate',
            title: 'End Date',
            description: 'When to stop showing this slide. Always shown by default.',
            type: 'date',
          }),
          defineField({
            name: 'duration',
            title: 'Duration',
            description: 'How long to display this slide for. Default = 10 seconds.',
            type: 'number',
            initialValue: 10,
          }),
        ],
      }],
    }),
    defineField({
      name: 'transitionDuration',
      title: 'Transition Duration',
      description: 'Duration of the transition between slides in seconds. Default = 2 seconds.',
      type: 'number',
      initialValue: 2,
    }),
  ],
})
