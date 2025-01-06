import { FileSpreadsheet } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <FileSpreadsheet className="w-16 h-16 text-blue-600 mx-auto" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
            Page Generator
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Generate dynamic content pages efficiently
          </p>
          <div className="mt-8">
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}