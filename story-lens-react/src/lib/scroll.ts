/** Smoothly scroll an element (by id) to the top of the viewport. */
export function scrollToId(id: string): boolean {
  const target = document.getElementById(id);
  if (!target) return false;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
}

export const scrollToTop = (): void => window.scrollTo({ top: 0, behavior: 'smooth' });
