export interface ManifestoBlock {
  /** Extra modifier class on the `.ar-section` wrapper. */
  variant?: 'hero' | 'right' | 'outro';
  kicker?: string;
  /** Heading element + size class, and the lines it is split into. */
  heading: { tag: 'h2' | 'h3'; className: string; lines: readonly string[] }[];
  body?: string;
  meta?: string;
}

export const manifestoBlocks: readonly ManifestoBlock[] = [
  {
    variant: 'hero',
    kicker: '01 // THE MANIFESTO',
    heading: [{ tag: 'h2', className: 'ar-display', lines: ['THE FRAME', 'IS VISCERAL'] }],
    body: 'Every lens choice is an emotional contract. We turn raw moments into enduring cinematic perspective.',
  },
  {
    variant: 'right',
    kicker: '02 // 8K RAW OPTICS',
    heading: [{ tag: 'h2', className: 'ar-large', lines: ['BUILT FOR', 'THE BIG SCREEN'] }],
    body: 'Custom anamorphic glass. High-velocity FPV drone tracking. Soundstage lighting shaped with unyielding intention.',
  },
  {
    kicker: '03 // PHILOSOPHY',
    heading: [{ tag: 'h2', className: 'ar-medium', lines: ['EVERY STORY', 'EARNS ITS', 'ENTRANCE'] }],
    body: 'No filler frames. No synthetic shortcuts. Only authentic human stories translated into monumental imagery.',
  },
  {
    variant: 'outro',
    heading: [
      { tag: 'h2', className: 'ar-display ar-accent', lines: ['STORY LENS'] },
      { tag: 'h3', className: 'ar-large', lines: ['MEDIA HOUSE'] },
    ],
    meta: 'EST. 2024 — INDEPENDENT CINEMATIC ARCHIVE // 24 FPS',
  },
];
