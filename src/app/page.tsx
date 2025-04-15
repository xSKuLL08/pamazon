
'use client';
import Link from 'next/link';
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to Pamazon</h1>
        <div className="space-y-4">
          <Link href="/login">
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}