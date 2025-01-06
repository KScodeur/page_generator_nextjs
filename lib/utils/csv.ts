import { KeywordGroup } from '@/types';

export function parseCSV(content: string): KeywordGroup[] {
  const lines = content.trim().split('\n');
  if (lines.length < 2) {
    throw new Error('CSV must contain at least headers and one row of data');
  }

  // Parse headers (they become group names)
  const headers = lines[0].split(',').map(h => h.trim());
  
  // Create a map to store terms for each group
  const groupTerms: Record<string, Set<string>> = {};
  headers.forEach(header => {
    groupTerms[header] = new Set();
  });

  // Parse data rows
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    headers.forEach((header, index) => {
      if (values[index]) {
        groupTerms[header].add(values[index]);
      }
    });
  }

  // Convert to KeywordGroup array
  return headers.map(header => ({
    id: crypto.randomUUID(),
    name: header,
    terms: Array.from(groupTerms[header])
  }));
}

export function validateCSV(content: string): string[] {
  const errors: string[] = [];
  const lines = content.trim().split('\n');

  if (lines.length < 2) {
    errors.push('CSV must contain at least headers and one row of data');
    return errors;
  }

  const headers = lines[0].split(',').map(h => h.trim());
  
  // Check for empty headers
  if (headers.some(h => !h)) {
    errors.push('All headers must be non-empty');
  }

  // Check for duplicate headers
  const uniqueHeaders = new Set(headers);
  if (uniqueHeaders.size !== headers.length) {
    errors.push('Headers must be unique');
  }

  // Check for valid header format (no spaces, special chars)
  const headerRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
  headers.forEach(header => {
    if (!headerRegex.test(header)) {
      errors.push(`Invalid header format: ${header}. Use only letters, numbers, and underscores. Must start with a letter.`);
    }
  });

  return errors;
}