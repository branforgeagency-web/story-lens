export interface NavLink {
  label: string;
  href: string;
}

/** Fullscreen menu drawer (numbered automatically 01…). */
export const drawerLinks: readonly NavLink[] = [
  { label: 'THE VISION', href: '#hero-banner' },
  { label: 'EDITORIAL REEL', href: '#editorial-reel' },
  { label: 'AUDIENCE SHOWCASE', href: '#showcase' },
  { label: 'GALLERY REVEAL', href: '#gallery-reveal' },
  { label: 'CAPABILITIES', href: '#services' },
  { label: 'MANIFESTO', href: '#manifesto' },
  { label: 'START A PROJECT', href: 'mailto:hello@storylens.studio' },
];

/** Footer navigation, grouped in columns. */
export const footerNavGroups: readonly (readonly NavLink[])[] = [
  [
    { label: 'The Vision', href: '#hero-banner' },
    { label: 'Editorial Reel', href: '#editorial-reel' },
  ],
  [
    { label: 'Showcase', href: '#showcase' },
    { label: 'Gallery', href: '#gallery-reveal' },
  ],
  [
    { label: 'Capabilities', href: '#services' },
    { label: 'Manifesto', href: '#manifesto' },
  ],
];

export const CONTACT_EMAIL = 'hello@storylens.studio';
export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}`;
