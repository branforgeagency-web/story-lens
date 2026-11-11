import type { CSSProperties } from 'react';

/** A style object that may also carry CSS custom properties (e.g. `--depth`). */
export type CSSVars = CSSProperties & Record<`--${string}`, string | number>;
