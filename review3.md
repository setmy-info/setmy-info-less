# Review 3 — full code, test, and dependency review

Third-pass review of `setmy-info-less` after the multi-module refactor. This document reviews the
LESS source, the test suites, and the README files **as the modules exist right now** (6 packages,
all at `3.1.0`). It does not propose re-structuring the module hierarchy — that hierarchy is taken
as given. It carries forward the still-relevant concerns from `review.md`, adjusts them to the
current layout, documents the real dependency order, and ends with a prioritized suggestions list.

> ~~Note on `review2.md`: `README.md` lists `review.md` and `review2.md` under "Review notes", but
> `review2.md` does not exist in the working tree or in git history.~~ ❌ N/A — dismissed; no action
> taken on the `review2.md` reference (see Suggestions §D2).

---

## 1. Module / dependency reality check (most important finding)

The packages declare one dependency graph in their `package.json` files, but the LESS `@import`
statements wire up a **different, flatter** graph. The two do not agree, and two packages compile to
**zero CSS rules**.

### 1.1 Declared npm dependencies vs. actual LESS imports

| Package                        | Declared `dependencies`                       | What its `main.less` actually `@import`s                          |
|--------------------------------|-----------------------------------------------|-------------------------------------------------------------------|
| `setmy-info-less`              | —                                             | own `values, html, utility, devices, flex, grid, components`      |
| `setmy-info-less-extended`     | `setmy-info-less`                             | **only** base `values/index.less` — nothing else                  |
| `setmy-info-less-fancy`        | `setmy-info-less-extended`                    | base `values` + own (empty) `utility/index.less` — **not** extended |
| `setmy-info-less-enterprise`   | `setmy-info-less`, `setmy-info-less-extended` | base `values, html, utility, devices, flex, grid, components` — **not** extended |
| `setmy-info-less-ide`          | `setmy-info-less-enterprise`                  | base `values` + own `frames` + own (empty) `utility` — **not** enterprise |
| `setmy-info-less-experimental` | `setmy-info-less-enterprise`                  | enterprise `main.less` + own `grid, base, ui, forms, data, utility` ✔ matches |

Only `setmy-info-less-experimental` has a LESS import graph that matches its declared dependency.

### 1.2 Compiled output sizes (from current `dist/`)

| Package                        | `dist/main.css` | Class selectors | Verdict                                  |
|--------------------------------|-----------------|-----------------|------------------------------------------|
| `setmy-info-less`              | 709 lines       | 124             | the real base                            |
| `setmy-info-less-extended`     | 10 lines        | **0**           | **empty** — only comments + token values |
| `setmy-info-less-fancy`        | 10 lines        | **0**           | **empty** — only comments + token values |
| `setmy-info-less-enterprise`   | 712 lines       | 124             | ≈ identical to base (extended adds nothing) |
| `setmy-info-less-ide`          | 104 lines       | 17              | frame classes only; no base/enterprise CSS |
| `setmy-info-less-experimental` | 1459 lines      | 257             | base (via enterprise) + experimental utilities |

### 1.3 Consequences

- **`extended` and `fancy` ship empty stylesheets.** Both compile to 0 rules. Publishing them at
  `3.1.0` ships `dist/main.css`/`main.min.css` that apply no styles. Anyone installing
  `setmy-info-less-fancy` gets nothing.
- **`enterprise` is just base re-compiled.** It declares a dependency on `extended` and its header
  comment says it "aggregates the base module with stable Layer 1 extensions", but `extended`
  contributes no rules and is not even imported. The enterprise `main.less` re-imports base source
  directly. So enterprise ≈ base (124 selectors either way).
