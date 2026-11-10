/**
 * STORY LENS — INTERACTIVE 3D DSLR (hero banner, right side)
 * A procedurally modelled DSLR (Three.js) that aims its lens at the cursor.
 * Click / tap anywhere in the banner to fire the shutter.
 * Three.js is loaded on demand from a CDN, so no build step is needed.
 */
(function () {
  var section = document.getElementById('hero-banner');
  var host = document.getElementById('heroDslr');
  if (!section || !host) return;

  var mount = host.querySelector('.dslr-canvas-wrap');
  var loading = host.querySelector('.dslr-loading');
  var flash = host.querySelector('.dslr-flash');
  var shotsEl = host.querySelector('.dslr-shots');

  var CDNS = [
    'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
    'https://unpkg.com/three@0.160.0/build/three.module.js'
  ];

  function fail() {
    host.classList.add('is-failed');
    loading.classList.add('is-hidden');
  }

  function load(i) {
    if (i >= CDNS.length) return fail();
    import(CDNS[i]).then(init).catch(function () { load(i + 1); });
  }

  // Only start loading Three.js when the section is near the viewport
  if ('IntersectionObserver' in window) {
    var pre = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { pre.disconnect(); load(0); }
    }, { rootMargin: '600px 0px' });
    pre.observe(section);
  } else {
    load(0);
  }

  function init(THREE) {
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ------------------------------------------------------------ renderer
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) { return fail(); }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0.4, 13);

    // ------------------------------------------------------------ studio environment (for reflections)
    var pmrem = new THREE.PMREMGenerator(renderer);
    var env = new THREE.Scene();
    env.add(new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30),
      new THREE.MeshBasicMaterial({ color: 0x0b0b0b, side: THREE.BackSide })));
    function panel(w, h, color, x, y, z) {
      var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide }));
      m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m);
    }
    panel(10, 4, new THREE.Color(5, 5, 5), 0, 12, 4);          // top softbox
    panel(4, 9, new THREE.Color(4.5, 3.3, 1.3), -12, 2, 6);     // warm gold key
    panel(3, 10, new THREE.Color(3, 3, 3.2), 12, 1, -4);        // cool rim
    panel(8, 2, new THREE.Color(2.2, 1.7, 0.7), 0, -10, 8);     // gold bounce
    scene.environment = pmrem.fromScene(env, 0.04).texture;

    var key = new THREE.DirectionalLight(0xffe2a0, 1.6); key.position.set(-5, 6, 8); scene.add(key);
    var rim = new THREE.DirectionalLight(0xffffff, 2.6); rim.position.set(6, 3, -6); scene.add(rim);
    var rimGold = new THREE.DirectionalLight(0xe5c158, 2.4); rimGold.position.set(-7, 5, -5); scene.add(rimGold);
    var top = new THREE.DirectionalLight(0xffffff, 0.8); top.position.set(0, 10, 2); scene.add(top);
    scene.add(new THREE.AmbientLight(0xffffff, 0.15));

    // ------------------------------------------------------------ materials
    var M = {
      body: new THREE.MeshPhysicalMaterial({ color: 0x1c1c1c, roughness: 0.42, metalness: 0.3, clearcoat: 0.35, clearcoatRoughness: 0.5 }),
      leather: new THREE.MeshStandardMaterial({ color: 0x101010, roughness: 0.92, metalness: 0.05 }),
      rubber: new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.85, metalness: 0.0 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x1b1b1b, roughness: 0.32, metalness: 0.85 }),
      gold: new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.26, metalness: 1.0 }),
      goldSoft: new THREE.MeshStandardMaterial({ color: 0xe5c158, roughness: 0.4, metalness: 0.9 }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x0a0d14, roughness: 0.04, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.02,
        iridescence: 0.9, iridescenceIOR: 1.35, iridescenceThicknessRange: [200, 600], envMapIntensity: 2.2
      }),
      glassInner: new THREE.MeshPhysicalMaterial({ color: 0x2a1e08, roughness: 0.1, metalness: 0.3, clearcoat: 1, envMapIntensity: 1.5 }),
      void: new THREE.MeshBasicMaterial({ color: 0x020202 }),
      screen: new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.15, metalness: 0.4, emissive: 0x2a1f08, emissiveIntensity: 0.6 })
    };

    // ------------------------------------------------------------ geometry helpers
    function roundedBox(w, h, d, r) {
      var b = Math.min(r * 0.6, d * 0.25);
      var sw = w - 2 * b, sh = h - 2 * b, rr = Math.max(0.01, Math.min(r - b, sw / 2, sh / 2));
      var s = new THREE.Shape(), x = -sw / 2, y = -sh / 2;
      s.moveTo(x + rr, y);
      s.lineTo(x + sw - rr, y); s.quadraticCurveTo(x + sw, y, x + sw, y + rr);
      s.lineTo(x + sw, y + sh - rr); s.quadraticCurveTo(x + sw, y + sh, x + sw - rr, y + sh);
      s.lineTo(x + rr, y + sh); s.quadraticCurveTo(x, y + sh, x, y + sh - rr);
      s.lineTo(x, y + rr); s.quadraticCurveTo(x, y, x + rr, y);
      var g = new THREE.ExtrudeGeometry(s, { depth: d - 2 * b, bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: 5, curveSegments: 10 });
      g.center();
      return g;
    }
    function mesh(geo, mat, x, y, z, parent) {
      var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); (parent || cam).add(m); return m;
    }
    // a lens section along +Z starting at z0
    function ring(r, len, mat, z0, parent) {
      var g = new THREE.CylinderGeometry(r, r, len, 72, 1);
      g.rotateX(Math.PI / 2);
      return mesh(g, mat, 0, 0, z0 + len / 2, parent);
    }
    function ribs(r, len, z0, count, parent) {
      var g = new THREE.BoxGeometry(0.035, 0.05, len * 0.92);
      for (var i = 0; i < count; i++) {
        var a = (i / count) * Math.PI * 2;
        var m = mesh(g, M.rubber, Math.cos(a) * r, Math.sin(a) * r, z0 + len / 2, parent);
        m.rotation.z = a;
      }
    }
    function torus(r, t, mat, z, parent) {
      return mesh(new THREE.TorusGeometry(r, t, 12, 72), mat, 0, 0, z, parent);
    }

    // ------------------------------------------------------------ the camera model
    var rig = new THREE.Group();       // follows the cursor
    var cam = new THREE.Group();       // the DSLR itself (offset so it pivots near its centre)
    cam.position.z = -0.7;
    rig.add(cam);
    scene.add(rig);

    // body
    mesh(roundedBox(3.5, 2.15, 1.25, 0.3), M.body, 0, 0, 0);
    // leather band on the front
    mesh(roundedBox(3.3, 1.2, 0.08, 0.04), M.leather, 0.2, -0.25, 0.63);

    // pentaprism hump
    var prism = new THREE.Shape();
    prism.moveTo(-0.8, 0); prism.lineTo(0.8, 0); prism.lineTo(0.5, 0.66); prism.lineTo(-0.5, 0.66); prism.closePath();
    var pg = new THREE.ExtrudeGeometry(prism, { depth: 0.9, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.06, bevelSegments: 4 });
    pg.translate(0, 0, -0.45);
    mesh(pg, M.body, 0.25, 0.95, -0.05);
    // hot shoe
    mesh(new THREE.BoxGeometry(0.55, 0.06, 0.5), M.dark, 0.25, 1.72, -0.05);
    mesh(new THREE.BoxGeometry(0.45, 0.03, 0.4), M.gold, 0.25, 1.76, -0.05);
    // gold brand plate on the prism front
    var plate = mesh(new THREE.BoxGeometry(0.7, 0.12, 0.02), M.goldSoft, 0.25, 1.32, 0.52);
    plate.rotation.x = -0.42;

    // grip (viewer's left)
    mesh(roundedBox(0.95, 2.25, 1.05, 0.34), M.leather, -1.35, -0.05, 0.42);
    // shutter button + collar
    var shutter = mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.09, 40), M.gold, -1.35, 1.14, 0.55);
    var collar = torus(0.2, 0.04, M.dark, 0, cam); collar.rotation.x = Math.PI / 2; collar.position.set(-1.35, 1.1, 0.55);
    // command dial by the shutter
    var cd = mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.12, 48), M.dark, -0.62, 1.12, -0.25);
    // mode dial (right)
    var md = mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.22, 48), M.dark, 1.15, 1.18, -0.1);
    var mdr = torus(0.38, 0.025, M.gold, 0, cam); mdr.rotation.x = Math.PI / 2; mdr.position.set(1.15, 1.29, -0.1);
    for (var k = 0; k < 24; k++) {
      var a = (k / 24) * Math.PI * 2;
      var notch = mesh(new THREE.BoxGeometry(0.03, 0.2, 0.05), M.body, 1.15 + Math.cos(a) * 0.385, 1.18, -0.1 + Math.sin(a) * 0.385);
      notch.rotation.y = -a;
    }
    // AF assist lamp + lens release button
    mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.04, 24).rotateX(Math.PI / 2), M.goldSoft, -0.75, 0.7, 0.66);
    mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.06, 24).rotateX(Math.PI / 2), M.dark, 1.42, -0.15, 0.64);
    // strap lugs
    var lugL = torus(0.1, 0.03, M.dark, 0, cam); lugL.position.set(-1.85, 0.75, 0); lugL.rotation.y = Math.PI / 2;
    var lugR = torus(0.1, 0.03, M.dark, 0, cam); lugR.position.set(1.78, 0.75, 0); lugR.rotation.y = Math.PI / 2;
    // eyepiece + rear screen
    mesh(roundedBox(0.75, 0.55, 0.35, 0.12), M.rubber, 0.25, 1.15, -0.75);
    mesh(new THREE.BoxGeometry(2.3, 1.4, 0.03), M.screen, 0.3, -0.2, -0.64);

    // lens (axis = +Z), centred on the mount
    var lens = new THREE.Group();
    lens.position.set(0.25, -0.12, 0.62);
    lens.scale.set(0.8, 0.8, 1);          // real-world lens-to-body proportion
    cam.add(lens);
    var z = 0;
    ring(1.02, 0.14, M.dark, z, lens); torus(1.02, 0.035, M.gold, z + 0.02, lens); z += 0.14;   // mount
    ring(0.94, 0.45, M.body, z, lens); z += 0.45;                                                // barrel
    var zoom = new THREE.Group(); lens.add(zoom);
    ring(0.97, 0.62, M.rubber, z, zoom); ribs(0.985, 0.62, z, 64, zoom); z += 0.62;              // zoom ring
    ring(1.0, 0.05, M.gold, z, lens); z += 0.05;                                                 // gold accent
    ring(0.96, 0.32, M.body, z, lens); z += 0.32;                                                // barrel 2
    var focus = new THREE.Group(); lens.add(focus);
    ring(1.0, 0.34, M.rubber, z, focus); ribs(1.015, 0.34, z, 72, focus); z += 0.34;             // focus ring
    ring(1.07, 0.2, M.dark, z, lens); z += 0.2;                                                  // front rim
    torus(1.0, 0.03, M.gold, z - 0.02, lens);                                                    // gold front ring
    // recessed optics
    ring(0.9, 0.06, M.void, z - 0.1, lens);
    torus(0.82, 0.018, M.goldSoft, z - 0.05, lens);
    torus(0.6, 0.012, M.dark, z - 0.08, lens);
    var inner = new THREE.Mesh(new THREE.SphereGeometry(1.4, 64, 32, 0, Math.PI * 2, 0, Math.asin(0.55 / 1.4)), M.glassInner);
    inner.rotation.x = Math.PI / 2; inner.position.z = z - 0.12 - 1.4 * Math.cos(Math.asin(0.55 / 1.4)); lens.add(inner);
    var capR = 1.7, capA = Math.asin(0.86 / capR);
    var front = new THREE.Mesh(new THREE.SphereGeometry(capR, 96, 48, 0, Math.PI * 2, 0, capA), M.glass);
    front.rotation.x = Math.PI / 2;
    front.position.z = z - 0.08 - capR * Math.cos(capA);
    lens.add(front);

    // centre the whole model
    var box = new THREE.Box3().setFromObject(cam);
    var c = box.getCenter(new THREE.Vector3());
    cam.position.x -= c.x; cam.position.y -= c.y;

    // ------------------------------------------------------------ layout + resize
    var baseX = 0, baseY = 0;
    function resize() {
      var w = mount.clientWidth, h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // keep the whole camera (plus room to turn) in frame at any container shape
      camera.position.z = Math.max(9.6, 12.4 / camera.aspect);
      camera.updateProjectionMatrix();
    }
    resize();
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(mount);
    else window.addEventListener('resize', resize);

    // ------------------------------------------------------------ interaction
    var target = { x: 0, y: 0 }, active = false, lastMove = 0;
    function clamp(v) { return Math.max(-1, Math.min(1, v)); }
    // aim relative to the camera's own position, so the lens points at the cursor
    function onMove(cx, cy) {
      var r = host.getBoundingClientRect(), sr = section.getBoundingClientRect();
      target.x = clamp((cx - (r.left + r.width / 2)) / (sr.width * 0.5));
      target.y = clamp((cy - (r.top + r.height / 2)) / (sr.height * 0.5));
      active = true; lastMove = performance.now();
    }
    section.addEventListener('pointermove', function (e) { onMove(e.clientX, e.clientY); });
    section.addEventListener('pointerdown', function (e) { onMove(e.clientX, e.clientY); }); // tap aims on touch screens
    section.addEventListener('pointerleave', function () { active = false; });

    var shots = 0, kick = 0;
    section.addEventListener('click', function (e) {
      if (e.target.closest('a,button,.brand-monument-logo-wrap')) return;
      shots++;
      if (shotsEl) shotsEl.textContent = String(shots).padStart(4, '0');
      kick = 1;
      flash.classList.remove('is-firing'); void flash.offsetWidth; flash.classList.add('is-firing');
    });

    // ------------------------------------------------------------ render loop (only while visible)
    var running = false, clock = new THREE.Clock(), rotX = 0, rotY = 0, first = true;
    function frame() {
      if (!running) return;
      requestAnimationFrame(frame);
      var t = clock.getElapsedTime();
      if (active && performance.now() - lastMove > 4000) active = false;

      var tx, ty;
      if (active) { tx = target.x * 1.0; ty = target.y * 0.55; }
      else if (!reduceMotion) { tx = Math.sin(t * 0.45) * 0.5 - 0.3; ty = Math.sin(t * 0.33) * 0.08; }
      else { tx = -0.25; ty = 0; }

      rotY += (tx - rotY) * 0.06;
      rotX += (ty - rotX) * 0.06;
      rig.rotation.y = rotY;
      rig.rotation.x = rotX;
      rig.position.x = baseX;
      rig.position.y = baseY + (reduceMotion ? 0 : Math.sin(t * 1.1) * 0.08);

      // focus ring "breathes" while aiming; zoom ring follows the cursor
      focus.rotation.z = rotY * 1.6;
      zoom.rotation.z = -rotX * 1.2;

      // shutter kick
      kick *= 0.88;
      shutter.position.y = 1.14 - kick * 0.05;
      var s = 1 - kick * 0.03;
      rig.scale.set(s, s, s);

      renderer.render(scene, camera);
      if (first) {
        first = false;
        setTimeout(function () { loading.classList.add('is-hidden'); host.classList.add('is-ready'); }, 500);
      }
    }
    function start() { if (!running) { running = true; clock.getDelta(); frame(); } }
    function stop() { running = false; }

    var inView = true;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        inView && !document.hidden ? start() : stop();
      }).observe(section);
    } else start();
    document.addEventListener('visibilitychange', function () {
      document.hidden ? stop() : (inView && start());
    });
  }
})();
