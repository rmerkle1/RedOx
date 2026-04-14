import React, { useState } from 'react'
import { MOLECULES } from '../data/molecules'

const SLOT_W       = 110
const ARM_H        = 18
const TIER_H       = 72
const TIER_LABEL_W = 88

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n) {
  if (n === 0) return '0'
  return n > 0 ? `+${n}` : String(n)
}

function parseAnswer(str) {
  if (str == null) return null
  const s = String(str).trim().replace(/−/g, '-')
  if (s === '') return null
  const n = parseInt(s, 10)
  return isNaN(n) ? null : n
}

// ─── SmallInput ───────────────────────────────────────────────────────────────

function SmallInput({ value, onChange, color, submitted, correct, width = 40 }) {
  let bg, borderColor, textColor
  if (!submitted) {
    bg          = `rgba(255,255,255,0.05)`
    borderColor = color
    textColor   = color
  } else if (correct) {
    bg          = 'rgba(133,196,65,0.12)'
    borderColor = '#85c441'
    textColor   = '#85c441'
  } else {
    bg          = 'rgba(233,23,122,0.12)'
    borderColor = '#e9177a'
    textColor   = '#e9177a'
  }

  return (
    <input
      type="text"
      value={value}
      onChange={submitted ? undefined : e => onChange(e.target.value)}
      readOnly={submitted}
      placeholder="?"
      style={{
        width,
        background: bg,
        border: `2px solid ${borderColor}`,
        color: textColor,
        textAlign: 'center',
        fontWeight: 700,
        fontSize: '0.8rem',
        borderRadius: 4,
        padding: '2px 0',
        outline: 'none',
        fontFamily: 'inherit',
        transition: 'background 0.15s, border-color 0.15s, color 0.15s',
        boxSizing: 'border-box',
      }}
    />
  )
}

// ─── AtomSlot ─────────────────────────────────────────────────────────────────

function AtomSlot({ atom, slotIndex, defaultColor, hovered, oxInputs, setOxInput, submitted, results }) {
  const isHighlighted = hovered !== null && hovered.bracket.slots.includes(slotIndex)
  const isDimmed      = hovered !== null && !isHighlighted
  const symbolColor   = isHighlighted ? hovered.bracket.color : '#f1f5f9'
  const subColor      = isHighlighted ? hovered.bracket.color : '#94a3b8'

  return (
    <div style={{
      width: SLOT_W,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      opacity: isDimmed ? 0.35 : 1,
      transition: 'opacity 0.18s ease',
    }}>
      <SmallInput
        value={oxInputs[slotIndex] || ''}
        onChange={v => setOxInput(slotIndex, v)}
        color={defaultColor}
        submitted={submitted}
        correct={results?.ox[slotIndex]}
        width={40}
      />
      {submitted && results?.ox[slotIndex] === false && (
        <div style={{
          color: '#64748b',
          fontSize: '0.62rem',
          textAlign: 'center',
          marginTop: 2,
        }}>
          {`→ ${fmt(atom.oxidationState)}`}
        </div>
      )}
      <div style={{
        fontSize: '3rem',
        fontWeight: 700,
        color: symbolColor,
        lineHeight: 1,
        letterSpacing: '-0.01em',
        transition: 'color 0.18s ease',
        marginTop: 4,
      }}>
        {atom.symbol}
        {atom.subscript != null && (
          <sub style={{
            fontSize: '1.9rem',
            color: subColor,
            fontWeight: 600,
            transition: 'color 0.18s ease',
          }}>
            {atom.subscript}
          </sub>
        )}
      </div>
    </div>
  )
}

// ─── TierRow ──────────────────────────────────────────────────────────────────