- **`ide` does not contain what its dependency implies.** Its `package.json` says it depends on
  `enterprise`, and `main.less` says "Load setmy-info-less-enterprise CSS before this", but the
  compiled `ide/dist/main.css` contains only the 17 frame classes — no base resets, no enterprise
  CSS. A consumer who installs `setmy-info-less-ide` from npm and loads only its `dist/main.css`
  gets frames with **no base layer underneath them**. They must manually also load base (or
  enterprise) CSS. Nothing in the package enforces or documents this at the CSS level.
- **Cross-package `@import` reads source, not `dist`.** Every cross-package import points at
  `../../../../<pkg>/src/main/less/...`. This means:
  - The npm `dependencies` are decorative for the build — no package's compile step consumes another
    package's `dist/`.
  - A published package's `dist/main.css` is self-contained for whatever it actually imported, which
    (per §1.1) is usually just base `values` + its own files — **not** the dependency chain the
    `package.json` advertises.
  - This is the root cause of the "ide/fancy ship less than their dependency implies" trap.

### 1.4 What is internally consistent and should be kept

- The base module (`setmy-info-less`) is clean, self-contained, and is the only package doing real
  work for most of the stack. Keeping it minimal (as `review.md` recommends) is being honored.
- `experimental` correctly layers on `enterprise` and is the one package whose imports, deps, and
  output all agree.
- The `values/index.less` token layer is shared by every package via a single import, so tokens stay
  consistent across the workspace.

---

## 2. Correct dependency / build / publish order — ✅ DONE

This is now documented in `README.md` (Publishing → "Build vs. publish order"). Summary:

- **Build order: not significant.** `lessc` reads dependencies' LESS *source* via relative paths, so
  `npm run build --workspaces` works in any order. npm iterates alphabetically: `setmy-info-less`,
  `-enterprise`, `-experimental`, `-extended`, `-fancy`, `-ide`.
- **Publish order: significant**, topological by declared `dependencies`:
  1. `setmy-info-less`
  2. `setmy-info-less-extended`
  3. `setmy-info-less-fancy`
  4. `setmy-info-less-enterprise`
  5. `setmy-info-less-ide`
  6. `setmy-info-less-experimental` (internal only)

---

## 2a. Module independence

**The modules are NOT all independent — they form a layered DAG rooted at `base`.** Wiring as of the
current source (after the A1–A3 / E-series changes):

| Module | Compile-time LESS imports | Independent? | Its `dist/main.css` is… |
|---|---|---|---|
| `setmy-info-less` (base) | nothing cross-package | ✅ **fully independent** | standalone, self-contained |
| `setmy-info-less-extended` | base `values` (tokens only) | ❌ needs base to compile | empty delta (skeleton) |
| `setmy-info-less-fancy` | base `values` (tokens only) | ❌ needs base to compile | empty delta (skeleton) |
| `setmy-info-less-ide` | base `values` (tokens only) | ❌ needs base to compile | delta — frame rules only |
| `setmy-info-less-enterprise` | base (full) + extended | ❌ cumulative | self-contained bundle (base + extended) |
| `setmy-info-less-experimental` | enterprise (= base + extended) + own | ❌ cumulative | self-contained bundle + experimental |

**Key points:**

1. **Only `base` is independent.** Every other module `@import`s base's `values/index.less` at a
   minimum, so none of them can even *compile* without base source present.
