'use client';

import { X, GripVertical, Type, List } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import { parseKeywordList, formatKeywordList } from '@/lib/actions/keywords';
import type { KeywordGroup } from '@/types';

interface KeywordGroupInputProps {
  group: KeywordGroup;
  onUpdate: (updates: Partial<KeywordGroup>) => void;
  onRemove: () => void;
}

export function KeywordGroupInput({ group, onUpdate, onRemove }: KeywordGroupInputProps) {
  return (
    <div className="group bg-white border rounded-lg p-4 transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="mt-2 cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-center gap-4">
            <Input
              value={group.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              placeholder="Variable name (e.g., city, business)"
              className="max-w-xs"
              leftIcon={<Type className="w-4 h-4" />}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onRemove}
              className="text-gray-400 hover:text-red-500 hover:border-red-200"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <TextArea
            value={formatKeywordList(group.terms)}
            onChange={(e) => onUpdate({ 
              terms: parseKeywordList(e.target.value)
            })}
            rows={3}
            placeholder="Enter keywords (one per line)"
            leftIcon={<List className="w-4 h-4" />}
            counter
          />
          
          <div className="text-sm text-gray-500">
            {group.terms.length} keywords
          </div>
        </div>
      </div>
    </div>
  );
}