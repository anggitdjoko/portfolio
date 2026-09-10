/* ============ Anggit Djoko Wibowo — cinematic portfolio ============ */
const P = window.PORTFOLIO;
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- loader safety net ----------
   Reveal the page no matter what. If optional WebGL/library setup throws,
   these still fire and the user is never stranded on the splash.
   user is never stranded on the "Hello !" splash. hideLoader (below) is
   a hoisted function declaration, so it is safe to reference here. */
function hideLoaderSafe() {
  try {
    const l = document.getElementById('loader');
    if (l && !l.classList.contains('hide')) {
      l.classList.add('hide');
      document.querySelectorAll('#hero .reveal')
        .forEach((el, i) => setTimeout(() => el.classList.add('in'), 120 * i));
    }
  } catch (e) {}
}
addEventListener('load', () => setTimeout(hideLoaderSafe, 600));
setTimeout(hideLoaderSafe, 2000);
addEventListener('error', () => setTimeout(hideLoaderSafe, 50));

/* ---------- populate content ---------- */
document.getElementById('i-loc').textContent = P.location;
document.getElementById('i-edu').textContent = P.availability;
document.getElementById('i-lang').textContent = P.languages;
var yEl = document.getElementById('year'); if (yEl) yEl.textContent = new Date().getFullYear();

// role / hero
document.querySelectorAll('[data-role]').forEach(el => el.textContent = P.role);

// skills — professional tiers, no numeric self-ratings
document.getElementById('skills').innerHTML = P.skills.map(s => `
  <div class="skill reveal">
    <span class="sk-name">${s.name}</span>
    <span class="sk-tier t-${s.tier.toLowerCase()}">${s.tier}</span>
  </div>`).join('');

/* ---------- experience (hide section if empty) ---------- */
const expSection = document.getElementById('experience');
const expNav = document.querySelector('a[href="#experience"]');
if (P.experience && P.experience.length) {
  document.getElementById('timeline').innerHTML = P.experience.map(e => `
    <div class="tl-item reveal">
      <div class="tl-period">${e.period}</div>
      <div class="tl-role">${e.role}</div>
      <div class="tl-org">${e.org}</div>
      <div class="tl-desc">${e.desc}</div>
      <div class="tl-tech">${(e.tech || []).map(t => `<span class="chip">${t}</span>`).join('')}</div>
    </div>`).join('');
} else {
  expSection.style.display = 'none';
  if (expNav) expNav.style.display = 'none';
}

