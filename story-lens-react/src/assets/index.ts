// Central registry of bundled assets (hashed + cache-busted by Vite).
import logoMark from './images/brand/logo-mark.png';
import logoWhite from './images/brand/logo-white.png';
import logoDark from './images/brand/logo-dark.png';

import reel1 from './images/reel/reel-1.png';
import reel2 from './images/reel/reel-2.png';
import reel3 from './images/reel/reel-3.png';
import reel4 from './images/reel/reel-4.png';
import reel5 from './images/reel/reel-5.png';
import reel6 from './images/reel/reel-6.png';

import sceneSky from './images/footer-scene/01-sky.svg';
import sceneSun from './images/footer-scene/02-sun.svg';
import sceneMountains from './images/footer-scene/03-mountains.svg';
import sceneCranes from './images/footer-scene/04-cranes.svg';
import sceneHills from './images/footer-scene/05-hills.svg';
import sceneForeground from './images/footer-scene/06-foreground.svg';

import bannerVideo from './video/banner-bg.mp4';
import introVideo from './video/intro.mp4';

export const logos = { mark: logoMark, white: logoWhite, dark: logoDark } as const;

/** Reel stills, indexed 0..5 (reel-1 … reel-6). */
export const reelImages = [reel1, reel2, reel3, reel4, reel5, reel6] as const;

export const footerScene = {
  sky: sceneSky,
  sun: sceneSun,
  mountains: sceneMountains,
  cranes: sceneCranes,
  hills: sceneHills,
  foreground: sceneForeground,
} as const;

export const videos = { banner: bannerVideo, intro: introVideo } as const;
