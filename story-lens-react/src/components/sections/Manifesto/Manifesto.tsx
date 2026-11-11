import { useRef } from 'react';
import { manifestoBlocks } from '@/data/manifesto';
import { useAscentReveal } from '@/hooks';
import './Manifesto.css';

const STAGGER_MS = 38; // per-character cascade delay

/** One heading line, split into characters that slide in column-by-column. */
function SplitLine({ text }: { text: string }) {
  let index = 0;
  return (
    <span className="ar-line">
      {Array.from(text).map((char, i) =>
        char === ' ' ? (
          <span key={i} aria-hidden="true">
            &nbsp;
          </span>
        ) : (
          <span key={i} className="ar-ch" style={{ transitionDelay: `${index++ * STAGGER_MS}ms` }}>
            {char}
          </span>
        ),
      )}
    </span>
  );
}

export function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);
  useAscentReveal(rootRef);

  return (
    <section className="ar-root" id="manifesto" ref={rootRef}>
      <div className="ar-chrome">
        <div className="ar-chrome-left">
          <span className="ar-mark">STORY LENS®</span>
          <span className="ar-tag">// CINEMATIC MANIFESTO</span>
        </div>
        <div className="ar-chrome-right">
          <span className="ar-tag">24 FPS · 8K RAW MASTER · DCI SCOPE</span>
        </div>
      </div>

      {manifestoBlocks.map((block, i) => (
        <div
          key={i}
          className={`ar-section${block.variant ? ` ar-section-${block.variant}` : ''}`}
        >
          <div className="ar-section-inner">
            {block.kicker && <span className="ar-kicker">{block.kicker}</span>}
            {block.heading.map(({ tag: Tag, className, lines }) => (
              <Tag className={className} key={className}>
                {lines.map((line) => (
                  <SplitLine key={line} text={line} />
                ))}
              </Tag>
            ))}
            {block.body && <p className="ar-sub">{block.body}</p>}
            {block.meta && <p className="ar-meta">{block.meta}</p>}
          </div>
        </div>
      ))}
    </section>
  );
}
