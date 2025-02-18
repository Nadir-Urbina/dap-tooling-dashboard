'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { client } from '@/lib/sanity';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string) => Promise<{ success: boolean; message: string }>
    signOut: () => Promise<void>
    resetPassword: (email: string) => Promise<void>
  }

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const signOut = useCallback(async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.emailVerified) {
          setUser(user);
        } else {
          await signOut();
          router.push('/');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, signOut]);

  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    if (!userCredential.user.emailVerified) {
      await signOut();
      throw new Error('Please verify your email before signing in.');
    }
    
    setUser(userCredential.user);
  };

  const signUp = async (email: string, password: string) => {
    try {
      // Create Firebase user first
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Send verification email
      await sendEmailVerification(userCredential.user)
      
      try {
        // Updated query to match exact role name and key
        const basicRole = await client.fetch(`
          *[_type == "role" && (name == "basic" || key == "basic")][0]{
            _id,
            name,
            key
          }
        `)

        console.log('Found role:', basicRole)

        if (!basicRole) {
          console.error('Basic role not found in Sanity')
        } else {
          // Create user in Sanity with basic role and name
          const newUser = await client.create({
            _type: 'user',
            name: email,
            email: email,
            firebaseId: userCredential.user.uid,
            roles: [{
              _type: 'reference',
              _ref: basicRole._id
            }]
          })

          console.log('Created user with role:', newUser)
        }
      } catch (sanityError) {
        console.error('Error creating Sanity user:', sanityError)
      }

      // Sign out immediately after registration
      await signOut()
      
      return {
        success: true,
        message: 'Registration successful! Please check your email to verify your account.'
      }
    } catch (error) {
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signOut,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 