function TierRow({ tier, tierIndex, numSlots, hovered, bracketInputs, setBracketInput, submitted, results, onHover }) {
  const totalW = numSlots * SLOT_W
  const PAD    = 8

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: totalW, height: TIER_H, flexShrink: 0 }}>
        {tier.brackets.map((b, i) => {
          const key      = `${tierIndex}-${i}`
          const s        = Math.min(...b.slots)
          const e        = Math.max(...b.slots)
          const left     = s * SLOT_W + PAD
          const right    = (e + 1) * SLOT_W - PAD
          const w        = right - left
          const isActive   = hovered !== null && hovered.bracket === b
          const armOpacity = hovered !== null ? (isActive ? 1 : 0.3) : 1

          return (
            <div
              key={key}
              style={{
                position: 'absolute',
                left,
                top: 0,
                width: w,
                height: TIER_H,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'default',
              }}
              onMouseEnter={() => onHover({ bracket: b, tierIndex })}
              onMouseLeave={() => onHover(null)}
            >
              <div style={{
                width: '100%',
                height: ARM_H,
                borderLeft:   `2px solid ${b.color}`,
                borderRight:  `2px solid ${b.color}`,
                borderBottom: `2px solid ${b.color}`,
                borderRadius: '0 0 4px 4px',
                opacity: armOpacity,
                transition: 'opacity 0.18s ease',
              }} />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 5,
              }}>
                <SmallInput
                  value={bracketInputs[key] || ''}
                  onChange={v => setBracketInput(key, v)}
                  color={b.color}
                  submitted={submitted}
                  correct={results?.brackets[key]}
                  width={40}
                />
                {submitted && results?.brackets[key] === false && (
                  <div style={{
                    color: '#64748b',
                    fontSize: '0.62rem',
                    marginTop: 2,
                  }}>
                    {`→ ${fmt(b.total)}`}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div style={{
        width: TIER_LABEL_W,
        paddingLeft: 18,
        color: '#334155',
        fontSize: '0.68rem',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        userSelect: 'none',
        flexShrink: 0,
        paddingTop: 2,
      }}>
        {tier.label}
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function OxidationStates() {
  const [difficulty, setDifficulty] = useState('medium')
  const [current, setCurrent] = useState(() => {
    const pool = Object.entries(MOLECULES).filter(([, m]) => m.difficulty === 'medium')
    const [key, mol] = pool[Math.floor(Math.random() * pool.length)]
    return { key, mol }
  })
  const [oxInputs, setOxInputs] = useState({})
  const [bracketInputs, setBracketInputs] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState(null)
  const [hovered, setHovered] = useState(null)

  const setOxInput     = (i, v) => setOxInputs(prev => ({ ...prev, [i]: v }))
  const setBracketInput = (k, v) => setBracketInputs(prev => ({ ...prev, [k]: v }))

  function pickNext(diff) {
    const pool    = Object.entries(MOLECULES).filter(([, m]) => m.difficulty === diff)
    const choices = pool.length > 1 ? pool.filter(([k]) => k !== current?.key) : pool
    const [key, mol] = choices[Math.floor(Math.random() * choices.length)]
    setCurrent({ key, mol })
    setOxInputs({})
    setBracketInputs({})
    setSubmitted(false)
    setResults(null)
    setHovered(null)
  }

  function handleDifficultyChange(diff) {
    setDifficulty(diff)
    pickNext(diff)
  }

  function handleSubmit() {
    const { mol } = current
    const oxR = {}
    mol.atoms.forEach((atom, i) => {
      oxR[i] = parseAnswer(oxInputs[i]) === atom.oxidationState
    })
    const brR = {}
    mol.tiers.forEach((tier, ti) => {
      tier.brackets.forEach((b, bi) => {
        brR[`${ti}-${bi}`] = parseAnswer(bracketInputs[`${ti}-${bi}`]) === b.total
      })
    })
    setResults({ ox: oxR, brackets: brR })
    setSubmitted(true)
  }

  function handleReset() {
    setOxInputs({})
    setBracketInputs({})
    setSubmitted(false)
    setResults(null)
    setHovered(null)
  }

  const childBrackets = (() => {
    if (!hovered || hovered.tierIndex === 0) return new Set()
    const prevTier    = current.mol.tiers[hovered.tierIndex - 1]
    const parentSlots = new Set(hovered.bracket.slots)
    return new Set(prevTier.brackets.filter(b => b.slots.every(s => parentSlots.has(s))))
  })()

  const mol            = current.mol
  const numSlots       = mol.atoms.length
  const totalW         = numSlots * SLOT_W
  const atomDefaultColors = mol.atoms.map((_, i) => {
    const b = mol.tiers[0].brackets.find(b => b.slots.includes(i))
    return b ? b.color : '#f1f5f9'
  })

  const diffColors = { easy: '#85c441', medium: '#fdb714', hard: '#e9177a' }

  const btnBase = {
    padding: '8px 22px',
    borderRadius: 6,
    fontWeight: 600,
    fontSize: '0.875rem',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.15s',
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      padding: '1.5rem 1rem',
      gap: 0,
    }}>

      {/* Difficulty selector */}
      <div style={{
        display: 'flex',
        background: '#1e293b',
        borderRadius: 8,
        padding: 4,
        marginBottom: 20,
      }}>
        {['easy', 'medium', 'hard'].map(d => (
          <button
            key={d}
            onClick={() => handleDifficultyChange(d)}
            style={{
              border: 'none',
              borderRadius: 6,
              padding: '6px 20px',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              fontFamily: 'inherit',
              textTransform: 'capitalize',
              transition: 'all 0.15s',
              background: difficulty === d ? diffColors[d] : 'transparent',
              color: difficulty === d ? '#0f172a' : '#475569',
            }}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Molecule name */}
      <p style={{
        color: '#475569',
        fontSize: '0.8rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: 16,
        fontWeight: 500,
      }}>
        {mol.name}
      </p>

      {/* Atom row */}
      <div style={{ display: 'flex', width: totalW + TIER_LABEL_W }}>
        <div style={{ display: 'flex', width: totalW }}>
          {mol.atoms.map((atom, i) => (
            <AtomSlot
              key={i}
              atom={atom}
              slotIndex={i}
              defaultColor={atomDefaultColors[i]}
              hovered={hovered}
              oxInputs={oxInputs}
              setOxInput={setOxInput}
              submitted={submitted}
              results={results}
            />
          ))}
        </div>
        <div style={{ width: TIER_LABEL_W }} />
      </div>

      <div style={{ height: 20 }} />

      {/* Tier rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {mol.tiers.map((tier, i) => (
          <TierRow
            key={i}
            tier={tier}
            tierIndex={i}
            numSlots={numSlots}
            hovered={hovered}
            bracketInputs={bracketInputs}
            setBracketInput={setBracketInput}
            submitted={submitted}
            results={results}
            onHover={setHovered}
          />
        ))}
      </div>

      {/* Button bar */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28 }}>
        <button
          onClick={handleReset}
          style={{
            ...btnBase,
            background: '#1e293b',
            border: '1px solid #334155',
            color: '#94a3b8',
          }}
        >
          Reset
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitted}
          style={{
            ...btnBase,
            background: '#00addb',
            border: 'none',
            color: '#0f172a',
            opacity: submitted ? 0.4 : 1,
            cursor: submitted ? 'default' : 'pointer',
          }}
        >
          Submit
        </button>
        <button
          onClick={() => pickNext(difficulty)}
          style={{
            ...btnBase,
            background: '#85c441',
            border: 'none',
            color: '#0f172a',
          }}
        >
          Next
        </button>
      </div>

    </div>
  )
}
