import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'role',
  title: 'Role',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'A unique identifier for this role (e.g., "vp", "manager", "basic")',
      validation: (Rule) => Rule
        .required()
        .lowercase()
        .regex(/^[a-z0-9_-]+$/)
        .error('Key must contain only lowercase letters, numbers, underscores, and hyphens')
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    {
      name: 'tools',
      title: 'Tools',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tool' }] }]
    }
  ]
}) 