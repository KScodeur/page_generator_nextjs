import type { Project, KeywordGroup } from '@/types';

type Combination = Record<string, string>;

export function generateCombinations(project: Project): Combination[] {
  const { template, keywords, generationMethod, maxPages } = project;
  
  switch (generationMethod) {
    case 'all':
      return generateAllCombinations(template, keywords, maxPages);
    case 'sequential':
      return generateSequentialCombinations(template, keywords, maxPages);
    case 'random':
      return generateRandomCombinations(template, keywords, maxPages);
    default:
      throw new Error(`Unknown generation method: ${generationMethod}`);
  }
}

function generateAllCombinations(
  template: string,
  keywords: KeywordGroup[],
  maxPages: number
): Combination[] {
  const combinations: Combination[] = [];
  const groups = keywords.map(group => ({ name: group.name, terms: group.terms }));
  
  function generate(current: Combination, groupIndex: number) {
    if (groupIndex === groups.length) {
      const content = formatTemplate(template, current);
      combinations.push({ content, ...current });
      return;
    }
    
    const group = groups[groupIndex];
    for (const term of group.terms) {
      if (combinations.length >= maxPages) return;
      generate({ ...current, [group.name]: term }, groupIndex + 1);
    }
  }
  
  generate({}, 0);
  return combinations.slice(0, maxPages);
}

function generateSequentialCombinations(
  template: string,
  keywords: KeywordGroup[],
  maxPages: number
): Combination[] {
  const combinations: Combination[] = [];
  const maxTerms = Math.max(...keywords.map(group => group.terms.length));
  
  for (let i = 0; i < maxTerms && combinations.length < maxPages; i++) {
    const values: Combination = {};
    keywords.forEach(group => {
      values[group.name] = group.terms[i % group.terms.length] || '';
    });
    const content = formatTemplate(template, values);
    combinations.push({ content, ...values });
  }
  
  return combinations;
}

function generateRandomCombinations(
  template: string,
  keywords: KeywordGroup[],
  maxPages: number
): Combination[] {
  const combinations: Combination[] = [];
  
  for (let i = 0; i < maxPages; i++) {
    const values: Combination = {};
    keywords.forEach(group => {
      const randomIndex = Math.floor(Math.random() * group.terms.length);
      values[group.name] = group.terms[randomIndex] || '';
    });
    const content = formatTemplate(template, values);
    combinations.push({ content, ...values });
  }
  
  return combinations;
}

function formatTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{([^}]+)\}/g, (match, key) => values[key] || match);
}