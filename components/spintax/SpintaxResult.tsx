'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { generateVariation } from '@/lib/actions/spintax';

interface SpintaxResultProps {
  content: string;
}

export function SpintaxResult({ content }: SpintaxResultProps) {
  const [copied, setCopied] = useState(false);
  const [previewText, setPreviewText] = useState(() => generateVariation(content));

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegeneratePreview = () => {
    setPreviewText(generateVariation(content));
  };

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-medium text-gray-700">Spintax Result</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="text-gray-500 hover:text-gray-700"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        <pre className="whitespace-pre-wrap text-sm text-gray-600 font-mono">
          {content}
        </pre>
      </div>

      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700">Preview</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRegeneratePreview}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
        </div>
        <p className="text-gray-600">{previewText}</p>
      </div>
    </div>
  );
}
// import { useState } from 'react';
// import { Copy, Check } from 'lucide-react';
// import { Button } from '@/components/ui/Button';
// import { generateVariation } from '@/lib/actions/spintax';

// interface SpintaxResultProps {
//   content: string;
// }

// export function SpintaxResult({ content }: SpintaxResultProps) {
//   const [copied, setCopied] = useState(false);
//   const [previewText, setPreviewText] = useState(() => generateVariation(content));

//   const handleCopy = async () => {
//     await navigator.clipboard.writeText(content);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleRegeneratePreview = () => {
//     setPreviewText(generateVariation(content));
//   };

//   return (
//     <div className="space-y-4">
//       <div className="border rounded-lg p-4 bg-gray-50">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="text-sm font-medium text-gray-700">Spintax Result</h3>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={handleCopy}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
//           </Button>
//         </div>
//         <pre className="whitespace-pre-wrap text-sm text-gray-600 font-mono">
//           {content}
//         </pre>
//       </div>

//       <div className="border rounded-lg p-4">
//         <div className="flex justify-between items-center mb-2">
//           <h3 className="text-sm font-medium text-gray-700">Preview</h3>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={handleRegeneratePreview}
//           >
//             Regenerate
//           </Button>
//         </div>
//         <p className="text-gray-600">{previewText}</p>
//       </div>
//     </div>
//   );
// }