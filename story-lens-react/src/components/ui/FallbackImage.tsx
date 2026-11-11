import { useState, type ImgHTMLAttributes } from 'react';

interface FallbackImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  /** Local image shown if `src` (usually a remote photo) fails to load. */
  fallback: string;
}

export function FallbackImage({ src, fallback, alt = '', ...rest }: FallbackImageProps) {
  const [current, setCurrent] = useState(src);
  return (
    <img
      {...rest}
      src={current}
      alt={alt}
      onError={() => current !== fallback && setCurrent(fallback)}
    />
  );
}
