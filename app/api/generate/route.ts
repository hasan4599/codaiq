// app/api/generate/route.ts

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// 1) Logge, ob der Key überhaupt da ist
console.log('🛠️  OPENAI_API_KEY loaded:', Boolean(process.env.OPENAI_API_KEY));

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error('Missing OPENAI_API_KEY. Bitte in .env.local definieren.');
}

const openai = new OpenAI({ apiKey });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('🛠️  /api/generate got body:', body);

    const { prompt } = body;
    if (!prompt) {
      return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a helpful website-builder AI.' },
        { role: 'user',   content: prompt }
      ]
    });

    console.log('🛠️  OpenAI response:', response);
    const aiResult = response.choices[0].message?.content ?? '';
    return NextResponse.json({ result: aiResult });
  } catch (err: any) {
    console.error('🔥 /api/generate error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
