import { NextResponse } from 'next/server';
import { query } from '@/lib/db/db';
import { generateCombinations } from '@/lib/actions/generation';
import type { Project } from '@/types';

export async function POST(
    request: Request,
    { params }: { params: { id: string; action: string } }
) {
    try {
        const { id, action } = params;

        // Get current project
        const result = await query(
            'SELECT * FROM projects WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        const row = result.rows[0];
        const project: Project = {
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

        switch (action) {
            case 'start':
                if (project.status === 'running') {
                    return NextResponse.json(
                        { error: 'Project is already running' },
                        { status: 400 }
                    );
                }

                // Generate combinations
                const combinations = generateCombinations(project);

                // Update status to completed since we generate everything at once
                await query(
                    'UPDATE projects SET status = $1 WHERE id = $2',
                    ['completed', id]
                );
                break;

            case 'pause':
                if (project.status !== 'running') {
                    return NextResponse.json(
                        { error: 'Project is not running' },
                        { status: 400 }
                    );
                }
                await query(
                    'UPDATE projects SET status = $1 WHERE id = $2',
                    ['paused', id]
                );
                break;

            case 'stop':
                if (project.status !== 'running' && project.status !== 'paused') {
                    return NextResponse.json(
                        { error: 'Project is not running or paused' },
                        { status: 400 }
                    );
                }
                await query(
                    'UPDATE projects SET status = $1 WHERE id = $2',
                    ['completed', id]
                );
                break;

            default:
                return NextResponse.json(
                    { error: 'Invalid action' },
                    { status: 400 }
                );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update project:', error);
        return NextResponse.json(
            { error: 'Failed to update project' },
            { status: 500 }
        );
    }
}