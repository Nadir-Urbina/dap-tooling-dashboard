'use client'

export function RegistrationSuccess({ 
  email,
  onBackToSignIn 
}: { 
  email: string
  onBackToSignIn: () => void 
}) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <div className="text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Check your email
        </h2>
        <p className="text-gray-600 mb-6">
          We&apos;ve sent a verification email to:
          <br />
          <span className="font-medium text-gray-900">{email}</span>
        </p>
        <p className="text-gray-600 mb-8">
          Please click the verification link in the email to activate your account.
          Once verified, you can sign in to access your tools.
        </p>
        <button
          onClick={onBackToSignIn}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1a1a1a] hover:bg-[#333333] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a1a1a] transition-colors duration-200"
        >
          Back to Sign In
        </button>
      </div>
    </div>
  )
} 