2. **Two meanings of "independent" diverge:**
   - *Compile independence:* only `base`.
   - *Runtime / standalone-CSS independence:* `base`, `enterprise`, and `experimental` ship
     self-contained stylesheets usable on their own. `extended` / `fancy` / `ide` are **deltas** —
     their CSS is not usable alone; the consumer must load the parent CSS first (the load-order
     dependency documented in each package's `main.less` header).
3. **No cycles** — strict DAG. Same-tier modules don't depend on each other: `fancy` ↔ `enterprise`
   are mutually independent, and `ide` ↔ `experimental` are mutually independent (they only share
   upstream ancestors).
4. **npm dependency vs. LESS import differ on purpose for the delta packages.** `fancy`'s npm dep is
   `extended` but it LESS-imports only base tokens; `ide`'s npm dep is `enterprise` but it LESS-imports
   only base tokens. Under the standalone/delta model (C1) the npm dependency expresses **load order**
   while the LESS import is **tokens only**. `extended` (token-only), `enterprise` and `experimental`
   (cumulative) have npm deps that match what they compile.

Net: `base` stands alone; everything else is layered on top of it — `enterprise` and `experimental`
as full bundles, `extended` / `fancy` / `ide` as deltas that lean on a parent at load time.

---

## 3. LESS code review (current source)

### 3.1 Correct / good
- Base utilities are conservative, float/`display:table`-based, and compile ahead of time — friendly
  to older browsers as `review.md` notes.
- camelCase, behavior-first naming is consistent (`.centerBox`, `.verticalStretchPanel`,
  `.autoScrollBars`).
- KSS-style comment blocks are present on several files (`visibility.less`, `flex/index.less`,
  experimental `button.less`) — good groundwork for the styleguide build.
- The Level-0 categories from `review.md` (`section`, `modal`, `card`, `article`, `.invisible`)
  have landed in base `utility/`. The `.invisible`/`.visible` gap is closed.

### 3.2 Issues and smells
- **`!important` in `panels.less`.** `.verticalStretchPanel` / `.horizontalStretchPanel` still use
  `!important` (min-height/height and min-width/width). `review.md` flagged this; it complicates
  integrator overrides. The file's own comment acknowledges it. Candidate for removal once load
  order guarantees specificity.
- **Variable forward-reference in `values/index.less`.** `@headerPanelHeight: @headerHeight +
  @navigationHeight;` is declared *above* `@headerHeight` and `@navigationHeight`. LESS lazy
  evaluation makes this work, but it reads as a bug. Reorder so definitions precede use.
- **`@headerHeight` / `@footerHeight` redefined in `ide/frames/index.less`.** Base sets
  `@footerHeight: @defaultHeight` (50px); frames overrides it to `@halfDefaultHeight` (25px). Because
  LESS is last-wins-global, the override silently changes a token that *looks* shared. It happens to
  be harmless here (ide doesn't import `devices`, the other consumer of `@headerHeight`), but it is a
  latent trap if imports change. Prefer frame-local names (`@frameHeaderHeight`, `@frameFooterHeight`).
- **`html-extended.less` is empty.** Imported by `html/index.less` but contains only a comment.
  Harmless, but dead.
- **`grid/index.less` (base) is an empty stub.** Imported by base `main.less`; produces nothing. The
  real grid utilities live in `experimental/grid/index.less`. Either keep the stub intentionally
  (documented) or remove the import.
- **`.phone-hidden` naming vs. media queries.** `.phone-hidden` is defined in both `watch.less`
  (`max-width: 639px`) and `phone.less` (`640–1023px`), so it hides on everything below 1024px, not
  just "phone". `.pc-hidden` hides at ≥1024px and uses `!important` (the only device rule that does).
  Naming is slightly misleading; behavior is fine. Worth a doc note.
- **`print.less` / `watch.less` body blocks are empty** placeholders (`@media only print { body {} }`).
  Fine as scaffolding; note they produce no output.
- **Odd cross-package script in base `package.json`:** `css:experimental` compiles
  `../setmy-info-less-ide/src/main/less/experimental/main.less` into `setmy-info-less/dist/`. The base
  package reaching into `ide`'s experimental tree is surprising coupling and an easy source of stale
  output. Review whether this script is still needed.

### 3.3 Browser-support posture (unchanged from `review.md`, still accurate)
- Modern features in use: `display:flex` (flex helpers), `calc()` (devices + ide frames),
  `margin-block` (`html.less` headings), `linear-gradient` (`hr`), CSS `grid` (experimental),
  `aspect-ratio`/`position:sticky` (experimental). These are fine Firefox-first / evergreen but not
  IE-safe. README already states the Firefox-first, evergreen-supported, legacy best-effort policy.
- No `browserslist` is declared — support policy remains implicit in docs only.

---

## 4. Test review (current state)

### 4.1 What exists
- **Jest unit:** one placeholder (`common/test/js/unit/main.test.js`, asserts `true === true`). No CSS
  behavior is unit-tested (expected — CSS behavior is covered by e2e).
- **Selenium e2e (Jest runner):** migrated off Playwright. `pageHelper.js` drives a remote Firefox via
  Selenium Grid, serves fixtures from an Express server on a random port, and compensates window chrome
  to hit an exact 2000×1200 viewport. `maxWorkers: 1` serializes within a package; `pageClose()` in
  `afterAll` prevents orphaned sessions.
- **Cucumber/BDD:** shared steps in `common/test/js/bdd/`. Base now has feature files for `body`,
  `article`, `card`, `modal`, `section`; ide adds `frames` and `experimental-frames`.
- **stylelint** per package.

### 4.2 Coverage by package
| Package      | e2e files | Cucumber features | Notes |
|--------------|-----------|-------------------|-------|
| base         | 7 (`application`, `background`, `body`, `centerText`, `flex-center`, `layoutCenterBox`, `layoutCenterBox2`) | 5 | best covered, but `flex-center.e2e.js` historically only checked the title |
| extended     | 1 (`body`) | 1 | tests an empty stylesheet — body comes from base anyway |
| fancy        | 1 (`body`) | 1 | tests an empty stylesheet |
| enterprise   | **0**     | **0**             | **no tests at all**; `verify` only runs `lint:less` |
| ide          | 1 (`body`) | 3 (`body`, `frames`, `experimental-frames`) | frame e2e still thin |
| experimental | 1 (`body`) | 1 | 257 selectors, 1 fixture |

### 4.3 Gaps and dead code
- **`enterprise` has no `verify` beyond lint.** It also has no `test`/`e2e`/`cucumber` scripts and no
  Jest/Playwright/cucumber config. The combined stable distribution is never rendered-tested.
- **`firefoxHelper.js` is dead code.** It hard-codes `/opt/firefox/firefox` and a Windows path — a
  Playwright-era leftover. Selenium Grid no longer uses it. Nothing imports it.
- **`playwright.config.js` stubs remain** in all five test packages (`module.exports = {}`). Dead files
  retained after the Selenium migration.
- **`extended`/`fancy` e2e assert against empty CSS.** Their `body` test passes because `body` styling
  comes from the base reset, not from these packages — so the test is not actually exercising the
  package under test.
- **Most base utility classes are untested** (spacing, sizing, scroll, text, cursor, visual-style,
  notes, the new section/modal/card/article families, `.invisible`). The detailed missing-test matrix
  in `review.md` (§Testing review) is still valid; nothing there has been crossed off except the
  feature-file additions for `article`/`card`/`modal`/`section`.
- **Responsive viewport tests still missing** for `.phone-hidden` / `.pc-hidden` at multiple widths.
- **Build-output smoke test** — ✅ DONE (B2): `npm run smoke:dist` now fails the pipeline if a
  *content* package's `dist/main.css` is empty, while tolerating the intentional skeletons.
- **Single browser only.** Firefox via Grid; no Chromium run despite ~65% market share.

---

## 5. README / docs review
- The **dependency graph** section (Layer 0–3) — ✅ ADDRESSED (D1/C1): a "load order, not CSS
  bundling" / standalone-delta note was added so the Layer diagram is no longer read as a promise about
  compiled CSS contents.
- The **Publishing** section was outdated (covered only base + extended); it has been corrected in this
  pass to the full six-package topological order plus a build-vs-publish-order note.
- `review2.md` is referenced but absent (§intro note).
- Setup, Selenium Grid, and KSS (`kss-node`) instructions are accurate for the current toolchain.

---

## 6. Suggestions (prioritized — modules kept as-is)

These do **not** change the module hierarchy. They fix correctness, close the deps/imports gap, and
remove dead weight.

> **Status legend:** ✅ DONE · ☑️ RESOLVED (closed by a decision, no code needed) · ❌ N/A
> (dismissed, won't do) · ⬜ OPEN

### A. Reconcile declared dependencies with LESS reality (highest value)
Pick one direction per package and make `package.json` and `main.less` agree:
- **A1.** ✅ DONE — Resolved under the **standalone / delta** model (see C1). `fancy` and `extended`
  are now wired as proper delta skeletons: each imports base `values` for tokens only, declares its
  parent as a load-order dependency in `package.json` (no rule-bundling `@import`), and documents the
  load order in its `main.less` header. `extended` gained a `utility/index.less` content home matching
  `fancy`/`ide`. (Bundling extended's rules into fancy would have violated the delta model.)
- **A2.** ✅ DONE — `enterprise` (the one cumulative meta-package) now imports `extended`'s content
  (`extended/utility/index.less`) under a "Layer 1" import, matching its declared `extended`
  dependency. `extended` is an empty skeleton so the compiled rules are unchanged (smoke: 154), but
  the wiring is real and future content flows into the bundle automatically. Header comment updated.
- **A3.** ✅ DONE — `ide`'s `main.less` header now documents the standalone/delta model explicitly: its
  `dist` carries only the frame rules, base `values` is imported for tokens only, and the
  `enterprise` dependency is a load-order relationship (load enterprise CSS first), not a CSS import.
  Consistent with the fancy/extended delta headers. No rule-output change (smoke: 18).

### B. Fix the empty packages
- **B1.** ☑️ RESOLVED — `extended` and `fancy` are **intentional skeletons** for future LESS, not
  broken packages. Decision: keep them empty under the standalone/delta model; no content is invented.
  The smoke test (B2) explicitly tolerates them.
- **B2.** ✅ DONE — Added `packages/common/test/js/distSmoke.js` + root `npm run smoke:dist`, wired
  into the CI one-liner after `build`. It fails when a *content* package's `dist/main.css` has zero
  rules and tolerates the intentional skeletons (`extended`, `fancy`).

### C. Decide the cross-package import strategy
- **C1.** ✅ DONE — Decided **(b) standalone / delta**: each package's `dist` carries only its own
  rules; consumers compose base + each layer in load order. `enterprise` is the explicit cumulative
  exception. Documented in `README.md` (Dependency graph note) and each delta package's `main.less`.

### D. README / docs
- **D1.** ✅ DONE — Added a "load order, not CSS bundling" / standalone-delta note to the
  README dependency-graph section, so the Layer diagram is no longer read as a promise about CSS
  contents.
- **D2.** ❌ N/A — Dismissed. The `review2.md` mention was a non-issue; no action will be taken on it.
- **D3.** ✅ DONE — Documented the `.phone-hidden` / `.pc-hidden` breakpoint behavior in three places:
  in-code (a reference block in `devices/index.less` plus per-file range markers in
  `watch`/`phone`/`pad.less`), the base package README ("Responsive breakpoints" section with the
  1024px boundary table and a visibility-utility table + examples), and the root README "Principles"
  section (accurate pixel ranges + the two utilities, linking to the base README). Clarified that
  `.phone-hidden` hides everything below 1024px, not only phones.

### E. LESS hygiene
- **E1.** ✅ DONE — Reordered `values/index.less` so `@headerHeight`/`@navigationHeight`/`@footerHeight`
  are declared before `@headerPanelHeight`. Pure refactor (lazy eval → identical compiled CSS).
- **E2.** ✅ DONE — Renamed the `ide/frames/index.less` local `@headerHeight`/`@footerHeight` to
  `@frameHeaderHeight`/`@frameFooterHeight`, so they no longer shadow the shared base tokens. Verified
  byte-identical `ide/dist/main.css` (same computed values) — pure rename.
- **E3.** ✅ DONE — Removed both empty stubs and their imports: deleted `html/html-extended.less` (and
  its import in `html/index.less`) and base `grid/index.less` (and its imports in base `main.less` and
  enterprise `main.less`; the now-empty `grid/` dir was removed). Updated the base `main.less` header
  ("flex composition helpers") and the README "Load order" tree. Real grid utilities still live in
  `experimental/grid/`. Rule counts unchanged (base/enterprise 154).
- **E4.** ✅ DONE — Removed the four `!important` flags from `.verticalStretchPanel` /
  `.horizontalStretchPanel` in `panels.less` and updated the comment; integrators can now override
  these utilities by load order/specificity. (The stretch panels are unused in any fixture, so no
  rendering regression; `.pc-hidden`'s `!important` in `pad.less` was out of scope for E4 and kept.)
- **E5.** ✅ DONE — Removed the orphan `css:experimental` / `build:experimental` scripts from base
  `package.json` (they compiled `ide`'s experimental source into base's `dist` and were never called by
  base's build nor consumed anywhere). The IDE package already owns the correct in-package
  `css:experimental` (compiles its own `experimental/main.less` → its own `dist/experimental.css`, used
  by `experimental-frames.pug`) — verified still working (26 selectors). Stale base
  `dist/experimental.css` removed.

### F. Tests (carry-over from review.md)
- **F1.** ☑️ RESOLVED (documented, per decision) — Decision: do **not** build out a separate enterprise
  test suite now. Its verification scope is documented in `enterprise/src/main/less/main.less` and the
  root README ("Test infrastructure notes"): `verify` runs `lint:less`, root `npm run smoke:dist`
  asserts its dist is non-empty (B2), and rendered behavior is covered by the base e2e/cucumber since
  enterprise re-compiles the same base source. A dedicated combined-stylesheet render smoke remains a
  noted follow-up, not required today.
- **F2.** ☑️ RESOLVED (documented, not removed) — Decision: **keep** `firefoxHelper.js` and the five
  `playwright.config.js` stubs. They are now documented in-file as retained Playwright-era legacy
  markers, plus a note in the root README ("Retained legacy test files").
- **F3.** ☑️ RESOLVED (deferred) — `extended`/`fancy` stay empty skeletons (B1), so their `body` e2e
  remains appropriate for now. Revisit when those packages gain real rules.
- **F4.** ✅ DONE — Added e2e coverage: `setmy-info-less-ide/.../frames.e2e.js` (contentHeader 50,
  content 1125, contentFooter 25, sectionLeft 588, verticalSeparator 8, sectionRight 1400) and base
  `sizing.e2e.js` (+ `sizing.pug`) for high-use width/height utilities. Base e2e 7→9 suites (17 tests),
  ide e2e 1→2 suites (8 tests) — all green against the Selenium Grid.
- **F5.** ✅ DONE — Added base `responsive.e2e.js` (+ `responsive.pug`) testing `.phone-hidden` /
  `.pc-hidden` at three viewports (1400 / 800 / 500px) via a new `pageHelper.setViewport(w, h)` helper
  that sets the exact inner viewport (chrome-compensated). All pass.
- **F6.** ⬜ OPEN — Add a Chromium target alongside Firefox once parity matters.

### Priority order
1. **A + B** — ✅ done: A1, A2, A3, B1, B2 (with C1, D1).
2. **C + D** — ✅ done: C1 ✅, D1 ✅, D3 ✅; D2 ❌ N/A (dismissed).
3. **E** — LESS hygiene: ✅ all done (E1, E2, E3, E4, E5).
4. **F** — F1 ☑️, F2 ☑️, F3 ☑️ (resolved by decision/documentation), F4 ✅, F5 ✅ done; **F6 open**.
