import './globals.css'

export const metadata = {
  title: 'Summa - Text Summarizer',
  description: 'Simple text summarization app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header style={headerStyle}>
          <h1 style={titleStyle}>Summa</h1>
        </header>
        {children}
      </body>
    </html>
  )
}

const headerStyle: React.CSSProperties = {
  padding: '1.25rem 2rem',
  borderBottom: '1px solid #eee',
  background: '#fff',
}

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1.25rem',
  fontWeight: 600,
  letterSpacing: '-0.02em',
}
