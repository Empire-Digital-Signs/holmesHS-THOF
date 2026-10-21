import { defineConfig } from 'tinacms'

// Your hosting provider likely exposes this as an environment variable
const branch
  = process.env.GITHUB_BRANCH
    || process.env.VERCEL_GIT_COMMIT_REF
    || process.env.HEAD
    || 'main'

export default defineConfig({
  branch,
  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public/tina-media',
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: 'post',
        label: 'Posts',
        path: 'content/posts',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        },
      },
      {
        name: 'history',
        label: 'History Entries',
        path: 'content/history',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'number',
            name: 'year',
            label: 'Year',
            required: true,
          },
          {
            type: 'image',
            name: 'photo',
            label: 'Photo',
            accept: 'image',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            overrides: {
              toolbar: [],
            },
          },
        ],
        ui: {
          router: () => '/history',
        },
      },
      {
        name: 'slideshow',
        label: 'Home Slideshow',
        path: 'content/slideshow',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            ui: {
              defaultValue: 'Home Slideshow',
              component: 'hidden',
            },
          },
          {
            type: 'object',
            name: 'images',
            label: 'Images',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'name',
                label: 'Name',
                description: 'Not shown in the app.',
              },
              {
                type: 'image',
                name: 'image',
                label: 'Image',
                accept: 'image',
              },
              {
                type: 'string',
                name: 'startDate',
                label: 'Start Date',
                description: 'When to start showing this slide. Always shown by default.',
              },
              {
                type: 'string',
                name: 'endDate',
                label: 'End Date',
                description: 'When to stop showing this slide. Always shown by default.',
              },
              {
                type: 'number',
                name: 'duration',
                label: 'Duration',
                description: 'How long to display this slide for. Default = 10 seconds.',
                ui: {
                  defaultValue: 10,
                },
              },
            ],
          },
          {
            type: 'number',
            name: 'transitionDuration',
            label: 'Transition Duration',
            description: 'Duration of the transition between slides in seconds. Default = 2 seconds.',
            ui: {
              defaultValue: 2,
            },
          },
        ],
        ui: {
          // Cannot include router preview: redirects to demo page and cannot edit
          filename: {
            readonly: true,
            slugify: () => 'home-slideshow',
          },
          allowedActions: {
            create: false,
            delete: false,
          },
        },
      },
      {
        name: 'inductee',
        label: 'Inductees',
        path: 'content/inductees',
        fields: [
          {
            type: 'string',
            name: 'firstName',
            label: 'First Name',
            required: true,
          },
          {
            type: 'string',
            name: 'lastName',
            label: 'Last Name',
            required: true,
          },
          {
            type: 'image',
            name: 'photo',
            label: 'Photo',
            required: true,
          },
          {
            type: 'rich-text',
            name: 'bio',
            label: 'Bio',
            description: 'Appears in Hall of Fame and Hall of Distinction',
            overrides: {
              toolbar: [],
            },
          },
          {
            type: 'object',
            name: 'academicPrograms',
            label: 'Academic Programs',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'program',
                label: 'Program',
                required: true,
              },
            ],
          },
          {
            type: 'object',
            name: 'careerAndTechnicalEducation',
            label: 'Career and Technical Education',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'program',
                label: 'Program',
                required: true,
              },
            ],
          },
          {
            type: 'boolean',
            name: 'hallOfDistinction',
            label: 'Inducted into the Hall of Distinction',
            description: 'Determines if this inductee is in the Hall of Distinction',
          },
          {
            type: 'number',
            name: 'hodYear',
            label: 'Hall of Distinction Induction Year',
          },
          {
            type: 'object',
            name: 'championships',
            label: 'Championships',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'name',
                label: 'Championship Name',
                required: true,
              },
            ],
          },
          {
            type: 'boolean',
            name: 'hallOfFame',
            label: 'Inducted into the Hall of Fame',
            description: 'Determines if this inductee is in the Hall of Fame',
          },
          {
            type: 'number',
            name: 'hofYear',
            label: 'Hall of Fame Induction Year',
          },
        ],
      },
    ],
  },
})
