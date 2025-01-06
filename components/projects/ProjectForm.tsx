'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { KeywordGroupList } from './KeywordGroupList';
import { validateProject } from '@/lib/actions/validation';
import { FileText, Hash, Settings, Wand2 } from 'lucide-react';
import type { KeywordGroup, Project } from '@/types';
import { createProject, updateProject } from '@/lib/api/client';


interface ProjectFormProps {
  project?: Project;
}

const generationMethods = [
  { value: 'all', label: 'All Combinations' },
  { value: 'sequential', label: 'Sequential' },
  { value: 'random', label: 'Random' }
];

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [name, setName] = useState(project?.name ?? '');
  const [template, setTemplate] = useState(project?.template ?? '');
  const [keywords, setKeywords] = useState<KeywordGroup[]>(project?.keywords ?? []);
  const [generationMethod, setGenerationMethod] = useState<Project['generationMethod']>(
    project?.generationMethod ?? 'all'
  );
  const [maxPages, setMaxPages] = useState(project?.maxPages ?? 100);
  const [startIndex, setStartIndex] = useState(project?.startIndex ?? 0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      name,
      template,
      keywords,
      generationMethod,
      maxPages,
      startIndex
    };

    const validationErrors = validateProject(projectData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setIsSubmitting(true);
      setErrors({});

      if (project) {
        await updateProject(project.id, projectData);
      } else {
        await createProject(projectData);
      }

      router.push('/projects');
      router.refresh();
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Failed to save project'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border-2 border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b-2 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            Basic Information
          </h2>
        </div>
        <div className="p-6 space-y-6">
          <Input
            label="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a descriptive name for your project"
            error={errors.name}
            helper="Choose a name that clearly identifies your project's purpose"
            required
          />

          <TextArea
            label="Content Template"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            rows={6}
            placeholder="Write your template using {variables} for dynamic content"
            error={errors.template}
            helper="Use {variable} syntax to mark where keywords will be inserted"
            counter
            maxLength={5000}
            required
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border-2 border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b-2 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Hash className="w-5 h-5 text-blue-500" />
            Keywords
          </h2>
        </div>
        <div className="p-6">
          <KeywordGroupList 
            groups={keywords} 
            onChange={setKeywords}
            error={errors.keywords}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border-2 border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b-2 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-500" />
            Generation Settings
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Generation Method"
              value={generationMethod}
              onChange={(e) => setGenerationMethod(e.target.value as Project['generationMethod'])}
              options={generationMethods}
              helper="Select how your content variations will be generated"
            />

            <Input
              type="number"
              label="Maximum Pages"
              value={maxPages}
              onChange={(e) => setMaxPages(parseInt(e.target.value, 10))}
              min={1}
              max={10000}
              helper="Set the maximum number of pages to generate"
              leftIcon={<Hash className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>

      {errors.submit && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border-2 border-red-100 dark:border-red-900/50 animate-slideIn">
          {errors.submit}
        </div>
      )}

      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.back()}
          className="px-6"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          size="lg"
          disabled={isSubmitting}
          className="px-6 bg-blue-500 hover:bg-blue-600"
        >
          <Wand2 className="w-5 h-5 mr-2" />
          {isSubmitting ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
}