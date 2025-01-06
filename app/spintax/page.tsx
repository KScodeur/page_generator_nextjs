import { SpintaxForm } from '@/components/spintax/SpintaxForm';

export default function SpintaxPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Spintax Generator</h1>
      <SpintaxForm />
    </div>
  );
}