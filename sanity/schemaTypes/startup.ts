import { defineField, defineType } from 'sanity'

export const startup = defineType({
  name: 'startup',
  title: 'Startups',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required().min(3).max(100),
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
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: rule => rule.required().min(20).max(500),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image URL',
      type: 'url',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'pitch',
      title: 'Pitch',
      type: 'markdown',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'views',
      title: 'Views',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: rule => rule.required(),
    }),
  ],
})

