import { query } from '@/lib/db/db';
import type { Project } from '@/types';

export async function getProjects(): Promise<Project[]> {
  const result = await query(`
    SELECT * FROM projects 
    ORDER BY created_at DESC
  `);
  
  return result.rows.map(row => ({
    id: row.id,
    name: row.name,
    status: row.status,
    template: row.template,
    keywords: typeof row.keywords === 'string' 
      ? JSON.parse(row.keywords)
      : row.keywords,
    generationMethod: row.generation_method,
    maxPages: row.max_pages,
    startIndex: row.start_index,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at)
  }));
}

export async function getProject(id: string): Promise<Project> {
  const result = await query(
    'SELECT * FROM projects WHERE id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error('Project not found');
  }

  const row = result.rows[0];
  return {
    id: row.id,
    name: row.name,
    status: row.status,
    template: row.template,
    keywords: typeof row.keywords === 'string' 
      ? JSON.parse(row.keywords)
      : row.keywords,
    generationMethod: row.generation_method,
    maxPages: row.max_pages,
    startIndex: row.start_index,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at)
  };
}

export async function createProject(
  data: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'status'>
): Promise<Project> {
  const result = await query(`
    INSERT INTO projects (
      name, template, keywords, generation_method, max_pages, start_index
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `, [
    data.name,
    data.template,
    JSON.stringify(data.keywords),
    data.generationMethod,
    data.maxPages,
    data.startIndex
  ]);

  const row = result.rows[0];
  return {
    id: row.id,
    name: row.name,
    status: row.status,
    template: row.template,
    keywords: typeof row.keywords === 'string' 
      ? JSON.parse(row.keywords)
      : row.keywords,
    generationMethod: row.generation_method,
    maxPages: row.max_pages,
    startIndex: row.start_index,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at)
  };
}

export async function updateProject(
  id: string, 
  data: Partial<Project>
): Promise<Project> {
  const result = await query(`
    UPDATE projects 
    SET 
      name = COALESCE($1, name),
      template = COALESCE($2, template),
      keywords = COALESCE($3, keywords),
      generation_method = COALESCE($4, generation_method),
      max_pages = COALESCE($5, max_pages),
      start_index = COALESCE($6, start_index)
    WHERE id = $7
    RETURNING *
  `, [
    data.name,
    data.template,
    data.keywords ? JSON.stringify(data.keywords) : null,
    data.generationMethod,
    data.maxPages,
    data.startIndex,
    id
  ]);

  if (result.rows.length === 0) {
    throw new Error('Project not found');
  }

  const row = result.rows[0];
  return {
    id: row.id,
    name: row.name,
    status: row.status,
    template: row.template,
    keywords: typeof row.keywords === 'string' 
      ? JSON.parse(row.keywords)
      : row.keywords,
    generationMethod: row.generation_method,
    maxPages: row.max_pages,
    startIndex: row.start_index,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at)
  };
}

export async function deleteProject(id: string): Promise<void> {
  await query('DELETE FROM projects WHERE id = $1', [id]);
}

export async function updateProjectStatus(
  id: string, 
  action: 'start' | 'pause' | 'stop'
): Promise<void> {
  const status = action === 'start' ? 'running'
    : action === 'pause' ? 'paused'
    : 'completed';

  await query(
    'UPDATE projects SET status = $1 WHERE id = $2',
    [status, id]
  );
}