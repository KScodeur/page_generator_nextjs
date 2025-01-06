// import { openai } from './client';
import openai from './client';
export async function generateSpintaxWithAI(text: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Vous êtes un générateur de spintax. Convertissez le texte d'entrée au format spintax en identifiant les synonymes et les formulations alternatives. Utilisez le format {option1|option2|option3}"
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    return response.choices[0].message.content || text;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate spintax');
  }
}