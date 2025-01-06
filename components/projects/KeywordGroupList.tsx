'use client';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { KeywordGroupInput } from './KeywordGroupInput';
import { CSVImport } from './CSVImport';
import { createKeywordGroup } from '@/lib/actions/keywords';
import type { KeywordGroup } from '@/types';

interface KeywordGroupListProps {
  groups: KeywordGroup[];
  onChange: (groups: KeywordGroup[]) => void;
  error?: string;
}

export function KeywordGroupList({ groups, onChange, error }: KeywordGroupListProps) {
  const addGroup = () => {
    onChange([...groups, createKeywordGroup()]);
  };

  const removeGroup = (id: string) => {
    onChange(groups.filter(group => group.id !== id));
  };

  const updateGroup = (id: string, updates: Partial<KeywordGroup>) => {
    onChange(groups.map(group => 
      group.id === id ? { ...group, ...updates } : group
    ));
  };

  const handleCSVImport = (importedGroups: KeywordGroup[]) => {
    // Merge imported groups with existing ones
    const mergedGroups = [...groups];
    
    importedGroups.forEach(imported => {
      const existingIndex = mergedGroups.findIndex(g => g.name === imported.name);
      if (existingIndex >= 0) {
        // Merge terms for existing groups
        const existing = mergedGroups[existingIndex];
        const mergedTerms = Array.from(new Set([...existing.terms, ...imported.terms]));
        mergedGroups[existingIndex] = { ...existing, terms: mergedTerms };
      } else {
        // Add new group
        mergedGroups.push(imported);
      }
    });

    onChange(mergedGroups);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Keyword Groups
      </label>
      <div className="space-y-4">
        {groups.map(group => (
          <KeywordGroupInput
            key={group.id}
            group={group}
            onUpdate={(updates) => updateGroup(group.id, updates)}
            onRemove={() => removeGroup(group.id)}
          />
        ))}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={addGroup}
            className="flex-1"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Keyword Group
          </Button>
        </div>
        <CSVImport onImport={handleCSVImport} />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

// import { Plus } from 'lucide-react';
// import { Button } from '@/components/ui/Button';
// import { KeywordGroupInput } from './KeywordGroupInput';
// import { createKeywordGroup } from '@/lib/actions/keywords';
// import type { KeywordGroup } from '@/types';

// interface KeywordGroupListProps {
//   groups: KeywordGroup[];
//   onChange: (groups: KeywordGroup[]) => void;
//   error?: string;
// }

// export function KeywordGroupList({ groups, onChange, error }: KeywordGroupListProps) {
//   const addGroup = () => {
//     onChange([...groups, createKeywordGroup()]);
//   };

//   const removeGroup = (id: string) => {
//     onChange(groups.filter(group => group.id !== id));
//   };

//   const updateGroup = (id: string, updates: Partial<KeywordGroup>) => {
//     onChange(groups.map(group => 
//       group.id === id ? { ...group, ...updates } : group
//     ));
//   };

//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-2">
//         Keyword Groups
//       </label>
//       <div className="space-y-4">
//         {groups.map(group => (
//           <KeywordGroupInput
//             key={group.id}
//             group={group}
//             onUpdate={(updates) => updateGroup(group.id, updates)}
//             onRemove={() => removeGroup(group.id)}
//           />
//         ))}
//         <Button
//           type="button"
//           variant="outline"
//           onClick={addGroup}
//           className="w-full"
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Add Keyword Group
//         </Button>
//       </div>
//       {error && (
//         <p className="mt-1 text-sm text-red-600">{error}</p>
//       )}
//     </div>
//   );
// }