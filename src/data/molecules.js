// Colors cycle through the brand palette
const C = {
  teal:   '#17b29e',
  purple: '#748ac5',
  blue:   '#00addb',
  yellow: '#fdb714',
  green:  '#85c441',
  pink:   '#e9177a',
  grey:   '#4f5b6f',
}

export const MOLECULES = {

  // ── EASY ────────────────────────────────────────────────────────────────────

  O2: {
    difficulty: 'easy',
    name: 'Oxygen Gas',
    formula: 'O₂',
    atoms: [
      { symbol: 'O', subscript: 2, oxidationState: 0 },
    ],
    tiers: [
      { label: 'Element',  brackets: [ { slots: [0], total: 0, color: C.teal   } ] },
      { label: 'Molecule', brackets: [ { slots: [0], total: 0, color: C.yellow } ] },
    ],
  },

  Cl2: {
    difficulty: 'easy',
    name: 'Chlorine Gas',
    formula: 'Cl₂',
    atoms: [
      { symbol: 'Cl', subscript: 2, oxidationState: 0 },
    ],
    tiers: [
      { label: 'Element',  brackets: [ { slots: [0], total: 0, color: C.teal   } ] },
      { label: 'Molecule', brackets: [ { slots: [0], total: 0, color: C.yellow } ] },
    ],
  },

  N2: {
    difficulty: 'easy',
    name: 'Nitrogen Gas',
    formula: 'N₂',
    atoms: [
      { symbol: 'N', subscript: 2, oxidationState: 0 },
    ],
    tiers: [
      { label: 'Element',  brackets: [ { slots: [0], total: 0, color: C.teal   } ] },
      { label: 'Molecule', brackets: [ { slots: [0], total: 0, color: C.yellow } ] },
    ],
  },

  NaPlus: {
    difficulty: 'easy',
    name: 'Sodium Ion',
    formula: 'Na⁺',
    atoms: [
      { symbol: 'Na', subscript: null, oxidationState: +1 },
    ],
    tiers: [
      { label: 'Element', brackets: [ { slots: [0], total: +1, color: C.teal   } ] },
      { label: 'Ion',     brackets: [ { slots: [0], total: +1, color: C.yellow } ] },
    ],
  },

  ClMinus: {
    difficulty: 'easy',
    name: 'Chloride Ion',
    formula: 'Cl⁻',
    atoms: [
      { symbol: 'Cl', subscript: null, oxidationState: -1 },
    ],
    tiers: [
      { label: 'Element', brackets: [ { slots: [0], total: -1, color: C.teal   } ] },
      { label: 'Ion',     brackets: [ { slots: [0], total: -1, color: C.yellow } ] },
    ],
  },

  Mg2Plus: {
    difficulty: 'easy',
    name: 'Magnesium Ion',
    formula: 'Mg²⁺',
    atoms: [
      { symbol: 'Mg', subscript: null, oxidationState: +2 },
    ],
    tiers: [
      { label: 'Element', brackets: [ { slots: [0], total: +2, color: C.teal   } ] },
      { label: 'Ion',     brackets: [ { slots: [0], total: +2, color: C.yellow } ] },
    ],
  },

  Fe3Plus: {
    difficulty: 'easy',
    name: 'Iron(III) Ion',
    formula: 'Fe³⁺',
    atoms: [
      { symbol: 'Fe', subscript: null, oxidationState: +3 },
    ],
    tiers: [
      { label: 'Element', brackets: [ { slots: [0], total: +3, color: C.teal   } ] },
      { label: 'Ion',     brackets: [ { slots: [0], total: +3, color: C.yellow } ] },
    ],
  },

  // ── MEDIUM ──────────────────────────────────────────────────────────────────

  H2O: {
    difficulty: 'medium',
    name: 'Water',
    formula: 'H₂O',
    atoms: [
      { symbol: 'H', subscript: 2,    oxidationState: +1 },
      { symbol: 'O', subscript: null, oxidationState: -2 },
    ],
    tiers: [
      {
        label: 'Element',
        brackets: [
          { slots: [0], total: +2, color: C.teal   },
          { slots: [1], total: -2, color: C.purple },
        ],
      },
      {
        label: 'Molecule',
        brackets: [
          { slots: [0, 1], total: 0, color: C.yellow },
        ],
      },
    ],
  },

  CO2: {
    difficulty: 'medium',
    name: 'Carbon Dioxide',
    formula: 'CO₂',
    atoms: [
      { symbol: 'C', subscript: null, oxidationState: +4 },
      { symbol: 'O', subscript: 2,    oxidationState: -2 },
    ],
    tiers: [
      {
        label: 'Element',
        brackets: [
          { slots: [0], total: +4, color: C.teal   },
          { slots: [1], total: -4, color: C.purple },
        ],
      },
      {
        label: 'Molecule',
        brackets: [
          { slots: [0, 1], total: 0, color: C.yellow },
        ],
      },
    ],
  },

  NH3: {
    difficulty: 'medium',
    name: 'Ammonia',
    formula: 'NH₃',
    atoms: [
      { symbol: 'N', subscript: null, oxidationState: -3 },
      { symbol: 'H', subscript: 3,    oxidationState: +1 },
    ],
    tiers: [
      {
        label: 'Element',
        brackets: [
          { slots: [0], total: -3, color: C.teal   },
          { slots: [1], total: +3, color: C.purple },
        ],
      },
      {
        label: 'Molecule',
        brackets: [
          { slots: [0, 1], total: 0, color: C.yellow },
        ],
      },
    ],
  },

  NaCl: {
    difficulty: 'medium',
    name: 'Sodium Chloride',
    formula: 'NaCl',
    atoms: [
      { symbol: 'Na', subscript: null, oxidationState: +1 },
      { symbol: 'Cl', subscript: null, oxidationState: -1 },
    ],
    tiers: [
      {
        label: 'Element',
        brackets: [
          { slots: [0], total: +1, color: C.teal   },
          { slots: [1], total: -1, color: C.purple },
        ],
      },
      {
        label: 'Ion',
        brackets: [
          { slots: [0], total: +1, color: C.teal   },
          { slots: [1], total: -1, color: C.purple },
        ],
      },
      {
        label: 'Molecule',
        brackets: [
          { slots: [0, 1], total: 0, color: C.yellow },
        ],
      },
    ],
  },

  MgCl2: {
    difficulty: 'medium',
    name: 'Magnesium Chloride',
    formula: 'MgCl₂',
    atoms: [
      { symbol: 'Mg', subscript: null, oxidationState: +2 },
      { symbol: 'Cl', subscript: 2,    oxidationState: -1 },
    ],
    tiers: [
      {
        label: 'Element',
        brackets: [
          { slots: [0], total: +2, color: C.teal   },
          { slots: [1], total: -2, color: C.purple },
        ],
      },
      {
        label: 'Ion',
        brackets: [
          { slots: [0], total: +2, color: C.teal   },
          { slots: [1], total: -2, color: C.purple },
        ],
      },
      {
        label: 'Molecule',
        brackets: [
          { slots: [0, 1], total: 0, color: C.yellow },
        ],
      },
    ],
  },

  CaO: {
    difficulty: 'medium',
    name: 'Calcium Oxide',
    formula: 'CaO',
    atoms: [
      { symbol: 'Ca', subscript: null, oxidationState: +2 },
      { symbol: 'O',  subscript: null, oxidationState: -2 },
    ],
    tiers: [
      {
        label: 'Element',
        brackets: [
          { slots: [0], total: +2, color: C.teal   },
          { slots: [1], total: -2, color: C.purple },
        ],
      },
      {
        label: 'Ion',
        brackets: [
          { slots: [0], total: +2, color: C.teal   },
          { slots: [1], total: -2, color: C.purple },
        ],
      },
      {
        label: 'Molecule',
        brackets: [
          { slots: [0, 1], total: 0, color: C.yellow },
        ],
      },
    ],
  },

  // ── HARD ────────────────────────────────────────────────────────────────────

  MgSO4: {
    difficulty: 'hard',
    name: 'Magnesium Sulfate',
    formula: 'MgSO₄',
    atoms: [
      { symbol: 'Mg', subscript: null, oxidationState: +2 },
      { symbol: 'S',  subscript: null, oxidationState: +6 },
      { symbol: 'O',  subscript: 4,    oxidationState: -2 },
    ],
    tiers: [
      {
        label: 'Element',
        brackets: [
          { slots: [0],    total: +2, color: C.teal   },
          { slots: [1],    total: +6, color: C.purple },
          { slots: [2],    total: -8, color: C.purple },
        ],
      },
      {
        label: 'Ion',
        brackets: [
          { slots: [0],    total: +2, color: C.teal   },
          { slots: [1, 2], total: -2, color: C.purple },
        ],
      },
      {
        label: 'Molecule',
        brackets: [
          { slots: [0, 1, 2], total: 0, color: C.yellow },
        ],
      },
    ],
  },

  H2SO4: {
    difficulty: 'hard',
    name: 'Sulfuric Acid',
    formula: 'H₂SO₄',
    atoms: [
      { symbol: 'H', subscript: 2,    oxidationState: +1 },
      { symbol: 'S', subscript: null, oxidationState: +6 },
      { symbol: 'O', subscript: 4,    oxidationState: -2 },
    ],
    tiers: [
      {
        label: 'Element',
        brackets: [
          { slots: [0],    total: +2, color: C.teal   },
          { slots: [1],    total: +6, color: C.purple },
          { slots: [2],    total: -8, color: C.purple },
        ],
      },
      {
        label: 'Group',
        brackets: [
          { slots: [0],    total: +2, color: C.teal   },
          { slots: [1, 2], total: -2, color: C.purple },
        ],
      },
      {
        label: 'Molecule',
        brackets: [
          { slots: [0, 1, 2], total: 0, color: C.yellow },
        ],
      },
    ],
  },

  HNO3: {
    difficulty: 'hard',
    name: 'Nitric Acid',
    formula: 'HNO₃',
    atoms: [
      { symbol: 'H', subscript: null, oxidationState: +1 },
      { symbol: 'N', subscript: null, oxidationState: +5 },
      { symbol: 'O', subscript: 3,    oxidationState: -2 },
    ],
    tiers: [
      {
        label: 'Element',
        brackets: [
          { slots: [0],    total: +1, color: C.teal   },
          { slots: [1],    total: +5, color: C.purple },
          { slots: [2],    total: -6, color: C.purple },
        ],
      },
      {
        label: 'Group',
        brackets: [
          { slots: [0],    total: +1, color: C.teal   },
          { slots: [1, 2], total: -1, color: C.purple },
        ],
      },
      {
        label: 'Molecule',
        brackets: [
          { slots: [0, 1, 2], total: 0, color: C.yellow },
        ],
      },
    ],
  },

  NaOH: {
    difficulty: 'hard',
    name: 'Sodium Hydroxide',
    formula: 'NaOH',
    atoms: [
      { symbol: 'Na', subscript: null, oxidationState: +1 },
      { symbol: 'O',  subscript: null, oxidationState: -2 },
      { symbol: 'H',  subscript: null, oxidationState: +1 },
    ],
    tiers: [
      {
        label: 'Element',
        brackets: [
          { slots: [0],    total: +1, color: C.teal   },
          { slots: [1],    total: -2, color: C.purple },
          { slots: [2],    total: +1, color: C.purple },
        ],
      },
      {
        label: 'Ion',
        brackets: [
          { slots: [0],    total: +1, color: C.teal   },
          { slots: [1, 2], total: -1, color: C.purple },
        ],
      },
      {
        label: 'Molecule',
        brackets: [
          { slots: [0, 1, 2], total: 0, color: C.yellow },
        ],
      },
    ],
  },

  Na2SO4: {
    difficulty: 'hard',
    name: 'Sodium Sulfate',
    formula: 'Na₂SO₄',
    atoms: [
      { symbol: 'Na', subscript: 2,    oxidationState: +1 },
      { symbol: 'S',  subscript: null, oxidationState: +6 },
      { symbol: 'O',  subscript: 4,    oxidationState: -2 },
    ],
    tiers: [
      {
        label: 'Element',
        brackets: [
          { slots: [0],    total: +2, color: C.teal   },
          { slots: [1],    total: +6, color: C.purple },
          { slots: [2],    total: -8, color: C.purple },
        ],
      },
      {
        label: 'Ion',
        brackets: [
          { slots: [0],    total: +2, color: C.teal   },
          { slots: [1, 2], total: -2, color: C.purple },
        ],
      },
      {
        label: 'Molecule',
        brackets: [
          { slots: [0, 1, 2], total: 0, color: C.yellow },
        ],
      },
    ],
  },

  KMnO4: {
    difficulty: 'hard',
    name: 'Potassium Permanganate',
    formula: 'KMnO₄',
    atoms: [
      { symbol: 'K',  subscript: null, oxidationState: +1 },
      { symbol: 'Mn', subscript: null, oxidationState: +7 },
      { symbol: 'O',  subscript: 4,    oxidationState: -2 },
    ],
    tiers: [
      {
        label: 'Element',
        brackets: [
          { slots: [0],    total: +1, color: C.teal   },
          { slots: [1],    total: +7, color: C.purple },
          { slots: [2],    total: -8, color: C.purple },
        ],
      },
      {
        label: 'Ion',
        brackets: [
          { slots: [0],    total: +1, color: C.teal   },
          { slots: [1, 2], total: -1, color: C.purple },
        ],
      },
      {
        label: 'Molecule',
        brackets: [
          { slots: [0, 1, 2], total: 0, color: C.yellow },
        ],
      },
    ],
  },

}

export function getMoleculesByDifficulty(diff) {
  return Object.entries(MOLECULES).filter(([, m]) => m.difficulty === diff)
}
