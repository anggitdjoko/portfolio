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
| T02 Factual video explanation | Complete; tested, committed, Pages build and live text verified |
| T03 Video overlay keyboard support | Complete; tested, committed, Pages build and live interaction verified |
| T04 Readability | Narrow lead-text improvement implemented and locally compared; publication verification follows |
| T05 Content order | Reviewed with a local prototype; original order retained |
| T06 Ownership / T07 CV / T10 GearGrid video | Waiting for verified source material |
| T08 Filters and labels | Reviewed; existing labels and all five working filter states retained |
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

## T03 — Video overlay keyboard support

Parent/task T02: [fe1bd6d6](https://github.com/anggitdjoko/portfolio/commit/fe1bd6d67752b6b559e36aa98f72fe622c0acff6). The current overlay defect was reproduced at 390 and 1440 px: opening left focus outside, Tab reached background links, and programmatic background focus succeeded. The existing touchstart failsafe also cleared its inline scroll lock.

Changed the existing full-window overlay to a native modal dialog, retaining its styling, recorded assets and native video controls. Focus enters the close button; background controls become unavailable through native modal behavior. Escape, close and backdrop dismissal restore the exact triggering media tile, nested full-screen button or Watch reel link. A scoped HTML class holds the scroll lock without changing/restoring unrelated inline styles. Native nested-button keyboard activation is preserved without double-opening. The app script URL is versioned to avoid stale JavaScript with new dialog markup.

Local results:
- Click and native Enter/Space paths, Tab/Shift+Tab, blocked background focus, all dismissal paths, exact invoker restoration and repeated opening passed at 390 and 1440 px.
- Scroll stayed locked after the existing touchstart failsafe and restored after close.
- Servgo, HK Farm and SIMRS full MP4s loaded valid metadata, advanced playback time and retained controls; recorded durations were approximately 81.067, 100.7 and 70 seconds respectively.
- Filter rerender All → Full-Stack → All preserved 6 → 3 → 6 cards and restored all three video tiles.
- Baseline/candidate overlay, video and close-button geometry/styles matched at desktop and mobile widths. Nav/hero/unchanged sections were retained; the intended shorter T02 paragraph is not a layout regression.
- JavaScript syntax validation passed. Application page errors: none in the local runs. Video request cancellations while pausing/closing were observed, not treated as failed playback.

Limits: deterministic local runs block external CDNs and exercise the fallback; native dialog behavior was tested in Chromium, not certified on physical devices or with screen readers. Existing narrow-screen media geometry includes a small right-side overflow (about 8 px at 390 px); it was reproduced in baseline and retained to keep this keyboard task visually scoped. A separate media-layout review can address it. Final publication/build/live results follow after this implementation commit.

## Final publication verification — first batch complete

Checked: 2026-09-09T03:59:25.102Z (UTC; 2026-09-09 Asia/Jakarta).

| Task | Implementation commit | GitHub Pages result |
|---|---|---|
| T01 (existing; retained) | [08d4f4e](https://github.com/anggitdjoko/portfolio/commit/08d4f4e423fb6e3f11dca457f89c781486024c7e) | Build 1203253158: built; live versioned navigation script verified |
| T02 | [fe1bd6d6](https://github.com/anggitdjoko/portfolio/commit/fe1bd6d67752b6b559e36aa98f72fe622c0acff6) | Build 1203325773: built; fresh live HTML contains the factual sentence and no old private/on-premise claim |
| T03 | [4ce418cc](https://github.com/anggitdjoko/portfolio/commit/4ce418cc3c35e8d3527b6fa0b77c404cc7a503fa) | Build 1203327466: built; fresh HTML and versioned JavaScript verified |

Live site: https://anggitdjoko.github.io/portfolio/

A fresh production browser session loaded the new dialog markup and app.js?v=ux-reel-20260909 (HTTP 200), with Three.js/GSAP and the WebGL galaxy present. Six project cards and all five filters remain. Native Enter on Watch reel opened the modal, focused Close video and blocked background focus. Tab and Escape were exercised; after the native close event settled, focus and the exact prior scroll position returned, the reel scroll-lock class was absent and the video was paused. Reopening played the production Servgo MP4 with readyState 4, advancing currentTime and no media error. All three recorded MP4s were separately playback-tested locally.

Source integrity was checked against the fetched T01 revision: only index.html, app.js and this report changed across the implementation commits; all 26 other original file blobs, including project data, video/image assets, warp and data-page scripts, are unchanged. All 29 original paths remain. Production branch/root settings and workflows were not modified. Every branch update used force:false after checking the expected parent; no force push, history rewrite or reset occurred.

Machine-readable verification: [verification-2026-09-09.json](verification-2026-09-09.json). This final commit adds documentation/evidence only; the verified application revision is the T03 commit above.

### Retained, deferred and blocked

- Retained: galaxy theme, cyan/purple palette, typography, ordinary animations, warp source, contacts, project records/tags, filters, recorded assets and section order. No hosted demo server was introduced.
- T04/T05/T08/T09 remain separate review items, not silently implemented. T11 remains unnecessary.
- T06 still requires verified ownership/status facts; T07 an approved current CV; T10 a genuine GearGrid recording. No placeholders or invented claims were published.
- Remaining limits: Chromium responsive checks do not certify physical iPhone/Android, Safari, screen readers, performance, backend behavior or business outcomes. Live smoke testing covered the WebGL page; the deterministic local matrix covered the fallback. Full warp-transition end-to-end testing was not performed; warp source is byte-identical. Existing small mobile video overflow is documented above and was not redesigned in this keyboard task.

### Rollback references

T02 parent: [08d4f4e4](https://github.com/anggitdjoko/portfolio/commit/08d4f4e423fb6e3f11dca457f89c781486024c7e); T03 parent: [fe1bd6d6](https://github.com/anggitdjoko/portfolio/commit/fe1bd6d67752b6b559e36aa98f72fe622c0acff6). If a regression appears, check the latest branch and revert only the affected task in a new commit, preserving later work. No rollback was needed in this batch.

## Second batch — T04 / T05 / T08 review

Baseline fetched from gh-pages: [1cb905b6](https://github.com/anggitdjoko/portfolio/commit/1cb905b64319f474bb0fb739e1b7e66eaa29430c). Original data and report were read before making candidates.

### T04 — Narrow readability improvement

Compared original lead text and a slightly lighter blue-grey candidate at 1440 px desktop and 390 px mobile. Both the CSS fallback and actual CDN-loaded Three.js WebGL path were inspected. For the final WebGL comparison, the already-rendered scene was frozen only in the test session so before/after screenshots had the same background; production animation code was not changed by T04. The brighter About text was easier to distinguish over the galaxy core without dimming the galaxy.

Implemented one CSS declaration only: .lead color changes from #8b96b3 to #a9b3cb. Typography, text, geometry, backgrounds, palette variables, project cards, navigation, warp and animations are unchanged. Measured lead rectangles were identical before/after at both widths. Declared contrast against the flat #04060d base increased from 6.86:1 to 9.64:1; this is not a pixel-sampled contrast audit over every animated galaxy frame, nor a WCAG conformance claim. No broad dimming or redesign was shipped.

### T05 — Prototype reviewed; order retained

A local-only prototype moved Projects immediately after Hero. Desktop project position improved from about 4199 px to 900 px, and anchors/content remained intact, but it placed 03 Projects before 01 About and 02 Experience while navigation still followed the original order. Shipping that move would require wider sequencing and reveal/warp review. The existing direct View My Work link already provides project access. The bounded evidence does not justify that disruption; no section-order or numbering change is published.

### T08 — Existing filters retained

Verified all five controls and their matching results: All 6; Web App 1; Full-Stack 3; Web 1; Data 1. No failed state or evidence of a net clarity gain justified changing categories, labels or records. The current controls and project data remain unchanged.

Review evidence: [review-2026-09-09.json](review-2026-09-09.json). T04 live publication verification will follow its implementation commit. T05/T08 are completed reviews with explicit retain decisions, not unimplemented redesigns.
