import React, { useState, useEffect } from 'react'
import { REACTIONS } from '../data/reactions'

const SLOT_W       = 110
const ARM_H        = 18
const TIER_H       = 72
const TIER_LABEL_W = 88
const GROUP_SUB_W  = 30
const COMPACT_W    = 50

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

function getSliderRange() {
  return [-10, 10]
}

function slotsEqual(a, b) {
  if (a.length !== b.length) return false
  const sa = [...a].sort((x, y) => x - y)
  const sb = [...b].sort((x, y) => x - y)
  return sa.every((v, i) => v === sb[i])
}

// ─── SliderBox ────────────────────────────────────────────────────────────────

function SliderBox({ value, color, isActive, onClick, submitted, correct, width = 40 }) {
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
        width, height: 28,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: bg, border: `2px solid ${border}`, borderRadius: 4,
        color: clr, fontWeight: 700, fontSize: '0.82rem',
        cursor: submitted ? 'default' : 'pointer',
        userSelect: 'none', letterSpacing: '0.02em',
        boxShadow: isActive ? `0 0 0 2px ${color}30` : 'none',
        transition: 'background 0.15s, border-color 0.15s',
      }}
    >
      {empty ? '?' : value}
    </div>
  )
}

// ─── SliderPanel ─────────────────────────────────────────────────────────────
// fixed=false → position:absolute to the left of the nearest relative ancestor
// fixed=true  → position:fixed fallback when no species is expanded

function SliderPanel({ active, currentValue, onChange, onClose, fixed = false }) {
  if (!active) return null
  const { min, max, label, color } = active
  const n = currentValue ?? 0

  const btnStyle = (c = color) => ({
    width: 28, height: 28,
    border: `1px solid ${c}55`, borderRadius: 6,
    background: 'transparent', color: c, fontWeight: 700, fontSize: '1rem',
    cursor: 'pointer', fontFamily: 'inherit',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, transition: 'background 0.1s', padding: 0,
  })

  const posStyle = fixed
    ? { position: 'fixed', left: 20, top: '50%', transform: 'translateY(-50%)' }
    : { position: 'absolute', right: 'calc(100% + 40px)', top: 60 }

  return (
    <div
      data-tutorial="slider-panel"
      style={{
        ...posStyle,
        background: '#1a2535', border: `1px solid ${color}44`, borderRadius: 12,
        padding: '10px 10px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        width: 68, zIndex: 200,
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
      }}
    >
      <button style={{ ...btnStyle('#475569'), fontSize: '0.8rem' }} onClick={onClose}>✓</button>
      <span style={{
        color: '#64748b', fontSize: '0.58rem', fontWeight: 600,
        letterSpacing: '0.06em', textTransform: 'uppercase',
        textAlign: 'center', lineHeight: 1.2,
      }}>
        {label}
      </span>
      <span style={{ color, fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.02em' }}>
        {fmt(n)}
      </span>
      <button style={btnStyle()} onClick={() => onChange(Math.min(max, n + 1))}>+</button>
      <input
        type="range" min={min} max={max} step={1} value={n}
        onChange={e => onChange(parseInt(e.target.value))}
        style={{
          writingMode: 'vertical-lr', direction: 'rtl',
          WebkitAppearance: 'slider-vertical',
          height: 160, accentColor: color, cursor: 'pointer',
        }}
      />
      <button style={btnStyle()} onClick={() => onChange(Math.max(min, n - 1))}>−</button>
    </div>
  )
}

// ─── CompactAtomSlot ──────────────────────────────────────────────────────────
// Small slot used in the reaction equation line.

function CompactAtomSlot({ atom, slotIndex, speciesId, defaultColor, oxInputs, activeInput, onOpenSlider, submitted, results }) {
  const key      = `${speciesId}::${slotIndex}`
  const raw      = oxInputs[key] ?? ''
  const isActive = activeInput?.type === 'ox' && activeInput.key === key

  return (
    <div style={{ width: COMPACT_W, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <SliderBox
        value={raw} color={defaultColor} isActive={isActive}
        onClick={e => {
          e.stopPropagation()
          onOpenSlider('ox', key, -10, 10, atom.symbol, defaultColor)
        }}
        submitted={submitted} correct={results?.ox[key]} width={32}
      />
      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1 }}>
        {atom.symbol}
        {atom.subscript != null && (
          <sub style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600 }}>{atom.subscript}</sub>
        )}
        {atom.ionCharge && (
          <sup style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600 }}>{atom.ionCharge}</sup>
        )}
      </div>
    </div>
  )
}