/* ---------- projects (hide section if empty) ---------- */
const projSection = document.getElementById('projects');
const projNav = document.querySelector('a[href="#projects"]');
if (P.projects && P.projects.length) {
  const pcountEl = document.getElementById('pcount');
  if (pcountEl) pcountEl.textContent = P.projects.length;

  const cats = ['All', ...Array.from(new Set(P.projects.map(p => p.category)))];
  const filtersEl = document.getElementById('filters');
  filtersEl.innerHTML = cats.map((c, i) =>
    `<button class="filter${i === 0 ? ' active' : ''}" data-cat="${c}">${c}</button>`).join('');

  const grid = document.getElementById('projGrid');
  function renderProjects(cat) {
    const list = cat === 'All' ? P.projects : P.projects.filter(p => p.category === cat);
    grid.innerHTML = list.map(p => {
      const media = p.video ? `
        <div class="pmedia" data-src="${p.loop || p.video}" data-full="${p.video}" tabindex="0" role="button" aria-label="Play ${p.title} demo reel">
          <video muted loop playsinline preload="none"${p.poster ? ` poster="${p.poster}"` : ''}></video>
          <div class="shade"></div>
          <span class="pbadge"><i></i>${p.reelLabel || 'Demo reel'}</span>
          <button class="pfull" aria-label="Watch full screen">⛶</button>
        </div>` : '';
      const body = `
        <div class="pcat">${p.category || ''}</div>
        <h3 class="ptitle">${p.title}</h3>
        <p class="pdesc">${p.desc || ''}</p>
        <div class="ptech">${(p.tech || []).map(t => `<span class="chip">${t}</span>`).join('')}</div>
        <div class="plinks">
          ${p.video ? `<a href="#" data-play="${p.video}">Watch reel ▶</a>` : ''}
          ${p.demo ? (/^https?:\/\//i.test(p.demo)
            ? (p.video ? '' : `<a href="${p.demo}" target="_blank" rel="noopener">Live Demo ↗</a>`)
            : `<a href="${p.demo}" data-warp>Live Data ↗</a>`) : ''}
          ${p.code ? `<a href="${p.code}" target="_blank" rel="noopener">Code ↗</a>` : ''}
        </div>`;
      return `<article class="pcard reveal in${p.video ? ' has-media' : ''}">
        ${media}
        ${p.video ? `<div class="pbody">${body}</div>` : body}
      </article>`;
    }).join('');
    initReels();
  }

  /* ---- demo reels: lazy load, autoplay in view, lightbox ---- */
  let lbox = null, lboxVid = null, lboxBound = false, reelInvoker = null;
  function ensureLb() {
    if (!lbox) lbox = document.getElementById('lbox');
    if (lbox && !lboxVid) lboxVid = lbox.querySelector('video');
    if (lbox && !lboxBound) {
      lboxBound = true;
      lbox.addEventListener('click', e => {
        if (e.target === lbox || e.target.classList.contains('close')) closeReel();
      });
      lbox.addEventListener('cancel', e => { e.preventDefault(); closeReel(); });
      lbox.addEventListener('close', () => {
        lbox.setAttribute('aria-hidden', 'true');
        document.documentElement.classList.remove('reel-open');
        lboxVid.pause();
        if (reelInvoker && reelInvoker.isConnected) reelInvoker.focus({ preventScroll: true });
        reelInvoker = null;
      });
    }
    return lbox;
  }
  motionPreference.addEventListener('change', e => {
    if (e.matches) grid.querySelectorAll('.pmedia video').forEach(v => v.pause());
  });
  const saveData = (navigator.connection || {}).saveData === true;

  function openReel(src, invoker) {
    if (!ensureLb()) { window.open(src, '_blank'); return; }
    if (lbox.open) return;
    reelInvoker = invoker || document.activeElement;
    lboxVid.src = src;
    lbox.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('reel-open');
    lbox.showModal();
    lbox.querySelector('.close').focus({ preventScroll: true });
    lboxVid.currentTime = 0;
    lboxVid.play().catch(() => { });
  }
  function closeReel() {
    if (lbox && lbox.open) lbox.close();
  }
  let reelIO = null;
  function initReels() {
    const cells = grid.querySelectorAll('.pmedia');
    if (!cells.length) return;
    if (reelIO) reelIO.disconnect();
    reelIO = new IntersectionObserver(entries => {
      entries.forEach(en => {
        const v = en.target.querySelector('video');
        if (!v) return;
        if (en.isIntersecting) {
          if (!v.getAttribute('src')) v.setAttribute('src', en.target.dataset.src);
          if (!motionPreference.matches && !saveData) v.play().catch(() => { });
        } else { v.pause(); }
      });
    }, { threshold: 0.28 });
    cells.forEach(c => {
      reelIO.observe(c);
      c.addEventListener('click', e => openReel(c.dataset.full || c.dataset.src, e.target.closest('.pfull') || c));
      c.addEventListener('keydown', e => {
        if (e.target === c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openReel(c.dataset.full || c.dataset.src, c); }
      });
    });
    grid.querySelectorAll('[data-play]').forEach(a => {
      a.addEventListener('click', e => { e.preventDefault(); openReel(a.dataset.play, a); });
    });
  }
  renderProjects('All');
  filtersEl.addEventListener('click', e => {
    const b = e.target.closest('.filter');
    if (!b) return;
    filtersEl.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    renderProjects(b.dataset.cat);
  });
} else {
  projSection.style.display = 'none';
  if (projNav) projNav.style.display = 'none';
}

