/* =====================================================================
   warp.js — cinematic "universe A → universe B" hyperspace transition.
   Shared by index.html (portfolio) and data.html (data showcase).

   • Outbound: when a [data-warp] link is clicked, the current universe
     dims and the camera jumps into a star-streak hyperspace tunnel whose
     colour crosses over from warm Andromeda gold to data-blue, ending in
     a bright flash — then the browser navigates.
   • Inbound: the destination page detects it was reached through a warp
     and plays the tunnel in reverse (decelerating out of the flash) before
     fading away to reveal the new universe.
   Respects prefers-reduced-motion (skips straight to navigation).
   ===================================================================== */
(function () {
  'use strict';

  var FLAG = '__warp_in';
  var DUR_OUT = 1150;   // ms — leaving universe A
  var DUR_IN = 1250;    // ms — arriving in universe B
  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Palette: warm gold (universe A) → data cyan/indigo (universe B)
  var WARM = [255, 207, 138];
  var COOL = [90, 209, 255];
  var COOL2 = [124, 140, 255];

  function lerp(a, b, t) { return a + (b - a) * t; }
  function mix(c1, c2, t) {
    return [Math.round(lerp(c1[0], c2[0], t)),
            Math.round(lerp(c1[1], c2[1], t)),
            Math.round(lerp(c1[2], c2[2], t))];
  }
  var easeIn = function (t) { return t * t * t; };
  var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };

  /* ---------- overlay + starfield tunnel ---------- */
  function buildOverlay() {
    var o = document.createElement('div');
    o.id = 'warp-overlay';
    o.style.cssText = 'position:fixed;inset:0;z-index:99999;pointer-events:none;' +
      'opacity:0;transition:opacity .28s ease;background:#02040a;';
    var cv = document.createElement('canvas');
    cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
    o.appendChild(cv);
    var flash = document.createElement('div');
    flash.style.cssText = 'position:absolute;inset:0;opacity:0;' +
      'background:radial-gradient(circle at 50% 50%,#ffffff 0%,#dbeeff 35%,rgba(150,200,255,0) 72%);';
    o.appendChild(flash);
    document.body.appendChild(o);
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
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W, H, cx, cy, focal;
    function size() {
      W = cv.width = innerWidth * dpr;
      H = cv.height = innerHeight * dpr;
      cx = W / 2; cy = H / 2;
      focal = Math.max(W, H) * 0.16;
    }
    size();
    addEventListener('resize', size);

    var N = Math.min(520, Math.floor(innerWidth / 3) + 160);
    var stars = makeStars(N);
    for (var i = 0; i < N; i++) stars[i].pz = stars[i].z;

    var dur = mode === 'out' ? DUR_OUT : DUR_IN;
    var start = performance.now();
    // fade the dark overlay in (outbound) or leave it opaque then fade out (inbound)
    ui.o.style.opacity = mode === 'out' ? '0' : '1';
    if (mode === 'out') requestAnimationFrame(function () { ui.o.style.opacity = '1'; });

    function tick(now) {
      var p = Math.min(1, (now - start) / dur);   // 0..1 timeline

      // speed profile: outbound accelerates, inbound decelerates
      var speed, colT, flashV, overlayFade;
      if (mode === 'out') {
        speed = 0.006 + easeIn(p) * 0.075;         // accelerate into the jump
        colT = Math.min(1, p / 0.75);              // gold → blue crossover
        flashV = p < 0.72 ? 0 : Math.pow((p - 0.72) / 0.28, 2); // white-out at end
        overlayFade = 1;
      } else {
        speed = 0.006 + easeOut(1 - p) * 0.075;    // decelerate out of the jump
        colT = 1;                                  // stay in universe B (blue)
        flashV = p < 0.35 ? (1 - p / 0.35) : 0;    // start bright, clear the flash
        overlayFade = p < 0.6 ? 1 : (1 - (p - 0.6) / 0.4); // reveal the page
        ui.o.style.opacity = String(overlayFade);
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(2,4,10,0.35)';         // motion-blur trails
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
        var lw = Math.max(dpr * 0.6, (1 - s.z) * 3.4 * dpr);
        var a = Math.min(1, (1 - s.z) * 1.1);
        ctx.strokeStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + a + ')';
        ctx.lineWidth = lw;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }

      ui.flash.style.opacity = String(flashV);

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
    var flagged = false;
    try { flagged = sessionStorage.getItem(FLAG) === '1'; } catch (e) {}
    if (!flagged) return;
    try { sessionStorage.removeItem(FLAG); } catch (e) {}
    if (reduce) return;
    run('in', function (ui) {
      ui.o.parentNode && ui.o.parentNode.removeChild(ui.o);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', playInbound);
  } else {
    playInbound();
  }
})();
