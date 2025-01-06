import { NextResponse } from 'next/server';
import { query } from '@/lib/db/db';
import { generateCombinations } from '@/lib/actions/generation';
import type { Project } from '@/types';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // Get project data
        const result = await query(
            'SELECT * FROM projects WHERE id = $1',
            [params.id]
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

        // Generate combinations
        const combinations = generateCombinations(project);

        // Prepare CSV headers
        const variableNames = project.keywords.map(group => group.name);
        const headers = ['id', 'content', ...variableNames];

        // Prepare CSV rows
        const rows = combinations.map((combination, index) => {
            const id = project.startIndex + index;
            const values = variableNames.map(name => combination[name] || '');
            return [
                id.toString(),
                combination.content,
                ...values
            ].map(value => `"${value.replace(/"/g, '""')}"`); // Escape quotes and wrap in quotes
        });

        // Create CSV content
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        // Generate filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${timestamp}.csv`;

        // Return CSV file
        return new NextResponse(csvContent, {
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Cache-Control': 'no-cache'
            }
        });
    } catch (error) {
        console.error('Failed to export project:', error);
        return NextResponse.json(
            { error: 'Failed to export project' },
            { status: 500 }
        );
    }
}