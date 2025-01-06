
import type { Project } from '@/types';

export function validateProject(data: Partial<Project>) {
  const errors: Record<string, string> = {};

  if (!data.name?.trim()) {
    errors.name = 'Project name is required';
  }

  if (!data.template?.trim()) {
    errors.template = 'Template content is required';
  }

  if (!data.keywords?.length) {
    errors.keywords = 'At least one keyword group is required';
  } else {
    const invalidGroups = data.keywords.filter(
      group => !group.name.trim() || !group.terms.length
    );
    if (invalidGroups.length > 0) {
      errors.keywords = 'All keyword groups must have a name and at least one term';
    }
  }

  return errors;
}