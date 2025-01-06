import { Project } from '@/types';
import { ProjectActions } from './ProjectActions';
import { useState } from 'react';

// interface ProjectCardProps {
//   project: Project;
//   onUpdate: () => void;
//   onDelete: (id: string) => void;
// }

// export function ProjectCard({ project, onUpdate, onDelete }: ProjectCardProps) {
//   const [isLoading, setIsLoading] = useState(false);

//   const getStatusColor = (status: Project['status']) => {
//     switch (status) {
//       case 'running': return 'text-green-600';
//       case 'paused': return 'text-yellow-600';
//       case 'completed': return 'text-blue-600';
//       default: return 'text-gray-600';
//     }
//   };

//   return (
//     <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-opacity ${isLoading ? 'opacity-50' : ''}`}>
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
//           <p className={`text-sm mt-1 ${getStatusColor(project.status)} capitalize`}>
//             {project.status}
//           </p>
//         </div>
//         <ProjectActions 
//           project={project} 
//           onUpdate={onUpdate}
//           onDelete={onDelete}
//           onActionStart={() => setIsLoading(true)}
//           onActionEnd={() => setIsLoading(false)}
//         />
//       </div>
//       <div className="mt-4">
//         <div className="text-sm text-gray-600">
//           <p>Generation Method: <span className="font-medium capitalize">{project.generationMethod}</span></p>
//           <p>Max Pages: <span className="font-medium">{project.maxPages}</span></p>
//           <p>Keywords: <span className="font-medium">{project.keywords.length} groups</span></p>
//         </div>
//       </div>
//     </div>
//   );
// }

interface ProjectCardProps {
  project: Project;
  onUpdate: () => void;
  onDelete: (id: string) => void;
}

export function ProjectCard({ project, onUpdate, onDelete }: ProjectCardProps) {
     const [isLoading, setIsLoading] = useState(false);
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'running': return 'text-green-600';
      case 'paused': return 'text-yellow-600';
      case 'completed': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (

    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-opacity ${isLoading ? 'opacity-50' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
          <p className={`text-sm mt-1 ${getStatusColor(project.status)} capitalize`}>
            {project.status}
          </p>
        </div>
        <ProjectActions project={project} onUpdate={onUpdate} onDelete={onDelete}/>
      </div>
      <div className="mt-4">
        <div className="text-sm text-gray-600">
          <p>Generation Method: <span className="font-medium capitalize">{project.generationMethod}</span></p>
          <p>Max Pages: <span className="font-medium">{project.maxPages}</span></p>
          <p>Keywords: <span className="font-medium">{project.keywords.length} groups</span></p>
        </div>
      </div>
    </div>
  );
}