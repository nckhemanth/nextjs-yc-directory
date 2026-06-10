import { defineField, defineType } from 'sanity'

export const playlist = defineType({
  name: 'playlist',
  title: 'Playlists',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'select',
      title: 'Selected Startups',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'startup' }] }],
    }),
  ],
})

