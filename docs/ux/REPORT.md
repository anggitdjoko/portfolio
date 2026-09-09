# Portfolio UX progress report

Updated: 2026-09-09 (Asia/Jakarta)
Plan: [PLAN.md](PLAN.md)

## Status before implementation

The improvement plan is being published before any frontend changes. Baseline commit: `1f95ccc53968884373bb7ec911cca5bfa1e40acd`.

### Verified configuration

- Production: GitHub Pages, `gh-pages`, root directory.
- Main branch's legacy Next.js deployment is manual-only. It has not been run or modified.
- Current source fetched: `index.html`, `app.js`, `data.js`, `warp.js`.
- No approved CV/PDF or existing documentation folder found in the production tree.

### Task status

| Task | Status |
|---|---|
| T01 Mobile navigation | Complete; existing implementation retained; Pages build and live script verified |
| T02 Factual video explanation | Implemented and locally tested in this commit; deployment verification follows |
| T03 Video overlay keyboard support | Planned; no patch published yet |
| T04 Readability / T05 Content order | Separate visual review; existing design retained for now |
| T06 Ownership / T07 CV / T10 GearGrid video | Waiting for verified source material |
| T08 Filters and labels | Retained pending evidence of a better alternative |
| T09 Reduced motion | Separate technical review |
| T11 Investor pitch | Not needed for this personal portfolio; no changes planned |

### Explicitly retained

Space theme, colors, typography, animation, warp transition, working hero links, video files, project records/tags, filters, contacts, and production configuration. No redesign or live demo servers are part of this work.

## Test scope

## T01 — Mobile navigation

Changes are confined to navigation CSS/markup/handlers, plus a versioned app script URL to avoid serving stale navigation code. The panel now has explicit viewport height and safe scrolling at short heights. Menu button and links have 44 px targets. Open/closed labels and state, background isolation, Escape, focus restoration, keyboard wrapping, and breakpoint cleanup were added. Desktop navigation styling is unchanged.

Local results:
- 27/27 responsive and interaction checks passed at 320, 390, 760 and 761 px, including a 320 px-high short landscape viewport.
- All five navigation links fit; closed links cannot receive focus; scroll/background state restores after closing and resizing.
- Native Escape and Shift+Tab were tested in addition to synthetic boundary tests.
- Projects anchor and all five existing filters passed. The anchor test initially checked too early during the existing smooth-scroll animation; after waiting for the target position it passed. No scroll animation was changed.
- Baseline/candidate desktop comparisons matched exactly for viewport, section dimensions, navigation rectangles, main content, project data, and palette.
- JavaScript syntax check passed. `data.js`, `warp.js`, video files and the Three.js code are unchanged.

Preview limitation: the local HTTP server is not reachable from the browser environment. Tests used local file pages and source-equivalent responsive frames instead; this is not a production defect. Live publication verification follows this commit. Physical mobile hardware was not tested.

## Follow-up verification — T01

The current branch already contained [08d4f4e](https://github.com/anggitdjoko/portfolio/commit/08d4f4e423fb6e3f11dca457f89c781486024c7e); it was fetched and retained rather than reimplemented. GitHub Pages build 1203253158 reports **built** for that exact commit. A fresh browser visit confirmed the versioned navigation script returns HTTP 200 and contains the current handlers. Production loaded Three.js and GSAP, rendered six project cards and five filters, and displayed the WebGL galaxy (not the fallback).

The follow-up local responsive matrix passed 27/27 navigation cases across baseline, T02 and T03 candidates: widths 320, 390, 760, 761, 1440 and short height 320. Labels/state, inert closed links, Escape, anchors, safe short-height scrolling and breakpoint cleanup passed.

## T02 — Factual recorded-demo explanation

The unsupported private/on-premise infrastructure claim was reproduced in the fetched baseline. Replaced only that paragraph with one factual English sentence:

> Watch recorded project demos using the video controls or open them in the full-screen viewer.

Source comparison confirms this task changes only that sentence in application files. Runtime comparison matched all five filter states, six project records, titles and category counts. Project descriptions, tags, media, filters, contacts, styles, navigation and animation source are unchanged. No hosting assumptions or new project claims were added.

Local browser checks used Chromium with external font/Three.js/GSAP requests blocked to exercise the fallback consistently; this is distinct from the live WebGL check above. No application page errors occurred. Physical iPhone/Android, Safari and assistive-technology certification are not claimed. Deployment status is deliberately pending until the resulting commit is built and checked live.