/* ---------- contact ---------- */
document.getElementById('methods').innerHTML = `
  <a class="contact-email" href="mailto:${P.email}"><span>${P.email}</span><span aria-hidden="true">↗</span></a>`;
document.getElementById('socials').innerHTML = `
  <a href="${P.whatsapp}" target="_blank" rel="noopener">WhatsApp <span aria-hidden="true">↗</span></a>
  <a href="${P.github}" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a>
  <a href="${P.linkedin}" target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a>`;
const contactLocation = document.getElementById('contact-location');
if (contactLocation) contactLocation.textContent = P.location;

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- nav ---------- */
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40));
const menuBtn = document.getElementById('menuBtn');
const navlinks = document.getElementById('navlinks');
const mobileNav = window.matchMedia('(max-width: 760px)');
let menuIsOpen = false;
let menuBackground = [];
function setMenuOpen(open, restoreFocus = true) {
  open = Boolean(open && mobileNav.matches);
  if (open === menuIsOpen) {
    navlinks.inert = mobileNav.matches && !open;
    return;
  }
  menuIsOpen = open;
  navlinks.inert = mobileNav.matches && !open;
  navlinks.classList.toggle('open', open);
  nav.classList.toggle('menu-open', open);
  document.documentElement.classList.toggle('mobile-menu-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuBtn.textContent = open ? '✕' : '☰';
  if (open) {
    menuBackground = [...document.querySelectorAll('main, footer, #sound')].map(el => [el, el.inert]);
    menuBackground.forEach(([el]) => { el.inert = true; });
    const firstLink = [...navlinks.querySelectorAll('a')].find(a => a.getClientRects().length);
    if (firstLink) firstLink.focus({ preventScroll: true });
  } else {
    menuBackground.forEach(([el, wasInert]) => { el.inert = wasInert; });
    menuBackground = [];
    if (restoreFocus && mobileNav.matches) menuBtn.focus({ preventScroll: true });
  }
}
menuBtn.addEventListener('click', () => setMenuOpen(!menuIsOpen));
navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenuOpen(false, false)));
document.addEventListener('keydown', e => {
  if (!menuIsOpen) return;
  if (e.key === 'Escape') { e.preventDefault(); setMenuOpen(false); }
  if (e.key === 'Tab') {
    const items = [menuBtn, ...navlinks.querySelectorAll('a')].filter(el => el.getClientRects().length);
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
mobileNav.addEventListener('change', () => {
  const menuHadFocus = nav.contains(document.activeElement);
  setMenuOpen(false, false);
  if (!mobileNav.matches && menuHadFocus) {
    const firstLink = [...navlinks.querySelectorAll('a')].find(a => a.getClientRects().length);
    if (firstLink) firstLink.focus({ preventScroll: true });
  } else if (mobileNav.matches && menuHadFocus) menuBtn.focus({ preventScroll: true });
});
setMenuOpen(false, false);

/* ---------- reliable in-page smooth scroll (mobile-safe) ----------
   Mobile Safari frequently ignores anchor jumps that rely only on CSS
   scroll-behavior:smooth (especially when the URL already carries a
   leftover #hash from the warp round-trip), which made "View My Work"
   and "Say Hello" feel dead. Drive the scroll from JS instead. */
(function () {
  var supportsSmooth = 'scrollBehavior' in document.documentElement.style;
  function goToHash(hash) {
    var target;
    try { target = document.querySelector(hash); } catch (e) { return false; }
    if (!target) return false;
    var navH = nav ? nav.offsetHeight : 0;
    var y = target.getBoundingClientRect().top + window.pageYOffset - navH - 8;
    if (y < 0) y = 0;
    if (supportsSmooth && !motionPreference.matches) {
      try { window.scrollTo({ top: y, behavior: 'smooth' }); }
      catch (e) { window.scrollTo(0, y); }
    } else {
      window.scrollTo(0, y);
    }
    if (history.replaceState) { try { history.replaceState(null, '', hash); } catch (e) {} }
    return true;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;
    if (a.hasAttribute('data-warp')) return;      // warp links handled elsewhere
    var hash = a.getAttribute('href');
    if (!hash || hash === '#') return;
    if (goToHash(hash)) { e.preventDefault(); setMenuOpen(false, false); }
  }, false);
})();

/* =======================================================================
   THREE.JS — a living universe of round particles that, as you scroll,
   gather from all across space into ONE big glowing sphere.
   ======================================================================= */
try {   // ---- WebGL galaxy: degrade gracefully if the GPU/context fails ----
const canvas = document.getElementById('space');
// Keep the existing live desktop/Android renderer budget unchanged. The
// previous revision selected lower tiers from guessed device capabilities,
// which could downgrade ordinary desktop/Android browsers. Viewport width is
// the existing scene split, not an OS or UA veto: iPhone/iPad can use this
// same mobile renderer whenever WebGL is actually available.
const MOBILE = innerWidth < 700;
const reduced = () => motionPreference.matches;
const qualityConfig = MOBILE
  ? { count: 6000, dpr: 1.25, antialias: false, haze: true }
  : { count: 16000, dpr: 2, antialias: true, haze: true };
// Check capability before constructing Three's renderer. UA strings are not
// reliable (and mobile browsers all use WebKit), while this reflects real support.
const gl = canvas.getContext('webgl2', { alpha: true, antialias: false }) ||
  canvas.getContext('webgl', { alpha: true, antialias: false });
if (!gl) throw new Error('WebGL context unavailable');
const renderer = new THREE.WebGLRenderer({
  canvas, antialias: qualityConfig.antialias, alpha: true,
  powerPreference: 'default', failIfMajorPerformanceCaveat: false
});
const dpr = Math.min(devicePixelRatio || 1, qualityConfig.dpr);
renderer.setPixelRatio(dpr);
let rendererFailed = false;
function fallbackWebGL(reason) {
  if (rendererFailed) return;
  rendererFailed = true;
  if (animationId) cancelAnimationFrame(animationId);
  document.documentElement.classList.add('nowebgl');
  console.warn('WebGL galaxy unavailable; using CSS fallback:', reason);
}
canvas.addEventListener('webglcontextlost', (e) => {
  e.preventDefault();
  fallbackWebGL('context lost');
}, false);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 4000);
camera.position.z = 620;

// cached viewport — on mobile we DON'T react to the browser toolbar
// showing/hiding (which only changes height); that caused the "blinking".
let vw = innerWidth, vh = innerHeight;
function applySize() {
  renderer.setSize(vw, vh);
  camera.aspect = vw / vh;
  camera.updateProjectionMatrix();
  if (motionPreference.matches) renderer.render(scene, camera);
}
function resize() {
  // ignore height-only changes from the mobile address bar; only respond
  // to width changes or a real orientation flip (large height jump)
  const wChanged = innerWidth !== vw;
  const bigH = Math.abs(innerHeight - vh) > vh * 0.25;
  if (!wChanged && !bigH) return;
  vw = innerWidth; vh = innerHeight;
  applySize();
}
applySize();
addEventListener('resize', resize);
addEventListener('orientationchange', () => { vw = innerWidth; vh = innerHeight; applySize(); });

/* --- soft round sprite so every particle is a glowing DOT, not a square --- */
function discTexture() {
  const s = 128, c = document.createElement('canvas');
  c.width = c.height = s;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0.0, 'rgba(255,255,255,1)');
  g.addColorStop(0.18, 'rgba(255,255,255,0.9)');
  g.addColorStop(0.45, 'rgba(255,255,255,0.35)');
  g.addColorStop(1.0, 'rgba(255,255,255,0)');
  x.fillStyle = g;
  x.beginPath();
  x.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2);
  x.fill();
  return new THREE.CanvasTexture(c);
}
const disc = discTexture();

