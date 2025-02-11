'use client'

import { useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'

interface PasswordResetFormProps {
  onCancel: () => void;
}

export function PasswordResetForm({ onCancel }: PasswordResetFormProps) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await resetPassword(email)
      setMessage('Password reset email sent. Please check your inbox.')
      setError('')
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
        setMessage('')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      {message && (
        <div className="text-green-500 text-sm">{message}</div>
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
      <div className="flex justify-between">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1a1a1a] hover:bg-[#333333] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a1a1a] transition-colors duration-200"
        >
          Reset Password
        </button>
        <button type="button" onClick={onCancel} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-50">
          Cancel
        </button>
      </div>
    </form>
  )
} 