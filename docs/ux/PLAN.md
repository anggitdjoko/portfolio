# Portfolio UX improvement plan

Created: 2026-09-09 (Asia/Jakarta)
Repository: `anggitdjoko/portfolio` · production branch: `gh-pages`
Baseline: `1f95ccc53968884373bb7ec911cca5bfa1e40acd`

## Owner's direction

Improve the existing portfolio incrementally, not redesign it. Publish the plan before implementation, work through tasks individually, and record results in this repository. Leave good existing behavior unchanged. Changes must make the site better, not merely different.

## Non-negotiable boundaries

- Preserve the space/galaxy theme, cyan–purple palette, typography, existing animation and warp experience for ordinary visitors.
- Keep recorded project demos; do not introduce hosted application servers.
- No invented contributions, metrics, customers, deployment claims, technologies, or testimonials.
- Preserve existing project records, video assets, working contacts, and links unless a specific task proves a change is needed.
- Production is the static site on `gh-pages`. Do not deploy the old Next.js project on `main`; do not change Pages settings or workflows.
- One task per implementation commit, with focused regression checks. No force pushes, history rewrites, or broad cleanup.
- A review recommendation is not automatically an instruction to redesign. If a change lacks clear benefit or evidence, defer it and explain why.

## Current baseline

The source and Pages settings were freshly checked. Pages publishes `gh-pages` from `/`; the old `main` deployment is manual-only. The existing theme, clear hero work/contact links, recorded demos, lazy media loading, video controls, contact options, and project filters are functional foundations to preserve.

The audit reproduced a narrow-screen navigation defect: the fixed menu is constrained by its blurred parent, leaving its first links above the viewport. The demo explanation also contains an unsupported private/on-premise hosting claim. The video overlay lacks keyboard focus management.

## Task queue and acceptance criteria

| ID | Task | Initial decision | Acceptance criteria |
|---|---|---|---|
| T01 | Repair mobile navigation without redesign | Implement first | All visible navigation links fit at 320, ~390, and 760 px; open/close works; usable button target; correct accessible name/state; closed links unfocusable; Escape returns focus; anchor links still work; desktop navigation and page geometry preserved |
| T02 | Replace unsupported, long demo explanation | Implement second | One factual English sentence reflecting recorded demos; no hosting assumptions; no changes to project descriptions, tags, media, or filters |
| T03 | Improve video-overlay keyboard behavior | Implement third after testing | Open with click/keyboard; focus enters overlay; background unavailable to keyboard; Escape/close/backdrop closes; focus returns to invoker; scroll restores; video remains playable; visuals unchanged |
| T04 | Improve text readability over galaxy | Review separately | Compare baseline and candidate on desktop/mobile, retain galaxy appearance, improve text only where needed; do not ship broad dimming without clear visual benefit |
| T05 | Bring project evidence earlier | Review separately | Prototype before moving sections; verify anchors, section numbering, reveal/galaxy/warp behavior and content preservation; retain existing order if benefit is not worth disruption |
| T06 | Clarify project ownership/status | Waiting for verified facts | No role or production/adoption claims without reliable owner-provided evidence; no invented impact figures |
| T07 | Add a CV shortcut | Waiting for approved CV | No broken/placeholder button; publish only an owner-approved current CV with verified destination |
| T08 | Simplify filters and demo labels | Review; retain for now | Existing filters work and are not a blocker. Change only if clarity improves without losing useful categories or controls |
| T09 | Complete reduced-motion support | Separate technical review | Reduced-motion users receive a calmer experience; ordinary visitor animations and transitions remain intact; test both WebGL and fallback paths |
| T10 | GearGrid recording | Waiting for local recording | Accept genuine recording assets from owner/local agent; follow existing media style; do not create a hosted demo |
| T11 | Investor-specific content | No change needed now | This is a personal portfolio, not an investment pitch. Do not invent business traction or add a pitch section without a specific need |

First implementation batch: T01 → T02 → T03, each tested before publishing. The rest are explicit review/waiting items, not silent redesign work.

## Test and publication procedure

1. Fetch the current branch HEAD and target files; compare with the expected revision to avoid overwriting another agent's work.
2. Publish this plan and the initial report before changing application files.
3. Reproduce each defect against the current baseline, not just the earlier audit.
4. Make the smallest isolated patch in a local candidate. Compare changes against baseline.
5. Test responsive layout at representative widths, keyboard controls, anchor navigation, project filters and video controls. Compare desktop geometry and protected source sections.
6. Publish one task commit with its report entry. Use a fast-forward-only update. If HEAD changed, stop and reconcile rather than force an update.
7. Check Pages build status and fresh live HTML/JavaScript, including asset cache behavior. Record actual results, not assumed success.
8. Publish a final report with completed, retained, deferred and blocked items, commit links, test scope, and remaining limitations.

## Rollback policy

Keep the baseline and per-task parent commits. If a regression is found, restore only that task's affected content through a new revert commit after checking for concurrent edits. Do not reset the whole branch or discard later work. Re-test and document the rollback.

## Limits

Responsive browser checks are not physical iPhone/Android certification. No performance score, business metric, security property, or backend behavior is verified by this UI work. Any incomplete checks must remain visible in the report.

Progress and evidence: [REPORT.md](REPORT.md).
