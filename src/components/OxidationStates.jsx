import React, { useState } from 'react'
import { MOLECULES } from '../data/molecules'

const SLOT_W       = 110   // px per atom slot
const ARM_H        = 18    // bracket arm height
const LABEL_H      = 22    // height reserved for the total label
const TIER_H       = ARM_H + LABEL_H + 6
const TIER_LABEL_W = 88    // width of the "Element / Ion / Molecule" column

function fmt(n) {
  if (n === 0) return '0'
  return n > 0 ? `+${n}` : String(n)
}

// ─── Atom ────────────────────────────────────────────────────────────────────

function AtomSlot({ atom, slotIndex, defaultColor, hoveredBracket }) {
  const isHighlighted = hoveredBracket !== null && hoveredBracket.slots.includes(slotIndex)
  const isDimmed      = hoveredBracket !== null && !isHighlighted

  const activeColor  = isHighlighted ? hoveredBracket.color : defaultColor
  const symbolColor  = isHighlighted ? hoveredBracket.color : '#f1f5f9'
  const subColor     = isHighlighted ? hoveredBracket.color : '#94a3b8'

  return (
    <div style={{
      width: SLOT_W,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      opacity: isDimmed ? 0.18 : 1,
      transition: 'opacity 0.18s ease',
    }}>
      {/* Oxidation state box */}
      <div style={{
        border: `2px solid ${activeColor}`,
        borderRadius: 4,
        padding: '1px 7px',
        color: activeColor,
        fontWeight: 700,
        fontSize: '0.78rem',
        minWidth: 30,
        textAlign: 'center',
        letterSpacing: '0.03em',
        marginBottom: 5,
        transition: 'border-color 0.18s ease, color 0.18s ease',
      }}>
        {fmt(atom.oxidationState)}
      </div>
      {/* Symbol + subscript */}
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

function TierRow({ tier, numSlots, hoveredBracket, onHover }) {
  const totalW = numSlots * SLOT_W
  const PAD    = 8

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* ── Bracket area ── */}
      <div style={{ position: 'relative', width: totalW, height: TIER_H, flexShrink: 0 }}>
        {tier.brackets.map((b, i) => {
          const s       = Math.min(...b.slots)
          const e       = Math.max(...b.slots)
          const left    = s * SLOT_W + PAD
          const right   = (e + 1) * SLOT_W - PAD
          const w       = right - left
          const isActive = hoveredBracket === b
          const opacity  = hoveredBracket !== null ? (isActive ? 1 : 0.15) : 1

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
                opacity,
                transition: 'opacity 0.18s ease',
              }}
              onMouseEnter={() => onHover(b)}
              onMouseLeave={() => onHover(null)}
            >
              {/* Arm */}
              <div style={{
                width: '100%',
                height: ARM_H,
                borderLeft:   `2px solid ${b.color}`,
                borderRight:  `2px solid ${b.color}`,
                borderBottom: `2px solid ${b.color}`,
                borderRadius: '0 0 4px 4px',
              }} />
              {/* Total */}
              <div style={{
                color: b.color,
                fontWeight: 700,
                fontSize: '0.9rem',
                marginTop: 5,
                userSelect: 'none',
                letterSpacing: '0.02em',
              }}>
                {fmt(b.total)}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Tier label ── */}
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
        paddingTop: 2,   // nudge to sit near the bracket arm
      }}>
        {tier.label}
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function OxidationStates() {
  const [hoveredBracket, setHoveredBracket] = useState(null)

  const mol      = MOLECULES.MgSO4
  const numSlots = mol.atoms.length
  const totalW   = numSlots * SLOT_W

  // Each atom's resting color = its tier-1 bracket color
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
      {/* Molecule name */}
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

      {/* Atom row — right-padded to match the tier label column width so
          the bracket area and atom slots stay horizontally aligned */}
      <div style={{ display: 'flex', width: totalW + TIER_LABEL_W }}>
        <div style={{ display: 'flex', width: totalW }}>
          {mol.atoms.map((atom, i) => (
            <AtomSlot
              key={i}
              atom={atom}
              slotIndex={i}
              defaultColor={atomDefaultColors[i]}
              hoveredBracket={hoveredBracket}
            />
          ))}
        </div>
        {/* Spacer that matches the tier-label column */}
        <div style={{ width: TIER_LABEL_W }} />
      </div>

      <div style={{ height: 20 }} />

      {/* Tier rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {mol.tiers.map((tier, i) => (
          <TierRow
            key={i}
            tier={tier}
            numSlots={numSlots}
            hoveredBracket={hoveredBracket}
            onHover={setHoveredBracket}
          />
        ))}
      </div>
    </div>
  )
}
