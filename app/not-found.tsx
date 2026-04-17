import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Portfolio not found</p>
        <p className="text-gray-500 mb-12 max-w-md">This portfolio doesn't exist or may have been deleted. Check the URL and try again.</p>
        <Link href="/" className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