/* --- build particle field --- */
const COUNT = qualityConfig.count;
const geo = new THREE.BufferGeometry();
const cur = new Float32Array(COUNT * 3);   // current animated position
const uni = new Float32Array(COUNT * 3);   // scattered "universe" home
const orb = new Float32Array(COUNT * 3);   // target sphere position
const col = new Float32Array(COUNT * 3);
const phase = new Float32Array(COUNT);     // drift phase
const amp   = new Float32Array(COUNT);     // per-particle drift amplitude
const spd   = new Float32Array(COUNT);     // per-particle drift speed
const twk   = new Float32Array(COUNT);     // per-particle twinkle phase
const base  = new Float32Array(COUNT);     // base opacity per particle
const ORB_R = 120;

// Andromeda-inspired palette: golden core → warm gold → pink/red dust → blue rim
const kCore = new THREE.Color(0xfff4dc); // warm white core
const kGold = new THREE.Color(0xffcf8a); // golden bulge
const kPink = new THREE.Color(0xe0919c); // pink mid arms
const kRed  = new THREE.Color(0x7c4652); // dust lanes (dark reddish)
const kBlue = new THREE.Color(0x74a6ff); // blue outer arms
const kBlueDeep = new THREE.Color(0x3f6fd8);

const R = 1350;                 // galaxy disk radius
const ARMS = 2;                 // number of spiral arms
const WIND = 3.2;               // how tightly arms wind
const tmpC = new THREE.Color();

