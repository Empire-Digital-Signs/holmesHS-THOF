import { defineField, defineType } from 'sanity'

/**
 * Inductee Type. Reused in multiple pages. Fields:
 * First Name                       - Required
 * Last Name                        - Required
 * Year                             - Required // TODO: decide if using induction year, grad year, or both
 * Picture                          - Required
 * Bio                              - Optional // TODO: resolve how many bios to use. One for academics and one for athletics?
 *
 * Academics
 * L Academic Program               - Optional
 * L Career and Technical Education - Optional
 * L Hall of Distinction            - Optional
 *
 * Athletics
 * L Championship Name              - Optional
 * L Hall of Fame                   - Optional
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
      of: [{ type: 'string' }],
      group: 'academics',
    }),
    defineField({
      name: 'careerAndTechnicalEducation',
      title: 'Career and Technical Education',
      type: 'array',
      of: [{ type: 'string' }],
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
      of: [{ type: 'string' }],
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
