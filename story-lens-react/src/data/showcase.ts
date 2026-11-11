import { reelImages } from '@/assets';

export interface ShowcaseCard {
  title: string;
  image: string;
  fallback: string;
  /** Alternating tilt + vertical offset for the marquee rhythm. */
  transform: string;
  loading: 'eager' | 'lazy';
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;

const TRANSFORMS = [
  'rotate(-2deg) translateY(16px)',
  'rotate(4deg) translateY(0px)',
  'rotate(-2deg) translateY(10px)',
  'rotate(4deg) translateY(16px)',
  'rotate(-2deg) translateY(0px)',
  'rotate(4deg) translateY(10px)',
  'rotate(-2deg) translateY(16px)',
  'rotate(4deg) translateY(0px)',
];

const PHOTOS: readonly [id: string, title: string, fallbackIndex: number][] = [
  ['photo-1529139574466-a303027c1d8b', 'Cinematic Portrait I', 0],
  ['photo-1496747611176-843222e1e57c', 'Cinematic Portrait II', 1],
  ['photo-1483985988355-763728e1935b', 'Cinematic Portrait III', 2],
  ['photo-1525507119028-ed4c629a60a3', 'Cinematic Portrait IV', 3],
  ['photo-1485230895905-ec40ba36b9bc', 'Cinematic Portrait V', 4],
  ['photo-1515886657613-9f3515b0c78f', 'Cinematic Portrait VI', 5],
  ['photo-1509631179647-0177331693ae', 'Cinematic Portrait VII', 0],
  ['photo-1469334031218-e382a71b716b', 'Cinematic Portrait VIII', 1],
];

export const showcaseCards: readonly ShowcaseCard[] = PHOTOS.map(([id, title, fb], i) => ({
  title,
  image: unsplash(id),
  fallback: reelImages[fb],
  transform: TRANSFORMS[i],
  loading: i < 4 ? 'eager' : 'lazy',
}));