function gauss() { return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5; }

for (let i = 0; i < COUNT; i++) {
  const j = i * 3;
  const isBg = Math.random() < 0.16;   // background field stars

  if (isBg) {
    // --- distant background stars: big faint shell all around ---
    const u = Math.random(), v = Math.random();
    const th = 2 * Math.PI * u, ph = Math.acos(2 * v - 1);
    const rr = 1700 + Math.random() * 1400;
    uni[j]     = rr * Math.sin(ph) * Math.cos(th);
    uni[j + 1] = rr * Math.cos(ph) * 0.6;
    uni[j + 2] = rr * Math.sin(ph) * Math.sin(th);
    const b = 0.45 + Math.random() * 0.4;
    tmpC.copy(Math.random() < 0.3 ? kBlue : kCore).multiplyScalar(b);
  } else {
    // --- spiral galaxy disk (Andromeda-like) ---
    const rad = Math.pow(Math.random(), 0.55) * R;
    const tR = rad / R;                              // 0 center → 1 rim
    const inArm = Math.random() < 0.72;              // most stars live in arms
    const armBase = Math.floor(Math.random() * ARMS) * (Math.PI * 2 / ARMS);
    const spread = (inArm ? gauss() * 0.32 : Math.random() * Math.PI * 2);
    const ang = armBase + tR * WIND + spread;
    // thicker, puffy bulge at the core; thin disk outward
    const bulge = Math.max(0, 1 - tR / 0.16);
    const thick = 26 + bulge * 240;
    uni[j]     = Math.cos(ang) * rad + gauss() * 30;
    uni[j + 1] = gauss() * thick + gauss() * bulge * 120;
    uni[j + 2] = Math.sin(ang) * rad + gauss() * 30;

    // color by radius: core → gold → pink → blue rim
    if (tR < 0.14)      tmpC.copy(kCore).lerp(kGold, tR / 0.14);
    else if (tR < 0.5)  tmpC.copy(kGold).lerp(kPink, (tR - 0.14) / 0.36);
    else                tmpC.copy(kPink).lerp(tR > 0.8 ? kBlueDeep : kBlue, (tR - 0.5) / 0.5);

    // dust lanes: some mid-disk stars darkened reddish
    if (tR > 0.2 && tR < 0.75 && Math.random() < 0.16) tmpC.lerp(kRed, 0.7);
    // occasional bright blue star knots in outer arms
    if (tR > 0.55 && Math.random() < 0.05) tmpC.copy(kBlue).lerp(kCore, 0.4);

    tmpC.multiplyScalar(0.6 + Math.random() * 0.6); // brightness variety
  }

  // --- orb target: filled glowing sphere (one big round point) ---
  const u2 = Math.random(), v2 = Math.random();
  const theta = 2 * Math.PI * u2;
  const phi = Math.acos(2 * v2 - 1);
  const r = ORB_R * Math.pow(Math.random(), 0.5);
  orb[j]     = r * Math.sin(phi) * Math.cos(theta);
  orb[j + 1] = r * Math.sin(phi) * Math.sin(theta);
  orb[j + 2] = r * Math.cos(phi);

  // start scattered across the universe
  cur[j] = uni[j]; cur[j + 1] = uni[j + 1]; cur[j + 2] = uni[j + 2];

  col[j] = tmpC.r; col[j + 1] = tmpC.g; col[j + 2] = tmpC.b;

  phase[i] = Math.random() * Math.PI * 2;
  // higher drift floor so NO particle ever looks frozen; distant background
  // stars get extra amplitude so they visibly move despite their far distance
  amp[i]   = (isBg ? 1.3 : 0.65) + Math.random() * (isBg ? 1.4 : 0.9);
  spd[i]   = 0.6 + Math.random() * 0.9;       // per-particle drift speed
  twk[i]   = Math.random() * Math.PI * 2;     // twinkle phase
}

