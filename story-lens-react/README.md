# Story Lens — React app

Vite + React 18 + TypeScript port of the Story Lens site. Looks and behaves like the original static page
(layout verified pixel-for-pixel at 1600×900 across every section).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # type-check + production build into dist/
npm run preview
```

## Structure

```
index.html              Vite entry (meta, fonts, #root)
src/
  main.tsx              Mounts <App/>, loads global styles first
  App.tsx               Page composition (section order lives here)
  components/
    layout/             Page-level pieces: Intro, MenuDrawer, ScrollProgress,
                        FocusReticle, BrandMonument (the big logo), FilmGrain
    sections/           One folder per section: Hero, EditorialReel, Showcase,
                        GalleryReveal, Capabilities, Manifesto, Footer
    ui/                 Small shared bits: FallbackImage, Icons
  hooks/                Behaviour, one hook per effect (reel engine, gallery reveal,
                        focus reticle, floating card, world clock, smooth anchors…)
  data/                 Content as typed arrays (nav links, reel cards, capabilities…)
  context/              MenuContext (drawer open/close)
  lib/                  audio (shutter click), math helpers, scroll helpers, CSS-var type
  assets/               Bundled images + videos, re-exported from assets/index.ts
  styles/               base.css — tokens, reset, shared utilities
```

Each component folder holds its own `.tsx`, `.css` and `index.ts`.

## Where to change things

| To change…                         | Edit                                   |
| ---------------------------------- | -------------------------------------- |
| Logo size / position in the hero   | `components/layout/BrandMonument/`     |
| Hero text, buttons                 | `components/sections/Hero/Hero.tsx`    |
| Menu links, footer links, email    | `data/navigation.ts`                   |
| Reel cards / services / manifesto  | `data/reel.ts`, `capabilities.ts`, `manifesto.ts` |
| Colours, fonts, spacing tokens     | `styles/base.css` (`:root`)            |

Alias: `@/` → `src/`.
