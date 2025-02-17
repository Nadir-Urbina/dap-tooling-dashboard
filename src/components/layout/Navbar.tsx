'use client';

import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');  // Redirect to home page after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img 
            src="/duval-logo.png" 
            alt="Duval Asphalt" 
            className="h-8"
          />
          <h1 className="text-2xl font-bold">DAP Tools</h1>
        </div>
        {user && (
          <button
            onClick={handleSignOut}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md 
                     hover:bg-yellow-500 transition-colors duration-200 font-bold"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
} 