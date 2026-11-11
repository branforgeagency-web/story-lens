import { reelImages } from '@/assets';

export interface ReelCard {
  title: string;
  category: string;
  alt: string;
  image: string;
}

export const reelCards: readonly ReelCard[] = [
  { title: 'Futurist Outdoor Booth', category: 'EVENT ACTIVATION', alt: 'Outdoor Event Booth', image: reelImages[0] },
  { title: 'Futurist Arena Keynote', category: 'EVENT PRODUCTION', alt: 'Conference Keynote Stage', image: reelImages[1] },
  { title: 'Craft Beverage Pour', category: 'LIQUID CINEMA', alt: 'Craft Beer Pour', image: reelImages[2] },
  { title: 'chúuk Hot Sauce', category: 'PRODUCT PHOTOGRAPHY', alt: 'chúuk Hot Sauce', image: reelImages[3] },
  { title: 'The Look Lab Gala', category: 'BRAND ACTIVATION', alt: 'The Look Lab Activation', image: reelImages[4] },
  { title: 'Mother Cocktail Bar', category: 'BEVERAGE & MIXOLOGY', alt: 'Blackberry Coupe Cocktail', image: reelImages[5] },
];
