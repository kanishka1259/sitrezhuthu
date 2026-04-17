import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { text, type = 'description' } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const prompts: Record<string, string> = {
      description: `Improve this project description to make it more impressive for a portfolio. Make it concise, highlight the impact, and use action verbs. Keep it under 150 words:\n\n${text}`,
      bio: `Improve this professional bio to make it more compelling and concise. Keep it under 100 words:\n\n${text}`,
      title: `Suggest a better title for this project that is more professional and descriptive:\n\n${text}`,
    };

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: prompts[type] || prompts.description,
        },
      ],
    });

    const suggestion = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error('Error with Claude API:', error);
    return NextResponse.json({ error: 'Failed to generate suggestion' }, { status: 500 });
  }
}