// ─── CompactSpecies ───────────────────────────────────────────────────────────
// Clickable species block in the reaction line. Click expands the detail view.

function CompactSpecies({ species, oxInputs, activeInput, onOpenSlider, submitted, results, isExpanded, onToggleExpand }) {
  const defaultColors = species.atoms.map((_, i) => {
    const b = species.tiers[0].brackets.find(b => b.slots.includes(i))
    return b ? b.color : '#94a3b8'
  })

  return (
    <div
      onClick={onToggleExpand}
      data-tutorial={`species-${species.id}`}
      title="Click to expand bracket view"
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        cursor: 'pointer', borderRadius: 8, padding: '6px 8px',
        background: isExpanded ? 'rgba(23,178,158,0.1)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${isExpanded ? '#17b29e55' : '#ffffff0a'}`,
        transition: 'background 0.15s, border-color 0.15s',
      }}
    >
      <div style={{ display: 'flex' }}>
        {species.atoms.map((atom, i) => (
          <CompactAtomSlot
            key={i}
            atom={atom} slotIndex={i} speciesId={species.id}
            defaultColor={defaultColors[i]}
            oxInputs={oxInputs} activeInput={activeInput}
            onOpenSlider={onOpenSlider}
            submitted={submitted} results={results}
          />
        ))}
      </div>
    </div>
  )
}

// ─── ExpandedAtomSlot ─────────────────────────────────────────────────────────
// Large atom slot used in the expanded bracket detail view.

function ExpandedAtomSlot({ atom, slotIndex, speciesId, defaultColor, hovered, oxInputs, activeInput, onOpenSlider, submitted, results }) {
  const key           = `${speciesId}::${slotIndex}`
  const isHighlighted = hovered !== null && hovered.bracket.slots.includes(slotIndex)
  const isDimmed      = hovered !== null && !isHighlighted
  const symbolColor   = isHighlighted ? hovered.bracket.color : '#f1f5f9'
  const subColor      = isHighlighted ? hovered.bracket.color : '#94a3b8'
  const isActive      = activeInput?.type === 'ox' && activeInput.key === key
  const raw           = oxInputs[key] ?? ''

  return (
    <div style={{
      width: SLOT_W, display: 'flex', flexDirection: 'column', alignItems: 'center',
      opacity: isDimmed ? 0.35 : 1, transition: 'opacity 0.18s',
    }}>
      <SliderBox
        value={raw} color={defaultColor} isActive={isActive}
        onClick={() => onOpenSlider('ox', key, -10, 10, atom.symbol + ' ox. state', defaultColor)}
        submitted={submitted} correct={results?.ox[key]} width={40}
      />
      {submitted && results?.ox[key] === false && (
        <div style={{ color: '#64748b', fontSize: '0.6rem', marginTop: 2 }}>→ {fmt(atom.oxidationState)}</div>
      )}
      <div style={{
        fontSize: '3rem', fontWeight: 700, color: symbolColor,
        lineHeight: 1, letterSpacing: '-0.01em', marginTop: 4,
        transition: 'color 0.18s',
      }}>
        {atom.symbol}
        {atom.subscript != null && (
          <sub style={{ fontSize: '1.9rem', color: subColor, fontWeight: 600, transition: 'color 0.18s' }}>
            {atom.subscript}
          </sub>
        )}
        {atom.ionCharge && (
          <sup style={{ fontSize: '1.4rem', color: subColor, fontWeight: 600, transition: 'color 0.18s' }}>
            {atom.ionCharge}
          </sup>
        )}
      </div>
    </div>
  )
}

// ─── ExpandedTierRow ──────────────────────────────────────────────────────────

