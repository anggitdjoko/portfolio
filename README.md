# Anggit Djoko Wibowo — portfolio repository

This repository contains the source and supporting assets for Anggit Djoko Wibowo's portfolio. The public site is:

- **Portfolio:** <https://anggitdjoko.github.io/portfolio/>
- **Data showcase:** <https://anggitdjoko.github.io/portfolio/data.html>
- **Repository:** <https://github.com/anggitdjoko/portfolio>

The two Git branches currently have different responsibilities. Read the source/deployment notes below before changing either one.

## Source and deployment map

| Branch | Purpose | Current publication status |
| --- | --- | --- |
| `gh-pages` | Static space-themed portfolio served from the repository root. `index.html` is the home page and `data.html` is the data showcase route; `data.js`, `app.js`, `warp.js`, and the dashboard scripts provide their runtime data and behaviour. | **Current GitHub Pages source** (legacy Pages, root `/`). |
| `main` | A separate Next.js App Router/Ghibli experiment under `src/`. Its export settings are in `next.config.ts`. | **Not the current live Pages source.** Its deploy workflow is manual-only and must not be treated as an automatic deployment path. |

GitHub Pages currently serves `gh-pages`; changes to `main` do not update the live site. Do not switch the Pages source or modify deployment workflow configuration without an explicit migration, review, and rollback plan.

## Live static site (`gh-pages`)

The live static site keeps its existing galaxy/particle visual system and progressive fallbacks. Relevant files include:

- `index.html` — portfolio markup, styles, metadata, and static shell.
- `data.js` — visible identity, skills, experience, projects, and contact data consumed by the home page.
- `app.js` — navigation, project filtering, recorded-demo viewer, contact rendering, and ambient sound control.
- `warp.js` — the home/data route transition.
- `data.html`, `gas.js`, `kobelco.js`, `jar.js` — data showcase route and its dashboard views.
- `assets/` — images, videos, and other static resources used by the published branch.

The data showcase contains reporting views and caveats that should remain honest. Before adding, removing, or republishing data, confirm the relevant ownership, publication permission, date/scope, and methodology. Presence in the current branch is not by itself evidence that a raw dataset or business metric is cleared for new use.

## Next.js experiment (`main`)

The `main` branch is an exportable Next.js application. Current configuration (`next.config.ts`) uses:

- `output: 'export'`;
- `basePath: '/portfolio'`;
- unoptimized images for the export;
- trailing slashes; and
- React strict mode.

The visible application data is primarily in `src/data/portfolio.ts`. The App Router entry point is `src/app/`, shared UI is under `src/components/`, styles are under `src/styles/`, and static files are under `public/`. The repository also contains `messages/` for translation content and `experience/` data/reporting inputs. These trees are not automatically equivalent to the currently published `gh-pages` tree.

The repository's existing `.github/workflows/deploy.yml` is deliberately `workflow_dispatch`-only and describes this separation. It is not changed by this documentation update.

## Local development

The commands below are the scripts currently declared in `package.json`:

```bash
npm install
npm run dev       # Next.js development server
npm run build     # static export build
npm start         # serve the production build locally
npm run lint      # repository lint script
```

The manual workflow currently uses Node.js 22. Use a Node.js release supported by the installed Next.js version when running locally. `npm run build` writes the export to `out/` according to the Next.js configuration; `npm start` serves the Next production output when that output is available.

Some Next.js routes and integrations use environment variables. Keep local values in an ignored `.env.local` file and never commit tokens or API keys. Do not assume that optional API-backed features are available in a clean checkout.

## Repository layout

```text
.
├── src/                 # Next.js App Router experiment on main
├── public/              # static assets for the Next.js experiment
├── messages/            # translation messages used by main
├── experience/          # reporting inputs; review provenance before reuse
├── package.json         # scripts and dependency declarations
├── package-lock.json    # locked dependency resolution
├── next.config.ts       # static-export and base-path settings
├── .github/workflows/   # manual build/deploy workflow (do not alter casually)
└── LICENSE              # existing MIT notice
```

The `gh-pages` branch is the production static tree rather than a generated copy of this layout. Keep branch-specific edits separate so a documentation or experiment change cannot silently replace the live site.

## Ownership, attribution, and licensing notes

The confirmed repository owner and portfolio identity for this guide is **Anggit Djoko Wibowo**. This README does not relabel project records, employment history, credentials, images, raw data, or links whose provenance has not been confirmed. Those items require an owner-approved source-of-truth before they are consolidated, promoted, or removed.

The existing `LICENSE` file and its copyright notice are intentionally unchanged; it is retained as legal/provenance attribution separate from the portfolio identity. Existing third-party package, font, asset, and template attributions must remain in place. No third-party work is claimed as Anggit's solely because it appears in the repository.

The repository is distributed under the MIT terms in `LICENSE`. Dependencies and externally sourced assets may carry additional terms; check their upstream notices before redistribution.

## Contribution and change safety

Before proposing a change:

1. Confirm whether it belongs on `main` or `gh-pages`.
2. Read the current file and preserve unrelated work.
3. Check links, dependencies, licenses, secrets, accessibility, and data provenance.
4. Use a separate branch and pull request; do not merge or change the live Pages source as part of an unreviewed change.
5. For production changes, test the home page, `data.html`, responsive navigation, recorded-demo viewer, reduced-motion behaviour, and the no-WebGL fallback before release.

This repository guide intentionally documents the current architecture; it does not claim that the pending provenance, privacy, source-of-truth, or Pages-migration decisions are complete.
