import React from 'react'
import { MOLECULES } from '../data/molecules'

const SLOT_W = 110   // px per atom slot
const ARM_H  = 18    // bracket arm height
const LABEL_H = 22   // height reserved for the total label
const TIER_H  = ARM_H + LABEL_H + 6   // total row height per tier

function fmt(n) {
  if (n === 0) return '0'
  return n > 0 ? `+${n}` : String(n)
}

function AtomSlot({ atom, color }) {
  return (
    <div style={{
      width: SLOT_W,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Oxidation state box */}
      <div style={{
        border: `2px solid ${color}`,
        borderRadius: 4,
        padding: '1px 7px',
        color,
        fontWeight: 700,
        fontSize: '0.78rem',
        minWidth: 30,
        textAlign: 'center',
        letterSpacing: '0.03em',
        marginBottom: 5,
      }}>
        {fmt(atom.oxidationState)}
      </div>
      {/* Symbol + subscript */}
      <div style={{
        fontSize: '3rem',
        fontWeight: 700,
        color: '#f1f5f9',
        lineHeight: 1,
        letterSpacing: '-0.01em',
      }}>
        {atom.symbol}
        {atom.subscript != null && (
          <sub style={{ fontSize: '1.9rem', color: '#94a3b8', fontWeight: 600 }}>
            {atom.subscript}
          </sub>
        )}
      </div>
    </div>
  )
}

function TierRow({ brackets, numSlots }) {
  const totalW = numSlots * SLOT_W
  const PAD = 8   // inset from each slot edge so adjacent brackets have a gap

  return (
    <div style={{ position: 'relative', width: totalW, height: TIER_H }}>
      {brackets.map((b, i) => {
        const s   = Math.min(...b.slots)
        const e   = Math.max(...b.slots)
        const left  = s * SLOT_W + PAD
        const right = (e + 1) * SLOT_W - PAD
        const w     = right - left
        const midX  = left + w / 2

        return (
          <React.Fragment key={i}>
            {/* Bracket arm */}
            <div style={{
              position: 'absolute',
              left,
              top: 0,
              width: w,
              height: ARM_H,
              borderLeft:   `2px solid ${b.color}`,
              borderRight:  `2px solid ${b.color}`,
              borderBottom: `2px solid ${b.color}`,
              borderRadius: '0 0 4px 4px',
            }} />
            {/* Total label */}
            <div style={{
              position: 'absolute',
              top: ARM_H + 5,
              left: midX,
              transform: 'translateX(-50%)',
              color: b.color,
              fontWeight: 700,
              fontSize: '0.9rem',
              whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
            }}>
              {fmt(b.total)}
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default function OxidationStates() {
  const mol      = MOLECULES.MgSO4
  const numSlots = mol.atoms.length
  const totalW   = numSlots * SLOT_W

  // Map each atom slot index → its tier-1 bracket color
  const atomColors = mol.atoms.map((_, i) => {
    const b = mol.tiers[0].find(b => b.slots.includes(i))
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
        color: '#64748b',
        fontSize: '0.85rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: '1.5rem',
        fontWeight: 500,
      }}>
        {mol.name}
      </p>

      {/* Atom row */}
      <div style={{ display: 'flex', width: totalW }}>
        {mol.atoms.map((atom, i) => (
          <AtomSlot key={i} atom={atom} color={atomColors[i]} />
        ))}
      </div>

      {/* Spacer between molecule and brackets */}
      <div style={{ height: 20 }} />

      {/* Tier rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {mol.tiers.map((tier, i) => (
          <TierRow key={i} brackets={tier} numSlots={numSlots} />
        ))}
      </div>
    </div>
  )
}
