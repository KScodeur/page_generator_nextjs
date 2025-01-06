export async function generateSpintax(text: string): Promise<string> {
  try {
    const response = await fetch('/api/spintax', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate spintax');
    }

    const { result } = await response.json();
    return result;
  } catch (error) {
    console.error('Spintax generation error:', error);
    throw error;
  }
}

export function generateVariation(spintax: string): string {
  return spintax.replace(/\{([^{}]*)\}/g, (match, choices) => {
    const options = choices.split('|');
    return options[Math.floor(Math.random() * options.length)];
  });
}