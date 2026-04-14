import React, { useState } from 'react'
import OxidationStates from './components/OxidationStates'

const TABS = [
  { id: 'oxidation', label: 'Oxidation States' },
  { id: 'redox',     label: 'RedOx Reactions'  },
]

export default function App() {
  const [tab, setTab] = useState('oxidation')

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#0f172a',
      color: '#f1f5f9',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2.5rem',
        padding: '0 2rem',
        borderBottom: '1px solid #1e293b',
        height: 56,
        flexShrink: 0,
      }}>
        <span style={{
          fontSize: '1.25rem',
          fontWeight: 800,
          letterSpacing: '0.08em',
          color: '#17b29e',
        }}>
          RedOx
        </span>

        <nav style={{ display: 'flex', height: '100%' }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${tab === t.id ? '#17b29e' : 'transparent'}`,
                color: tab === t.id ? '#f1f5f9' : '#475569',
                padding: '0 1.25rem',
                height: '100%',
                fontSize: '0.9rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color 0.15s, border-color 0.15s',
                letterSpacing: '0.01em',
              }}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {tab === 'oxidation'
          ? <OxidationStates />
          : (
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#334155',
              fontSize: '1rem',
              letterSpacing: '0.05em',
            }}>
              RedOx Reactions — coming soon
            </div>
          )
        }
      </main>
    </div>
  )
}
