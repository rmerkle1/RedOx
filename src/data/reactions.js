const C = {
  teal:   '#17b29e',
  purple: '#748ac5',
  yellow: '#fdb714',
}

// ─── REACTIONS ────────────────────────────────────────────────────────────────
// Each species has:
//   id          — unique within this reaction
//   coefficient — stoichiometric coefficient
//   side        — 'reactant' | 'product'
//   name        — human-readable name (for expanded header)
//   formula     — display formula
//   atoms       — [{symbol, subscript, oxidationState, ionCharge?}]
//   polyIonGroups? — same as molecules.js
//   tiers       — bracket tiers for expanded view

export const REACTIONS = [

  // ── Reaction 1: 2Mg + O₂ → 2MgO  (redox) ────────────────────────────────
  {
    id: 'r1',
    isRedox: true,
    oxidized: 'Mg',   // Mg: 0 → +2
    reduced:  'O',    // O:  0 → −2
    species: [
      {
        id: 'r1_Mg', coefficient: 2, side: 'reactant',
        name: 'Magnesium (solid)', formula: 'Mg',
        atoms: [ { symbol: 'Mg', subscript: null, oxidationState: 0 } ],
        tiers: [
          { label: 'Molecule', brackets: [ { slots: [0], total: 0, color: C.yellow } ] },
        ],
      },
      {
        id: 'r1_O2', coefficient: 1, side: 'reactant',
        name: 'Oxygen Gas', formula: 'O₂',
        atoms: [ { symbol: 'O', subscript: 2, oxidationState: 0 } ],
        tiers: [
          { label: 'Molecule', brackets: [ { slots: [0], total: 0, color: C.yellow } ] },
        ],
      },
      {
        id: 'r1_MgO', coefficient: 2, side: 'product',
        name: 'Magnesium Oxide', formula: 'MgO',
        atoms: [
          { symbol: 'Mg', subscript: null, oxidationState: +2 },
          { symbol: 'O',  subscript: null, oxidationState: -2 },
        ],
        tiers: [
          { label: 'Ion',      brackets: [
            { slots: [0], total: +2, color: C.teal   },
            { slots: [1], total: -2, color: C.purple },
          ] },
          { label: 'Molecule', brackets: [
            { slots: [0, 1], total: 0, color: C.yellow },
          ] },
        ],
      },
    ],
  },

  // ── Reaction 2: Zn + 2HCl → ZnCl₂ + H₂  (redox) ─────────────────────────
  {
    id: 'r2',
    isRedox: true,
    oxidized: 'Zn',   // Zn: 0 → +2
    reduced:  'H',    // H:  +1 → 0
    species: [
      {
        id: 'r2_Zn', coefficient: 1, side: 'reactant',
        name: 'Zinc (solid)', formula: 'Zn',
        atoms: [ { symbol: 'Zn', subscript: null, oxidationState: 0 } ],
        tiers: [
          { label: 'Molecule', brackets: [ { slots: [0], total: 0, color: C.yellow } ] },
        ],
      },
      {
        id: 'r2_HCl', coefficient: 2, side: 'reactant',
        name: 'Hydrochloric Acid', formula: 'HCl',
        atoms: [
          { symbol: 'H',  subscript: null, oxidationState: +1 },
          { symbol: 'Cl', subscript: null, oxidationState: -1 },
        ],
        tiers: [
          { label: 'Ion',      brackets: [
            { slots: [0], total: +1, color: C.teal   },
            { slots: [1], total: -1, color: C.purple },
          ] },
          { label: 'Molecule', brackets: [
            { slots: [0, 1], total: 0, color: C.yellow },
          ] },
        ],
      },
      {
        id: 'r2_ZnCl2', coefficient: 1, side: 'product',
        name: 'Zinc Chloride', formula: 'ZnCl₂',
        atoms: [
          { symbol: 'Zn', subscript: null, oxidationState: +2 },
          { symbol: 'Cl', subscript: 2,    oxidationState: -1 },
        ],
        tiers: [
          { label: 'Ion',      brackets: [
            { slots: [0], total: +2, color: C.teal   },
            { slots: [1], total: -2, color: C.purple },
          ] },
          { label: 'Molecule', brackets: [
            { slots: [0, 1], total: 0, color: C.yellow },
          ] },
        ],
      },
      {
        id: 'r2_H2', coefficient: 1, side: 'product',
        name: 'Hydrogen Gas', formula: 'H₂',
        atoms: [ { symbol: 'H', subscript: 2, oxidationState: 0 } ],
        tiers: [
          { label: 'Molecule', brackets: [ { slots: [0], total: 0, color: C.yellow } ] },
        ],
      },
    ],
  },

  // ── Reaction 3: 2Fe + 3Cl₂ → 2FeCl₃  (redox) ────────────────────────────
  {
    id: 'r3',
    isRedox: true,
    oxidized: 'Fe',   // Fe: 0 → +3
    reduced:  'Cl',   // Cl: 0 → −1
    species: [
      {
        id: 'r3_Fe', coefficient: 2, side: 'reactant',
        name: 'Iron (solid)', formula: 'Fe',
        atoms: [ { symbol: 'Fe', subscript: null, oxidationState: 0 } ],
        tiers: [
          { label: 'Molecule', brackets: [ { slots: [0], total: 0, color: C.yellow } ] },
        ],
      },
      {
        id: 'r3_Cl2', coefficient: 3, side: 'reactant',
        name: 'Chlorine Gas', formula: 'Cl₂',
        atoms: [ { symbol: 'Cl', subscript: 2, oxidationState: 0 } ],
        tiers: [
          { label: 'Molecule', brackets: [ { slots: [0], total: 0, color: C.yellow } ] },
        ],
      },
      {
        id: 'r3_FeCl3', coefficient: 2, side: 'product',
        name: 'Iron(III) Chloride', formula: 'FeCl₃',
        atoms: [
          { symbol: 'Fe', subscript: null, oxidationState: +3 },
          { symbol: 'Cl', subscript: 3,    oxidationState: -1 },
        ],
        tiers: [
          { label: 'Ion',      brackets: [
            { slots: [0], total: +3, color: C.teal   },
            { slots: [1], total: -3, color: C.purple },
          ] },
          { label: 'Molecule', brackets: [
            { slots: [0, 1], total: 0, color: C.yellow },
          ] },
        ],
      },
    ],
  },

  // ── Reaction 4: NaOH + HCl → NaCl + H₂O  (NOT redox) ───────────────────
  {
    id: 'r4',
    isRedox: false,
    oxidized: null,
    reduced:  null,
    species: [
      {
        id: 'r4_NaOH', coefficient: 1, side: 'reactant',
        name: 'Sodium Hydroxide', formula: 'NaOH',
        atoms: [
          { symbol: 'Na', subscript: null, oxidationState: +1 },
          { symbol: 'O',  subscript: null, oxidationState: -2 },
          { symbol: 'H',  subscript: null, oxidationState: +1 },
        ],
        tiers: [
          { label: 'Element',  brackets: [
            // No Na bracket — monoatomic ion
            { slots: [1], total: -2, color: C.purple },
            { slots: [2], total: +1, color: C.purple },
          ] },
          { label: 'Ion',      brackets: [
            { slots: [0],    total: +1, color: C.teal   },
            { slots: [1, 2], total: -1, color: C.purple },
          ] },
          { label: 'Molecule', brackets: [
            { slots: [0, 1, 2], total: 0, color: C.yellow },
          ] },
        ],
      },
      {
        id: 'r4_HCl', coefficient: 1, side: 'reactant',
        name: 'Hydrochloric Acid', formula: 'HCl',
        atoms: [
          { symbol: 'H',  subscript: null, oxidationState: +1 },
          { symbol: 'Cl', subscript: null, oxidationState: -1 },
        ],
        tiers: [
          { label: 'Ion',      brackets: [
            { slots: [0], total: +1, color: C.teal   },
            { slots: [1], total: -1, color: C.purple },
          ] },
          { label: 'Molecule', brackets: [
            { slots: [0, 1], total: 0, color: C.yellow },
          ] },
        ],
      },
      {
        id: 'r4_NaCl', coefficient: 1, side: 'product',
        name: 'Sodium Chloride', formula: 'NaCl',
        atoms: [
          { symbol: 'Na', subscript: null, oxidationState: +1 },
          { symbol: 'Cl', subscript: null, oxidationState: -1 },
        ],
        tiers: [
          { label: 'Ion',      brackets: [
            { slots: [0], total: +1, color: C.teal   },
            { slots: [1], total: -1, color: C.purple },
          ] },
          { label: 'Molecule', brackets: [
            { slots: [0, 1], total: 0, color: C.yellow },
          ] },
        ],
      },
      {
        id: 'r4_H2O', coefficient: 1, side: 'product',
        name: 'Water', formula: 'H₂O',
        atoms: [
          { symbol: 'H', subscript: 2,    oxidationState: +1 },
          { symbol: 'O', subscript: null, oxidationState: -2 },
        ],
        tiers: [
          { label: 'Element',  brackets: [
            { slots: [0], total: +2, color: C.teal   },
            { slots: [1], total: -2, color: C.purple },
          ] },
          { label: 'Molecule', brackets: [
            { slots: [0, 1], total: 0, color: C.yellow },
          ] },
        ],
      },
    ],
  },

    // ── Reaction 5: 6K + Au₂O₃ → 3K₂O + 2Au  (redox) ─────────────────────────
  {
    id: 'r2',
    isRedox: true,
    oxidized: 'K',   // K: 0 → +1
    reduced:  'Au',    // Au:  +3 → 0
    species: [
      {
        id: 'r2_K', coefficient: 1, side: 'reactant',
        name: 'Potassium (solid)', formula: 'K',
        atoms: [ { symbol: 'K', subscript: null, oxidationState: 0 } ],
        tiers: [
          { label: 'Molecule', brackets: [ { slots: [0], total: 0, color: C.yellow } ] },
        ],
      },
      {
        id: 'r2_Au2O3', coefficient: 2, side: 'reactant',
        name: 'Gold (III) Oxide', formula: 'Au₂O₃',
        atoms: [
          { symbol: 'Au',  subscript: 2, oxidationState: +3 },
          { symbol: 'O', subscript: 3, oxidationState: -2 },
        ],
        tiers: [
          { label: 'Ion',      brackets: [
            { slots: [0], total: +6, color: C.teal   },
            { slots: [1], total: -6, color: C.purple },
          ] },
          { label: 'Molecule', brackets: [
            { slots: [0, 1], total: 0, color: C.yellow },
          ] },
        ],
      },
      {
        id: 'r2_K2O', coefficient: 1, side: 'product',
        name: 'Potassium Oxide', formula: 'K₂O',
        atoms: [
          { symbol: 'K', subscript: 2, oxidationState: +1 },
          { symbol: 'O', subscript: null,    oxidationState: -2 },
        ],
        tiers: [
          { label: 'Ion',      brackets: [
            { slots: [0], total: +2, color: C.teal   },
            { slots: [1], total: -2, color: C.purple },
          ] },
          { label: 'Molecule', brackets: [
            { slots: [0, 1], total: 0, color: C.yellow },
          ] },
        ],
      },
      {
        id: 'r2_Au', coefficient: 1, side: 'product',
        name: 'Gold (solid)', formula: 'Au',
        atoms: [ { symbol: 'Au', subscript: null, oxidationState: 0 } ],
        tiers: [
          { label: 'Molecule', brackets: [ { slots: [0], total: 0, color: C.yellow } ] },
        ],
      },
    ],
  },

  // ── Reaction 6: BaCl₂ + H₂SO₄ → BaSO₄ + 2HCl  (NOT redox) ─────────────
  {
    id: 'r5',
    isRedox: false,
    oxidized: null,
    reduced:  null,
    species: [
      {
        id: 'r5_BaCl2', coefficient: 1, side: 'reactant',
        name: 'Barium Chloride', formula: 'BaCl₂',
        atoms: [
          { symbol: 'Ba', subscript: null, oxidationState: +2 },
          { symbol: 'Cl', subscript: 2,    oxidationState: -1 },
        ],
        tiers: [
          { label: 'Ion',      brackets: [
            { slots: [0], total: +2, color: C.teal   },
            { slots: [1], total: -2, color: C.purple },
          ] },
          { label: 'Molecule', brackets: [
            { slots: [0, 1], total: 0, color: C.yellow },
          ] },
        ],
      },
      {
        id: 'r5_H2SO4', coefficient: 1, side: 'reactant',
        name: 'Sulfuric Acid', formula: 'H₂SO₄',
        atoms: [
          { symbol: 'H', subscript: 2,    oxidationState: +1 },
          { symbol: 'S', subscript: null, oxidationState: +6 },
          { symbol: 'O', subscript: 4,    oxidationState: -2 },
        ],
        tiers: [
          { label: 'Element',  brackets: [
            { slots: [0], total: +2, color: C.teal   },
            { slots: [1], total: +6, color: C.purple },
            { slots: [2], total: -8, color: C.purple },
          ] },
          { label: 'Ion',      brackets: [
            { slots: [0],    total: +2, color: C.teal   },
            { slots: [1, 2], total: -2, color: C.purple },
          ] },
          { label: 'Molecule', brackets: [
            { slots: [0, 1, 2], total: 0, color: C.yellow },
          ] },
        ],
      },
      {
        id: 'r5_BaSO4', coefficient: 1, side: 'product',
        name: 'Barium Sulfate', formula: 'BaSO₄',
        atoms: [
          { symbol: 'Ba', subscript: null, oxidationState: +2 },
          { symbol: 'S',  subscript: null, oxidationState: +6 },
          { symbol: 'O',  subscript: 4,    oxidationState: -2 },
        ],
        tiers: [
          { label: 'Element',  brackets: [
            // No Ba bracket — monoatomic ion
            { slots: [1], total: +6, color: C.purple },
            { slots: [2], total: -8, color: C.purple },
          ] },
          { label: 'Ion',      brackets: [
            { slots: [0],    total: +2, color: C.teal   },
            { slots: [1, 2], total: -2, color: C.purple },
          ] },
          { label: 'Molecule', brackets: [
            { slots: [0, 1, 2], total: 0, color: C.yellow },
          ] },
        ],
      },
      {
        id: 'r5_HCl', coefficient: 2, side: 'product',
        name: 'Hydrochloric Acid', formula: 'HCl',
        atoms: [
          { symbol: 'H',  subscript: null, oxidationState: +1 },
          { symbol: 'Cl', subscript: null, oxidationState: -1 },
        ],
        tiers: [
          { label: 'Ion',      brackets: [
            { slots: [0], total: +1, color: C.teal   },
            { slots: [1], total: -1, color: C.purple },
          ] },
          { label: 'Molecule', brackets: [
            { slots: [0, 1], total: 0, color: C.yellow },
          ] },
        ],
      },
    ],
  },

]
