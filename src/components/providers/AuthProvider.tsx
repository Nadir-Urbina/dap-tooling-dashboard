'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  Auth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { client } from '@/lib/sanity';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Auth state changed:', user);
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createSanityUser = async (user: User) => {
    try {
      console.log('Sanity Token:', process.env.SANITY_API_TOKEN?.slice(0, 5) + '...');  // Only log first 5 chars
      // First, get or create the basic role
      let basicRole = await client.fetch('*[_type == "role" && name == "basic"][0]');
      
      if (!basicRole) {
        basicRole = await client.create({
          _type: 'role',
          name: 'basic',
          description: 'Basic user role with limited permissions'
        });
      }

      // Create user with reference to basic role
      await client.create({
        _type: 'user',
        email: user.email,
        firebaseId: user.uid,
        name: user.email?.split('@')[0] || 'Unknown',
        lastLogin: new Date().toISOString(),
        roles: [{
          _type: 'reference',
          _ref: basicRole._id
        }]
      });
    } catch (error) {
      console.error('Error creating Sanity user:', error);
      await user.delete();
      throw new Error('Failed to complete user registration');
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await createSanityUser(userCredential.user);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 