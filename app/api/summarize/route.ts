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
      messages: [
        {
          role: 'system',
          content:
            'You are a concise text summarizer. ' +
            'Summarize the user\'s text in 2-3 sentences (max 60 words). ' +
            'Capture only the main idea. ' +
            'Do not add commentary, preamble, or formatting like bullet points. ' +
            'Respond with the summary only.',
        },
        { role: 'user', content: text },
      ],
    }),
  })

  const data = await res.json()
  const summary = data.choices?.[0]?.message?.content || 'No summary'
  
  return NextResponse.json({ summary })
}
