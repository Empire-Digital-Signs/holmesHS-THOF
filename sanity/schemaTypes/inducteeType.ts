import { defineField, defineType } from 'sanity'

/**
 * Inductee Type. Reused in multiple pages. Fields:
 * First Name                       - Required
 * Last Name                        - Required
 * Photo                            - Required
 * Bio                              - Optional
 *
 * Academics
 * L Academic Programs              - Optional
 * L Career and Technical Education - Optional
 * L Hall of Distinction            - Optional
 * L Hall of Distinction Year       - Optional
 *
 * Athletics
 * L Championship Names             - Optional
 * L Hall of Fame                   - Optional
 * L Hall of Fame Year              - Optional
 *
 * Validations for arrays prevent empty values from getting stored.
 */
export const inducteeType = defineType({
  name: 'inductee',
  title: 'Inductee',
  type: 'document',
  groups: [
    {
      name: 'academics',
      title: 'Academics',
    },
    {
      name: 'athletics',
      title: 'Athletics',
    },
  ],
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'Appears in Hall of Fame and Hall of Distinction',
    }),

    // --- Academics ---
    defineField({
      name: 'academicPrograms',
      title: 'Academic Programs',
      type: 'array',
      of: [{
        type: 'string',
        validation: Rule => Rule.required(),
      }],
      group: 'academics',
    }),
    defineField({
      name: 'careerAndTechnicalEducation',
      title: 'Career and Technical Education',
      type: 'array',
      of: [{
        type: 'string',
        validation: Rule => Rule.required(),
      }],
      group: 'academics',
    }),
    defineField({
      name: 'hallOfDistinction',
      title: 'Inducted into the Hall of Distinction',
      description: 'Determines if this inductee is in the Hall of Distinction',
      type: 'boolean',
      group: 'academics',
    }),
    defineField({
      name: 'hodYear',
      title: 'Hall of Distinction Induction Year',
      type: 'number',
      group: 'academics',
    }),

    // --- Athletics ---
    defineField({
      name: 'championships',
      title: 'Championship Names',
      type: 'array',
      of: [{
        type: 'string',
        validation: Rule => Rule.required(),
      }],
      group: 'athletics',
    }),
    defineField({
      name: 'hallOfFame',
      title: 'Inducted into the Hall of Fame',
      description: 'Determines if this inductee is in the Hall of Fame',
      type: 'boolean',
      group: 'athletics',
    }),
    defineField({
      name: 'hofYear',
      title: 'Hall of Fame Induction Year',
      type: 'number',
      group: 'athletics',
    }),
  ],
})