const colBase = col.slice();   // pristine colors for twinkle modulation
geo.setAttribute('position', new THREE.BufferAttribute(cur, 3));
geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
const mat = new THREE.PointsMaterial({
  size: 2.1,
  map: disc,
  vertexColors: true,
  transparent: true,
  opacity: 0.95,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  sizeAttenuation: true
});
const points = new THREE.Points(geo, mat);

// HD haze: same stars drawn large & very dim so gaps fill into smooth glowing gas
const hazeMat = new THREE.PointsMaterial({
  size: 11,
  map: disc,
  vertexColors: true,
  transparent: true,
  opacity: 0.09,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  sizeAttenuation: true
});
const haze = new THREE.Points(geo, hazeMat);

// tilt the whole galaxy so we view it obliquely, like the reference image
const galaxy = new THREE.Group();
galaxy.rotation.x = 1.02;   // lay the disk back
galaxy.rotation.z = 0.28;   // slight roll
// Keep the existing haze layer on both the mobile and desktop baselines.
galaxy.add(haze);
galaxy.add(points);
scene.add(galaxy);

/* --- warm golden core glow (always lit like a galactic bulge) --- */
function glowTexture(inner, mid) {
  const s = 256, c = document.createElement('canvas');
  c.width = c.height = s;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, inner);
  g.addColorStop(0.28, mid);
  g.addColorStop(1, 'rgba(255,200,120,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(c);
}
// persistent warm bulge glow at the galaxy center
const coreGlow = new THREE.Sprite(new THREE.SpriteMaterial({
  map: glowTexture('rgba(255,244,220,0.95)', 'rgba(255,206,138,0.5)'),
  transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending
}));
coreGlow.scale.set(560, 300, 1);   // elongated to sit within the tilted disk
galaxy.add(coreGlow);

// convergence glow that ignites as the sphere forms
const glow = new THREE.Sprite(new THREE.SpriteMaterial({
  map: glowTexture('rgba(180,225,255,0.9)', 'rgba(130,160,255,0.45)'),
  transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending
}));
glow.scale.set(1, 1, 1);
scene.add(glow);

/* --- interaction --- */
let mx = 0, my = 0, tmx = 0, tmy = 0;
addEventListener('mousemove', e => {
  tmx = (e.clientX / innerWidth - 0.5);
  tmy = (e.clientY / innerHeight - 0.5);
});

// full-page scroll progress 0..1
let prog = 0, tProg = 0;
function updateProgress() {
  // use the cached, stable viewport height so scroll progress doesn't jump
  // when the mobile toolbar hides/shows
  const max = document.documentElement.scrollHeight - vh;
  tProg = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
}
addEventListener('scroll', updateProgress);
updateProgress();

