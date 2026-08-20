/* ============ Anggit Djoko Wibowo — cinematic portfolio ============ */
const P = window.PORTFOLIO;

/* ---------- loader safety net ----------
   Reveal the page no matter what. If a later step (e.g. WebGL on iOS)
   throws and aborts the rest of this script, these still fire and the
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
    grid.innerHTML = list.map(p => `
      <article class="pcard reveal in">
        <div class="pcat">${p.category || ''}</div>
        <h3 class="ptitle">${p.title}</h3>
        <p class="pdesc">${p.desc || ''}</p>
        <div class="ptech">${(p.tech || []).map(t => `<span class="chip">${t}</span>`).join('')}</div>
        <div class="plinks">
          ${p.demo ? (/^https?:\/\//i.test(p.demo)
            ? `<a href="${p.demo}" target="_blank" rel="noopener">Live Demo ↗</a>`
            : `<a href="${p.demo}" data-warp>Live Data ↗</a>`) : ''}
        </div>
      </article>`).join('');
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

/* ---------- contact methods ---------- */
document.getElementById('methods').innerHTML = `
  <a class="cm" href="mailto:${P.email}"><span class="ic">📧</span><span class="tx"><small>Email</small><b>${P.email}</b></span></a>
  <a class="cm" href="${P.whatsapp}" target="_blank" rel="noopener"><span class="ic">📱</span><span class="tx"><small>WhatsApp</small><b>${P.phone}</b></span></a>
  <div class="cm"><span class="ic">📍</span><span class="tx"><small>Location</small><b>${P.location}</b></span></div>`;

/* ---------- socials ---------- */
const gh = `<svg viewBox="0 0 24 24"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.28 5.69.41.36.78 1.05.78 2.12v3.15c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>`;
const li = `<svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H9V9Z"/></svg>`;
const em = `<svg viewBox="0 0 24 24"><path d="M2 4h20v16H2V4Zm2 2v.4l8 5 8-5V6H4Zm16 2.9-7.4 4.6a1 1 0 0 1-1.2 0L4 8.9V18h16V8.9Z"/></svg>`;
const wa = `<svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.15-1.7-.83-1.96-.93-.26-.1-.45-.15-.64.15s-.74.92-.9 1.11c-.17.2-.33.22-.61.07a8 8 0 0 1-2.35-1.45 8.8 8.8 0 0 1-1.63-2.02c-.17-.3 0-.45.13-.6.13-.14.29-.34.43-.5.15-.18.2-.3.3-.5.1-.2 0-.37-.05-.52-.07-.15-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.37-.26.3-1 .98-1 2.38s1.02 2.76 1.16 2.95c.15.2 2.02 3.08 4.9 4.32.68.3 1.22.47 1.63.6.69.22 1.32.19 1.81.12.55-.08 1.7-.7 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34ZM12 2a10 10 0 0 0-8.6 15.05L2 22l5.05-1.32A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3 .78.8-2.92-.2-.3A8.2 8.2 0 1 1 12 20.2Z"/></svg>`;
document.getElementById('socials').innerHTML = `
  <a href="${P.github}" target="_blank" rel="noopener" title="GitHub">${gh}</a>
  <a href="${P.linkedin}" target="_blank" rel="noopener" title="LinkedIn">${li}</a>
  <a href="mailto:${P.email}" title="Email">${em}</a>
  <a href="${P.whatsapp}" target="_blank" rel="noopener" title="WhatsApp">${wa}</a>`;

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
menuBtn.addEventListener('click', () => navlinks.classList.toggle('open'));
navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navlinks.classList.remove('open')));

/* ---------- reliable in-page smooth scroll (iOS-safe) ----------
   iOS Safari frequently ignores anchor jumps that rely only on CSS
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
    if (supportsSmooth) {
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
    if (goToHash(hash)) { e.preventDefault(); navlinks.classList.remove('open'); }
  }, false);
})();

/* =======================================================================
   THREE.JS — a living universe of round particles that, as you scroll,
   gather from all across space into ONE big glowing sphere.
   ======================================================================= */
try {   // ---- WebGL galaxy: degrade gracefully if the GPU/context fails ----
const canvas = document.getElementById('space');
// iPadOS reports as "MacIntel" with touch points; treat all iOS as mobile so
// iPad no longer runs the heavy desktop path (16k particles + AA + DPR 2),
// which is what exhausts the GPU and blocks the page on iOS Safari.
const iOS = /iP(hone|ad|od)/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const MOBILE = innerWidth < 700 || iOS;
const renderer = new THREE.WebGLRenderer({
  canvas, antialias: !MOBILE, alpha: true,
  powerPreference: 'default', failIfMajorPerformanceCaveat: false
});
renderer.setPixelRatio(Math.min(devicePixelRatio, iOS ? 1 : (MOBILE ? 1.25 : 2)));
// If iOS drops the context under memory pressure, fall back to the static
// backdrop instead of throwing on every frame.
canvas.addEventListener('webglcontextlost', (e) => {
  e.preventDefault();
  document.documentElement.classList.add('nowebgl');
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
const COUNT = iOS ? 2600 : (MOBILE ? 6000 : 16000);
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
// haze = large additive sprites → heavy overdraw/fill-rate, the main killer on
// iOS Safari. Drop it on iOS; the dot field + core glow still read as a galaxy.
if (!iOS) galaxy.add(haze);
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
// pause rendering when the tab/page is hidden (saves GPU + battery on iOS and
// avoids a big time-delta jump when the user returns)
let hidden = document.hidden;
document.addEventListener('visibilitychange', () => {
  hidden = document.hidden;
  if (!hidden) clock.getDelta();   // discard the elapsed gap so motion stays smooth
});
function animate() {
  requestAnimationFrame(animate);
  if (hidden) return;
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

