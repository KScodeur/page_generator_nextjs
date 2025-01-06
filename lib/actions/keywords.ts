
import { KeywordGroup } from '@/types';

export function parseKeywordList(text: string): string[] {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);
}

export function formatKeywordList(terms: string[]): string {
  return terms.join('\n');
}

export function createKeywordGroup(name = ''): KeywordGroup {
  return {
    id: crypto.randomUUID(),
    name,
    terms: []
  };
}