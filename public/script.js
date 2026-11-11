/**
 * STORY LENS — VELOUR PRODUCTIONS HOMEPAGE ENGINE
 * Full browser-native JavaScript: Web Audio API, Canvas Cinema Visualizer,
 * Theater Modal, Interactive Cursor, and Live Telemetry.
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. CINEMA AUDIO ENGINE (Web Audio API)
  // =========================================================================
  class CinemaAudioEngine {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      return this.isMuted;
    }

    playShutter() {
      if (this.isMuted) return;
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(25, now + 0.06);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.07);

        setTimeout(() => {
          if (!this.ctx || this.isMuted) return;
          const t2 = this.ctx.currentTime;
          const osc2 = this.ctx.createOscillator();
          const gain2 = this.ctx.createGain();

          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(320, t2);
          osc2.frequency.exponentialRampToValueAtTime(50, t2 + 0.05);

          gain2.gain.setValueAtTime(0.18, t2);
          gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.05);

          osc2.connect(gain2);
          gain2.connect(this.ctx.destination);
          osc2.start(t2);
          osc2.stop(t2 + 0.06);
        }, 50);
      } catch (e) {}
    }
  }

  const audio = new CinemaAudioEngine();

  // =========================================================================
  // 2. AUDIO CLICKS ON INTERACTIVE CONTROLS
  // =========================================================================
  document.querySelectorAll('.btn-start-project, .btn-submit-velour, .btn-layr-project, .work-card').forEach(el => {
    el.addEventListener('click', () => {
      audio.playShutter();
    });
  });

  // =========================================================================
  // 3. FULL-WIDTH SHOWREEL CANVAS ENGINE & FOLLOW FOCUS
  // =========================================================================
  const cinemaCanvas = document.getElementById('showreelCanvas');
  const timecodeEl = document.getElementById('showreelTimecode');
  const focusReadout = document.getElementById('focusDistanceReadout');
  const focusButtons = document.querySelectorAll('.focus-stop-btn');

  // Follow focus buttons interaction
  focusButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      focusButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const blur = btn.getAttribute('data-blur') || '0';
      const dist = btn.getAttribute('data-dist') || '3.0 METERS';
      if (focusReadout) focusReadout.textContent = dist;
      if (cinemaCanvas) {
        cinemaCanvas.style.transition = 'filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        cinemaCanvas.style.filter = `blur(${blur}px)`;
      }
      audio.playShutter();
    });
  });

  if (cinemaCanvas) {
    const ctx = cinemaCanvas.getContext('2d');
    let frame = 0;

    function resizeCanvas() {
      if (cinemaCanvas.parentElement) {
        cinemaCanvas.width = cinemaCanvas.parentElement.clientWidth || window.innerWidth;
        cinemaCanvas.height = cinemaCanvas.parentElement.clientHeight || window.innerHeight;
      }
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function renderCanvas() {
      frame++;
      const w = cinemaCanvas.width;
      const h = cinemaCanvas.height;
      const time = frame * 0.014;

      // Dark obsidian canvas base
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, w, h);

      // Dynamic studio headlights / moving light rays
      const lightX = w * 0.5 + Math.sin(time * 0.8) * (w * 0.25);
      const lightY = h * 0.52 + Math.cos(time * 0.6) * (h * 0.15);

      const radGrad = ctx.createRadialGradient(lightX, lightY, 10, lightX, lightY, w * 0.6);
      radGrad.addColorStop(0, 'rgba(212, 175, 55, 0.22)');
      radGrad.addColorStop(0.35, 'rgba(212, 175, 55, 0.05)');
      radGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, w, h);

      // Horizontal anamorphic golden flare streak
      const streakGrad = ctx.createLinearGradient(0, lightY - 2, w, lightY + 2);
      streakGrad.addColorStop(0, 'rgba(212, 175, 55, 0)');
      streakGrad.addColorStop(0.25, 'rgba(212, 175, 55, 0.18)');
      streakGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.7)');
      streakGrad.addColorStop(0.75, 'rgba(212, 175, 55, 0.18)');
      streakGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = streakGrad;
      ctx.fillRect(0, lightY - 3, w, 6);

      // Secondary specular satellite flare
      const satX = w - lightX;
      const satGrad = ctx.createRadialGradient(satX, lightY, 2, satX, lightY, 35);
      satGrad.addColorStop(0, 'rgba(245, 226, 152, 0.3)');
      satGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = satGrad;
      ctx.beginPath();
      ctx.arc(satX, lightY, 35, 0, Math.PI * 2);
      ctx.fill();

      // Rule of thirds reticle lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w * 0.33, 0); ctx.lineTo(w * 0.33, h);
      ctx.moveTo(w * 0.66, 0); ctx.lineTo(w * 0.66, h);
      ctx.moveTo(0, h * 0.33); ctx.lineTo(w, h * 0.33);
      ctx.moveTo(0, h * 0.66); ctx.lineTo(w, h * 0.66);
      ctx.stroke();

      // Timecode rolling ticker
      if (timecodeEl && frame % 2 === 0) {
        const totalSec = Math.floor(frame / 24);
        const frames = (frame % 24).toString().padStart(2, '0');
        const sec = (totalSec % 60).toString().padStart(2, '0');
        const min = (Math.floor(totalSec / 60) % 60).toString().padStart(2, '0');
        timecodeEl.textContent = `00:${min}:${sec}:${frames}`;
      }

      requestAnimationFrame(renderCanvas);
    }
    renderCanvas();
  }

  // =========================================================================
  // 4. THEATER SCREENING MODAL
  // =========================================================================
  const theaterModal = document.getElementById('theaterModal');
  const theaterCloseBtn = document.getElementById('theaterCloseBtn');
  const theaterProjectTitle = document.getElementById('theaterProjectTitle');
  const theaterClient = document.getElementById('theaterClient');

  function openTheater(title, client) {
    if (!theaterModal) return;
    audio.playShutter();
    if (theaterProjectTitle) theaterProjectTitle.textContent = (title || 'STORY LENS MASTER CUT').toUpperCase();
    if (theaterClient) theaterClient.textContent = (client || 'DIRECTOR\'S ARCHIVE').toUpperCase();
    theaterModal.classList.add('active');
  }

  function closeTheater() {
    if (!theaterModal) return;
    audio.playShutter();
    theaterModal.classList.remove('active');
  }

  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title');
      const client = card.getAttribute('data-client');
      openTheater(title, client);
    });
  });

  const heroPlayTrigger = document.getElementById('heroPlayTrigger');
  if (heroPlayTrigger) {
    heroPlayTrigger.addEventListener('click', () => {
      openTheater('2026 Director\'s Reel', 'Velour & Story Lens Showcase');
    });
  }

  if (theaterCloseBtn) theaterCloseBtn.addEventListener('click', closeTheater);
  if (theaterModal) {
    theaterModal.addEventListener('click', (e) => {
      if (e.target === theaterModal) closeTheater();
    });
  }

  // =========================================================================
  // 5. LIVE WORLD CLOCKS (VANCOUVER, LONDON, DUBAI)
  // =========================================================================
  const vancouverClock = document.getElementById('vancouverClock');
  const londonClock = document.getElementById('londonClock');
  const dubaiClock = document.getElementById('dubaiClock');

  function updateClocks() {
    const now = new Date();
    if (vancouverClock) {
      vancouverClock.textContent = now.toLocaleTimeString('en-US', { timeZone: 'America/Vancouver', hour12: false });
    }
    if (londonClock) {
      londonClock.textContent = now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour12: false });
    }
    if (dubaiClock) {
      dubaiClock.textContent = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Dubai', hour12: false });
    }
  }
  // World clocks
  setInterval(updateClocks, 1000);
  updateClocks();

  // LAYR Hero Banner: [ SOUND: ON ] Audio Toggle
  const layrSoundToggle = document.getElementById('layrSoundToggle');
  const soundStatusLabel = document.getElementById('soundStatusLabel');
  if (layrSoundToggle) {
    layrSoundToggle.addEventListener('click', () => {
      const isMuted = audio.toggleMute();
      if (soundStatusLabel) {
        soundStatusLabel.textContent = isMuted ? 'OFF' : 'ON';
      }
      audio.playShutter();
    });
  }

  // LAYR Hero Banner: (↓) SCROLL Trigger
  const layrScrollBtn = document.getElementById('layrScrollBtn');
  if (layrScrollBtn) {
    layrScrollBtn.addEventListener('click', () => {
      audio.playShutter();
      const target = document.getElementById('editorial-reel') || document.getElementById('services');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Editorial Reel: (↓) SCROLL Trigger
  const reelScrollBtn = document.getElementById('reelScrollBtn');
  if (reelScrollBtn) {
    reelScrollBtn.addEventListener('click', () => {
      audio.playShutter();
      const target = document.getElementById('showcase') || document.getElementById('services');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // =========================================================================
  // LAYR FULLSCREEN EDITORIAL MENU DRAWER
  // =========================================================================
  const layrDrawer = document.getElementById('layrDrawer');
  const btnLayrMenu = document.getElementById('btnLayrMenu');
  const btnReelMenu = document.getElementById('btnReelMenu');
  const btnCloseDrawer = document.getElementById('btnCloseDrawer');

  if (btnLayrMenu && layrDrawer) {
    btnLayrMenu.addEventListener('click', () => {
      audio.playShutter();
      layrDrawer.classList.add('is-open');
    });
  }

  if (btnReelMenu && layrDrawer) {
    btnReelMenu.addEventListener('click', () => {
      audio.playShutter();
      layrDrawer.classList.add('is-open');
    });
  }

  if (btnCloseDrawer && layrDrawer) {
    btnCloseDrawer.addEventListener('click', () => {
      audio.playShutter();
      layrDrawer.classList.remove('is-open');
    });
  }

  document.querySelectorAll('.layr-drawer-link').forEach(link => {
    link.addEventListener('click', () => {
      audio.playShutter();
      if (layrDrawer) layrDrawer.classList.remove('is-open');
    });
  });

  // Audience Showcase interactions
  const btnShowcaseStart = document.getElementById('btnShowcaseStart');
  if (btnShowcaseStart) {
    btnShowcaseStart.addEventListener('click', () => {
      audio.playShutter();
    });
  }
  document.querySelectorAll('.sl-marquee-card').forEach(card => {
    card.addEventListener('click', () => {
      audio.playShutter();
    });
  });

  // =========================================================================
  // CAMERA FOCUS RETICLE CURSOR CONTROLLER (HERO BANNER)
  // Replaces default cursor on #hero-banner with custom camera focus crosshair
  // =========================================================================
  const heroBannerSection = document.getElementById('hero-banner');
  const focusReticle = document.getElementById('bannerFocusReticle');

  if (heroBannerSection && focusReticle) {
    let mouseX = -100;
    let mouseY = -100;
    let targetX = -100;
    let targetY = -100;
    let isInsideBanner = false;
    let rafId = null;

    function renderReticle() {
      // 1:1 instant precision tracking
      targetX += (mouseX - targetX) * 0.95;
      targetY += (mouseY - targetY) * 0.95;

      focusReticle.style.left = `${targetX.toFixed(1)}px`;
      focusReticle.style.top = `${targetY.toFixed(1)}px`;

      if (isInsideBanner) {
        rafId = requestAnimationFrame(renderReticle);
      }
    }

    heroBannerSection.addEventListener('mouseenter', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      targetX = mouseX;
      targetY = mouseY;
      isInsideBanner = true;
      focusReticle.classList.add('is-active');
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(renderReticle);
    });

    heroBannerSection.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isInsideBanner) {
        isInsideBanner = true;
        focusReticle.classList.add('is-active');
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(renderReticle);
      }
    }, { passive: true });

    heroBannerSection.addEventListener('mouseleave', () => {
      isInsideBanner = false;
      focusReticle.classList.remove('is-active', 'is-hovering-btn');
    });

    // Camera autofocus snap on click
    heroBannerSection.addEventListener('mousedown', (e) => {
      focusReticle.classList.add('is-focused');
      // Shutter sound if not on a button/link
      if (!e.target.closest('button') && !e.target.closest('a')) {
        audio.playShutter();
      }
    });

    window.addEventListener('mouseup', () => {
      focusReticle.classList.remove('is-focused');
    });

    // Expand reticle when hovering buttons/links inside hero banner
    const bannerInteractives = heroBannerSection.querySelectorAll('button, a, .brand-monument-logo-wrap');
    bannerInteractives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        focusReticle.classList.add('is-hovering-btn');
      });
      el.addEventListener('mouseleave', () => {
        focusReticle.classList.remove('is-hovering-btn');
      });
    });

    // Hide reticle if user scrolls away from banner
    window.addEventListener('scroll', () => {
      if (isInsideBanner) {
        const bannerRect = heroBannerSection.getBoundingClientRect();
        if (bannerRect.bottom <= 0 || bannerRect.top >= window.innerHeight) {
          isInsideBanner = false;
          focusReticle.classList.remove('is-active');
        }
      }
    }, { passive: true });
  }

  // =========================================================================
  // STICKY-TO-NORMAL BRAND MONUMENT CONTROLLER
  // 1. Starts large & sticky in Section 1 (white on black)
  // 2. Shrinks gradually as user scrolls towards Section 2
  // 3. Turns black as Section 2's white background slides under it
  // 4. When scroll reaches Section 2, stops being sticky, becomes NORMAL
  //    inside Section 2 at the exact reference position, and scrolls away naturally!
  // =========================================================================
  const bannerMonument = document.getElementById('bannerBrandMonument');
  const heroBanner = document.getElementById('hero-banner');
  const sec2Editorial = document.getElementById('editorial-reel');

  if (bannerMonument && heroBanner && sec2Editorial) {
    function updateStickyBrand() {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const winH = window.innerHeight;
      const sec2Top = sec2Editorial.offsetTop; // Document Y of Section 2

      // Starting position in Section 1 (reverted to original hero placement)
      // Starts in the bottom-left corner, just above the bottom text bar
      const logoWrap = bannerMonument.querySelector('.brand-monument-logo-wrap');
      const logoH = logoWrap ? logoWrap.offsetHeight : 180;
      const bottomGap = window.innerWidth <= 900 ? 140 : 72;
      const initTop = Math.max(160, winH - logoH - bottomGap);

      // Landed position inside Section 2 (lands directly in Section 2 top bar aligned with menu)
      const targetTop = 28;

      // Target scale when landed in Section 2 (made bigger for prominent end animation)
      const isMobile = window.innerWidth <= 900;
      const targetScale = isMobile ? 0.48 : 0.40;

      // 50px EXTRA STICKY SCROLL:
      // The text stays sticky for an extra 50px of scroll after reaching Section 2!
      const extraSticky = 50;
      const sec2Rect = sec2Editorial.getBoundingClientRect();
      const hasReachedSec2 = (sec2Rect.top <= -extraSticky || scrollY >= (sec2Top + extraSticky));

      if (!hasReachedSec2) {
        // --- STICKY PHASE (Shrinks gradually as you scroll down, stays sticky through 50px extra scroll) ---
        // Ensure element is attached to body for full viewport fixed positioning
        if (bannerMonument.parentElement !== document.body) {
          document.body.insertBefore(bannerMonument, heroBanner);
        }

        const p = Math.min(1, Math.max(0, scrollY / Math.max(1, sec2Top)));
        const scale = 1.0 - p * (1.0 - targetScale);
        const currentTop = initTop + (targetTop - initTop) * p;

        bannerMonument.style.position = 'fixed';
        bannerMonument.style.top = `${currentTop.toFixed(1)}px`;
        bannerMonument.style.left = 'clamp(24px, 4vw, 48px)';
        bannerMonument.style.transform = `scale(${scale.toFixed(3)})`;
        bannerMonument.style.zIndex = '85';

        // Check if white Section 2 has reached the logo position
        const isOverWhite = (sec2Rect.top <= currentTop + 45);
        bannerMonument.classList.toggle('is-light-theme', isOverWhite);
      } else {
        // --- NOT STICKY AFTER 50PX EXTRA SCROLL IN SECTION 2 ---
        // Dock element inside Section 2 so it is a natural, static child of Section 2
        // and scrolls away naturally with Section 2 (completely non-sticky)!
        if (bannerMonument.parentElement !== sec2Editorial) {
          sec2Editorial.appendChild(bannerMonument);
        }

        bannerMonument.style.position = 'absolute';
        bannerMonument.style.top = `${(targetTop + extraSticky).toFixed(1)}px`;
        bannerMonument.style.left = 'clamp(24px, 4vw, 48px)';
        bannerMonument.style.transform = `scale(${targetScale})`;
        bannerMonument.style.zIndex = '2';
        bannerMonument.classList.add('is-light-theme');
      }
    }

    // Click on brand text scrolls smoothly to top
    bannerMonument.addEventListener('click', () => {
      audio.playShutter();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', updateStickyBrand, { passive: true });
    window.addEventListener('resize', updateStickyBrand);
    updateStickyBrand();
  }

  // =========================================================================
  // CINEMATIC GALLERY REVEAL SCROLL ENGINE (3x3 PINNED EDITORIAL ARCHIVE)
  // =========================================================================
  const cgrStage = document.getElementById('gallery-reveal');
  const cgrStickyViewport = cgrStage ? cgrStage.querySelector('.cgr-sticky-viewport') : null;
  const cgrHeroInner = document.getElementById('cgrHeroInner');
  const cgrGallery = document.getElementById('cgrGallery');
  const cgrMark = document.getElementById('cgrMark');
  const cgrFooter = document.getElementById('cgrFooter');
  const cgrButton = document.getElementById('cgrButton');
  const cgrOverlay = document.getElementById('cgrOverlay');

  if (cgrStage && cgrStickyViewport && cgrGallery && cgrMark && cgrFooter && cgrHeroInner && cgrOverlay) {
    const cgrCards = Array.from(cgrGallery.querySelectorAll('.cgr-card img'));
    const cgrWords = Array.from(document.querySelectorAll('.cgr-word'));
    const clamp = (val, min, max) => Math.min(max, Math.max(min, val));
    const mix = (from, to, progress) => from + (to - from) * progress;
    const clampProgress = (value, start, end) => clamp((value - start) / (end - start), 0, 1);

    if (cgrButton) {
      cgrButton.addEventListener('click', (e) => {
        audio.playShutter();
        const target = document.getElementById('services');
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    function updateCinematicGallery() {
      const rect = cgrStage.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollDist = cgrStage.offsetHeight - viewportHeight;
      if (scrollDist <= 0) return;

      const progress = clamp(-rect.top / scrollDist, 0, 1);
      const isMobile = window.innerWidth <= 900;
      const startingMarkScale = isMobile ? 2.2 : 5.0;

      // ── 0. BULLETPROOF PINNING ──
      // Pure CSS position: sticky handles 60fps/120fps GPU pinning natively.
      // Fail-safe transform ensures rock-solid lock even on older browsers where sticky might encounter quirks.
      const stickyRect = cgrStickyViewport.getBoundingClientRect();
      if (rect.top <= 0 && rect.top >= -scrollDist) {
        if (Math.abs(stickyRect.top) > 4) {
          cgrStickyViewport.style.transform = `translateY(${-rect.top}px)`;
        } else {
          cgrStickyViewport.style.transform = '';
        }
      } else {
        cgrStickyViewport.style.transform = '';
      }

      // 1. Gallery zoom & settle into 3x3 composition (0 -> 0.70)
      const galleryProgress = clampProgress(progress, 0, 0.70);
      const targetGalleryScale = isMobile ? 0.32 : 0.36;
      const galleryScale = mix(1.0, targetGalleryScale, galleryProgress);
      cgrGallery.style.transform = `translate(-50%, -50%) scale(${galleryScale.toFixed(3)})`;

      const imgScale = mix(1.28, 1.0, galleryProgress);
      cgrCards.forEach(img => {
        img.style.transform = `scale(${imgScale.toFixed(3)})`;
      });

      // 2. Mark travel & scale (translate first, then scale around bottom-left)
      const markScale = mix(startingMarkScale, 1.0, galleryProgress);
      const markTravel = viewportHeight - (cgrMark.offsetHeight || 42) - 64;
      const markY = -markTravel * galleryProgress;
      cgrMark.style.transform = `translateY(${markY.toFixed(1)}px) scale(${markScale.toFixed(3)})`;

      // 3. Footer blur & fade (0.03 -> 0.22)
      const footerProgress = clampProgress(progress, 0.03, 0.22);
      cgrFooter.style.opacity = mix(1, 0, footerProgress).toFixed(2);
      cgrFooter.style.transform = `scale(${mix(1, 0.8, footerProgress).toFixed(3)})`;
      cgrFooter.style.filter = `blur(${mix(0, 16, footerProgress).toFixed(1)}px)`;

      // 4. Word-by-word reveal (0.12 -> 0.65)
      const revealItems = [...cgrWords, cgrButton].filter(Boolean);
      const revealStart = 0.12;
      const revealEnd = 0.65;
      const revealSpacing = (revealEnd - revealStart) / Math.max(revealItems.length, 1);

      revealItems.forEach((element, index) => {
        const itemStart = revealStart + revealSpacing * index;
        const itemProgress = clampProgress(progress, itemStart, itemStart + revealSpacing * 2.5);
        const itemY = mix(16, 0, itemProgress);
        element.style.opacity = itemProgress.toFixed(2);
        element.style.transform = `translateY(${itemY.toFixed(1)}px)`;
      });

      if (cgrButton) {
        const btnStart = revealStart + revealSpacing * (revealItems.length - 1);
        const btnProgress = clampProgress(progress, btnStart, btnStart + revealSpacing * 2.5);
        cgrButton.style.pointerEvents = btnProgress > 0.5 ? 'auto' : 'none';
      }

      // 5. Final handoff: lift inner stage and crossfade overlay (0.78 -> 1.0)
      const handoffProgress = clampProgress(progress, 0.78, 1.0);
      const handoffY = mix(0, -16, handoffProgress);
      const handoffScale = mix(1.0, 0.95, handoffProgress);
      cgrHeroInner.style.transform = `translateY(${handoffY.toFixed(1)}%) scale(${handoffScale.toFixed(3)})`;
      cgrOverlay.style.opacity = mix(0, 0.96, handoffProgress).toFixed(2);
    }

    window.addEventListener('scroll', updateCinematicGallery, { passive: true });
    window.addEventListener('resize', updateCinematicGallery);
    updateCinematicGallery();
  }

  // =========================================================================
  // EDITORIAL REEL KINETIC ENGINE (EXACT LAYR MEDIA CONTINUOUS DRIFT + DYNAMIC SCALING)
  // =========================================================================
  const reelContainer = document.getElementById('reelScrollContainer');
  const reelTrack = document.getElementById('reelMediaTrack');
  const editorialSection = document.getElementById('editorial-reel');

  if (reelContainer && reelTrack) {
    const cards = Array.from(reelTrack.querySelectorAll('.reel-card'));
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;
    let isHoveringCard = false;
    let mouseVelocity = 0;
    
    // Slow auto-drift: negative speed smoothly glides cards from left to right!
    // As cards glide towards the right, they start small on the left and scale up gradually!
    const autoSpeed = -0.55;

    // Nominal length of 1 full cycle of 6 cards (total 18 cards = 3 sets)
    function getSetLength() {
      return (reelTrack.scrollWidth / 3) || 1200;
    }

    // Initialize scroll position in the center set for seamless infinite wrapping in both directions
    let setLength = getSetLength();
    let currentScroll = setLength;
    let targetScroll = setLength;
    reelContainer.scrollLeft = currentScroll;

    // Recalculate dynamic card scale and margin compensation on every frame
    function updateCardScales() {
      const containerRect = reelContainer.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerLeft = containerRect.left;
      
      // Scaling boundaries across the visible window:
      // xMin: cards near left boundary start small
      // xMax: cards near right boundary reach maximum scale
      const xMin = 30;
      const xMax = containerWidth - 30;
      const minScale = 0.35;
      const maxScale = 1.08;
      const baseWidth = (cards[0] && cards[0].offsetWidth) || 220;
      const targetGap = 16; // strict 16px gap between all cards regardless of scale

      // Batch READ phase
      const rects = cards.map(c => c.getBoundingClientRect());

      // Batch WRITE phase
      for (let i = 0; i < cards.length; i++) {
        const cardCenter = rects[i].left + rects[i].width / 2 - containerLeft;
        const progress = Math.max(0, Math.min(1, (cardCenter - xMin) / (xMax - xMin)));
        // Smooth non-linear curve for progressive escalation
        const scale = minScale + (maxScale - minScale) * Math.pow(progress, 0.86);
        const visWidth = baseWidth * scale;
        const marginPerSide = -(baseWidth - visWidth) / 2 + targetGap / 2;

        cards[i].style.transform = `scale(${scale.toFixed(3)})`;
        cards[i].style.marginLeft = `${marginPerSide.toFixed(1)}px`;
        cards[i].style.marginRight = `${marginPerSide.toFixed(1)}px`;
      }
    }

    // Automatic Kinetic Drift Loop
    function animateReel() {
      setLength = getSetLength();

      if (!isDragging && !isHoveringCard) {
        targetScroll += autoSpeed + mouseVelocity;

        // Infinite seamless loop wrapping:
        // When scrolling to the left (currentScroll drops below 0.35 * setLength), shift right by 1 full set
        if (targetScroll < setLength * 0.35) {
          targetScroll += setLength;
          currentScroll += setLength;
          reelContainer.scrollLeft = currentScroll;
        }
        // When scrolling to the right (currentScroll exceeds 1.85 * setLength), shift left by 1 full set
        else if (targetScroll > setLength * 1.85) {
          targetScroll -= setLength;
          currentScroll -= setLength;
          reelContainer.scrollLeft = currentScroll;
        }
      }

      // Smooth interpolation (lerp)
      currentScroll += (targetScroll - currentScroll) * 0.12;
      reelContainer.scrollLeft = currentScroll;

      // Update card scales based on real-time positions
      updateCardScales();

      // Decay mouse velocity
      mouseVelocity *= 0.94;

      requestAnimationFrame(animateReel);
    }

    // Initial scale calculation and start animation loop
    updateCardScales();
    requestAnimationFrame(animateReel);

    // Mouse movement inside section drives drift velocity
    if (editorialSection) {
      editorialSection.addEventListener('mousemove', (e) => {
        if (isDragging) return;
        const rect = editorialSection.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to +0.5
        mouseVelocity = normX * 2.2;
      });

      editorialSection.addEventListener('mouseleave', () => {
        mouseVelocity = 0;
        isHoveringCard = false;
      });
    }

    // Card hover pause
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        isHoveringCard = true;
      });
      card.addEventListener('mouseleave', () => {
        isHoveringCard = false;
      });
      card.addEventListener('click', () => {
        audio.playShutter();
        const title = card.getAttribute('data-title') || 'Story Lens Reel';
        const category = card.getAttribute('data-category') || 'Visual Storytelling';
        openTheater(title, category);
      });
    });

    // Inertial Drag-to-Scroll
    reelContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - reelContainer.offsetLeft;
      scrollStart = reelContainer.scrollLeft;
      targetScroll = scrollStart;
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        targetScroll = reelContainer.scrollLeft;
        currentScroll = reelContainer.scrollLeft;
      }
    });

    reelContainer.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - reelContainer.offsetLeft;
      const walk = (x - startX) * 1.5;
      targetScroll = scrollStart - walk;
      currentScroll = targetScroll;
      reelContainer.scrollLeft = targetScroll;
    });

    // Touch support for mobile devices
    reelContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].pageX - reelContainer.offsetLeft;
      scrollStart = reelContainer.scrollLeft;
      targetScroll = scrollStart;
    }, { passive: true });

    reelContainer.addEventListener('touchend', () => {
      isDragging = false;
      targetScroll = reelContainer.scrollLeft;
      currentScroll = reelContainer.scrollLeft;
    });

    reelContainer.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - reelContainer.offsetLeft;
      const walk = (x - startX) * 1.5;
      targetScroll = scrollStart - walk;
      currentScroll = targetScroll;
      reelContainer.scrollLeft = targetScroll;
    }, { passive: true });

    // Scroll-driven horizontal parallax
    window.addEventListener('scroll', () => {
      if (!editorialSection) return;
      const rect = editorialSection.getBoundingClientRect();
      const winH = window.innerHeight;
      if (rect.top < winH && rect.bottom > 0) {
        const factor = (winH - rect.top) / (winH + rect.height);
        targetScroll += (factor - 0.5) * 1.2;
      }
    }, { passive: true });

    // Window resize handler to maintain proper scales and scroll
    window.addEventListener('resize', () => {
      updateCardScales();
    });
  }





  // Project Inquiry Form Submission
  const velourContactForm = document.getElementById('velourContactForm');
  const formSuccessBanner = document.getElementById('formSuccessBanner');

  if (velourContactForm) {
    velourContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      audio.playShutter();
      if (formSuccessBanner) {
        formSuccessBanner.style.display = 'block';
        velourContactForm.style.opacity = '0.4';
        velourContactForm.style.pointerEvents = 'none';
      }
    });
  }

  // =========================================================================
  // 6. EXPLODED CINE-RIG 3D SCRUB & MODULE INSPECTOR
  // =========================================================================
  const rigSlider = document.getElementById('rigScrubSlider');
  const rigPercentLabel = document.getElementById('rigPercentLabel');
  const rigParts = document.querySelectorAll('.rig-floating-part');
  const rigModuleBadge = document.getElementById('rigModuleBadge');
  const rigInspectorTitle = document.getElementById('rigInspectorTitle');
  const rigInspectorSpec = document.getElementById('rigInspectorSpec');
  const rigInspectorDesc = document.getElementById('rigInspectorDesc');
  const rigInspectorPipeline = document.getElementById('rigInspectorPipeline');

  function updateRig(factor) {
    if (rigPercentLabel) {
      rigPercentLabel.textContent = `${Math.round(factor * 100)}%`;
    }
    rigParts.forEach(part => {
      const baseOffset = parseFloat(part.getAttribute('data-offset')) || 0;
      const x = baseOffset * (factor * 2.1);
      const rotY = (baseOffset / 160) * (factor * 20);
      part.style.transform = `translateX(${x}px) perspective(900px) rotateY(${rotY}deg)`;
    });
  }

  if (rigSlider) {
    rigSlider.addEventListener('input', (e) => {
      updateRig(parseFloat(e.target.value));
    });
    // Initial call
    updateRig(parseFloat(rigSlider.value || 0.65));
  }

  rigParts.forEach(part => {
    part.addEventListener('click', () => {
      rigParts.forEach(p => p.classList.remove('selected'));
      part.classList.add('selected');

      const code = part.getAttribute('data-code');
      const name = part.getAttribute('data-name');
      const spec = part.getAttribute('data-spec');
      const desc = part.getAttribute('data-desc');
      const pipeline = part.getAttribute('data-pipeline');

      if (rigModuleBadge && code) rigModuleBadge.textContent = code;
      if (rigInspectorTitle && name) rigInspectorTitle.textContent = name;
      if (rigInspectorSpec && spec) rigInspectorSpec.textContent = 'SPEC: ' + spec;
      if (rigInspectorDesc && desc) rigInspectorDesc.textContent = desc;
      if (rigInspectorPipeline && pipeline) rigInspectorPipeline.textContent = pipeline;

      audio.playShutter();
    });
  });

  // =========================================================================
  // 7. RAW-TO-GRADE COMPARISON STAGE DRAGGER
  // =========================================================================
  const splitViewport = document.querySelector('.split-slider-viewport');
  if (splitViewport) {
    let isDragging = false;

    function handleSplitMove(clientX) {
      const rect = splitViewport.getBoundingClientRect();
      let posPercent = ((clientX - rect.left) / rect.width) * 100;
      posPercent = Math.max(3, Math.min(97, posPercent));
      splitViewport.style.setProperty('--split-pos', `${posPercent.toFixed(1)}%`);
    }

    splitViewport.addEventListener('mousedown', (e) => {
      isDragging = true;
      handleSplitMove(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        handleSplitMove(e.clientX);
      }
    });

    // Touch events for mobile
    splitViewport.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        handleSplitMove(e.touches[0].clientX);
      }
    }, { passive: true });

    splitViewport.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        handleSplitMove(e.touches[0].clientX);
      }
    }, { passive: true });
  }

  // =========================================================================
  // 8. SMOOTH ANCHOR SCROLLING
  // =========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          audio.playShutter();
        }
      }
    });
  });

  // =========================================================================
  // 9. SCROLL REVEAL OBSERVER (ANIMATIONS ON EVERY SECTION)
  // =========================================================================
  const revealElements = document.querySelectorAll(
    '.reveal-on-scroll, .reveal-scale, .reveal-left, .reveal-right, .gold-divider-draw'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // =========================================================================
  // 10. TOP SCROLL PROGRESS BAR & FLOATING BACK TO TOP WITH PROGRESS RING
  // =========================================================================
  const scrollProgressLine = document.getElementById('scrollProgressLine');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const progressRingCircle = document.getElementById('progressRingCircle');
  const totalRingCircumference = 157; // 2 * PI * 25

  function handleScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgressLine) {
      scrollProgressLine.style.width = `${scrollPercent}%`;
    }

    if (progressRingCircle) {
      const offset = totalRingCircumference - (totalRingCircumference * scrollPercent) / 100;
      progressRingCircle.style.strokeDashoffset = offset;
    }

    if (backToTopBtn) {
      if (scrollTop > 380) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScrollProgress, { passive: true });
  handleScrollProgress();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      audio.playShutter();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =========================================================================
  // 11. 3D MOUSE PARALLAX & TILT ON WORK CARDS & LAYR STAGE CARDS
  // =========================================================================
  if (!window.matchMedia('(pointer: coarse)').matches) {
    document.querySelectorAll('.work-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });


  }

  // =========================================================================
  // 12. SCROLL-DRIVEN EXPLODED CINE-RIG PROGRESSION
  // =========================================================================
  const cineRigSection = document.getElementById('cine-rig');
  if (cineRigSection && rigSlider) {
    let userHasInteracted = false;

    rigSlider.addEventListener('mousedown', () => { userHasInteracted = true; });
    rigSlider.addEventListener('touchstart', () => { userHasInteracted = true; }, { passive: true });

    window.addEventListener('scroll', () => {
      if (userHasInteracted) return;
      const rect = cineRigSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // If section is within viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
        const mappedFactor = 0.2 + progress * 0.7; // From 0.20 to 0.90
        rigSlider.value = mappedFactor.toFixed(2);
        updateRig(mappedFactor);
      }
    }, { passive: true });
  }

  // =========================================================================
  // 14. VELOUR PRODUCTIONS CAPABILITIES INTERACTIVE ENGINE (SERVICES)
  // Features: Smooth Lerp Cursor Floating Card, Sibling Dimming, Shutter Audio,
  // Dynamic Badge & Image Swap, Click-to-Screening
  // =========================================================================
  const velourCapSection = document.getElementById('services');
  const velourCapList = document.getElementById('velourCapList');
  const velourRows = velourCapList ? Array.from(velourCapList.querySelectorAll('.velour-cap-row')) : [];
  const velourFloatCard = document.getElementById('velourFloatingCard');
  const velourFloatImg = document.getElementById('velourFloatingImg');
  const velourFloatBadge = document.getElementById('velourFloatingBadge');
  const velourFloatTitle = document.getElementById('velourFloatingTitle');

  if (velourCapSection && velourCapList && velourRows.length > 0 && velourFloatCard) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isHoveringList = false;
    let rafId = null;

    // Smooth Lerp Physics Loop (12% easing + velocity tilt)
    function animateFloatingCard() {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      const deltaX = (mouseX - currentX) * 0.15;
      const tilt = Math.max(-12, Math.min(12, deltaX));

      velourFloatCard.style.left = `${currentX.toFixed(1)}px`;
      velourFloatCard.style.top = `${currentY.toFixed(1)}px`;
      velourFloatCard.style.transform = `translate(-50%, -50%) rotate(${tilt.toFixed(2)}deg)`;

      if (isHoveringList) {
        rafId = requestAnimationFrame(animateFloatingCard);
      }
    }

    // Track mouse coordinates across the section
    velourCapSection.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isHoveringList) {
        isHoveringList = true;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(animateFloatingCard);
      }
    }, { passive: true });

    // Handle mouse leaving the section
    velourCapSection.addEventListener('mouseleave', () => {
      isHoveringList = false;
      velourFloatCard.classList.remove('is-active');
      velourCapList.classList.remove('has-hovered-child');
      velourRows.forEach(r => r.classList.remove('is-hovered'));
    });

    // Row Interactions
    velourRows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        audio.playShutter();

        // Update active class on siblings
        velourRows.forEach(r => r.classList.remove('is-hovered'));
        row.classList.add('is-hovered');
        velourCapList.classList.add('has-hovered-child');

        // Swap floating media card content
        const mediaSrc = row.getAttribute('data-media');
        const badgeText = row.getAttribute('data-badge');
        const titleText = row.getAttribute('data-title');

        if (velourFloatImg && mediaSrc) {
          velourFloatImg.src = mediaSrc;
        }
        if (velourFloatBadge && badgeText) {
          velourFloatBadge.textContent = `[ ${badgeText} ]`;
        }
        if (velourFloatTitle && titleText) {
          velourFloatTitle.textContent = titleText;
        }

        velourFloatCard.classList.add('is-active');

        if (!isHoveringList) {
          isHoveringList = true;
          rafId = requestAnimationFrame(animateFloatingCard);
        }
      });

      row.addEventListener('mouseleave', () => {
        row.classList.remove('is-hovered');
      });

      // Click: Audio feedback + open screening modal with related reel
      row.addEventListener('click', () => {
        audio.playShutter();
        const serviceName = row.getAttribute('data-service') || 'CINEMATIC PRODUCTION';
        const badge = row.getAttribute('data-badge') || '8K MASTER ARCHIVE';
        openTheater(`${serviceName} SHOWCASE`, `STORY LENS // ${badge}`);
      });
    });
  }

  // =========================================================================
  // 15. ASCENT EDITORIAL TEXT REVEAL ENGINE
  // Characters slide in with skewX(18deg) column-by-column cascade
  // =========================================================================
  const arRoot = document.getElementById('manifesto');
  if (arRoot) {
    const STAGGER = 38; // ms per character delay
    const lines = arRoot.querySelectorAll('.ar-line');

    lines.forEach(line => {
      // If characters are already split, skip
      if (line.querySelector('.ar-ch')) return;

      const text = line.textContent || '';
      line.innerHTML = '';
      let ci = 0;
      for (const ch of text) {
        if (ch === ' ') {
          const space = document.createElement('span');
          space.innerHTML = '&nbsp;';
          space.setAttribute('aria-hidden', 'true');
          line.appendChild(space);
        } else {
          const span = document.createElement('span');
          span.className = 'ar-ch';
          span.textContent = ch;
          span.style.transitionDelay = `${ci++ * STAGGER}ms`;
          line.appendChild(span);
        }
      }
    });

    const sections = arRoot.querySelectorAll('.ar-section');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      sections.forEach(s => s.classList.add('is-visible'));
    } else {
      // Instant-reset helper: disables transitions, removes is-visible, then
      // re-enables transitions after two rAF frames so chars snap to start position silently while offscreen
      function instantReset(section) {
        section.classList.add('ar-no-trans');
        section.classList.remove('is-visible');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            section.classList.remove('ar-no-trans');
          });
        });
      }

      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          const section = e.target;
          if (e.isIntersecting) {
            section.classList.add('is-visible');
          } else {
            // When scrolled out of view (both scrolling up or down), reset silently
            instantReset(section);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -2% 0px' });

      sections.forEach(s => io.observe(s));
    }
  }
});


// =========================================================================
// 07 // GOLDEN-HOUR FOOTER — mouse parallax
// =========================================================================
(function () {
  var page = document.getElementById('slFooter');
  if (!page) return;
  page.addEventListener('pointermove', function (e) {
    var r = page.getBoundingClientRect();
    page.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    page.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  });
  page.addEventListener('pointerleave', function () {
    page.style.setProperty('--mx', '0');
    page.style.setProperty('--my', '0');
  });
})();
