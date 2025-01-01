import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const response = await axios.post(
      'https://api.together.ai/v1/chat/completions',  // Updated to chat endpoint
      {
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [
          {
            role: "system",
            content: "You are a helpful programming assistant. Provide clear, concise code examples."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const generatedCode = response.data.choices[0].message.content;
    return NextResponse.json({ code: generatedCode });

  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to generate code' },
      { status: 500 }
    );
  }
}

// Keep the GET test endpoint
export async function GET() {
  return Response.json({ message: 'API route is working' });
} 