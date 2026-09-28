import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { text } = await req.json()
  
  if (!text) {
    return NextResponse.json({ error: 'No text provided' }, { status: 400 })
  }

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Summarize this:\n\n${text}` }],
    }),
  })

  const data = await res.json()
  const summary = data.choices?.[0]?.message?.content || 'No summary'
  
  return NextResponse.json({ summary })
}
