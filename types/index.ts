export interface Project {
  id: string;
  name: string;
  status: 'draft' | 'running' | 'paused' | 'completed' | 'error';
  createdAt: Date;
  updatedAt: Date;
  template: string;
  keywords: KeywordGroup[];
  generationMethod: 'all' | 'sequential' | 'random';
  maxPages: number;
  startIndex: number;
}

export interface KeywordGroup {
  id: string;
  name: string;
  terms: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}