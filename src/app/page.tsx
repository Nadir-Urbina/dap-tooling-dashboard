'use client';

import { useState, useEffect } from 'react';
import { SignInForm } from '@/components/auth/SignInForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isSignIn, setIsSignIn] = useState(true);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ffd700]">
        <div className="text-black">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#ffd700] to-[#1a1a1a]">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-[#1a1a1a] mb-8">
          DAP Tools Portal
        </h1>
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsSignIn(true)}
            className={`px-4 py-2 ${
              isSignIn 
                ? 'text-[#1a1a1a] border-b-2 border-[#ffd700] font-semibold' 
                : 'text-gray-500 hover:text-[#1a1a1a]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignIn(false)}
            className={`px-4 py-2 ${
              !isSignIn 
                ? 'text-[#1a1a1a] border-b-2 border-[#ffd700] font-semibold' 
                : 'text-gray-500 hover:text-[#1a1a1a]'
            }`}
          >
            Sign Up
          </button>
        </div>
        <div className="bg-white rounded-lg">
          {isSignIn ? (
            <SignInForm />
          ) : (
            <SignUpForm onBackToSignIn={() => setIsSignIn(true)} />
          )}
        </div>
      </div>
      <div className="mt-8 text-white text-sm text-center">
        © 2024 Duval Asphalt. All rights reserved.
      </div>
    </div>
  );
}
