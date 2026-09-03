import { defineField, defineType } from 'sanity'

/**
 * Inductee Type. Reused in multiple pages. Fields:
 * First Name                       - Required
 * Last Name                        - Required
 * Year                             - Required
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
 *
 * Induction year? - Optional TODO: decide if using
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
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'year',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'photo',
      type: 'image',
      validation: Rule => Rule.required(),
    }),

    // --- Academics ---
    defineField({
      name: 'academicProgram',
      type: 'string',
      group: 'academics',
    }),
    defineField({
      name: 'careerAndTechnicalEducation',
      type: 'string',
      group: 'academics',
    }),
    defineField({
      name: 'hallOfDistinction',
      type: 'boolean',
      group: 'academics',
    }),

    // --- Athletics ---
    defineField({
      name: 'championshipName',
      type: 'string',
      group: 'athletics',
    }),
    defineField({
      name: 'hallOfFame',
      type: 'boolean',
      group: 'athletics',
    }),
  ],
})
