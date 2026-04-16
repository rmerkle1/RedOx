// Tutorial step definitions.
//
// Fields:
//   target         — data-tutorial selector (null = full-dim welcome card)
//   title / body   — tooltip text
//   tab            — forces App tab when step is applied
//   difficulty     — forces OxidationStates difficulty
//   molecule       — forces OxidationStates molecule key
//   reaction       — forces RedoxReactions reaction index
//   highlightSlider— also spotlight the open slider panel (if visible)
//   completedWhen  — fn(tutState) → bool; if present, Next is disabled until true
//
// tutState is accumulated from child-component events:
//   { oxInputs, bracketInputs, expandedId }
// oxInputs keys are atom slot indices (numbers).
// bracketInputs keys are `${tierIdx}-${bracketIdx}` strings.

const p = s => parseInt(s, 10)   // parse "+4" / "-2" / "0"

export const TUTORIAL_STEPS = [

  // ── Welcome ────────────────────────────────────────────────────────────────
  {
    target: null,
    tab: 'oxidation', difficulty: 'easy', molecule: 'CO2',
    title: 'Welcome to RedOx!',
    body: 'This short walkthrough will guide you through the app. Follow along or skip at any time.',
  },

  // ── CO₂ overview ──────────────────────────────────────────────────────────
  {
    target: 'molecule-area',
    title: 'Meet CO₂',
    body: 'Each element has a box above it for its oxidation state. Below the atoms, bracket tiers group elements and show their combined totals.',
  },

  // ── CO₂ number-entry steps (gated + highlight slider) ─────────────────────
  {
    target: 'ox-1',
    title: 'Start with Oxygen',
    body: 'Oxygen is almost always −2. Click the box above O to open the slider, then set it to −2.',
    highlightSlider: true,
    completedWhen: s => p(s.oxInputs?.[1]) === -2,
  },
  {
    target: 'bracket-0-1',
    title: 'O₂ Element bracket',
    body: 'This bracket sums the total for both O atoms: 2 × (−2) = −4. Click it and enter −4.',
    highlightSlider: true,
    completedWhen: s => p(s.bracketInputs?.['0-1']) === -4,
  },
  {
    target: 'bracket-1-0',
    title: 'Molecule bracket',
    body: 'Neutral molecules always sum to 0. Click this bracket and enter 0.',
    highlightSlider: true,
    completedWhen: s => p(s.bracketInputs?.['1-0']) === 0,
  },
  {
    target: 'bracket-0-0',
    title: 'C Element bracket',
    body: 'Since the molecule = 0 and O₂ = −4, Carbon must be +4. Enter +4.',
    highlightSlider: true,
    completedWhen: s => p(s.bracketInputs?.['0-0']) === 4,
  },
  {
    target: 'ox-0',
    title: "Carbon's oxidation state",
    body: "Carbon's individual oxidation state is also +4. Enter +4. Great — CO₂ is done!",
    highlightSlider: true,
    completedWhen: s => p(s.oxInputs?.[0]) === 4,
  },

  // ── Switch to Medium + MgSO₄ ──────────────────────────────────────────────
  {
    target: 'difficulty-medium',
    tab: 'oxidation', difficulty: 'medium', molecule: 'MgSO4',
    title: 'Try Medium — MgSO₄',
    body: 'Medium problems have three tiers. The app has loaded Magnesium Sulfate. Same strategy: start with Oxygen.',
  },
  {
    target: 'molecule-area',
    title: 'Three tiers',
    body: 'Tiers: Element (atom totals inside the ion), Ion (ion charges), Molecule. Work from the inside out.',
  },

  // ── MgSO₄ number-entry steps (gated + highlight slider) ───────────────────
  {
    target: 'ox-2',
    title: "Oxygen's oxidation state",
    body: 'Oxygen is −2 here too. Enter it.',
    highlightSlider: true,
    completedWhen: s => p(s.oxInputs?.[2]) === -2,
  },
  {
    target: 'bracket-0-1',
    title: 'O₄ Element bracket',
    body: '4 oxygens × (−2) = −8. Enter −8.',
    highlightSlider: true,
    completedWhen: s => p(s.bracketInputs?.['0-1']) === -8,
  },
  {
    target: 'bracket-0-0',
    title: 'S Element bracket',
    body: "Sulfur's element total in SO₄ is +6. Enter +6.",
    highlightSlider: true,
    completedWhen: s => p(s.bracketInputs?.['0-0']) === 6,
  },
  {
    target: 'bracket-1-1',
    title: 'SO₄²⁻ Ion bracket',
    body: 'The sulfate ion: S(+6) + O₄(−8) = −2. Enter −2.',
    highlightSlider: true,
    completedWhen: s => p(s.bracketInputs?.['1-1']) === -2,
  },
  {
    target: 'bracket-2-0',
    title: 'Molecule bracket',
    body: 'Molecule total: 0. Enter 0.',
    highlightSlider: true,
    completedWhen: s => p(s.bracketInputs?.['2-0']) === 0,
  },
  {
    target: 'bracket-1-0',
    title: 'Mg²⁺ Ion bracket',
    body: 'To balance SO₄²⁻ (−2), the Mg²⁺ ion must be +2. Enter +2.',
    highlightSlider: true,
    completedWhen: s => p(s.bracketInputs?.['1-0']) === 2,
  },
  {
    target: 'ox-0',
    title: "Magnesium's oxidation state",
    body: "Mg's oxidation state is +2. Enter it.",
    highlightSlider: true,
    completedWhen: s => p(s.oxInputs?.[0]) === 2,
  },

  // ── RedOx Reactions tab ───────────────────────────────────────────────────
  {
    target: 'tab-redox',
    tab: 'redox', reaction: 0,
    title: 'RedOx Reactions tab',
    body: "Now let's look at full redox reactions. The app has switched to the Reactions tab.",
  },
  {
    target: 'reaction-line',
    title: 'The balanced equation',
    body: 'Oxidation state boxes appear above each element. Click any box and use the slider — just like before.',
    highlightSlider: true,
  },
  {
    target: 'species-r1_MgO',
    title: 'Expand a molecule',
    body: 'Click on the MgO formula to expand a full bracket view below — helpful for complex compounds. Values you enter sync back automatically.',
    completedWhen: s => s.expandedId === 'r1_MgO',
  },
  {
    target: 'identify-section',
    title: 'Identify oxidized & reduced',
    body: 'Identify which element was oxidized (ox. state increased) and which was reduced (ox. state decreased). For non-redox reactions, pick "None" for both.',
  },
  {
    target: 'redox-submit',
    title: 'Submit your answers',
    body: "Click Submit to check everything. That's all there is to it — good luck!",
  },

]
