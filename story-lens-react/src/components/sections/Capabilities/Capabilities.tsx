import { useRef, useState } from 'react';
import { capabilities } from '@/data/capabilities';
import { useFloatingCard } from '@/hooks';
import { playShutter } from '@/lib';
import './Capabilities.css';

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  /** Row currently under the pointer (cleared when leaving a row). */
  const [hovered, setHovered] = useState<number | null>(null);
  /** The floating preview stays up while the pointer is anywhere in the section. */
  const [listActive, setListActive] = useState(false);
  /** Content shown in the preview = the last row that was hovered. */
  const [shown, setShown] = useState(0);

  useFloatingCard(sectionRef, cardRef);
  const preview = capabilities[shown];

  return (
    <section
      className="velour-capabilities-section"
      id="services"
      ref={sectionRef}
      onMouseLeave={() => {
        setListActive(false);
        setHovered(null);
      }}
    >
      <div className="velour-cap-ambient-glow" aria-hidden="true" />

      <div className="velour-cap-container">
        <div className="velour-cap-header">
          <div className="velour-cap-kicker">
            <span className="velour-kicker-dot" />
            <span>05 // CAPABILITIES &amp; DISCIPLINES</span>
          </div>
          <div className="velour-cap-meta">
            <span>VANCOUVER • LONDON • DUBAI</span>
            <span className="velour-meta-fps">24.00 FPS MASTER ARCHIVE</span>
          </div>
        </div>

        <div className={`velour-cap-list${listActive ? ' has-hovered-child' : ''}`}>
          {capabilities.map((cap, i) => (
            <div
              key={cap.num}
              className={`velour-cap-row${hovered === i ? ' is-hovered' : ''}`}
              onMouseEnter={() => {
                playShutter();
                setHovered(i);
                setShown(i);
                setListActive(true);
              }}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              onClick={playShutter}
            >
              <div className="velour-row-line" />
              <div className="velour-row-inner">
                <div className="velour-row-title-wrap">
                  <h2 className="velour-row-title">{cap.service}</h2>
                </div>
                <div className="velour-row-desc-col">
                  <span className="velour-row-num">{cap.num}</span>
                  <p className="velour-row-desc">{cap.description}</p>
                  <span className="velour-row-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </div>
              {i === capabilities.length - 1 && (
                <div className="velour-row-line velour-row-line-bottom" />
              )}
            </div>
          ))}
        </div>

        <div
          className={`velour-floating-card${listActive ? ' is-active' : ''}`}
          ref={cardRef}
          aria-hidden="true"
        >
          <div className="velour-floating-inner">
            <img className="velour-floating-img" src={preview.media} alt="Discipline Preview" />
            <div className="velour-floating-vignette" />
            <div className="velour-floating-meta">
              <span className="velour-floating-badge">[ {preview.badge} ]</span>
              <span className="velour-floating-title">{preview.title}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
