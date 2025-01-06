import { NextResponse } from 'next/server';
import { generateSpintaxWithAI } from '@/lib/openai/spintax';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    
    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const spintax = await generateSpintaxWithAI(text);
    return NextResponse.json({ result: spintax });
  } catch (error) {
    console.error('Spintax generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate spintax' },
      { status: 500 }
    );
  }
}