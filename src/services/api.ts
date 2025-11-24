export interface CreateGenerationResponse {
  id: string;
  status: 'pending';
}

export async function createGeneration(prompt: string): Promise<CreateGenerationResponse> {
  const res = await fetch('/api/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) {
    const message = await res.text().catch(() => 'Failed to create generation');
    throw new Error(message);
  }
  return res.json();
}
