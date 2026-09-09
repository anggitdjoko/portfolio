/* =====================================================================
   warp.js — cinematic "universe A → universe B" hyperspace transition.
   Shared by index.html (portfolio) and data.html (data showcase).

   The warp remains a hard navigation (so it works on static GitHub Pages),
   but keeps the exit/entry movement short and calm. Scroll position is stored
   only for this hand-off, with a hash fallback for direct data-page visits.
   ===================================================================== */
(function () {
  'use strict';

  var FLAG = '__warp_in';
  var SCROLL_KEY = '__warp_scroll';
  // Deliberately short: 360ms exit + 420ms entry = 780ms animation time,
  // excluding the destination document's network/paint time.
  var DUR_OUT = 360;
  var DUR_IN = 420;
  var GUARD_TIMEOUT = 2200;
  var motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduce = motionPreference.matches;
  var transitioning = false;
  var motionListener = function (e) { reduce = e.matches; };
  if (motionPreference.addEventListener) motionPreference.addEventListener('change', motionListener);
  else if (motionPreference.addListener) motionPreference.addListener(motionListener);

  var mobile = window.matchMedia &&
    window.matchMedia('(max-width: 820px), (pointer: coarse)').matches;
  var iOS = /iP(hone|ad|od)/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  function safeStorage(action) {
    try { return action(window.sessionStorage); } catch (e) { return null; }
  }
  function setStorage(key, value) { safeStorage(function (s) { s.setItem(key, value); }); }
  function getStorage(key) { return safeStorage(function (s) { return s.getItem(key); }); }
  function removeStorage(key) { safeStorage(function (s) { s.removeItem(key); }); }

  // Lock/unlock scrolling while a fixed tunnel is active. Every exit path
  // calls unlockScroll, including canvas/storage errors and motion changes.
  var scrollLock = null;
  function lockScroll() {
    if (scrollLock) return;
    var de = document.documentElement, b = document.body;
    scrollLock = { deOverflow: de.style.overflow, bOverflow: b ? b.style.overflow : '', touch: de.style.touchAction };
    de.style.overflow = 'hidden';
    if (b) b.style.overflow = 'hidden';
    de.style.touchAction = 'none';
  }
  function unlockScroll() {
    if (!scrollLock) return;
    var de = document.documentElement, b = document.body;
    de.style.overflow = scrollLock.deOverflow;
    if (b) b.style.overflow = scrollLock.bOverflow;
    de.style.touchAction = scrollLock.touch;
    scrollLock = null;
  }
  function vpW() { return (window.visualViewport && visualViewport.width) || window.innerWidth; }
  function vpH() { return (window.visualViewport && visualViewport.height) || window.innerHeight; }

  var WARM = [255, 207, 138];
  var COOL = [90, 209, 255];
  var COOL2 = [124, 140, 255];
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp01(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }
  function mix(c1, c2, t) {
    return [Math.round(lerp(c1[0], c2[0], t)), Math.round(lerp(c1[1], c2[1], t)), Math.round(lerp(c1[2], c2[2], t))];
  }
  function smooth(t) { t = clamp01(t); return t * t * t * (t * (t * 6 - 15) + 10); }
  function easeInQuint(t) { return t * t * t * t * t; }
  function easeOutQuint(t) { return 1 - Math.pow(1 - t, 5); }

  function scene() { return document.body; }
  function viewportOrigin() {
    var sx = window.scrollX != null ? window.scrollX : window.pageXOffset;
    var sy = window.scrollY != null ? window.scrollY : window.pageYOffset;
    return Math.round(sx + window.innerWidth / 2) + 'px ' + Math.round(sy + window.innerHeight / 2) + 'px';
  }
  function setSceneTransition(ms, ease) {
    if (mobile) return;
    var s = scene(); if (!s) return;
    s.style.transition = 'transform ' + ms + 'ms ' + ease + ', opacity ' + ms + 'ms ' + ease;
    s.style.willChange = 'transform, opacity';
    s.style.backfaceVisibility = 'hidden';
  }
  function setScene(sc, op) {
    if (mobile) return;
    var s = scene(); if (!s) return;
    s.style.transformOrigin = viewportOrigin();
    s.style.transform = 'translateZ(0) scale(' + sc + ')';
    s.style.filter = 'none';
    s.style.opacity = String(op);
  }
  function clearScene() {
    var s = scene(); if (!s) return;
    s.style.transition = ''; s.style.transform = ''; s.style.transformOrigin = '';
    s.style.filter = ''; s.style.opacity = ''; s.style.willChange = '';
  }

  function buildOverlay() {
    var o = document.createElement('div');
    o.id = 'warp-overlay';
    o.style.cssText = 'position:fixed;inset:0;z-index:99999;pointer-events:none;opacity:0;transition:opacity .16s ease;background:radial-gradient(circle at 50% 50%,#050a18 0%,#02040a 70%);';
    var cv = document.createElement('canvas');
    cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
    o.appendChild(cv);
    var flash = document.createElement('div');
    flash.style.cssText = 'position:absolute;inset:0;opacity:0;will-change:opacity,transform;transform:scale(.82);transform-origin:50% 50%;background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.72) 0%,rgba(219,238,255,.30) 38%,rgba(150,200,255,0) 74%);';
    o.appendChild(flash);
    (document.documentElement || document.body).appendChild(o);
    return { o: o, cv: cv, flash: flash };
  }
  function makeStars(n) {
    var s = new Array(n);
    for (var i = 0; i < n; i++) s[i] = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random(), pz: 0, cool: Math.random() < 0.5 };
    return s;
  }

  function run(mode, done) {
    lockScroll();
    var ui = buildOverlay(), cv = ui.cv, ctx = null;
    try { ctx = cv.getContext('2d'); } catch (e) { ctx = null; }
    var finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      try { removeEventListener('resize', onResize); } catch (e) {}
      if (motionPreference.removeEventListener) motionPreference.removeEventListener('change', onMotionChange);
      else if (motionPreference.removeListener) motionPreference.removeListener(onMotionChange);
      unlockScroll();
      if (done) done(ui);
    }
    function onMotionChange(e) {
      reduce = e.matches;
      if (!reduce || finished) return;
      if (ui.flash.getAnimations) ui.flash.getAnimations().forEach(function (a) { a.cancel(); });
      if (ui.o.parentNode) ui.o.parentNode.removeChild(ui.o);
      clearScene();
      finish();
    }
    if (motionPreference.addEventListener) motionPreference.addEventListener('change', onMotionChange);
    else if (motionPreference.addListener) motionPreference.addListener(onMotionChange);

    var dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : (iOS ? 1 : 1.25));
    var W, H, cx, cy, focal;
    function size() {
      W = cv.width = Math.round(vpW() * dpr); H = cv.height = Math.round(vpH() * dpr);
      cx = W / 2; cy = H / 2; focal = Math.max(W, H) * 0.16;
    }
    size();
    var baseW = vpW();
    function onResize() { if (Math.abs(vpW() - baseW) < 1) return; baseW = vpW(); size(); }
    addEventListener('resize', onResize);

    // Mobile gets a deliberately small field; reduced-motion skips run entirely.
    var N = mobile ? (iOS ? 96 : 120) : 220;
    var stars = makeStars(N);
    for (var i = 0; i < N; i++) stars[i].pz = stars[i].z;
    var dur = mode === 'out' ? DUR_OUT : DUR_IN;
    var start = performance.now();
    var inboundToData = /(?:^|\/)data\.html$/i.test(location.pathname);

    if (mode === 'out') {
      ui.o.style.opacity = '0';
      requestAnimationFrame(function () { ui.o.style.opacity = '.90'; });
    } else {
      ui.o.style.transition = 'none'; ui.o.style.opacity = '.90';
    }
    if (ui.flash.animate) {
      if (mode === 'out') {
        ui.flash.animate([{ opacity: 0, transform: 'scale(.82)' }, { opacity: .34, transform: 'scale(1.24)' }], { duration: Math.round(dur * .30), delay: Math.round(dur * .70), easing: 'cubic-bezier(.45,0,.85,.55)', fill: 'forwards' });
      } else {
        ui.flash.style.opacity = '.34'; ui.flash.style.transform = 'scale(1.24)';
        ui.flash.animate([{ opacity: .34, transform: 'scale(1.24)' }, { opacity: 0, transform: 'scale(1.08)' }], { duration: Math.round(dur * .46), easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' });
      }
    }
    function tick(now) {
      if (finished) return;
      if (!ctx) { finish(); return; }
      var p = clamp01((now - start) / dur), speed, colT;
      if (mode === 'out') {
        speed = .010 + easeInQuint(p) * .072;
        colT = smooth(clamp01(p / .80));
      } else {
        speed = .010 + easeOutQuint(1 - p) * .072;
        // Forward arrival settles in blue; reverse arrival settles back to warm.
        colT = inboundToData ? 1 : 0;
        var overlayFade = p < .55 ? .90 : .90 * (1 - smooth((p - .55) / .45));
        ui.o.style.opacity = String(overlayFade);
      }
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(2,4,10,0.32)'; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      for (var k = 0; k < N; k++) {
        var s = stars[k]; s.pz = s.z; s.z -= speed;
        if (s.z <= .02) { s.x = Math.random() * 2 - 1; s.y = Math.random() * 2 - 1; s.z = 1; s.pz = 1; s.cool = Math.random() < .5; continue; }
        var sx = cx + (s.x / s.z) * focal, sy = cy + (s.y / s.z) * focal;
        var px = cx + (s.x / s.pz) * focal, py = cy + (s.y / s.pz) * focal;
        var col = mix(WARM, s.cool ? COOL : COOL2, colT);
        ctx.lineWidth = Math.max(dpr * .6, (1 - s.z) * 3.2 * dpr);
        ctx.strokeStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + Math.min(1, (1 - s.z) * 1.05) + ')';
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy); ctx.stroke();
      }
      if (!ui.flash.animate && mode === 'out') ui.flash.style.opacity = p < .70 ? 0 : .34 * Math.pow((p - .70) / .30, 1.8);
      if (p < 1) requestAnimationFrame(tick); else finish();
    }
    setTimeout(finish, dur + 700);
    requestAnimationFrame(tick);
    return ui;
  }

  function rememberScroll() {
    var payload = { x: window.scrollX || 0, y: window.scrollY || 0, width: window.innerWidth || 0, height: window.innerHeight || 0, path: location.pathname, at: Date.now() };
    setStorage(SCROLL_KEY, JSON.stringify(payload));
  }
  function validSavedScroll() {
    var raw = getStorage(SCROLL_KEY); if (!raw) return null;
    try {
      var p = JSON.parse(raw);
      if (!p || typeof p.y !== 'number' || typeof p.path !== 'string' || Date.now() - p.at > 10 * 60 * 1000) return null;
      return p;
    } catch (e) { return null; }
  }
  function restorePortfolioScroll() {
    var saved = validSavedScroll();
    var isPortfolio = /(?:^|\/)index\.html$/i.test(location.pathname) || /\/$/.test(location.pathname);
    var fromPortfolio = saved && (/(?:^|\/)index\.html$/i.test(saved.path) || /\/$/.test(saved.path));
    if (!isPortfolio || !saved || !fromPortfolio) return false;
    removeStorage(SCROLL_KEY);
    // The return URL contains #projects for a useful direct-link fallback.
    // When a saved position exists, suppress the browser's automatic hash jump
    // so it cannot win a race with restoration (including pageshow/bfcache).
    try { history.scrollRestoration = 'manual'; } catch (e) {}
    var target = Math.max(0, saved.y), tries = 0;
    function restore() {
      tries++;
      try { window.scrollTo(saved.x || 0, target); } catch (e) {}
      // app.js fills the project grid after parsing data.js; several frames and
      // one delayed pass let layout/hash restoration settle without a lock.
      if (tries < 10) requestAnimationFrame(restore);
      else setTimeout(function () { try { window.scrollTo(saved.x || 0, target); } catch (e) {} }, 120);
    }
    requestAnimationFrame(restore);
    return true;
  }

  function navigate(url) {
    if (transitioning) return;
    transitioning = true;
    // Persist before the reduced-motion fast path too: the return link still
    // restores the project position even when no animation is requested.
    // Preserve the portfolio position while leaving data.html; the return
    // link must not overwrite that record with data-page scrollY (usually 0).
    if (!/(?:^|\/)data\.html$/i.test(location.pathname)) rememberScroll();
    setStorage(FLAG, '1');
    if (reduce) { location.href = url; return; }
    var navFailsafe = setTimeout(function () { location.href = url; }, DUR_OUT + 700);
    try {
      setSceneTransition(DUR_OUT, 'cubic-bezier(.55,0,.85,.35)');
      requestAnimationFrame(function () { if (!reduce) setScene(1.045, .94); });
      run('out', function () { clearTimeout(navFailsafe); location.href = url; });
    } catch (err) { clearTimeout(navFailsafe); location.href = url; }
  }
  function warpTo(url) { navigate(url); }
  window.__warpTo = warpTo;

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[data-warp]');
    if (!a || a.hasAttribute('download') || (a.target && a.target !== '_self')) return;
    var raw = a.getAttribute('href'); if (!raw || raw.charAt(0) === '#') return;
    var dest;
    try { dest = new URL(raw, location.href); } catch (err) { return; }
    if (dest.origin !== location.origin || (dest.protocol !== 'http:' && dest.protocol !== 'https:')) return;
    e.preventDefault();
    if (!transitioning) navigate(dest.href);
  }, false);

  function playInbound() {
    var de = document.documentElement;
    var flagged = getStorage(FLAG) === '1';
    removeStorage(FLAG);
    var restored = restorePortfolioScroll();
    if (!flagged) { de.classList.remove('warp-cover'); return; }
    if (reduce) { de.classList.remove('warp-cover'); return; }
    try {
      setScene(1.035, .98);
      de.classList.remove('warp-cover');
      requestAnimationFrame(function () {
        if (reduce) { clearScene(); return; }
        setSceneTransition(DUR_IN, 'cubic-bezier(.16,.84,.3,1)');
        requestAnimationFrame(function () { if (!reduce) setScene(1, 1); });
      });
      run('in', function (ui) {
        if (ui.o.parentNode) ui.o.parentNode.removeChild(ui.o);
        clearScene();
      });
    } catch (err) {
      de.classList.remove('warp-cover'); unlockScroll(); clearScene();
    }
    // A direct data-page load has no saved hand-off. Its #projects fallback is
    // intentionally left to normal browser anchor behavior.
    void restored;
  }

  // bfcache restores can bypass DOMContentLoaded. Never re-run the animation
  // without a flag, but make sure the cover is gone and saved scroll is used.
  addEventListener('pageshow', function () {
    if (!transitioning) {
      document.documentElement.classList.remove('warp-cover');
      restorePortfolioScroll();
    }
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', playInbound);
  else playInbound();
})();