function ExpandedTierRow({ tier, tierIndex, numTiers, speciesId, totalW, hovered, childBrackets, bracketInputs, activeInput, onOpenSlider, submitted, results, onHover }) {
  const PAD = 8
  const [sliderMin, sliderMax] = getSliderRange()

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: totalW, height: TIER_H, flexShrink: 0 }}>
        {tier.brackets.map((b, i) => {
          const key         = `${speciesId}::${tierIndex}::${i}`
          const s           = Math.min(...b.slots)
          const e           = Math.max(...b.slots)
          const left        = s * SLOT_W + PAD
          const right       = (e + 1) * SLOT_W - PAD + (b.groupRight ? GROUP_SUB_W : 0)
          const w           = right - left
          const isActive    = hovered !== null && hovered.bracket === b
          const isChild     = childBrackets.has(b)
          const armOpacity  = hovered !== null ? (isActive ? 1 : 0.25) : 1
          const lblOpacity  = hovered !== null ? ((isActive || isChild) ? 1 : 0.25) : 1
          const raw         = bracketInputs[key] ?? ''
          const isBoxActive = activeInput?.type === 'bracket' && activeInput.key === key

          return (
            <div
              key={key}
              style={{
                position: 'absolute', left, top: 0, width: w, height: TIER_H,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}
              onMouseEnter={() => onHover({ bracket: b, tierIndex })}
              onMouseLeave={() => onHover(null)}
            >
              <div style={{
                width: '100%', height: ARM_H,
                borderLeft: `2px solid ${b.color}`, borderRight: `2px solid ${b.color}`,
                borderBottom: `2px solid ${b.color}`, borderRadius: '0 0 4px 4px',
                opacity: armOpacity, transition: 'opacity 0.18s',
              }} />
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                marginTop: 5, opacity: lblOpacity, transition: 'opacity 0.18s',
              }}>
                <SliderBox
                  value={raw} color={b.color} isActive={isBoxActive}
                  onClick={() => onOpenSlider('bracket', key, sliderMin, sliderMax, tier.label, b.color)}
                  submitted={submitted} correct={results?.brackets[key]} width={40}
                />
                {submitted && results?.brackets[key] === false && (
                  <div style={{ color: '#64748b', fontSize: '0.6rem', marginTop: 2 }}>→ {fmt(b.total)}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div style={{
        width: TIER_LABEL_W, paddingLeft: 18,
        color: '#334155', fontSize: '0.68rem', fontWeight: 600,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        userSelect: 'none', flexShrink: 0, paddingTop: 2,
      }}>
        {tier.label}
      </div>
    </div>
  )
}

// ─── OxRedPicker ──────────────────────────────────────────────────────────────
// Row of element chips for identifying what is oxidized or reduced.

function OxRedPicker({ label, elements, selected, onSelect, submitted, correct }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        color: '#475569', fontSize: '0.78rem', fontWeight: 600,
        letterSpacing: '0.08em', textTransform: 'uppercase',
        width: 76, textAlign: 'right', flexShrink: 0,
      }}>
        {label}:
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['None', ...elements].map(el => {
          const isSel = selected === el
          let bg, border, clr
          if (submitted) {
            if (isSel && correct)       { bg = 'rgba(133,196,65,0.15)';  border = '#85c441'; clr = '#85c441' }
            else if (isSel && !correct) { bg = 'rgba(233,23,122,0.15)';  border = '#e9177a'; clr = '#e9177a' }
            else                        { bg = 'transparent'; border = '#1e293b'; clr = '#334155' }
          } else {
            bg     = isSel ? 'rgba(23,178,158,0.15)' : 'transparent'
            border = isSel ? '#17b29e' : '#334155'
            clr    = isSel ? '#17b29e' : '#475569'
          }
          return (
            <button
              key={el}
              onClick={submitted ? undefined : () => onSelect(isSel ? null : el)}
              style={{
                padding: '5px 14px', borderRadius: 20,
                border: `1.5px solid ${border}`,
                background: bg, color: clr,
                fontWeight: 600, fontSize: '0.85rem',
                cursor: submitted ? 'default' : 'pointer',
                fontFamily: 'inherit', transition: 'all 0.15s',
              }}
            >
              {el}
            </button>
          )
        })}
      </div>
      {submitted && (
        <div style={{ fontSize: '0.85rem', color: correct ? '#85c441' : '#e9177a' }}>
          {correct ? '✓' : '✗'}
        </div>
      )}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function RedoxReactions({ tutorialControl, onTutorialEvent }) {
  const [currentIdx,    setCurrentIdx]    = useState(0)
  const [oxInputs,      setOxInputs]      = useState({})
  const [bracketInputs, setBracketInputs] = useState({})
  const [expandedId,    setExpandedId]    = useState(null)
  const [oxidizedGuess, setOxidizedGuess] = useState(null)
  const [reducedGuess,  setReducedGuess]  = useState(null)
  const [submitted,     setSubmitted]     = useState(false)
  const [results,       setResults]       = useState(null)
  const [hovered,       setHovered]       = useState(null)
  const [activeInput,   setActiveInput]   = useState(null)

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setActiveInput(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Emit expandedId for tutorial gating
  useEffect(() => {
    onTutorialEvent?.({ type: 'expandedId', value: expandedId })
  }, [expandedId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Tutorial: force a specific reaction index
  useEffect(() => {
    if (tutorialControl?.reaction === undefined || tutorialControl.reaction === null) return
    setCurrentIdx(tutorialControl.reaction)
    setOxInputs({})
    setBracketInputs({})
    setExpandedId(null)
    setOxidizedGuess(null)
    setReducedGuess(null)
    setSubmitted(false)
    setResults(null)
    setHovered(null)
    setActiveInput(null)
  }, [tutorialControl?.reaction])

  const reaction = REACTIONS[currentIdx]

  // Unique element symbols across all species (for OxRedPicker)
  const uniqueElements = [...new Set(reaction.species.flatMap(s => s.atoms.map(a => a.symbol)))]

  // ── Slider handlers ─────────────────────────────────────────────────────────

  function handleOpenSlider(type, key, min, max, label, color) {
    setActiveInput({ type, key, min, max, label, color })
    // Default ox state boxes to '0' on first open
    if (type === 'ox' && !oxInputs[key]) {
      setOxInputs(prev => ({ ...prev, [key]: '0' }))
    }
    // Default last-tier bracket to '0' on first open
    if (type === 'bracket' && !bracketInputs[key]) {
      const parts     = key.split('::')
      const speciesId = parts[0]
      const ti        = parseInt(parts[1])
      const sp        = reaction.species.find(s => s.id === speciesId)
      if (sp && ti === sp.tiers.length - 1) {
        setBracketInputs(prev => ({ ...prev, [key]: '0' }))
      }
    }
  }

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
      setOxInputs(prev => ({ ...prev, [activeInput.key]: str }))
    } else {
      const parts     = activeInput.key.split('::')
      const speciesId = parts[0]
      const ti        = parseInt(parts[1])
      const bi        = parseInt(parts[2])
      const sp        = reaction.species.find(s => s.id === speciesId)
      const src       = sp.tiers[ti].brackets[bi]
      const updates   = { [activeInput.key]: str }
      sp.tiers.forEach((tier, tIdx) => {
        tier.brackets.forEach((b, bIdx) => {
          if (tIdx === ti && bIdx === bi) return
          if (slotsEqual(b.slots, src.slots) && b.total === src.total) {
            updates[`${speciesId}::${tIdx}::${bIdx}`] = str
          }
        })
      })
      setBracketInputs(prev => ({ ...prev, ...updates }))
    }
  }

  // ── Submit / Next / Reset ────────────────────────────────────────────────────

  function handleSubmit() {
    setActiveInput(null)
    const oxR = {}
    reaction.species.forEach(s => {
      s.atoms.forEach((atom, i) => {
        const key = `${s.id}::${i}`
        oxR[key]  = parseAnswer(oxInputs[key]) === atom.oxidationState
      })
    })
    const brR = {}
    reaction.species.forEach(s => {
      s.tiers.forEach((tier, ti) => {
        tier.brackets.forEach((b, bi) => {
          const key = `${s.id}::${ti}::${bi}`
          brR[key]  = parseAnswer(bracketInputs[key]) === b.total
        })
      })
    })
    const oxidizedCorrect = reaction.oxidized === null
      ? oxidizedGuess === 'None'
      : oxidizedGuess === reaction.oxidized
    const reducedCorrect  = reaction.reduced === null
      ? reducedGuess === 'None'
      : reducedGuess === reaction.reduced

    setResults({ ox: oxR, brackets: brR, oxidized: oxidizedCorrect, reduced: reducedCorrect })
    setSubmitted(true)
  }

  function handleNext() {
    let nextIdx = currentIdx
    if (REACTIONS.length > 1) {
      do { nextIdx = Math.floor(Math.random() * REACTIONS.length) } while (nextIdx === currentIdx)
    }
    setCurrentIdx(nextIdx)
    reset()
  }

  function reset() {
    setOxInputs({})
    setBracketInputs({})
    setExpandedId(null)
    setOxidizedGuess(null)
    setReducedGuess(null)
    setSubmitted(false)
    setResults(null)
    setHovered(null)
    setActiveInput(null)
  }

  // ── Child bracket highlighting for the expanded species ──────────────────────

  const expandedSpecies = expandedId ? reaction.species.find(s => s.id === expandedId) : null

  const childBrackets = (() => {
    if (!hovered || !expandedSpecies || hovered.tierIndex === 0) return new Set()
    const prevTier    = expandedSpecies.tiers[hovered.tierIndex - 1]
    const parentSlots = new Set(hovered.bracket.slots)
    const children    = prevTier.brackets.filter(b => b.slots.every(s => parentSlots.has(s)))
    const childSum    = children.reduce((sum, b) => sum + b.total, 0)
    if (childSum !== hovered.bracket.total) return new Set()
    return new Set(children)
  })()

  // ── Reaction line renderer ───────────────────────────────────────────────────

  const renderSide = species => species.map((s, idx) => (
    <React.Fragment key={s.id}>
      {idx > 0 && (
        <div style={{
          padding: '0 8px', color: '#475569', fontSize: '1.5rem',
          fontWeight: 300, alignSelf: 'center', userSelect: 'none',
        }}>
          +
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
        {s.coefficient > 1 && (
          <div style={{
            fontSize: '1.25rem', fontWeight: 600, color: '#94a3b8',
            paddingBottom: 14, paddingRight: 2, userSelect: 'none',
          }}>
            {s.coefficient}
          </div>
        )}
        <CompactSpecies
          species={s}
          oxInputs={oxInputs}
          activeInput={activeInput}
          onOpenSlider={handleOpenSlider}
          submitted={submitted}
          results={results}
          isExpanded={expandedId === s.id}
          onToggleExpand={() => {
            setExpandedId(expandedId === s.id ? null : s.id)
            setHovered(null)
          }}
        />
      </div>
    </React.Fragment>
  ))

  const reactants = reaction.species.filter(s => s.side === 'reactant')
  const products  = reaction.species.filter(s => s.side === 'product')

  // ── Expanded detail renderer ─────────────────────────────────────────────────

  const renderExpanded = () => {
    const sp = expandedSpecies
    if (!sp) return null

    const numSlots  = sp.atoms.length
    const numGroups = sp.polyIonGroups?.length ?? 0
    const totalW    = numSlots * SLOT_W + numGroups * GROUP_SUB_W

    const atomDefaultColors = sp.atoms.map((_, i) => {
      const b = sp.tiers[0].brackets.find(b => b.slots.includes(i))
      return b ? b.color : '#f1f5f9'
    })

    return (
      <div style={{
        marginTop: 28,
        paddingTop: 24,
        borderTop: '1px solid #1e293b',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* Species header */}
        <div style={{
          fontSize: '0.7rem', color: '#334155',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          fontWeight: 600, marginBottom: 16,
        }}>
          {sp.formula} — {sp.name}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Atom row */}
          <div style={{ display: 'flex', width: totalW + TIER_LABEL_W }}>
            <div style={{ display: 'flex', width: totalW }}>
              {sp.atoms.map((atom, i) => {
                const openGroup  = sp.polyIonGroups?.find(g => g.slots[0] === i)
                const closeGroup = sp.polyIonGroups?.find(g => g.slots[g.slots.length - 1] === i)
                return (
                  <React.Fragment key={i}>
                    {openGroup && (
                      <div style={{ width: 0, overflow: 'visible', position: 'relative', flexShrink: 0 }}>
                        <div style={{
                          position: 'absolute', left: -6, top: 32,
                          fontSize: '3rem', fontWeight: 300, color: '#94a3b8',
                          lineHeight: 1, userSelect: 'none',
                        }}>
                          (
                        </div>
                      </div>
                    )}
                    <ExpandedAtomSlot
                      atom={atom} slotIndex={i} speciesId={sp.id}
                      defaultColor={atomDefaultColors[i]}
                      hovered={hovered} oxInputs={oxInputs} activeInput={activeInput}
                      onOpenSlider={handleOpenSlider}
                      submitted={submitted} results={results}
                    />
                    {closeGroup && (
                      <div style={{
                        width: GROUP_SUB_W, flexShrink: 0,
                        display: 'flex', alignItems: 'flex-end', paddingBottom: 6,
                        fontSize: '3rem', fontWeight: 300, color: '#94a3b8',
                        lineHeight: 1, userSelect: 'none',
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
            {sp.tiers.map((tier, i) => (
              <ExpandedTierRow
                key={i}
                tier={tier} tierIndex={i} numTiers={sp.tiers.length}
                speciesId={sp.id} totalW={totalW}
                hovered={hovered} childBrackets={childBrackets}
                bracketInputs={bracketInputs} activeInput={activeInput}
                onOpenSlider={handleOpenSlider}
                submitted={submitted} results={results}
                onHover={setHovered}
              />
            ))}
          </div>

        </div>
      </div>
    )
  }

  // ── Button styles ────────────────────────────────────────────────────────────

  const btnBase = {
    padding: '8px 22px', borderRadius: 6, fontWeight: 600, fontSize: '0.875rem',
    cursor: 'pointer', fontFamily: 'inherit', border: 'none', transition: 'opacity 0.15s',
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      flex: 1, padding: '2rem 1rem', overflowX: 'auto',
    }}>

      {/* Instruction */}
      <div style={{
        fontSize: '0.68rem', color: '#334155',
        letterSpacing: '0.14em', textTransform: 'uppercase',
        fontWeight: 600, marginBottom: 20,
      }}>
        Assign oxidation states · click a molecule to expand
      </div>

      {/* Reaction line */}
      <div data-tutorial="reaction-line" style={{ display: 'flex', alignItems: 'flex-end', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {renderSide(reactants)}
        <div style={{
          padding: '0 12px', color: '#17b29e', fontSize: '1.8rem',
          fontWeight: 300, alignSelf: 'center', userSelect: 'none',
        }}>
          →
        </div>
        {renderSide(products)}
      </div>

      {/* Work area: permanent position:relative so the slider is always anchored here */}
      {/* Combined anchor: slider stays left of the widest content (the identify pickers) */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {!submitted && (
          <SliderPanel
            active={activeInput}
            currentValue={sliderCurrentValue}
            onChange={handleSliderChange}
            onClose={() => setActiveInput(null)}
          />
        )}

        {renderExpanded()}

        {/* OxRed identification */}
        <div data-tutorial="identify-section" style={{
          marginTop: 36,
          paddingTop: 24,
          borderTop: expandedSpecies ? 'none' : '1px solid #1e293b',
          display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start',
        }}>
          <div style={{
            fontSize: '0.68rem', color: '#334155',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            fontWeight: 600, marginBottom: 2,
          }}>
            Identify
          </div>
          <OxRedPicker
            label="Oxidized"
            elements={uniqueElements}
            selected={oxidizedGuess}
            onSelect={setOxidizedGuess}
            submitted={submitted}
            correct={results?.oxidized}
          />
          <OxRedPicker
            label="Reduced"
            elements={uniqueElements}
            selected={reducedGuess}
            onSelect={setReducedGuess}
            submitted={submitted}
            correct={results?.reduced}
          />
        </div>
      </div>

      {/* Submit / Next / Reset */}
      <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
        <button
          data-tutorial="redox-submit"
          onClick={handleSubmit}
          disabled={submitted}
          style={{
            ...btnBase, background: '#00addb', color: '#0f172a',
            opacity: submitted ? 0.4 : 1,
            cursor: submitted ? 'default' : 'pointer',
          }}
        >
          Submit
        </button>
        <button
          onClick={handleNext}
          style={{ ...btnBase, background: '#85c441', color: '#0f172a' }}
        >
          Next
        </button>
        <button
          onClick={reset}
          style={{ ...btnBase, background: '#1e293b', border: '1px solid #334155', color: '#94a3b8' }}
        >
          Reset
        </button>
      </div>


    </div>
  )
}
