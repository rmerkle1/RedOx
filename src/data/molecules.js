const C = ['#17b29e', '#748ac5', '#00addb', '#fdb714', '#85c441', '#e9177a', '#4f5b6f']

export const MOLECULES = {
  MgSO4: {
    name: 'Magnesium Sulfate',
    formula: 'MgSO₄',
    atoms: [
      { symbol: 'Mg', subscript: null, oxidationState: +2 },
      { symbol: 'S',  subscript: null, oxidationState: +6 },
      { symbol: 'O',  subscript: 4,    oxidationState: -2 },
    ],
    tiers: [
      [
        { slots: [0],       total: +2, color: C[0] },
        { slots: [1],       total: +6, color: C[1] },
        { slots: [2],       total: -8, color: C[2] },
      ],
      [
        { slots: [0],       total: +2, color: C[3] },
        { slots: [1, 2],    total: -2, color: C[4] },
      ],
      [
        { slots: [0, 1, 2], total:  0, color: C[5] },
      ],
    ],
  },
}
