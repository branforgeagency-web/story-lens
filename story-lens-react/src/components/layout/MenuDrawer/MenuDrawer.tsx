import { logos } from '@/assets';
import { useMenu } from '@/context/MenuContext';
import { drawerLinks } from '@/data/navigation';
import { playShutter } from '@/lib';
import './MenuDrawer.css';

/** Fullscreen slide-in editorial menu. */
export function MenuDrawer() {
  const { isOpen, close } = useMenu();

  return (
    <div className={`layr-drawer-overlay${isOpen ? ' is-open' : ''}`}>
      <div className="layr-drawer-header">
        <div className="drawer-brand">
          <img src={logos.mark} alt="Story Lens Logo" className="drawer-brand-logo" />
          <span className="drawer-brand-label">// DIRECTORY</span>
        </div>
        <button
          className="btn-close-drawer"
          onClick={() => {
            playShutter();
            close();
          }}
        >
          ✕ CLOSE
        </button>
      </div>

      <div className="layr-drawer-links">
        {drawerLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className="layr-drawer-link"
            onClick={() => {
              playShutter();
              close();
            }}
          >
            <span className="drawer-num">{String(i + 1).padStart(2, '0')}</span>
            <span>{link.label}</span>
          </a>
        ))}
      </div>

      <div className="drawer-footer">
        <div>VANCOUVER • TORONTO • LONDON • DUBAI</div>
        <div className="drawer-footer-accent">24.00 FPS // 8K RAW MASTER</div>
      </div>
    </div>
  );
}
