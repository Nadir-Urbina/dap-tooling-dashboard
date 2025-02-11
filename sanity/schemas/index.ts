import { type SchemaTypeDefinition } from 'sanity'
import user from './user'
import role from './role'
import tool from './tool'

export const schemas = [tool, role, user]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, role, tool],
} 