import { Project } from '@/types';
import { ProjectCard } from './ProjectCard';
import { useState } from 'react';

// interface ProjectListProps {
//   projects: Project[];
//   onUpdate: () => void;
// }

// export function ProjectList({ projects: initialProjects, onUpdate }: ProjectListProps) {
//   const [projects, setProjects] = useState(initialProjects);

//   const handleDelete = (deletedId: string) => {
//     setProjects(projects.filter(p => p.id !== deletedId));
//   };

//   if (projects.length === 0) {
//     return (
//       <div className="text-center py-12 bg-white rounded-lg shadow">
//         <p className="text-gray-500">No projects yet. Create your first project to get started!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {projects.map((project) => (
//         <ProjectCard 
//           key={project.id} 
//           project={project} 
//           onUpdate={onUpdate}
//           onDelete={handleDelete}
//         />
//       ))}
//     </div>
//   );
// }


interface ProjectListProps {
  projects: Project[];
  onUpdate: () => void;
}

export function ProjectList({ projects: initialProjects, onUpdate }: ProjectListProps) {
  const [projects, setProjects] = useState(initialProjects);

  const handleDelete = (deletedId: string) => {
    setProjects(projects.filter(p => p.id !== deletedId));
  };
  if (projects.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500">No projects yet. Create your first project to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          onUpdate={onUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}