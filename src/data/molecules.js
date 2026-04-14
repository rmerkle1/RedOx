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

// Each tier is { label, brackets[] }
// Tier-1 bracket colors must match their parent tier-2 group color.
export const MOLECULES = {
  MgSO4: {
    name: 'Magnesium Sulfate',
    atoms: [
      { symbol: 'Mg', subscript: null, oxidationState: +2 },
      { symbol: 'S',  subscript: null, oxidationState: +6 },
      { symbol: 'O',  subscript: 4,    oxidationState: -2 },
    ],
    tiers: [
      {
        label: 'Element',
        brackets: [
          { slots: [0],    total: +2, color: C.teal   },  // Mg group → teal
          { slots: [1],    total: +6, color: C.purple },  // SO₄ group → purple
          { slots: [2],    total: -8, color: C.purple },  // SO₄ group → purple
        ],
      },
      {
        label: 'Ion',
        brackets: [
          { slots: [0],    total: +2, color: C.teal   },  // Mg²⁺ → teal
          { slots: [1, 2], total: -2, color: C.purple },  // SO₄²⁻ → purple
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
