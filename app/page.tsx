'use client'

import { useState } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return

    setLoading(true)
    setSummary('')
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const data = await res.json()
      setSummary(data.summary || 'No summary returned')
    } catch {
      setSummary('Error: Failed to summarize')
    }
    setLoading(false)
  }

  return (
    <main style={mainStyle}>
      <section style={columnStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <label style={labelStyle}>Input</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here..."
            rows={14}
            style={textareaStyle}
          />
          <button type="submit" disabled={loading} style={buttonStyle(loading)}>
            {loading ? 'Summarizing…' : 'Summarize'}
          </button>
        </form>
      </section>

      <section style={columnStyle}>
        <label style={labelStyle}>Summary</label>
        <div style={outputStyle(loading)}>
          {loading ? (
            <span style={{ color: '#999' }}>Thinking…</span>
          ) : summary ? (
            <p style={summaryTextStyle}>{summary}</p>
          ) : (
            <span style={{ color: '#bbb' }}>Your summary will appear here</span>
          )}
        </div>
      </section>
    </main>
  )
}

const mainStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1.5rem',
  maxWidth: '960px',
  margin: '0 auto',
  padding: '2rem 1.5rem',
}

const columnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  height: '100%',
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '#666',
}

const textareaStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.875rem 1rem',
  fontSize: '1rem',
  fontFamily: 'inherit',
  border: '1px solid #e5e5e5',
  borderRadius: '8px',
  background: '#fff',
  resize: 'vertical',
  outline: 'none',
  boxSizing: 'border-box',
  flex: 1,
}

const buttonStyle = (loading: boolean): React.CSSProperties => ({
  padding: '0.75rem 1rem',
  fontSize: '0.9375rem',
  fontWeight: 500,
  fontFamily: 'inherit',
  color: '#fff',
  background: loading ? '#999' : '#111',
  border: 'none',
  borderRadius: '8px',
  cursor: loading ? 'not-allowed' : 'pointer',
})

const outputStyle = (loading: boolean): React.CSSProperties => ({
  flex: 1,
  padding: '0.875rem 1rem',
  background: '#fff',
  border: '1px solid #e5e5e5',
  borderRadius: '8px',
  minHeight: '200px',
  display: 'flex',
  alignItems: loading ? 'center' : 'flex-start',
})

const summaryTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1rem',
  lineHeight: 1.6,
  color: '#111',
}
