# Between the Lines

A responsive reading-speed and comprehension game built with React, TypeScript, Vite, and `vite-plugin-pwa`. An original, newspaper-inspired interface; no backend, accounts, analytics, or external fonts.

## Run locally

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open the printed URL at `/readingspeedgame/`. For the installable/offline version:

```sh
npm run lint
npm test
npm run build
npm run preview
```

The service worker is enabled in production builds, not the development server. Installation requires HTTPS or localhost and a compatible browser.

## Play

Choose a classic, press **Start reading** to reveal its excerpt, and press **End reading** below the text to hide it and stop timing. Answer all three questions before submitting. Results show words per minute, comprehension accuracy, and answer explanations separately.

Timing uses a monotonic clock and continues in background tabs. Attempts shorter than one second cannot be submitted. Word counts use whitespace-delimited tokens (hyphenated words count as one). Repeated passages are labeled as practice: results are personal snapshots, not standardized assessments.

The latest 30 results and larger-text preference are saved in local storage, on this browser/device only. Clearing browser data removes them. Storage restrictions do not prevent playing. Unfinished attempts are not saved.

## Install and offline play

After the first successful production load, the service worker caches the app and all bundled passages. The footer reports when offline setup completes. Use the install button where available, or your browser's installation menu. On iOS, use Safari → Share → Add to Home Screen.

Updates wait for confirmation, with the update control hidden during reading and questions. Source links require internet access. No third-party resources are needed to play.

## GitHub Pages

The included `.github/workflows/deploy.yml` validates and builds pull requests, then publishes pushes to `main`. It also supports manual dispatch. Vite's base path and PWA scope are configured for:

**https://darrenhum.github.io/readingspeedgame/**

To activate publishing:

1. In repository **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source.
2. Merge the implementation into `main`; the **Deploy to GitHub Pages** workflow will publish it.
3. Alternatively, once the workflow exists on the default branch, run it from the Actions tab. If deploying another branch manually, the `github-pages` environment must permit that branch.

The workflow uses narrowly scoped deployment permissions and pinned action revisions. Publishing requires repository permissions and a GitHub plan that supports Pages for the repository's visibility. The URL is not live until a deployment succeeds.

For Netlify or Vercel, use `npm run build` and the `dist` output directory; change `base` in `vite.config.ts` to `/` when hosting at the domain root.

## Content

`src/passages.ts` contains exact excerpt boundaries, source/edition attribution, and original multiple-choice questions with explanations. Starter texts:

- Lewis Carroll, *Alice’s Adventures in Wonderland* (1865), Chapter I, opening three paragraphs. Project Gutenberg #11, Millennium Fulcrum Edition 3.0.
- Jane Austen, *Pride and Prejudice* (1813), Chapter 1, opening through “What a fine thing for our girls!” Project Gutenberg #1342; plain-text emphasis markers omitted.
- Aesop, *The Hare and the Tortoise*, complete fable in George Fyler Townsend’s public-domain translation. Project Gutenberg #21.

These texts and the Townsend translation are public domain in the United States; check local copyright rules before redistributing elsewhere. Excerpts were checked against the GITenberg mirrors of the Gutenberg text editions. Typography and paragraph wrapping are normalized for the screen. All question answers are supported by the displayed excerpt.

## Validation

`npm test` uses Node's built-in test runner to check scoring, word counts, passage structure, attempt transitions (including duplicate actions and the active-attempt update guard), and resilient storage reads/writes. `npm run lint` uses the scaffold's Oxlint configuration; `npm run build` strictly type-checks the application, build configuration, and tests, then generates the production PWA.

`src/attempt.ts` owns pure attempt transitions; App applies them synchronously before rendering to prevent duplicate submissions. `src/storage.ts` owns persistence keys, validation, and the history limit. Quiz, results, and journal components render those states without owning persistence or timing. Passage initials and card themes are explicit metadata, independent of list order.

Browser checks should cover the full reading → quiz → results flow, keyboard focus and radio navigation, mobile widths, persistence after reload, blocked storage, offline reload after caching, and updating only between attempts. Test installation on a physical iOS/Android device before a broad launch.