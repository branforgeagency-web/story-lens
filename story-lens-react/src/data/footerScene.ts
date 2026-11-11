import { footerScene } from '@/assets';

export interface SceneLayer {
  name: 'sky' | 'sun' | 'mountains' | 'cranes' | 'hills' | 'foreground';
  src: string;
  depth: number;
}

/** Parallax scene layers, back → front. The birds/mist sit between sun and mountains. */
export const sceneLayersBack: readonly SceneLayer[] = [
  { name: 'sky', src: footerScene.sky, depth: 3 },
  { name: 'sun', src: footerScene.sun, depth: 5 },
];
export const sceneLayersFront: readonly SceneLayer[] = [
  { name: 'mountains', src: footerScene.mountains, depth: 9 },
  { name: 'cranes', src: footerScene.cranes, depth: 13 },
  { name: 'hills', src: footerScene.hills, depth: 18 },
  { name: 'foreground', src: footerScene.foreground, depth: 26 },
];

export interface Bokeh {
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
}

export const bokeh: readonly Bokeh[] = [
  { left: '24%', top: '43%', size: '30px', delay: '-2s', duration: '12s' },
  { left: '39%', top: '57%', size: '42px', delay: '-8s', duration: '16s' },
  { left: '51%', top: '45%', size: '24px', delay: '-5s', duration: '13s' },
  { left: '64%', top: '56%', size: '34px', delay: '-10s', duration: '18s' },
  { left: '75%', top: '47%', size: '20px', delay: '-3s', duration: '14s' },
  { left: '85%', top: '60%', size: '27px', delay: '-7s', duration: '17s' },
];
