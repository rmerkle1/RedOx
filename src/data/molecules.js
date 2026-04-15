const C = {
  teal:   '#17b29e',
  purple: '#748ac5',
  blue:   '#00addb',
  yellow: '#fdb714',
  green:  '#85c441',
  pink:   '#e9177a',
  grey:   '#4f5b6f',
}

// ─── EASY ──────────────────────────────────────────────────────────────────
// Elemental molecules → 1 tier (Molecule). Monoatomic ions → 1 tier (Ion).
// Simple covalent and ionic molecules → 2–3 tiers (Element [, Ion], Molecule).

export const MOLECULES = {

  O2: {
    difficulty: 'easy', name: 'Oxygen Gas', formula: 'O₂',
    atoms: [ { symbol: 'O', subscript: 2, oxidationState: 0 } ],
    tiers: [
      { label: 'Molecule', brackets: [ { slots: [0], total: 0, color: C.yellow } ] },
    ],
  },

  Cl2: {
    difficulty: 'easy', name: 'Chlorine Gas', formula: 'Cl₂',
    atoms: [ { symbol: 'Cl', subscript: 2, oxidationState: 0 } ],
    tiers: [
      { label: 'Molecule', brackets: [ { slots: [0], total: 0, color: C.yellow } ] },
    ],
  },

  N2: {
    difficulty: 'easy', name: 'Nitrogen Gas', formula: 'N₂',
    atoms: [ { symbol: 'N', subscript: 2, oxidationState: 0 } ],
    tiers: [
      { label: 'Molecule', brackets: [ { slots: [0], total: 0, color: C.yellow } ] },
    ],
  },

  NaPlus: {
    difficulty: 'easy', name: 'Sodium Ion', formula: 'Na⁺',
    atoms: [ { symbol: 'Na', subscript: null, oxidationState: +1, ionCharge: '⁺' } ],
    tiers: [
      { label: 'Ion', brackets: [ { slots: [0], total: +1, color: C.teal } ] },
    ],
  },

  ClMinus: {
    difficulty: 'easy', name: 'Chloride Ion', formula: 'Cl⁻',
    atoms: [ { symbol: 'Cl', subscript: null, oxidationState: -1, ionCharge: '⁻' } ],
    tiers: [
      { label: 'Ion', brackets: [ { slots: [0], total: -1, color: C.teal } ] },
    ],
  },

  Mg2Plus: {
    difficulty: 'easy', name: 'Magnesium Ion', formula: 'Mg²⁺',
    atoms: [ { symbol: 'Mg', subscript: null, oxidationState: +2, ionCharge: '²⁺' } ],
    tiers: [
      { label: 'Ion', brackets: [ { slots: [0], total: +2, color: C.teal } ] },
    ],
  },

  Fe3Plus: {
    difficulty: 'easy', name: 'Iron(III) Ion', formula: 'Fe³⁺',
    atoms: [ { symbol: 'Fe', subscript: null, oxidationState: +3, ionCharge: '³⁺' } ],
    tiers: [
      { label: 'Ion', brackets: [ { slots: [0], total: +3, color: C.teal } ] },
    ],
  },

  H2O: {
    difficulty: 'easy', name: 'Water', formula: 'H₂O',
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

  CO2: {
    difficulty: 'easy', name: 'Carbon Dioxide', formula: 'CO₂',
    atoms: [
      { symbol: 'C', subscript: null, oxidationState: +4 },
      { symbol: 'O', subscript: 2,    oxidationState: -2 },
    ],
    tiers: [
      { label: 'Element',  brackets: [
        { slots: [0], total: +4, color: C.teal   },
        { slots: [1], total: -4, color: C.purple },
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1], total: 0, color: C.yellow },
      ] },
    ],
  },

  NH3: {
    difficulty: 'easy', name: 'Ammonia', formula: 'NH₃',
    atoms: [
      { symbol: 'N', subscript: null, oxidationState: -3 },
      { symbol: 'H', subscript: 3,    oxidationState: +1 },
    ],
    tiers: [
      { label: 'Element',  brackets: [
        { slots: [0], total: -3, color: C.teal   },
        { slots: [1], total: +3, color: C.purple },
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1], total: 0, color: C.yellow },
      ] },
    ],
  },

  NaCl: {
    difficulty: 'easy', name: 'Sodium Chloride', formula: 'NaCl',
    atoms: [
      { symbol: 'Na', subscript: null, oxidationState: +1 },
      { symbol: 'Cl', subscript: null, oxidationState: -1 },
    ],
    tiers: [
      { label: 'Element',  brackets: [
        { slots: [0], total: +1, color: C.teal   },
        { slots: [1], total: -1, color: C.purple },
      ] },
      { label: 'Ion',      brackets: [
        { slots: [0], total: +1, color: C.teal   },
        { slots: [1], total: -1, color: C.purple },
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1], total: 0, color: C.yellow },
      ] },
    ],
  },

  MgCl2: {
    difficulty: 'easy', name: 'Magnesium Chloride', formula: 'MgCl₂',
    atoms: [
      { symbol: 'Mg', subscript: null, oxidationState: +2 },
      { symbol: 'Cl', subscript: 2,    oxidationState: -1 },
    ],
    tiers: [
      { label: 'Element',  brackets: [
        { slots: [0], total: +2, color: C.teal   },
        { slots: [1], total: -2, color: C.purple },
      ] },
      { label: 'Ion',      brackets: [
        { slots: [0], total: +2, color: C.teal   },
        { slots: [1], total: -2, color: C.purple },
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1], total: 0, color: C.yellow },
      ] },
    ],
  },

  CaO: {
    difficulty: 'easy', name: 'Calcium Oxide', formula: 'CaO',
    atoms: [
      { symbol: 'Ca', subscript: null, oxidationState: +2 },
      { symbol: 'O',  subscript: null, oxidationState: -2 },
    ],
    tiers: [
      { label: 'Element',  brackets: [
        { slots: [0], total: +2, color: C.teal   },
        { slots: [1], total: -2, color: C.purple },
      ] },
      { label: 'Ion',      brackets: [
        { slots: [0], total: +2, color: C.teal   },
        { slots: [1], total: -2, color: C.purple },
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1], total: 0, color: C.yellow },
      ] },
    ],
  },

  // ─── MEDIUM ────────────────────────────────────────────────────────────────
  // Molecules with a polyatomic ion — 3 tiers: Element, Ion, Molecule.

  MgSO4: {
    difficulty: 'medium', name: 'Magnesium Sulfate', formula: 'MgSO₄',
    atoms: [
      { symbol: 'Mg', subscript: null, oxidationState: +2 },
      { symbol: 'S',  subscript: null, oxidationState: +6 },
      { symbol: 'O',  subscript: 4,    oxidationState: -2 },
    ],
    tiers: [
      { label: 'Element',  brackets: [
        { slots: [0],       total: +2, color: C.teal   },
        { slots: [1],       total: +6, color: C.purple },
        { slots: [2],       total: -8, color: C.purple },
      ] },
      { label: 'Ion',      brackets: [
        { slots: [0],       total: +2, color: C.teal   },
        { slots: [1, 2],    total: -2, color: C.purple },
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1, 2], total:  0, color: C.yellow },
      ] },
    ],
  },

  H2SO4: {
    difficulty: 'medium', name: 'Sulfuric Acid', formula: 'H₂SO₄',
    atoms: [
      { symbol: 'H', subscript: 2,    oxidationState: +1 },
      { symbol: 'S', subscript: null, oxidationState: +6 },
      { symbol: 'O', subscript: 4,    oxidationState: -2 },
    ],
    tiers: [
      { label: 'Element',  brackets: [
        { slots: [0],       total: +2, color: C.teal   },
        { slots: [1],       total: +6, color: C.purple },
        { slots: [2],       total: -8, color: C.purple },
      ] },
      { label: 'Group',    brackets: [
        { slots: [0],       total: +2, color: C.teal   },
        { slots: [1, 2],    total: -2, color: C.purple },
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1, 2], total:  0, color: C.yellow },
      ] },
    ],
  },

  HNO3: {
    difficulty: 'medium', name: 'Nitric Acid', formula: 'HNO₃',
    atoms: [
      { symbol: 'H', subscript: null, oxidationState: +1 },
      { symbol: 'N', subscript: null, oxidationState: +5 },
      { symbol: 'O', subscript: 3,    oxidationState: -2 },
    ],
    tiers: [
      { label: 'Element',  brackets: [
        { slots: [0],       total: +1, color: C.teal   },
        { slots: [1],       total: +5, color: C.purple },
        { slots: [2],       total: -6, color: C.purple },
      ] },
      { label: 'Group',    brackets: [
        { slots: [0],       total: +1, color: C.teal   },
        { slots: [1, 2],    total: -1, color: C.purple },
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1, 2], total:  0, color: C.yellow },
      ] },
    ],
  },

  NaOH: {
    difficulty: 'medium', name: 'Sodium Hydroxide', formula: 'NaOH',
    atoms: [
      { symbol: 'Na', subscript: null, oxidationState: +1 },
      { symbol: 'O',  subscript: null, oxidationState: -2 },
      { symbol: 'H',  subscript: null, oxidationState: +1 },
    ],
    tiers: [
      { label: 'Element',  brackets: [
        { slots: [0],       total: +1, color: C.teal   },
        { slots: [1],       total: -2, color: C.purple },
        { slots: [2],       total: +1, color: C.purple },
      ] },
      { label: 'Ion',      brackets: [
        { slots: [0],       total: +1, color: C.teal   },
        { slots: [1, 2],    total: -1, color: C.purple },
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1, 2], total:  0, color: C.yellow },
      ] },
    ],
  },

  Na2SO4: {
    difficulty: 'medium', name: 'Sodium Sulfate', formula: 'Na₂SO₄',
    atoms: [
      { symbol: 'Na', subscript: 2,    oxidationState: +1 },
      { symbol: 'S',  subscript: null, oxidationState: +6 },
      { symbol: 'O',  subscript: 4,    oxidationState: -2 },
    ],
    tiers: [
      { label: 'Element',  brackets: [
        { slots: [0],       total: +2, color: C.teal   },
        { slots: [1],       total: +6, color: C.purple },
        { slots: [2],       total: -8, color: C.purple },
      ] },
      { label: 'Ion',      brackets: [
        { slots: [0],       total: +2, color: C.teal   },
        { slots: [1, 2],    total: -2, color: C.purple },
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1, 2], total:  0, color: C.yellow },
      ] },
    ],
  },

  KMnO4: {
    difficulty: 'medium', name: 'Potassium Permanganate', formula: 'KMnO₄',
    atoms: [
      { symbol: 'K',  subscript: null, oxidationState: +1 },
      { symbol: 'Mn', subscript: null, oxidationState: +7 },
      { symbol: 'O',  subscript: 4,    oxidationState: -2 },
    ],
    tiers: [
      { label: 'Element',  brackets: [
        { slots: [0],       total: +1, color: C.teal   },
        { slots: [1],       total: +7, color: C.purple },
        { slots: [2],       total: -8, color: C.purple },
      ] },
      { label: 'Ion',      brackets: [
        { slots: [0],       total: +1, color: C.teal   },
        { slots: [1, 2],    total: -1, color: C.purple },
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1, 2], total:  0, color: C.yellow },
      ] },
    ],
  },

  // ─── HARD ──────────────────────────────────────────────────────────────────
  // 4-tier structure: Element → Ion (per-ion charge) → Ion Group → Molecule.
  // The "Ion" tier shows the charge of one polyatomic ion unit.
  // The "Ion Group" tier shows the combined charge of all instances of each ion.

  Mg3PO42: {
    difficulty: 'hard', name: 'Magnesium Phosphate', formula: 'Mg₃(PO₄)₂',
    atoms: [
      { symbol: 'Mg', subscript: 3,    oxidationState: +2 },  // 3 Mg²⁺
      { symbol: 'P',  subscript: null, oxidationState: +5 },  // 1 P per PO₄
      { symbol: 'O',  subscript: 4,    oxidationState: -2 },  // 4 O per PO₄
    ],
    polyIonGroups: [{ slots: [1, 2], groupSubscript: 2 }],
    tiers: [
      // Tier 1: total for each element group
      { label: 'Element',   brackets: [
        { slots: [0],       total:  +6, color: C.teal   },  // 3×(+2)
        { slots: [1],       total: +10, color: C.purple },  // 2×(+5)
        { slots: [2],       total: -16, color: C.purple },  // 8×(−2)
      ] },
      // Tier 2: charge of ONE polyatomic ion unit
      { label: 'Polyatomic Ion', brackets: [
        { slots: [0],       total:  +2, color: C.teal   },  // one Mg²⁺
        { slots: [1, 2],    total:  -3, color: C.purple },  // one PO₄³⁻
      ] },
      // Tier 3: combined charge of all instances of each ion
      { label: 'Ions',     brackets: [
        { slots: [0],          total:  +6, color: C.teal   },  // 3 Mg²⁺ total
        { slots: [1, 2],       total:  -6, color: C.purple, groupRight: true },  // 2 PO₄³⁻ total
      ] },
      { label: 'Molecule',  brackets: [
        { slots: [0, 1, 2], total:   0, color: C.yellow, groupRight: true },
      ] },
    ],
  },

  CaNO32: {
    difficulty: 'hard', name: 'Calcium Nitrate', formula: 'Ca(NO₃)₂',
    atoms: [
      { symbol: 'Ca', subscript: null, oxidationState: +2 },  // 1 Ca²⁺
      { symbol: 'N',  subscript: null, oxidationState: +5 },  // 1 N per NO₃
      { symbol: 'O',  subscript: 3,    oxidationState: -2 },  // 3 O per NO₃
    ],
    polyIonGroups: [{ slots: [1, 2], groupSubscript: 2 }],
    tiers: [
      { label: 'Element',   brackets: [
        { slots: [0],       total:  +2, color: C.teal   },  // 1×(+2)
        { slots: [1],       total: +10, color: C.purple },  // 2×(+5)
        { slots: [2],       total: -12, color: C.purple },  // 6×(−2)
      ] },
      { label: 'Polyatomic Ion', brackets: [
        { slots: [0],       total:  +2, color: C.teal   },  // one Ca²⁺
        { slots: [1, 2],    total:  -1, color: C.purple },  // one NO₃⁻
      ] },
      { label: 'Ions',     brackets: [
        { slots: [0],          total:  +2, color: C.teal   },  // 1 Ca²⁺ total
        { slots: [1, 2],       total:  -2, color: C.purple, groupRight: true },  // 2 NO₃⁻ total
      ] },
      { label: 'Molecule',  brackets: [
        { slots: [0, 1, 2], total:   0, color: C.yellow, groupRight: true },
      ] },
    ],
  },

  AlOH3: {
    difficulty: 'hard', name: 'Aluminum Hydroxide', formula: 'Al(OH)₃',
    atoms: [
      { symbol: 'Al', subscript: null, oxidationState: +3 },  // 1 Al³⁺
      { symbol: 'O',  subscript: null, oxidationState: -2 },  // 1 O per OH
      { symbol: 'H',  subscript: null, oxidationState: +1 },  // 1 H per OH
    ],
    polyIonGroups: [{ slots: [1, 2], groupSubscript: 3 }],
    tiers: [
      { label: 'Element',   brackets: [
        { slots: [0],       total: +3, color: C.teal   },  // 1×(+3)
        { slots: [1],       total: -6, color: C.purple },  // 3×(−2)
        { slots: [2],       total: +3, color: C.purple },  // 3×(+1)
      ] },
      { label: 'Polyatomic Ion', brackets: [
        { slots: [0],       total: +3, color: C.teal   },  // one Al³⁺
        { slots: [1, 2],    total: -1, color: C.purple },  // one OH⁻
      ] },
      { label: 'Ions',     brackets: [
        { slots: [0],          total: +3, color: C.teal   },  // 1 Al³⁺ total
        { slots: [1, 2],       total: -3, color: C.purple, groupRight: true },  // 3 OH⁻ total
      ] },
      { label: 'Molecule',  brackets: [
        { slots: [0, 1, 2], total:  0, color: C.yellow, groupRight: true },
      ] },
    ],
  },

}

export function getMoleculesByDifficulty(diff) {
  return Object.entries(MOLECULES).filter(([, m]) => m.difficulty === diff)
}
