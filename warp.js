/* =====================================================================
   warp.js — cinematic "universe A → universe B" hyperspace transition.
   Shared by index.html (portfolio) and data.html (data showcase).

   • Outbound: when a [data-warp] link is clicked, universe A (the whole
     page) is pulled toward the camera — it scales up, blurs and dims —
     while a star-streak hyperspace tunnel accelerates from warm Andromeda
     gold to data-blue, ending in a bright white-out. Then the browser
     navigates.
   • Inbound: the destination page detects it was reached through a warp
     and emerges out of the flash — the tunnel decelerates while universe B
     settles from a slight zoom/blur back to rest.
   Respects prefers-reduced-motion (skips straight to navigation).
   ===================================================================== */
(function () {
  'use strict';

  var FLAG = '__warp_in';
  var DUR_OUT = 1250;   // ms — leaving universe A
  var DUR_IN = 1350;    // ms — arriving in universe B
  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Palette: warm gold (universe A) → data cyan/indigo (universe B)
  var WARM = [255, 207, 138];
  var COOL = [90, 209, 255];
  var COOL2 = [124, 140, 255];

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp01(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }
  function mix(c1, c2, t) {
    return [Math.round(lerp(c1[0], c2[0], t)),
            Math.round(lerp(c1[1], c2[1], t)),
            Math.round(lerp(c1[2], c2[2], t))];
  }
  // smootherstep — zero velocity AND zero acceleration at both ends,
  // so nothing ever "jerks" into or out of motion.
  function smooth(t) { t = clamp01(t); return t * t * t * (t * (t * 6 - 15) + 10); }
  var easeInQuint = function (t) { return t * t * t * t * t; };
  var easeOutQuint = function (t) { return 1 - Math.pow(1 - t, 5); };

  /* ---------- the outgoing / incoming page ("scene") ---------- */
  // We transform the page itself so it feels like flying through it.
  // The overlay lives on <html> (not <body>) so it is NOT transformed.
  function scene() { return document.body; }
  function setSceneTransition(ms, ease) {
    var s = scene();
    if (!s) return;
    // transform + opacity only — both composite on the GPU. filter is no longer
    // animated; keeping it out of will-change lets the browser keep the page on
    // a single fast compositor layer instead of re-rasterizing each frame.
    s.style.transition =
      'transform ' + ms + 'ms ' + ease + ', ' +
      'opacity ' + ms + 'ms ' + ease;
    s.style.willChange = 'transform, opacity';
    s.style.backfaceVisibility = 'hidden';
  }
  function setScene(sc, bl, op) {
    var s = scene();
    if (!s) return;
    s.style.transform = 'translateZ(0) scale(' + sc + ')';
    s.style.filter = bl ? 'blur(' + bl + 'px)' : 'none';
    s.style.opacity = String(op);
  }
  function clearScene() {
    var s = scene();
    if (!s) return;
    s.style.transition = '';
    s.style.transform = '';
    s.style.filter = '';
    s.style.opacity = '';
    s.style.willChange = '';
  }

  /* ---------- overlay + starfield tunnel ---------- */
  function buildOverlay() {
    var o = document.createElement('div');
    o.id = 'warp-overlay';
    o.style.cssText = 'position:fixed;inset:0;z-index:99999;pointer-events:none;' +
      'opacity:0;transition:opacity .38s ease;background:radial-gradient(circle at 50% 50%,#050a18 0%,#02040a 70%);';
    var cv = document.createElement('canvas');
    cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
    o.appendChild(cv);
    var flash = document.createElement('div');
    flash.style.cssText = 'position:absolute;inset:0;opacity:0;will-change:opacity,transform;' +
      'transform:scale(.6);transform-origin:50% 50%;' +
      'background:radial-gradient(circle at 50% 50%,#ffffff 0%,#dbeeff 38%,rgba(150,200,255,0) 74%);';
    o.appendChild(flash);
    // attach to <html> so page transforms don't drag the overlay around
    (document.documentElement || document.body).appendChild(o);
    return { o: o, cv: cv, flash: flash };
  }

  function makeStars(n) {
    var s = new Array(n);
    for (var i = 0; i < n; i++) {
      s[i] = {
        x: (Math.random() * 2 - 1),
        y: (Math.random() * 2 - 1),
        z: Math.random(),                 // 0..1 depth (0 = at camera)
        pz: 0,
        cool: Math.random() < 0.5
      };
    }
    return s;
  }

  // Runs the tunnel. mode: 'out' | 'in'. Calls done() when finished.
  function run(mode, done) {
    var ui = buildOverlay();
    var cv = ui.cv, ctx = cv.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    var W, H, cx, cy, focal;
    function size() {
      W = cv.width = innerWidth * dpr;
      H = cv.height = innerHeight * dpr;
      cx = W / 2; cy = H / 2;
      focal = Math.max(W, H) * 0.16;
    }
    size();
    addEventListener('resize', size);

    var N = Math.min(280, Math.floor(innerWidth / 5) + 120);
    var stars = makeStars(N);
    for (var i = 0; i < N; i++) stars[i].pz = stars[i].z;

    var dur = mode === 'out' ? DUR_OUT : DUR_IN;
    var start = performance.now();

    // Fade the dark overlay in (outbound) or leave it opaque then fade out (inbound)
    if (mode === 'out') {
      ui.o.style.opacity = '0';
      requestAnimationFrame(function () { ui.o.style.opacity = '1'; });
    } else {
      ui.o.style.transition = 'none';
      ui.o.style.opacity = '1';
    }

    // Drive the white-out flash on the compositor thread (Web Animations API),
    // fully decoupled from the star-canvas rAF loop — so it stays perfectly
    // smooth even when a canvas frame is dropped. This was the "big round white
    // light that stutters": its opacity used to be re-set every canvas frame.
    if (ui.flash.animate) {
      if (mode === 'out') {
        // one single bloom: grow from nothing to a full-screen white-out
        ui.flash.animate(
          [{ opacity: 0, transform: 'scale(.7)' },
           { opacity: 1, transform: 'scale(1.9)' }],
          { duration: Math.round(dur * 0.30), delay: Math.round(dur * 0.70),
            easing: 'cubic-bezier(.45,0,.85,.55)', fill: 'forwards' });
      } else {
        // CONTINUE that same white-out — start already full & large (matching
        // the outbound end state), then simply dissolve while settling gently
        // inward. No second "bloom", so it reads as one continuous flash.
        ui.flash.style.opacity = '1';
        ui.flash.style.transform = 'scale(1.9)';
        ui.flash.animate(
          [{ opacity: 1, transform: 'scale(1.9)' },
           { opacity: 0, transform: 'scale(1.55)' }],
          { duration: Math.round(dur * 0.46),
            easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' });
      }
    }

    function tick(now) {
      var p = clamp01((now - start) / dur);   // 0..1 timeline

      var speed, colT, flashV;
      if (mode === 'out') {
        // accelerate smoothly into the jump — starts already gliding
        speed = 0.010 + easeInQuint(p) * 0.088;
        colT = smooth(clamp01(p / 0.78));               // gold → blue crossover
        flashV = p < 0.74 ? 0 : Math.pow((p - 0.74) / 0.26, 2.2); // white-out at end
      } else {
        // decelerate smoothly out of the jump
        speed = 0.010 + easeOutQuint(1 - p) * 0.088;
        colT = 1;                                        // stay in universe B (blue)
        flashV = p < 0.34 ? (1 - smooth(p / 0.34)) : 0;  // start bright, clear the flash
        var overlayFade = p < 0.55 ? 1 : (1 - smooth((p - 0.55) / 0.45));
        ui.o.style.opacity = String(overlayFade);
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(2,4,10,0.32)';         // motion-blur trails
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      for (var k = 0; k < N; k++) {
        var s = stars[k];
        s.pz = s.z;
        s.z -= speed;
        if (s.z <= 0.02) {                         // recycle stars that fly past
          s.x = Math.random() * 2 - 1;
          s.y = Math.random() * 2 - 1;
          s.z = 1; s.pz = 1;
          s.cool = Math.random() < 0.5;
          continue;
        }
        var sx = cx + (s.x / s.z) * focal;
        var sy = cy + (s.y / s.z) * focal;
        var px = cx + (s.x / s.pz) * focal;
        var py = cy + (s.y / s.pz) * focal;

        var base = s.cool ? COOL : COOL2;
        var col = mix(WARM, base, colT);
        var lw = Math.max(dpr * 0.6, (1 - s.z) * 3.6 * dpr);
        var a = Math.min(1, (1 - s.z) * 1.1);
        ctx.strokeStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + a + ')';
        ctx.lineWidth = lw;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }

      if (!ui.flash.animate) ui.flash.style.opacity = String(flashV);

      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        removeEventListener('resize', size);
        if (done) done(ui);
      }
    }
    requestAnimationFrame(tick);
    return ui;
  }

  /* ---------- outbound: intercept warp links ---------- */
  function warpTo(url) {
    if (reduce) { location.href = url; return; }
    try { sessionStorage.setItem(FLAG, '1'); } catch (e) {}
    // pull universe A toward the camera in sync with the tunnel
    setSceneTransition(Math.round(DUR_OUT * 0.94), 'cubic-bezier(.55,0,.85,.35)');
    // transform + opacity only (GPU-composited) — no filter:blur, which forces
    // a full-page repaint every frame and fights the star canvas for budget.
    requestAnimationFrame(function () { setScene(1.12, 0, 0); });
    run('out', function () { location.href = url; });
  }
  window.__warpTo = warpTo;

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-warp]');
    if (!a) return;
    var url = a.getAttribute('href');
    if (!url || url.charAt(0) === '#') return;
    // let modified clicks (new tab, etc.) behave normally
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    warpTo(url);
  });

  /* ---------- inbound: arrived through a warp ---------- */
  function playInbound() {
    var de = document.documentElement;
    var flagged = false;
    try { flagged = sessionStorage.getItem(FLAG) === '1'; } catch (e) {}
    // Always release the head-guard cover so the page can never get stuck hidden.
    if (!flagged) { de.classList.remove('warp-cover'); return; }
    try { sessionStorage.removeItem(FLAG); } catch (e) {}
    if (reduce) { de.classList.remove('warp-cover'); return; }

    // Take over the head-guard cover with inline styles (still hidden), so
    // universe B never flickers in at rest before it emerges from the flash.
    setScene(1.07, 0, 0);
    de.classList.remove('warp-cover');
    requestAnimationFrame(function () {
      setSceneTransition(DUR_IN, 'cubic-bezier(.16,.84,.3,1)');
      requestAnimationFrame(function () { setScene(1, 0, 1); });
    });

    run('in', function (ui) {
      ui.o.parentNode && ui.o.parentNode.removeChild(ui.o);
      clearScene();
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', playInbound);
  } else {
    playInbound();
  }
})();
