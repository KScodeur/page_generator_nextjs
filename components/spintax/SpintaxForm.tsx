'use client';

import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import { SpintaxResult } from './SpintaxResult';
import { generateSpintax } from '@/lib/actions/spintax';

export function SpintaxForm() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      const spintaxText = await generateSpintax(text);
      setResult(spintaxText);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate spintax');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextArea
          label="Enter your text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          placeholder="Enter the text you want to convert to spintax format..."
          helper="Your text will be transformed into spintax format with multiple variations"
          required
        />
        
        <Button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="w-full"
        >
          <Wand2 className="w-5 h-5 mr-2" />
          {isLoading ? 'Generating...' : 'Generate Spintax'}
        </Button>
      </form>
      
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      {result && <SpintaxResult content={result} />}
    </div>
  );
}