import React, { useState } from 'react'
import { MOLECULES } from '../data/molecules'

const SLOT_W       = 110
const ARM_H        = 18
const LABEL_H      = 22
const TIER_H       = ARM_H + LABEL_H + 6
const TIER_LABEL_W = 88

function fmt(n) {
  if (n === 0) return '0'
  return n > 0 ? `+${n}` : String(n)
}

// ─── Atom ─────────────────────────────────────────────────────────────────────

function AtomSlot({ atom, slotIndex, defaultColor, hovered }) {
  const isHighlighted = hovered !== null && hovered.bracket.slots.includes(slotIndex)
  const isDimmed      = hovered !== null && !isHighlighted
  const isTier1Hover  = hovered !== null && hovered.tierIndex === 0

  // Ox box only reacts to tier-1 hovers
  // Ox box: only reacts (color + visible) on tier-1 hover
  const oxBoxColor   = (isHighlighted && isTier1Hover) ? hovered.bracket.color : defaultColor
  const oxBoxOpacity = (hovered !== null && !isTier1Hover) ? 0 : 1
  const symbolColor  = isHighlighted ? hovered.bracket.color : '#f1f5f9'
  const subColor     = isHighlighted ? hovered.bracket.color : '#94a3b8'

  return (
    <div style={{
      width: SLOT_W,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      opacity: isDimmed ? 0.18 : 1,
      transition: 'opacity 0.18s ease',
    }}>
      <div style={{
        border: `2px solid ${oxBoxColor}`,
        borderRadius: 4,
        padding: '1px 7px',
        color: oxBoxColor,
        fontWeight: 700,
        fontSize: '0.78rem',
        minWidth: 30,
        textAlign: 'center',
        letterSpacing: '0.03em',
        marginBottom: 5,
        opacity: oxBoxOpacity,
        transition: 'border-color 0.18s ease, color 0.18s ease, opacity 0.18s ease',
      }}>
        {fmt(atom.oxidationState)}
      </div>
      <div style={{
        fontSize: '3rem',
        fontWeight: 700,
        color: symbolColor,
        lineHeight: 1,
        letterSpacing: '-0.01em',
        transition: 'color 0.18s ease',
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

// ─── Bracket tier ─────────────────────────────────────────────────────────────

function TierRow({ tier, tierIndex, numSlots, hovered, childBrackets, onHover }) {
  const totalW = numSlots * SLOT_W
  const PAD    = 8

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: totalW, height: TIER_H, flexShrink: 0 }}>
        {tier.brackets.map((b, i) => {
          const s        = Math.min(...b.slots)
          const e        = Math.max(...b.slots)
          const left     = s * SLOT_W + PAD
          const right    = (e + 1) * SLOT_W - PAD
          const w        = right - left
          const isActive   = hovered !== null && hovered.bracket === b
          const isChild    = childBrackets.has(b)
          // Arm: only the active bracket is fully lit; child + others all dim equally
          const armOpacity = hovered !== null ? (isActive ? 1 : 0.15) : 1
          // Label: active AND child brackets show their number at full opacity
          const lblOpacity = hovered !== null ? ((isActive || isChild) ? 1 : 0.15) : 1

          return (
            <div
              key={i}
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
                color: b.color,
                fontWeight: 700,
                fontSize: '0.9rem',
                marginTop: 5,
                userSelect: 'none',
                letterSpacing: '0.02em',
                opacity: lblOpacity,
                transition: 'opacity 0.18s ease',
              }}>
                {fmt(b.total)}
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
  // hovered = { bracket: {slots,total,color}, tierIndex } | null
  const [hovered, setHovered] = useState(null)

  const mol      = MOLECULES.MgSO4
  const numSlots = mol.atoms.length
  const totalW   = numSlots * SLOT_W

  // Brackets in tier-(N-1) whose slots are fully contained within the hovered bracket.
  // These are the "addends" that built up the hovered total.
  const childBrackets = (() => {
    if (!hovered || hovered.tierIndex === 0) return new Set()
    const prevTier     = mol.tiers[hovered.tierIndex - 1]
    const parentSlots  = new Set(hovered.bracket.slots)
    return new Set(prevTier.brackets.filter(b => b.slots.every(s => parentSlots.has(s))))
  })()

  const atomDefaultColors = mol.atoms.map((_, i) => {
    const b = mol.tiers[0].brackets.find(b => b.slots.includes(i))
    return b ? b.color : '#f1f5f9'
  })

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      padding: '2rem 1rem',
    }}>
      <p style={{
        color: '#475569',
        fontSize: '0.8rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '1.5rem',
        fontWeight: 500,
      }}>
        {mol.name}
      </p>

      {/* Atom row — right-padded to match tier-label column */}
      <div style={{ display: 'flex', width: totalW + TIER_LABEL_W }}>
        <div style={{ display: 'flex', width: totalW }}>
          {mol.atoms.map((atom, i) => (
            <AtomSlot
              key={i}
              atom={atom}
              slotIndex={i}
              defaultColor={atomDefaultColors[i]}
              hovered={hovered}
            />
          ))}
        </div>
        <div style={{ width: TIER_LABEL_W }} />
      </div>

      <div style={{ height: 20 }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {mol.tiers.map((tier, i) => (
          <TierRow
            key={i}
            tier={tier}
            tierIndex={i}
            numSlots={numSlots}
            hovered={hovered}
            childBrackets={childBrackets}
            onHover={setHovered}
          />
        ))}
      </div>
    </div>
  )
}
