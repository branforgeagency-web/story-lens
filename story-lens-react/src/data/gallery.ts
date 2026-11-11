import { reelImages } from '@/assets';

export interface GalleryCard {
  alt: string;
  image: string;
  fallback: string;
  loading: 'eager' | 'lazy';
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const card = (id: string, alt: string, fallbackIndex: number, loading: 'eager' | 'lazy'): GalleryCard => ({
  alt,
  image: unsplash(id),
  fallback: reelImages[fallbackIndex],
  loading,
});

/** The 3×3 pinned gallery, as three columns of three cards. */
export const galleryColumns: readonly (readonly GalleryCard[])[] = [
  [
    card('photo-1536440136628-849c177e76a1', 'Cinema Camera Setup', 0, 'eager'),
    card('photo-1518173946687-a4c8a383392e', 'Dramatic Atmosphere', 1, 'eager'),
    card('photo-1574717024653-61fd2cf4d44d', 'Director Monitor', 2, 'eager'),
  ],
  [
    card('photo-1509631179647-0177331693ae', 'High Fashion Portrait', 3, 'lazy'),
    card('photo-1492691527719-9d1e07e534b4', 'Steadicam Operator', 4, 'lazy'),
    card('photo-1514525253161-7a46d19cd819', 'Soundstage Lights', 5, 'lazy'),
  ],
  [
    card('photo-1508700115892-45ecd05ae2ad', 'Neon Nightlife', 0, 'lazy'),
    card('photo-1511671782779-c97d3d27a1d4', 'Soundstage Mastering', 1, 'lazy'),
    card('photo-1485846234645-a62644f84728', '35mm Film Clapper', 2, 'lazy'),
  ],
];

export const GALLERY_HEADING = ['Culture', 'moves', 'fast.', 'We', 'capture', 'the', 'moments', 'worth', 'remembering.'] as const;
