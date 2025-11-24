import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json().catch(() => ({}));
    const prompt = (data?.prompt ?? '').toString().trim();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const id = (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`);

    return NextResponse.json({ id, status: 'pending' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
