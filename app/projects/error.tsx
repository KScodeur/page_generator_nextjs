'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-6">
          {error.message || 'Failed to load projects'}
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}