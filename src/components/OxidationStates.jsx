import React, { useState, useEffect } from 'react'
import { MOLECULES } from '../data/molecules'

const SLOT_W       = 110
const ARM_H        = 18
const TIER_H       = 72
const TIER_LABEL_W = 88
const GROUP_SUB_W  = 30   // extra width for closing ")ₙ" outside polyatomic group

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n) {
  if (n === 0) return '0'
  return n > 0 ? `+${n}` : String(n)
}

function parseAnswer(str) {
  if (str == null) return null
  const s = String(str).trim().replace(/[−–]/g, '-')
  if (s === '') return null
  const n = parseInt(s, 10)
  return isNaN(n) ? null : n
}

// Slider range per tier: last tier ±4 (molecule total ≈ 0),
// 4-tier molecules get wide range, otherwise ±8 / ±16 per user spec.
function getSliderRange(tierIndex, numTiers) {
  if (tierIndex === numTiers - 1) return [-4, 4]
  if (numTiers === 4) return [-20, 20]
  if (tierIndex === 0) return [-8, 8]
  return [-12, 12]
}

// Deep-equal slots (order-independent)
function slotsEqual(a, b) {
  if (a.length !== b.length) return false
  const sa = [...a].sort((x, y) => x - y)
  const sb = [...b].sort((x, y) => x - y)
  return sa.every((v, i) => v === sb[i])
}

// ─── SliderBox ────────────────────────────────────────────────────────────────
// Replaces text input — shows the current value and opens the slider on click.

function SliderBox({ value, color, isActive, onClick, submitted, correct, width = 44 }) {
  const empty = value === '' || value == null

  let bg, border, clr
  if (submitted) {
    bg     = correct ? 'rgba(133,196,65,0.12)' : 'rgba(233,23,122,0.12)'
    border = correct ? '#85c441' : '#e9177a'
    clr    = correct ? '#85c441' : '#e9177a'
  } else if (isActive) {
    bg     = `${color}28`
    border = color
    clr    = color
  } else {
    bg     = 'rgba(255,255,255,0.04)'
    border = empty ? `${color}50` : `${color}99`
    clr    = empty ? `${color}60` : color
  }

  return (
    <div
      onClick={submitted ? undefined : onClick}
      style={{
        width,
        height: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: bg,
        border: `2px solid ${border}`,
        borderRadius: 4,
        color: clr,
        fontWeight: 700,
        fontSize: '0.82rem',
        cursor: submitted ? 'default' : 'pointer',
        userSelect: 'none',
        letterSpacing: '0.02em',
        boxShadow: isActive ? `0 0 0 2px ${color}30` : 'none',
        transition: 'background 0.15s, border-color 0.15s, box-shadow 0.15s',
      }}
    >
      {empty ? '?' : value}
    </div>
  )
}

// ─── SliderPanel ──────────────────────────────────────────────────────────────
// Vertical panel, absolutely positioned to the left of the molecule wrapper.

function SliderPanel({ active, currentValue, onChange, onClose }) {
  if (!active) return null
  const { min, max, label, color } = active
  const n = currentValue ?? 0

  const btnStyle = (c = color) => ({
    width: 28,
    height: 28,
    border: `1px solid ${c}55`,
    borderRadius: 6,
    background: 'transparent',
    color: c,
    fontWeight: 700,
    fontSize: '1rem',
    cursor: 'pointer',
    fontFamily: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'background 0.1s',
    padding: 0,
  })

  return (
    <div style={{
      position: 'absolute',
      right: 'calc(100% + 20px)',
      top: 60,
      background: '#1a2535',
      border: `1px solid ${color}44`,
      borderRadius: 12,
      padding: '10px 10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      width: 68,
      zIndex: 100,
      boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
    }}>
      {/* Done / close */}
      <button style={{ ...btnStyle('#475569'), fontSize: '0.8rem' }} onClick={onClose}>✓</button>

      {/* Context label */}
      <span style={{
        color: '#64748b',
        fontSize: '0.58rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        textAlign: 'center',
        lineHeight: 1.2,
      }}>
        {label}
      </span>

      {/* Current value */}
      <span style={{
        color,
        fontWeight: 800,
        fontSize: '1.1rem',
        letterSpacing: '0.02em',
      }}>
        {fmt(n)}
      </span>

      {/* + button */}
      <button style={btnStyle()} onClick={() => onChange(Math.min(max, n + 1))}>+</button>

      {/* Vertical range slider */}
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={n}
        onChange={e => onChange(parseInt(e.target.value))}
        style={{
          writingMode: 'vertical-lr',
          direction: 'rtl',
          WebkitAppearance: 'slider-vertical',
          height: 160,
          accentColor: color,
          cursor: 'pointer',
        }}
      />

      {/* − button */}
      <button style={btnStyle()} onClick={() => onChange(Math.max(min, n - 1))}>−</button>
    </div>
  )
}

