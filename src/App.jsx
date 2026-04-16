import React, { useState, useEffect } from 'react'
import OxidationStates from './components/OxidationStates'
import RedoxReactions from './components/RedoxReactions'
import Tutorial from './components/Tutorial'

const TABS = [
  { id: 'oxidation', label: 'Oxidation States' },
  { id: 'redox',     label: 'RedOx Reactions'  },
]

export default function App() {
  const [tab, setTab] = useState('oxidation')

  // Tutorial active unless user has already seen it
  const [tutorialActive,  setTutorialActive]  = useState(() => !localStorage.getItem('redox-tutorial-done'))
  const [tutorialControl, setTutorialControl] = useState(null)
  const [tutorialEvent,   setTutorialEvent]   = useState(null)

  // When the tutorial forces a tab, apply it
  useEffect(() => {
    if (tutorialControl?.tab) setTab(tutorialControl.tab)
  }, [tutorialControl])

  return (
    <div style={{
      minHeight:     '100vh',
      display:       'flex',
      flexDirection: 'column',
      background:    '#0f172a',
      color:         '#f1f5f9',
      fontFamily:    'system-ui, -apple-system, sans-serif',
    }}>
      {/* Header */}
      <header style={{
        display:     'flex',
        alignItems:  'center',
        gap:         '2.5rem',
        padding:     '0 2rem',
        borderBottom:'1px solid #1e293b',
        height:      56,
        flexShrink:  0,
      }}>
        <span style={{
          fontSize:      '1.25rem',
          fontWeight:    800,
          letterSpacing: '0.08em',
          color:         '#17b29e',
        }}>
          RedOx
        </span>

        <nav style={{ display: 'flex', height: '100%' }}>
          {TABS.map(t => (
            <button
              key={t.id}
              data-tutorial={`tab-${t.id}`}
              onClick={() => setTab(t.id)}
              style={{
                background:   'none',
                border:       'none',
                borderBottom: `2px solid ${tab === t.id ? '#17b29e' : 'transparent'}`,
                color:        tab === t.id ? '#f1f5f9' : '#475569',
                padding:      '0 1.25rem',
                height:       '100%',
                fontSize:     '0.9rem',
                fontWeight:   500,
                cursor:       'pointer',
                transition:   'color 0.15s, border-color 0.15s',
                letterSpacing:'0.01em',
              }}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div style={{ marginLeft: 'auto' }}>
          <button
            onClick={() => {
              localStorage.removeItem('redox-tutorial-done')
              setTutorialActive(true)
            }}
            style={{
              background:    'transparent',
              border:        '1px solid #334155',
              borderRadius:  6,
              color:         '#475569',
              fontSize:      '0.8rem',
              fontWeight:    500,
              padding:       '5px 14px',
              cursor:        'pointer',
              fontFamily:    'inherit',
              transition:    'color 0.15s, border-color 0.15s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f1f5f9'; e.currentTarget.style.borderColor = '#475569' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = '#334155' }}
          >
            Tutorial
          </button>
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {tab === 'oxidation'
          ? <OxidationStates tutorialControl={tutorialControl} onTutorialEvent={setTutorialEvent} />
          : <RedoxReactions  tutorialControl={tutorialControl} onTutorialEvent={setTutorialEvent} />
        }
      </main>

      {/* Tutorial overlay */}
      {tutorialActive && (
        <Tutorial
          onApply={setTutorialControl}
          onComplete={() => {
            setTutorialActive(false)
            setTutorialControl(null)
          }}
          tutorialEvent={tutorialEvent}
        />
      )}
    </div>
  )
}
