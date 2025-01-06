'use client';

import { useState } from 'react';
import { Play, Pause, StopCircle, Download, Edit, Trash2, Square, Pencil } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import type { Project } from '@/types';
import { updateProjectStatus, deleteProject } from '@/lib/api/client';


interface ProjectActionsProps {
  project: Project;
  onUpdate: () => void;
  onDelete: (id: string) => void;

}

export function ProjectActions({ project, onUpdate, onDelete }: ProjectActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: 'start' | 'pause' | 'stop' | 'delete') => {
    if (action === 'delete' && !confirm('Are you sure you want to delete this project?')) {
      return;
    }

    const actionInProgress = action;
    setIsLoading(true);
    try {
       // setIsLoading(true);
        
        if (action === 'delete') {
          await deleteProject(project.id);
          onDelete(project.id);
        } else {
          const updatedProject = await updateProjectStatus(project.id, action);
          onUpdate();
        }
      } catch (error) {
        console.error(`Failed to ${action} project:`, error);
        alert(error instanceof Error ? error.message : `Failed to ${action} project`);
      } finally {
        setIsLoading(false);
      }
    };

  const handleExport = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`/api/projects/${project.id}/export`);
      if (!response.ok) {
        throw new Error('Failed to export project');
      }

      // Get the filename from the Content-Disposition header if available
      const contentDisposition = response.headers.get('Content-Disposition');
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch?.[1] || `${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`;

      // Create blob from response
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export project:', error);
      alert('Failed to export project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {project.status !== 'completed' && (
        <>
          {project.status !== 'running' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAction('start')}
              disabled={isLoading}
              title="Start Generation"
            >
              <Play className="w-4 h-4" />
            </Button>
          )}
          {project.status === 'running' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAction('pause')}
              disabled={isLoading}
              title="Pause Generation"
            >
              <Pause className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction('stop')}
            disabled={isLoading}
            title="Stop Generation"
          >
            <StopCircle className="w-4 h-4" />
          </Button>
        </>
      )}
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleExport}
        disabled={isLoading || project.status === 'running'}
        title="Export to CSV"
      >
        <Download className="w-4 h-4" />
      </Button>
      
      <Link href={`/projects/${project.id}/edit`}>
        <Button
          variant="outline"
          size="sm"
          disabled={isLoading}
          title="Edit Project"
        >
          <Edit className="w-4 h-4" />
        </Button>
      </Link>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleAction('delete')}
        disabled={isLoading}
        title="Delete Project"
        className="text-red-600 hover:bg-red-50 hover:border-red-200"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
