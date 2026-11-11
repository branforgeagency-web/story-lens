import { reelImages } from '@/assets';

export interface Capability {
  num: string;
  service: string;
  description: string;
  media: string;
  badge: string;
  title: string;
}

export const capabilities: readonly Capability[] = [
  {
    num: '01',
    service: 'VIDEOGRAPHY',
    description: 'END-TO-END VIDEO PRODUCTION SHAPED AROUND THE STORY.',
    media: reelImages[0],
    badge: '8K RAW MASTER // 24 FPS',
    title: 'Commercial & Brand Cinema',
  },
  {
    num: '02',
    service: 'PHOTOGRAPHY',
    description: 'CAMPAIGN, PRODUCT, AND EDITORIAL IMAGERY WITH CINEMATIC INTENT.',
    media: reelImages[3],
    badge: 'CAMPAIGN & EDITORIAL // 100MP',
    title: 'Editorial & Product Stills',
  },
  {
    num: '03',
    service: 'SOCIAL CONTENT',
    description: 'PLATFORM-NATIVE STORIES TOLD BESPOKE FOR YOUR BRAND.',
    media: reelImages[1],
    badge: '9:16 VERTICAL // 120 FPS HIGH-SPEED',
    title: 'Bespoke Platform Stories',
  },
  {
    num: '04',
    service: 'CREATIVE DIRECTION',
    description: 'CONCEPT AND VISUAL DIRECTION THAT CONNECTS EVERY FRAME.',
    media: reelImages[2],
    badge: 'CONCEPT TO MASTER // ART DIRECTION',
    title: 'Visual Direction & Cohesion',
  },
];
