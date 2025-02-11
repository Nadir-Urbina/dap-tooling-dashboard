import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'firebaseId',
      title: 'Firebase ID',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'roles',
      title: 'Roles',
      type: 'array',
      of: [{ 
        type: 'reference',
        to: [{ type: 'role' }],
      }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'lastLogin',
      title: 'Last Login',
      type: 'datetime'
    })
  ]
}) 