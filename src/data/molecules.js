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
// Elemental molecules:    1 tier  (Molecule)
// Monoatomic ions:        1 tier  (Ion)
// Covalent molecules:     2 tiers (Element, Molecule)
// Easy ionic compounds:   2 tiers (Ion, Molecule)  — no Element tier; all atoms are ionic

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

  // Covalent molecules — Element tier for each nonmetal, then Molecule

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

    SO3: {
    difficulty: 'easy', name: 'Sulfur Trioxide', formula: 'SO₃',
    atoms: [
      { symbol: 'S', subscript: null, oxidationState: +6 },
      { symbol: 'O', subscript: 3,    oxidationState: -2 },
    ],
    tiers: [
      { label: 'Element',  brackets: [
        { slots: [0], total: +6, color: C.teal   },
        { slots: [1], total: -6, color: C.purple },
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1], total: 0, color: C.yellow },
      ] },
    ],
  },

    N2H4: {
    difficulty: 'easy', name: 'Hydrazine', formula: 'N₂H₄',
    atoms: [
      { symbol: 'N', subscript: 2, oxidationState: -2 },
      { symbol: 'H', subscript: 4, oxidationState: +1 },
    ],
    tiers: [
      { label: 'Element',  brackets: [
        { slots: [0], total: -4, color: C.teal   },
        { slots: [1], total: +4, color: C.purple },
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1], total: 0, color: C.yellow },
      ] },
    ],
  },

  // Easy ionic compounds — no Element tier; atoms are monoatomic ions

  NaCl: {
    difficulty: 'easy', name: 'Sodium Chloride', formula: 'NaCl',
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

  MgCl2: {
    difficulty: 'easy', name: 'Magnesium Chloride', formula: 'MgCl₂',
    atoms: [
      { symbol: 'Mg', subscript: null, oxidationState: +2 },
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

  CaO: {
    difficulty: 'easy', name: 'Calcium Oxide', formula: 'CaO',
    atoms: [
      { symbol: 'Ca', subscript: null, oxidationState: +2 },
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

    Fe2O3: {
    difficulty: 'easy', name: 'Iron (III) Oxide', formula: 'Fe₂O₃',
    atoms: [
      { symbol: 'Fe', subscript: 2, oxidationState: +3 },
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

    ClO2Minus: {
    difficulty: 'easy', name: 'Chlorite', formula: 'ClO₂⁻',
    atoms: [
      { symbol: 'Cl', subscript: null, oxidationState: +3 },
      { symbol: 'O', subscript: 2, oxidationState: -2, ionCharge: '⁻' },
    ],
    tiers: [
      { label: 'Ion',      brackets: [
        { slots: [0], total: +3, color: C.teal   },
        { slots: [1], total: -4, color: C.purple },
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1], total: -1, color: C.yellow },
      ] },
    ],
  },

    NH4Plus: {
    difficulty: 'easy', name: 'Ammonium', formula: 'NH₄⁺',
    atoms: [
      { symbol: 'N', subscript: null, oxidationState: -3 },
      { symbol: 'H', subscript: 4, oxidationState: +1, ionCharge: '⁺' },
    ],
    tiers: [
      { label: 'Ion',      brackets: [
        { slots: [0], total: -3, color: C.teal   },
        { slots: [1], total: +4, color: C.purple },
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1], total: +1, color: C.yellow },
      ] },
    ],
  },

  // ─── MEDIUM ────────────────────────────────────────────────────────────────
  // 3 tiers: Element (nonmetals only), Ion, Molecule.
  // Monoatomic metal ions have NO bracket in the Element tier.
  // Covalent nonmetals inside the polyatomic ion DO get Element brackets.

  MgSO4: {
    difficulty: 'medium', name: 'Magnesium Sulfate', formula: 'MgSO₄',
    atoms: [
      { symbol: 'Mg', subscript: null, oxidationState: +2 },
      { symbol: 'S',  subscript: null, oxidationState: +6 },
      { symbol: 'O',  subscript: 4,    oxidationState: -2 },
    ],
    tiers: [
      { label: 'Element',  brackets: [
        // No Mg bracket — Mg²⁺ is a monoatomic ion
        { slots: [1], total: +6, color: C.purple },  // S in SO₄
        { slots: [2], total: -8, color: C.purple },  // O₄ in SO₄
      ] },
      { label: 'Ion',      brackets: [
        { slots: [0],       total: +2, color: C.teal   },  // Mg²⁺
        { slots: [1, 2],    total: -2, color: C.purple },  // SO₄²⁻
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1, 2], total:  0, color: C.yellow },
      ] },
    ],
  },

  H2SO3: {
    difficulty: 'medium', name: 'Sulfurous Acid', formula: 'H₂SO₃',
    atoms: [
      { symbol: 'H', subscript: 2,    oxidationState: +1 },
      { symbol: 'S', subscript: null, oxidationState: +4 },
      { symbol: 'O', subscript: 3,    oxidationState: -2 },
    ],
    tiers: [
      { label: 'Element',  brackets: [
        { slots: [0], total: +2, color: C.teal   },  // H₂ (covalent nonmetal)
        { slots: [1], total: +4, color: C.purple },  // S
        { slots: [2], total: -6, color: C.purple },  // O₄
      ] },
      { label: 'Ion',      brackets: [
        { slots: [0],       total: +2, color: C.teal   },  // H₂ group
        { slots: [1, 2],    total: -2, color: C.purple },  // SO₄²⁻
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
        { slots: [0], total: +1, color: C.teal   },  // H (covalent nonmetal)
        { slots: [1], total: +5, color: C.purple },  // N
        { slots: [2], total: -6, color: C.purple },  // O₃
      ] },
      { label: 'Ion',      brackets: [
        { slots: [0],       total: +1, color: C.teal   },  // H⁺
        { slots: [1, 2],    total: -1, color: C.purple },  // NO₃⁻
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1, 2], total:  0, color: C.yellow },
      ] },
    ],
  },

    H3PO4: {
    difficulty: 'medium', name: 'Phosphoric Acid', formula: 'H₃PO₄',
    atoms: [
      { symbol: 'H', subscript: 3,    oxidationState: +1 },
      { symbol: 'P', subscript: null, oxidationState: +5 },
      { symbol: 'O', subscript: 4,    oxidationState: -2 },
    ],
    tiers: [
      { label: 'Element',  brackets: [
        { slots: [0], total: +3, color: C.teal   },  // H₂ (covalent nonmetal)
        { slots: [1], total: +5, color: C.purple },  // S
        { slots: [2], total: -8, color: C.purple },  // O₄
      ] },
      { label: 'Ion',      brackets: [
        { slots: [0],       total: +3, color: C.teal   },  // H₂ group
        { slots: [1, 2],    total: -3, color: C.purple },  // SO₄²⁻
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
        // No Na bracket — Na⁺ is a monoatomic ion
        { slots: [1], total: -2, color: C.purple },  // O in OH
        { slots: [2], total: +1, color: C.purple },  // H in OH
      ] },
      { label: 'Ion',      brackets: [
        { slots: [0],       total: +1, color: C.teal   },  // Na⁺
        { slots: [1, 2],    total: -1, color: C.purple },  // OH⁻
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1, 2], total:  0, color: C.yellow },
      ] },
    ],
  },

  Na2CO3: {
    difficulty: 'medium', name: 'Sodium Carbonate', formula: 'Na₂CO₃',
    atoms: [
      { symbol: 'Na', subscript: 2,    oxidationState: +1 },
      { symbol: 'C',  subscript: null, oxidationState: +4 },
      { symbol: 'O',  subscript: 3,    oxidationState: -2 },
    ],
    tiers: [
      { label: 'Element',  brackets: [
        // No Na bracket — Na⁺ is a monoatomic ion
        { slots: [1], total: +4, color: C.purple },  // S in SO₄
        { slots: [2], total: -6, color: C.purple },  // O₄ in SO₄
      ] },
      { label: 'Ion',      brackets: [
        { slots: [0],       total: +2, color: C.teal   },  // Na₂ (2 × Na⁺)
        { slots: [1, 2],    total: -2, color: C.purple },  // SO₄²⁻
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
        // No K bracket — K⁺ is a monoatomic ion
        { slots: [1], total: +7, color: C.purple },  // Mn in MnO₄
        { slots: [2], total: -8, color: C.purple },  // O₄ in MnO₄
      ] },
      { label: 'Ion',      brackets: [
        { slots: [0],       total: +1, color: C.teal   },  // K⁺
        { slots: [1, 2],    total: -1, color: C.purple },  // MnO₄⁻
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1, 2], total:  0, color: C.yellow },
      ] },
    ],
  },

    Cu2SO3: {
    difficulty: 'medium', name: 'Copper (I) Sulfite', formula: 'Cu₂SO₃',
    atoms: [
      { symbol: 'Cu', subscript: 2,    oxidationState: +1 },
      { symbol: 'S',  subscript: null, oxidationState: +4 },
      { symbol: 'O',  subscript: 3,    oxidationState: -2 },
    ],
    tiers: [
      { label: 'Element',  brackets: [
        // No Na bracket — Na⁺ is a monoatomic ion
        { slots: [1], total: +4, color: C.purple },  // S in SO₄
        { slots: [2], total: -6, color: C.purple },  // O₄ in SO₄
      ] },
      { label: 'Ion',      brackets: [
        { slots: [0],       total: +2, color: C.teal   },  // Na₂ (2 × Na⁺)
        { slots: [1, 2],    total: -2, color: C.purple },  // SO₄²⁻
      ] },
      { label: 'Molecule', brackets: [
        { slots: [0, 1, 2], total:  0, color: C.yellow },
      ] },
    ],
  },

  // ─── HARD ──────────────────────────────────────────────────────────────────
  // 4-tier structure: Element → Polyatomic Ion → Ions → Molecule.
  //
  // Element tier:        nonmetal elements inside parens only (per one polyatomic unit).
  //                      Metal / monoatomic ions have NO bracket here.
  // Polyatomic Ion tier: charge of ONE polyatomic ion unit.
  //                      Metal / monoatomic ions have NO bracket here.
  // Ions tier:           combined charge of each ion group across the whole molecule
  //                      (metal ions included here).
  // Molecule tier:       total (always 0).

  Mg3PO42: {
    difficulty: 'hard', name: 'Magnesium Phosphate', formula: 'Mg₃(PO₄)₂',
    atoms: [
      { symbol: 'Mg', subscript: 3,    oxidationState: +2 },  // 3 Mg²⁺ (ionic)
      { symbol: 'P',  subscript: null, oxidationState: +5 },  // 1 P per PO₄ (covalent)
      { symbol: 'O',  subscript: 4,    oxidationState: -2 },  // 4 O per PO₄ (covalent)
    ],
    polyIonGroups: [{ slots: [1, 2], groupSubscript: 2 }],
    tiers: [
      { label: 'Element',       brackets: [
        // No Mg bracket — Mg²⁺ is ionic
        { slots: [1], total: +5, color: C.purple },  // P in one PO₄
        { slots: [2], total: -8, color: C.purple },  // O₄ in one PO₄
      ] },
      { label: 'Polyatomic Ion', brackets: [
        // No Mg bracket — not polyatomic
        { slots: [1, 2], total: -3, color: C.purple },  // one PO₄³⁻
      ] },
      { label: 'Ions',          brackets: [
        { slots: [0],       total:  +6, color: C.teal             },  // Mg₃ (3 × +2)
        { slots: [1, 2],    total:  -6, color: C.purple, groupRight: true },  // (PO₄)₂ (2 × −3)
      ] },
      { label: 'Molecule',      brackets: [
        { slots: [0, 1, 2], total: 0, color: C.yellow, groupRight: true },
      ] },
    ],
  },

  CaNO32: {
    difficulty: 'hard', name: 'Calcium Nitrate', formula: 'Ca(NO₃)₂',
    atoms: [
      { symbol: 'Ca', subscript: null, oxidationState: +2 },  // 1 Ca²⁺ (ionic)
      { symbol: 'N',  subscript: null, oxidationState: +5 },  // 1 N per NO₃ (covalent)
      { symbol: 'O',  subscript: 3,    oxidationState: -2 },  // 3 O per NO₃ (covalent)
    ],
    polyIonGroups: [{ slots: [1, 2], groupSubscript: 2 }],
    tiers: [
      { label: 'Element',       brackets: [
        // No Ca bracket — Ca²⁺ is ionic
        { slots: [1], total: +5, color: C.purple },  // N in one NO₃
        { slots: [2], total: -6, color: C.purple },  // O₃ in one NO₃
      ] },
      { label: 'Polyatomic Ion', brackets: [
        // No Ca bracket — not polyatomic
        { slots: [1, 2], total: -1, color: C.purple },  // one NO₃⁻
      ] },
      { label: 'Ions',          brackets: [
        { slots: [0],       total:  +2, color: C.teal             },  // Ca²⁺
        { slots: [1, 2],    total:  -2, color: C.purple, groupRight: true },  // (NO₃)₂ (2 × −1)
      ] },
      { label: 'Molecule',      brackets: [
        { slots: [0, 1, 2], total: 0, color: C.yellow, groupRight: true },
      ] },
    ],
  },

  AlOH3: {
    difficulty: 'hard', name: 'Aluminum Hydroxide', formula: 'Al(OH)₃',
    atoms: [
      { symbol: 'Al', subscript: null, oxidationState: +3 },  // 1 Al³⁺ (ionic)
      { symbol: 'O',  subscript: null, oxidationState: -2 },  // 1 O per OH (covalent)
      { symbol: 'H',  subscript: null, oxidationState: +1 },  // 1 H per OH (covalent)
    ],
    polyIonGroups: [{ slots: [1, 2], groupSubscript: 3 }],
    tiers: [
      { label: 'Element',       brackets: [
        // No Al bracket — Al³⁺ is ionic
        { slots: [1], total: -2, color: C.purple },  // O in one OH
        { slots: [2], total: +1, color: C.purple },  // H in one OH
      ] },
      { label: 'Polyatomic Ion', brackets: [
        // No Al bracket — not polyatomic
        { slots: [1, 2], total: -1, color: C.purple },  // one OH⁻
      ] },
      { label: 'Ions',          brackets: [
        { slots: [0],       total: +3, color: C.teal             },  // Al³⁺
        { slots: [1, 2],    total: -3, color: C.purple, groupRight: true },  // (OH)₃ (3 × −1)
      ] },
      { label: 'Molecule',      brackets: [
        { slots: [0, 1, 2], total:  0, color: C.yellow, groupRight: true },
      ] },
    ],
  },

    Fe2CO33: {
    difficulty: 'hard', name: 'Iron (III) Carbonate', formula: 'Fe₂(CO₃)₃',
    atoms: [
      { symbol: 'Fe', subscript: 2,    oxidationState: +3 },  // 3 Mg²⁺ (ionic)
      { symbol: 'C',  subscript: null, oxidationState: +4 },  // 1 P per PO₄ (covalent)
      { symbol: 'O',  subscript: 3,    oxidationState: -2 },  // 4 O per PO₄ (covalent)
    ],
    polyIonGroups: [{ slots: [1, 2], groupSubscript: 3 }],
    tiers: [
      { label: 'Element',       brackets: [
        // No Mg bracket — Mg²⁺ is ionic
        { slots: [1], total: +4, color: C.purple },  // P in one PO₄
        { slots: [2], total: -6, color: C.purple },  // O₄ in one PO₄
      ] },
      { label: 'Polyatomic Ion', brackets: [
        // No Mg bracket — not polyatomic
        { slots: [1, 2], total: -2, color: C.purple },  // one PO₄³⁻
      ] },
      { label: 'Ions',          brackets: [
        { slots: [0],       total:  +6, color: C.teal             },  // Mg₃ (3 × +2)
        { slots: [1, 2],    total:  -6, color: C.purple, groupRight: true },  // (PO₄)₂ (2 × −3)
      ] },
      { label: 'Molecule',      brackets: [
        { slots: [0, 1, 2], total: 0, color: C.yellow, groupRight: true },
      ] },
    ],
  },

}

export function getMoleculesByDifficulty(diff) {
  return Object.entries(MOLECULES).filter(([, m]) => m.difficulty === diff)
}
