// app/api/generate/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

// DeepSeek API configuration
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export async function POST(request: Request) {
  try {
    // Check authentication
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate API key
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'DeepSeek API key not configured' }, 
        { status: 500 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'No prompt provided' }, 
        { status: 400 }
      );
    }

    // Call DeepSeek API
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful website-builder AI assistant that helps users create and customize their websites.' 
          },
          { 
            role: 'user', 
            content: prompt 
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'DeepSeek API request failed');
    }

    const data = await response.json();
    const aiResult = data.choices?.[0]?.message?.content;
    
    if (!aiResult) {
      return NextResponse.json(
        { error: 'No response generated' }, 
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      result: aiResult,
      model: 'deepseek-chat',
      usage: data.usage
    });

  } catch (error: any) {
    console.error('DeepSeek API Error:', error);
    
    // Handle rate limiting
    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' }, 
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Internal Server Error' }, 
      { status: error.status || 500 }
    );
  }
}
