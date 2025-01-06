import OpenAI from 'openai';

// console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
// console.log('First few characters:', process.env.OPENAI_API_KEY?.slice(0, 3));
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is not set');
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
export default openai;