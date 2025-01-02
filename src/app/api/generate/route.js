import { NextResponse } from 'next/server';
import axios from 'axios';

if (!process.env.TOGETHER_API_KEY) {
  throw new Error('TOGETHER_API_KEY is not defined in environment variables');
}

export async function POST(req) {
  try {
    const body = await req.json();
    
    if (!body.prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const { prompt, language = 'javascript' } = body;
    const systemPrompt = `You are an expert ${language} programmer. Generate clean, well-documented code for the following request: ${prompt}`;

    try {
      const response = await axios.post(
        'https://api.together.xyz/v1/chat/completions',
        {
          model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
          messages: [
            {
              role: 'system',
              content: 'You are an expert programmer. Provide only code with comments.'
            },
            {
              role: 'user',
              content: systemPrompt
            }
          ],
          temperature: 0.7,
          top_p: 0.7,
          top_k: 50,
          max_tokens: 1500
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data?.choices?.[0]?.message?.content) {
        throw new Error('No response from Together AI');
      }

      return NextResponse.json({
        code: response.data.choices[0].message.content.trim(),
        status: 'success'
      });

    } catch (apiError) {
      console.error('Together AI Error:', apiError.response?.data || apiError.message);
      
      if (apiError.response?.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key. Please check your Together AI API key configuration.' },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: apiError.response?.data?.error || 'Failed to generate code' },
        { status: apiError.response?.status || 500 }
      );
    }

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'API route is working' });
} 