// ─── AtomSlot ─────────────────────────────────────────────────────────────────

function AtomSlot({ atom, slotIndex, defaultColor, hovered, oxInputs, activeInput,
                    onOpenSlider, submitted, results }) {
  const isHighlighted = hovered !== null && hovered.bracket.slots.includes(slotIndex)
  const isDimmed      = hovered !== null && !isHighlighted
  const symbolColor   = isHighlighted ? hovered.bracket.color : '#f1f5f9'
  const subColor      = isHighlighted ? hovered.bracket.color : '#94a3b8'

  const isActive = activeInput?.type === 'ox' && activeInput.key === slotIndex
  const raw      = oxInputs[slotIndex] ?? ''

  return (
    <div style={{
      width: SLOT_W,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      opacity: isDimmed ? 0.35 : 1,
      transition: 'opacity 0.18s ease',
    }}>
      {/* Oxidation state slider box */}
      <SliderBox
        value={raw}
        color={defaultColor}
        isActive={isActive}
        onClick={() => onOpenSlider('ox', slotIndex, -8, 8, atom.symbol + ' ox. state', defaultColor)}
        submitted={submitted}
        correct={results?.ox[slotIndex]}
        width={40}
      />
      {/* Wrong-answer hint */}
      {submitted && results?.ox[slotIndex] === false && (
        <div style={{ color: '#64748b', fontSize: '0.6rem', marginTop: 2 }}>
          → {fmt(atom.oxidationState)}
        </div>
      )}
      {/* Symbol */}
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
          <sub style={{ fontSize: '1.9rem', color: subColor, fontWeight: 600, transition: 'color 0.18s ease' }}>
            {atom.subscript}
          </sub>
        )}
        {atom.ionCharge && (
          <sup style={{ fontSize: '1.4rem', color: subColor, fontWeight: 600, transition: 'color 0.18s ease' }}>
            {atom.ionCharge}
          </sup>
        )}
      </div>
    </div>
  )
}

// ─── TierRow ──────────────────────────────────────────────────────────────────

