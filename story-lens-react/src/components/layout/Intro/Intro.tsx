import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { videos } from '@/assets';
import './Intro.css';

const LEAVE_MS = 900;
const MAX_WAIT_MS = 12000;
const PLAYBACK_RATE = 3;

/** Full-screen logo video that plays on load, then fades away (Esc skips it). */
export function Intro() {
  const [mounted, setMounted] = useState(
    () => !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  );
  const [leaving, setLeaving] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const doneRef = useRef(false);

  // Lock scrolling and start at the top while the intro is up.
  useLayoutEffect(() => {
    if (!mounted) return;
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.classList.add('sl-intro-active');
    return () => document.documentElement.classList.remove('sl-intro-active');
  }, [mounted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!mounted || !video) return;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      document.documentElement.classList.remove('sl-intro-active');
      setLeaving(true);
      window.setTimeout(() => {
        video.pause();
        video.removeAttribute('src');
        video.load();
        setMounted(false);
      }, LEAVE_MS);
    };

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && finish();
    const setRate = () => {
      video.playbackRate = PLAYBACK_RATE;
    };

    video.defaultPlaybackRate = PLAYBACK_RATE;
    setRate();
    video.addEventListener('ended', finish);
    video.addEventListener('error', finish);
    video.addEventListener('loadedmetadata', setRate);
    document.addEventListener('keydown', onKey);

    // Autoplay blocked → go straight to the site.
    video.play().catch(finish);
    const safety = window.setTimeout(finish, MAX_WAIT_MS);

    return () => {
      window.clearTimeout(safety);
      video.removeEventListener('ended', finish);
      video.removeEventListener('error', finish);
      video.removeEventListener('loadedmetadata', setRate);
      document.removeEventListener('keydown', onKey);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className={`sl-intro${leaving ? ' is-leaving' : ''}`} role="dialog" aria-label="Intro">
      <video
        ref={videoRef}
        className="sl-intro-video"
        src={videos.intro}
        autoPlay
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