const easeInOut = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

/* --- animation loop --- */
const clock = new THREE.Clock();
const pos = geo.attributes.position.array;
let frame = 0;
// Pause the render loop when hidden and resume cleanly when visible.
let hidden = document.hidden;
let animationId = 0;
document.addEventListener('visibilitychange', () => {
  hidden = document.hidden;
  if (hidden) {
    if (animationId) cancelAnimationFrame(animationId);
    animationId = 0;
  } else {
    clock.getDelta(); // discard the elapsed gap so motion stays smooth
    animate();
  }
});
function animate() {
  animationId = 0;
  if (rendererFailed || hidden) return;
  // Reduced motion keeps one composed frame: no drift, parallax or convergence.
  if (reduced()) { renderer.render(scene, camera); return; }
  animationId = requestAnimationFrame(animate);
  // frame-rate independent timing: dt normalized to 60fps so motion stays
  // perfectly smooth whether the device runs at 30, 60 or 120 fps
  const dt = Math.min(clock.getDelta(), 0.05);
  const k = dt * 60;
  const t = clock.elapsedTime;
  frame++;
  // on mobile, refresh the twinkle colors every other frame (halves GPU upload)
  const doColor = !MOBILE || (frame & 1);

  // smooth interpolate the scroll-driven convergence
  prog += (tProg - prog) * 0.06 * k;
  const c = easeInOut(prog);          // 0 = full universe, 1 = single sphere
  const disperse = 1 - c;

  mx += (tmx - mx) * 0.04 * k;
  my += (tmy - my) * 0.04 * k;

  // residual life: even fully converged, particles keep a little motion so
  // the sphere never looks frozen (floor of 0.18, rising to 1 when dispersed)
  const motion = 0.45 + disperse * 0.55;
  // frame-rate independent position smoothing
  const lerpP = Math.min(1, 0.075 * k);
  // slow "breathing" of the whole cloud — subtle expansion/contraction
  const breath = 1 + Math.sin(t * 0.28) * 0.05 * (0.25 + disperse * 0.75);
  // gentle turbulence swirl that also shifts over time (organic, non-repeating feel)
  const swirl = Math.sin(t * 0.12) * 0.6;
  const cols = geo.attributes.color.array;

  for (let i = 0; i < COUNT; i++) {
    const j = i * 3;
    const ph = phase[i], a = amp[i], sp = spd[i];

    // layered multi-frequency drift → no two particles move alike (natural)
    const driftX = (Math.sin(t * 0.25 * sp + ph) * 14
                  + Math.sin(t * 0.61 * sp + ph * 1.7) * 6) * a * motion;
    const driftY = (Math.cos(t * 0.22 * sp + ph) * 14
                  + Math.cos(t * 0.55 * sp + ph * 1.3) * 6) * a * motion;
    const driftZ = (Math.sin(t * 0.18 * sp + ph * 0.9) * 12) * a * motion;

    // breathing pushes the scattered field slightly in/out
    const hx = uni[j] * breath, hy = uni[j + 1] * breath, hz = uni[j + 2] * breath;

    // target = blend from universe home -> orb position
    const tx = hx * disperse + orb[j] * c + driftX;
    const ty = hy * disperse + orb[j + 1] * c + driftY;
    const tz = hz * disperse + orb[j + 2] * c + driftZ;

    pos[j]     += (tx - pos[j]) * lerpP;
    pos[j + 1] += (ty - pos[j + 1]) * lerpP;
    pos[j + 2] += (tz - pos[j + 2]) * lerpP;

    if (doColor) {
      // natural twinkle — each star softly pulses its brightness
      const tw = 0.62 + 0.38 * Math.sin(t * (1.0 + sp * 1.3) + twk[i]);
      cols[j]     = colBase[j] * tw;
      cols[j + 1] = colBase[j + 1] * tw;
      cols[j + 2] = colBase[j + 2] * tw;
    }
  }
  geo.attributes.position.needsUpdate = true;
  if (doColor) geo.attributes.color.needsUpdate = true;

  // disk spins in its own plane; a touch faster as it condenses
  points.rotation.y += (0.0006 + c * 0.0026 + swirl * 0.0004) * k;
  // stronger secondary tumble on two axes so particles near the spin axis
  // never sit still — the converged sphere keeps rolling in every direction
  points.rotation.x = Math.sin(t * 0.17) * 0.11 * c;
  points.rotation.z = Math.sin(t * 0.12) * 0.08 * c;

  // gentle parallax wobble of the whole tilted galaxy toward the cursor
  galaxy.rotation.y += ((mx * 0.4) - galaxy.rotation.y) * 0.03 * k;
  galaxy.rotation.x = 1.02 + Math.sin(t * 0.1) * 0.03 + (-my * 0.12) * disperse;

  // particle disk at full brightness, breathing as it drifts, then
  // becomes the star of the show as everything converges into the sphere
  mat.opacity = 0.7 + Math.pow(c, 1.3) * 0.28;
  hazeMat.opacity = 0.08 + Math.pow(c, 1.5) * 0.14;

  // warm golden bulge glow, tightens as it converges
  coreGlow.material.opacity = 0.5 + Math.pow(c, 1.6) * 0.35;
  coreGlow.scale.set(560 - c * 330, 300 - c * 40, 1);

  // convergence glow ignites with the forming sphere
  glow.material.opacity = Math.pow(c, 1.6) * 0.9;
  const gs = 200 + c * 260;
  glow.scale.set(gs, gs, 1);

  // camera parallax + slight push-in as the sphere forms
  camera.position.x += (mx * 90 - camera.position.x) * 0.05 * k;
  camera.position.y += (-my * 60 - camera.position.y) * 0.05 * k;
  camera.position.z += ((620 - c * 180) - camera.position.z) * 0.05 * k;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}