function TierRow({ tier, tierIndex, numTiers, totalW, polyIonGroups, hovered, childBrackets,
                   bracketInputs, activeInput, onOpenSlider, submitted, results, onHover }) {
  const PAD     = 8
  const [sliderMin, sliderMax] = getSliderRange(tierIndex, numTiers)
  const isPolyatomicTier = tier.label === 'Polyatomic Ion'

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Bracket area */}
      <div style={{ position: 'relative', width: totalW, height: TIER_H, flexShrink: 0 }}>
        {tier.brackets.map((b, i) => {
          // In the "Polyatomic Ion" tier, skip brackets whose slots are not in any polyIonGroup
          if (isPolyatomicTier && polyIonGroups) {
            const inGroup = b.slots.some(s => polyIonGroups.some(g => g.slots.includes(s)))
            if (!inGroup) return null
          }

          const key      = `${tierIndex}-${i}`
          const s        = Math.min(...b.slots)
          const e        = Math.max(...b.slots)
          const left     = s * SLOT_W + PAD
          const right    = (e + 1) * SLOT_W - PAD + (b.groupRight ? GROUP_SUB_W : 0)
          const w        = right - left
          const isActive = hovered !== null && hovered.bracket === b
          const isChild  = childBrackets.has(b)
          // Arm: only the hovered bracket is fully lit
          const armOpacity = hovered !== null ? (isActive ? 1 : 0.25) : 1
          // Label: hovered + child brackets stay lit
          const lblOpacity = hovered !== null ? ((isActive || isChild) ? 1 : 0.25) : 1

          const boxKey    = key
          const isBoxActive = activeInput?.type === 'bracket' && activeInput.key === boxKey
          const raw       = bracketInputs[key] ?? ''

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
              }}
              onMouseEnter={() => onHover({ bracket: b, tierIndex })}
              onMouseLeave={() => onHover(null)}
            >
              {/* Bracket arm */}
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
              {/* Total slider box + hint */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 5, opacity: lblOpacity, transition: 'opacity 0.18s ease' }}>
                <SliderBox
                  value={raw}
                  color={b.color}
                  isActive={isBoxActive}
                  onClick={() => onOpenSlider('bracket', key, sliderMin, sliderMax, tier.label, b.color)}
                  submitted={submitted}
                  correct={results?.brackets[key]}
                  width={40}
                />
                {submitted && results?.brackets[key] === false && (
                  <div style={{ color: '#64748b', fontSize: '0.6rem', marginTop: 2 }}>
                    → {fmt(b.total)}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Tier label */}
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
  const [difficulty, setDifficulty] = useState('easy')
  const [current, setCurrent] = useState(() => {
    const pool = Object.entries(MOLECULES).filter(([, m]) => m.difficulty === 'easy')
    const [key, mol] = pool[Math.floor(Math.random() * pool.length)]
    return { key, mol }
  })
  const [oxInputs,      setOxInputs]      = useState({})
  const [bracketInputs, setBracketInputs] = useState({})
  const [submitted,     setSubmitted]     = useState(false)
  const [results,       setResults]       = useState(null)
  const [hovered,       setHovered]       = useState(null)
  const [activeInput,   setActiveInput]   = useState(null)

  // Close slider on Escape
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setActiveInput(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const setOxInput      = (i, v) => setOxInputs(prev => ({ ...prev, [i]: v }))
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
    setActiveInput(null)
  }

  function handleDifficultyChange(diff) {
    setDifficulty(diff)
    pickNext(diff)
  }

  function handleSubmit() {
    setActiveInput(null)
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
    setActiveInput(null)
  }

  // Open the slider panel for a given box.
  // For last-tier brackets with no value yet, default to '0' on first click.
  function handleOpenSlider(type, key, min, max, label, color) {
    setActiveInput({ type, key, min, max, label, color })
    if (type === 'bracket' && !bracketInputs[key]) {
      const [ti] = key.split('-').map(Number)
      if (ti === current.mol.tiers.length - 1) {
        setBracketInputs(prev => ({ ...prev, [key]: '0' }))
      }
    }
  }

  // Slider panel value = parsed current input, defaulting to 0
  const sliderCurrentValue = (() => {
    if (!activeInput) return 0
    const raw = activeInput.type === 'ox'
      ? oxInputs[activeInput.key]
      : bracketInputs[activeInput.key]
    return parseAnswer(raw) ?? 0
  })()

  function handleSliderChange(numVal) {
    const str = fmt(numVal)
    if (activeInput.type === 'ox') {
      setOxInput(activeInput.key, str)
    } else {
      // Auto-fill any other brackets that share the same slots AND same total
      const [ti, bi] = activeInput.key.split('-').map(Number)
      const src = current.mol.tiers[ti].brackets[bi]
      const updates = { [activeInput.key]: str }
      current.mol.tiers.forEach((tier, tIdx) => {
        tier.brackets.forEach((b, bIdx) => {
          if (tIdx === ti && bIdx === bi) return
          if (slotsEqual(b.slots, src.slots) && b.total === src.total) {
            updates[`${tIdx}-${bIdx}`] = str
          }
        })
      })
      setBracketInputs(prev => ({ ...prev, ...updates }))
    }
  }

  // Child bracket highlighting: only when child sums actually equal parent total
  const childBrackets = (() => {
    if (!hovered || hovered.tierIndex === 0) return new Set()
    const prevTier    = current.mol.tiers[hovered.tierIndex - 1]
    const parentSlots = new Set(hovered.bracket.slots)
    const children    = prevTier.brackets.filter(b => b.slots.every(s => parentSlots.has(s)))
    const childSum    = children.reduce((sum, b) => sum + b.total, 0)
    // Only highlight if sums match — suppresses the per-ion tier in 4-tier molecules
    if (childSum !== hovered.bracket.total) return new Set()
    return new Set(children)
  })()

  const mol       = current.mol
  const numSlots  = mol.atoms.length
  const numTiers  = mol.tiers.length
  const numGroups = mol.polyIonGroups?.length ?? 0
  const totalW    = numSlots * SLOT_W + numGroups * GROUP_SUB_W

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
    border: 'none',
    transition: 'opacity 0.15s',
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      padding: '1.5rem 1rem',
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
          <button key={d}
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

      {/* Formula + name */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#f1f5f9',
          letterSpacing: '0.03em',
          lineHeight: 1.2,
          marginBottom: 4,
        }}>
          {mol.formula}
        </div>
        <div style={{
          fontSize: '0.75rem',
          color: '#475569',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}>
          {mol.name}
        </div>
      </div>

      {/* Molecule content — centered; buttons hang off the right via absolute positioning */}
      <div style={{ position: 'relative' }}>

        {/* Atom row + tier rows */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Atom row — with optional polyatomic-group parentheses */}
          <div style={{ display: 'flex', width: totalW + TIER_LABEL_W }}>
            <div style={{ display: 'flex', width: totalW }}>
              {mol.atoms.map((atom, i) => {
                const openGroup  = mol.polyIonGroups?.find(g => g.slots[0] === i)
                const closeGroup = mol.polyIonGroups?.find(g => g.slots[g.slots.length - 1] === i)
                return (
                  <React.Fragment key={i}>
                    {/* Zero-width open-paren overlay before first grouped atom */}
                    {openGroup && (
                      <div style={{ width: 0, overflow: 'visible', position: 'relative', flexShrink: 0 }}>
                        <div style={{
                          position: 'absolute',
                          left: -6,
                          top: 32,
                          fontSize: '3rem',
                          fontWeight: 300,
                          color: '#94a3b8',
                          lineHeight: 1,
                          userSelect: 'none',
                        }}>
                          (
                        </div>
                      </div>
                    )}
                    <AtomSlot
                      atom={atom}
                      slotIndex={i}
                      defaultColor={atomDefaultColors[i]}
                      hovered={hovered}
                      oxInputs={oxInputs}
                      activeInput={activeInput}
                      onOpenSlider={handleOpenSlider}
                      submitted={submitted}
                      results={results}
                    />
                    {/* Closing ")ₙ" after last grouped atom — takes GROUP_SUB_W space */}
                    {closeGroup && (
                      <div style={{
                        width: GROUP_SUB_W,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'flex-end',
                        paddingBottom: 6,
                        fontSize: '3rem',
                        fontWeight: 300,
                        color: '#94a3b8',
                        lineHeight: 1,
                        userSelect: 'none',
                      }}>
                        )<sub style={{ fontSize: '1.5rem', lineHeight: 0 }}>{closeGroup.groupSubscript}</sub>
                      </div>
                    )}
                  </React.Fragment>
                )
              })}
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
                numTiers={numTiers}
                totalW={totalW}
                polyIonGroups={mol.polyIonGroups}
                hovered={hovered}
                childBrackets={childBrackets}
                bracketInputs={bracketInputs}
                activeInput={activeInput}
                onOpenSlider={handleOpenSlider}
                submitted={submitted}
                results={results}
                onHover={setHovered}
              />
            ))}
          </div>

        </div>

        {/* Slider panel: absolute to the left */}
        {!submitted && (
          <SliderPanel
            active={activeInput}
            currentValue={sliderCurrentValue}
            onChange={handleSliderChange}
            onClose={() => setActiveInput(null)}
          />
        )}

        {/* Buttons: absolute to the right, doesn't affect centering */}
        <div style={{ position: 'absolute', left: '100%', top: 60, marginLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={handleSubmit}
            disabled={submitted}
            style={{ ...btnBase, background: '#00addb', color: '#0f172a', opacity: submitted ? 0.4 : 1, cursor: submitted ? 'default' : 'pointer' }}
          >
            Submit
          </button>
          <button
            onClick={() => pickNext(difficulty)}
            style={{ ...btnBase, background: '#85c441', color: '#0f172a' }}
          >
            Next
          </button>
          <button
            onClick={handleReset}
            style={{ ...btnBase, background: '#1e293b', border: '1px solid #334155', color: '#94a3b8' }}
          >
            Reset
          </button>
        </div>

      </div>

    </div>
  )
}
