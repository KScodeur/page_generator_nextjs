'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProject } from '@/lib/api/client';
import { ProjectActions } from '@/components/projects/ProjectActions';
import { FileText, Hash, Calendar } from 'lucide-react';
import type { Project } from '@/types';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProject = async () => {
    try {
      setIsLoading(true);
      const data = await getProject(params.id as string);
      setProject(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    // Mettre project à null va automatiquement afficher le message "Project not found"
    setProject(null);
  };

  useEffect(() => {
    loadProject();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border-2 border-red-100 rounded-xl p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={loadProject}
            className="mt-4 text-sm text-red-600 hover:text-red-700 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-50 border-2 border-gray-100 rounded-xl p-6 text-center">
          <p className="text-gray-600">Project not found</p>
          <button 
            onClick={() => router.push('/projects')}
            className="mt-4 text-sm text-blue-600 hover:text-blue-700 underline"
          >
            Back to projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="mt-1 text-sm text-gray-500 capitalize">{project.status}</p>
        </div>
        <ProjectActions project={project} onUpdate={loadProject} onDelete={handleDelete} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b-2 border-gray-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-500" />
            <h2 className="font-medium">Template</h2>
          </div>
          <div className="p-4">
            <pre className="whitespace-pre-wrap text-sm text-gray-600">
              {project.template}
            </pre>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b-2 border-gray-100 flex items-center gap-2">
              <Hash className="w-4 h-4 text-blue-500" />
              <h2 className="font-medium">Keywords</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {project.keywords.map(group => (
                  <div key={group.id}>
                    <h3 className="text-sm font-medium text-gray-900">{group.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {group.terms.length} terms
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b-2 border-gray-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <h2 className="font-medium">Details</h2>
            </div>
            <div className="p-4">
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-gray-500">Generation Method</dt>
                  <dd className="font-medium text-gray-900 capitalize">
                    {project.generationMethod}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Maximum Pages</dt>
                  <dd className="font-medium text-gray-900">
                    {project.maxPages}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Start Index</dt>
                  <dd className="font-medium text-gray-900">
                    {project.startIndex}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Created</dt>
                  <dd className="font-medium text-gray-900">
                    {project.createdAt.toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}