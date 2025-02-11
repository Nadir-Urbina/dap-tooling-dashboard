import { client } from '@/lib/sanity'
import { User } from 'firebase/auth'

export async function createOrUpdateUser(firebaseUser: User) {
  const user = {
    _type: 'user',
    _id: `user-${firebaseUser.uid}`,
    firebaseId: firebaseUser.uid,
    email: firebaseUser.email,
    name: firebaseUser.displayName,
    lastLogin: new Date().toISOString()
  }

  try {
    // Check if user exists
    const existingUser = await client.fetch(
      `*[_type == "user" && firebaseId == $firebaseId][0]`,
      { firebaseId: firebaseUser.uid }
    )

    if (existingUser) {
      // Update existing user
      await client.patch(existingUser._id)
        .set({
          lastLogin: user.lastLogin,
          name: user.name,
          email: user.email
        })
        .commit()
    } else {
      // Create new user
      await client.create(user)
    }
  } catch (error) {
    console.error('Error syncing user with Sanity:', error)
    throw error
  }
}

export async function getUserRoles(firebaseId: string) {
  try {
    const user = await client.fetch(`
      *[_type == "user" && firebaseId == $firebaseId][0]{
        "roles": roles[]->key
      }
    `, { firebaseId })
    return user?.roles || []
  } catch (error) {
    console.error('Error fetching user roles:', error)
    return []
  }
} 