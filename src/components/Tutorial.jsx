import React, { useState, useEffect, useCallback } from 'react'
import { TUTORIAL_STEPS } from '../data/tutorialSteps'

const TOOLTIP_W = 320
const MARGIN    = 24
const PAD       = 10   // spotlight padding around target

function measureEl(selector) {
  if (!selector) return null
  const el = document.querySelector(`[data-tutorial="${selector}"]`)
  if (!el) return null
  const r = el.getBoundingClientRect()
  return {
    left:   r.left   - PAD,
    top:    r.top    - PAD,
    width:  r.width  + PAD * 2,
    height: r.height + PAD * 2,
  }
}

export default function Tutorial({ onApply, onComplete, tutorialEvent }) {
  const [step,       setStep]       = useState(0)
  const [mainSpot,   setMainSpot]   = useState(null)
  const [sliderSpot, setSliderSpot] = useState(null)
  const [tutState,   setTutState]   = useState({})

  const current = TUTORIAL_STEPS[step]
  const total   = TUTORIAL_STEPS.length

  // Reset tutState on step change and notify parent of step overrides
  useEffect(() => {
    setTutState({})
    onApply(current)
  }, [step]) // eslint-disable-line react-hooks/exhaustive-deps

  // Accumulate tutorial events into tutState
  useEffect(() => {
    if (!tutorialEvent) return
    setTutState(prev => ({ ...prev, [tutorialEvent.type]: tutorialEvent.value }))
  }, [tutorialEvent])

  // Can the user advance to the next step?
  const canAdvance = !current.completedWhen || current.completedWhen(tutState)

  // Measure main spotlight after DOM settles (150 ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMainSpot(measureEl(current.target))
    }, 150)
    return () => clearTimeout(timer)
  }, [step, current.target])

  // Poll for slider panel visibility when the step needs it
  useEffect(() => {
    if (!current.highlightSlider) {
      setSliderSpot(null)
      return
    }
    const check = () => setSliderSpot(measureEl('slider-panel'))
    check()
    const id = setInterval(check, 150)
    return () => clearInterval(id)
  }, [step, current.highlightSlider])

  // Re-measure both spotlights on resize
  const remeasure = useCallback(() => {
    setMainSpot(measureEl(current.target))
    if (current.highlightSlider) setSliderSpot(measureEl('slider-panel'))
  }, [current.target, current.highlightSlider])

  useEffect(() => {
    window.addEventListener('resize', remeasure)
    return () => window.removeEventListener('resize', remeasure)
  }, [remeasure])

  function next() {
    if (!canAdvance) return
    if (step < total - 1) setStep(s => s + 1)
    else finish()
  }

  function finish() {
    localStorage.setItem('redox-tutorial-done', '1')
    onComplete()
  }

  // Spotlights: main + slider (when visible)
  const spots = [mainSpot, sliderSpot].filter(Boolean)

  // Tooltip position: fixed right side when a target exists, centered for welcome
  const tooltipStyle = current.target
    ? { position: 'fixed', right: MARGIN, top: '50%', transform: 'translateY(-50%)', width: TOOLTIP_W, zIndex: 1001 }
    : { position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: TOOLTIP_W, zIndex: 1001 }

  return (
    <>
      {/* ── SVG dim overlay with cutout spotlights ──────────────────────────── */}
      <svg
        style={{
          position: 'fixed', inset: 0,
          width: '100%', height: '100%',
          zIndex: 1000, pointerEvents: 'none',
          overflow: 'visible',
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="tut-mask">
            {/* White = dim layer visible here */}
            <rect width="100%" height="100%" fill="white" />
            {/* Black = cutout (no dim = spotlight) */}
            {spots.map((s, idx) => (
              <rect
                key={idx}
                x={s.left} y={s.top}
                width={s.width} height={s.height}
                rx={8} ry={8}
                fill="black"
              />
            ))}
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.68)" mask="url(#tut-mask)" />
      </svg>

      {/* ── Spotlight border rings ──────────────────────────────────────────── */}
      {spots.map((s, idx) => (
        <div
          key={idx}
          style={{
            position:     'fixed',
            left:         s.left,
            top:          s.top,
            width:        s.width,
            height:       s.height,
            borderRadius: 8,
            border:       '2px solid #17b29e',
            pointerEvents:'none',
            zIndex:       1000,
            transition:   'left 0.2s ease, top 0.2s ease, width 0.2s ease, height 0.2s ease',
          }}
        />
      ))}

      {/* ── Tooltip card ────────────────────────────────────────────────────── */}
      <div style={{
        ...tooltipStyle,
        background:   '#1a2535',
        border:       '1px solid #17b29e55',
        borderRadius: 12,
        padding:      '18px 20px',
        boxShadow:    '0 12px 48px rgba(0,0,0,0.55)',
        fontFamily:   'system-ui, -apple-system, sans-serif',
        color:        '#f1f5f9',
      }}>

        {/* Progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ flex: 1, height: 3, background: '#0f172a', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              height:     '100%',
              width:      `${((step + 1) / total) * 100}%`,
              background: '#17b29e',
              borderRadius: 2,
              transition: 'width 0.3s ease',
            }} />
          </div>
          <span style={{ fontSize: '0.62rem', color: '#475569', fontWeight: 600, letterSpacing: '0.06em', flexShrink: 0 }}>
            {step + 1} / {total}
          </span>
        </div>

        {/* Title */}
        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 8, lineHeight: 1.3 }}>
          {current.title}
        </div>

        {/* Body */}
        <div style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.55, marginBottom: 18 }}>
          {current.body}
        </div>

        {/* Hint when action required */}
        {current.completedWhen && !canAdvance && (
          <div style={{
            fontSize: '0.75rem', color: '#475569',
            marginBottom: 12, fontStyle: 'italic',
          }}>
            Complete the action above to continue.
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button
            onClick={finish}
            style={{
              padding: '6px 14px', borderRadius: 6, border: '1px solid #334155',
              background: 'transparent', color: '#475569', fontSize: '0.8rem',
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Skip
          </button>
          <button
            onClick={next}
            disabled={!canAdvance}
            style={{
              padding: '6px 20px', borderRadius: 6, border: 'none',
              background: canAdvance ? '#17b29e' : '#334155',
              color:      canAdvance ? '#0f172a' : '#475569',
              fontSize: '0.85rem', fontWeight: 700,
              cursor: canAdvance ? 'pointer' : 'not-allowed',
              fontFamily: 'inherit',
              transition: 'background 0.2s, color 0.2s',
              opacity: 1,
            }}
          >
            {step < total - 1 ? 'Next →' : 'Done!'}
          </button>
        </div>
      </div>
    </>
  )
}
