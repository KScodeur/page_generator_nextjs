
import type { Project } from '@/types';
import { generateCombinations } from './generation';

export async function exportToCSV(project: Project): Promise<string> {
  const combinations = generateCombinations(project);
  const headers = ['id', ...Object.keys(combinations[0])];
  
  const rows = combinations.map((combination, index) => {
    const id = project.startIndex + index;
    return [id, ...Object.values(combination)];
  });

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  return csvContent;
}