'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PinPage() {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/pin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    })
    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setError(true)
      setPin('')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Georgia, serif',
    }}>
      <div style={{ textAlign: 'center', color: '#c9a96e' }}>
        <div style={{ fontSize: '2rem', marginBottom: '2rem', letterSpacing: '0.3em' }}>ARISTOCRAT</div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={pin}
            onChange={e => { setPin(e.target.value); setError(false) }}
            placeholder="PIN"
            maxLength={10}
            style={{
              background: 'transparent',
              border: '1px solid #c9a96e',
              color: '#c9a96e',
              padding: '0.75rem 1.5rem',
              fontSize: '1.2rem',
              letterSpacing: '0.5em',
              textAlign: 'center',
              outline: 'none',
              width: '200px',
              display: 'block',
              margin: '0 auto 1rem',
            }}
            autoFocus
          />
          {error && <div style={{ color: '#ff6b6b', marginBottom: '1rem', fontSize: '0.85rem' }}>PIN incorect</div>}
          <button type="submit" style={{
            background: '#c9a96e',
            color: '#0a0a0a',
            border: 'none',
            padding: '0.75rem 2rem',
            fontSize: '0.9rem',
            letterSpacing: '0.2em',
            cursor: 'pointer',
          }}>INTRĂ</button>
        </form>
      </div>
    </div>
  )
}
