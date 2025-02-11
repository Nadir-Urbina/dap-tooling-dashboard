'use client';

import { useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { PasswordResetForm } from './PasswordResetForm';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  if (showResetForm) {
    return <PasswordResetForm onCancel={() => setShowResetForm(false)} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1a1a1a] focus:border-[#1a1a1a]"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1a1a1a] focus:border-[#1a1a1a]"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="flex-1 mr-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1a1a1a] hover:bg-[#333333] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a1a1a] transition-colors duration-200"
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setShowResetForm(true)}
          className="text-sm text-gray-600 hover:text-[#1a1a1a]"
        >
          Forgot Password?
        </button>
      </div>
    </form>
  );
} 