motionPreference.addEventListener('change', () => {
  if (animationId) cancelAnimationFrame(animationId);
  animationId = 0;
  clock.getDelta();
  animate();
});
animate();
} catch (err) {   // ---- WebGL unavailable/failed: show static backdrop ----
  console.warn('WebGL galaxy disabled, using static backdrop:', err);
  document.documentElement.classList.add('nowebgl');
  hideLoaderSafe();
}

/* ---------- hide loader ---------- */
function hideLoader() {
  const l = document.getElementById('loader');
  if (l && !l.classList.contains('hide')) {
    l.classList.add('hide');
    document.querySelectorAll('#hero .reveal').forEach((el, i) =>
      setTimeout(() => el.classList.add('in'), 120 * i));
  }
}
addEventListener('load', () => setTimeout(hideLoader, 600));
setTimeout(hideLoader, 2200);

/* ---------- ambient sound (WebAudio pad, off by default) ---------- */
let audioCtx = null, playing = false, sndNodes = [];
const soundBtn = document.getElementById('sound');
soundBtn.addEventListener('click', () => {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (playing) {
    sndNodes.forEach(n => { try { n.stop(); } catch (e) {} });
    sndNodes = [];
    playing = false;
    soundBtn.classList.remove('on');
    soundBtn.textContent = '♪';
  } else {
    const master = audioCtx.createGain();
    master.gain.value = 0.06;
    master.connect(audioCtx.destination);
    [110, 164.81, 220, 329.63].forEach((f, i) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'sine';
      o.frequency.value = f;
      g.gain.value = i === 0 ? 0.5 : 0.22;
      const lfo = audioCtx.createOscillator();
      const lg = audioCtx.createGain();
      lfo.frequency.value = 0.05 + i * 0.03;
      lg.gain.value = 0.08;
      lfo.connect(lg).connect(g.gain);
      o.connect(g).connect(master);
      o.start(); lfo.start();
      sndNodes.push(o, lfo);
    });
    playing = true;
    soundBtn.classList.add('on');
    soundBtn.textContent = '❚❚';
  }
});

