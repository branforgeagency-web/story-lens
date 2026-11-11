import { BrandMonument } from '@/components/layout/BrandMonument';
import { FilmGrain } from '@/components/layout/FilmGrain';
import { Intro } from '@/components/layout/Intro';
import { MenuDrawer } from '@/components/layout/MenuDrawer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { Capabilities } from '@/components/sections/Capabilities';
import { EditorialReel } from '@/components/sections/EditorialReel';
import { Footer } from '@/components/sections/Footer';
import { GalleryReveal } from '@/components/sections/GalleryReveal';
import { Hero } from '@/components/sections/Hero';
import { Manifesto } from '@/components/sections/Manifesto';
import { Showcase } from '@/components/sections/Showcase';
import { MenuProvider } from '@/context/MenuContext';
import { useSmoothAnchors } from '@/hooks';

export default function App() {
  useSmoothAnchors();

  return (
    <MenuProvider>
      <Intro />
      <ScrollProgress />
      <FilmGrain />
      <BrandMonument />

      <Hero />
      <MenuDrawer />
      <EditorialReel />
      <Showcase />
      <GalleryReveal />
      <Capabilities />
      <Manifesto />
      <Footer />
    </MenuProvider>
  );
}
