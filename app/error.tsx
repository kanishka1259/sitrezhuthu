'use client';

import Link from 'next/link';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">Oops!</h1>
        <p className="text-2xl text-gray-600 mb-4">Something went wrong</p>
        <p className="text-gray-500 mb-12 max-w-md">{error.message}</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => reset()} className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold">
            Try Again
          </button>
          <Link href="/" className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-bold">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
