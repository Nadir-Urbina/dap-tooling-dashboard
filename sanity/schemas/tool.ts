import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tool',
  title: 'Tool',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Admin', value: 'admin' },
          { title: 'Finance', value: 'finance' },
          { title: 'HR', value: 'hr' },
          { title: 'Operations', value: 'operations' }
        ]
      }
    }),
    defineField({
      name: 'requiredRoles',
      title: 'Required Roles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'role' }] }]
    }),
    defineField({
      name: 'platforms',
      title: 'Compatible Platforms',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Desktop', value: 'desktop' },
              { title: 'Mobile', value: 'mobile' },
              { title: 'Tablet', value: 'tablet' }
            ]
          }
        }
      ],
      validation: Rule => Rule.required()
    })
  ]
}) 