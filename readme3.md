# Review 3 — full code, test, and dependency review

Third-pass review of `setmy-info-less` after the multi-module refactor. This document reviews the
LESS source, the test suites, and the README files **as the modules exist right now** (6 packages,
all at `3.1.0`). It does not propose re-structuring the module hierarchy — that hierarchy is taken
as given. It carries forward the still-relevant concerns from `review.md`, adjusts them to the
current layout, documents the real dependency order, and ends with a prioritized suggestions list.

> Note on `review2.md`: `README.md` lists `review.md` and `review2.md` under "Review notes", but
> `review2.md` does not exist in the working tree or in git history. Either restore it or drop the
> reference (see Suggestions §D).

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

## 2. Correct dependency / build / publish order

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
- **No build-output smoke test** — nothing fails the pipeline if a `dist/main.css` is empty (which,
  per §1.2, two of them currently are).
- **Single browser only.** Firefox via Grid; no Chromium run despite ~65% market share.

---

## 5. README / docs review
- The **dependency graph** section (Layer 0–3) reflects the *declared* `package.json` deps, not the
  LESS reality (§1). It is internally consistent with `package.json` but over-promises what the
  compiled CSS of `fancy`/`enterprise`/`ide` contains.
- The **Publishing** section was outdated (covered only base + extended); it has been corrected in this
  pass to the full six-package topological order plus a build-vs-publish-order note.
- `review2.md` is referenced but absent (§intro note).
- Setup, Selenium Grid, and KSS (`kss-node`) instructions are accurate for the current toolchain.

---

## 6. Suggestions (prioritized — modules kept as-is)

These do **not** change the module hierarchy. They fix correctness, close the deps/imports gap, and
remove dead weight.

### A. Reconcile declared dependencies with LESS reality (highest value)
Pick one direction per package and make `package.json` and `main.less` agree:
- **A1.** If `fancy` is meant to build *on* `extended`, have `fancy/main.less` actually `@import`
  extended (and extended must contain rules — see B1). If not, drop the `extended` dependency and
  depend on `setmy-info-less`.
- **A2.** `enterprise` declares `extended` but never imports it. Either import `extended` (once it has
  content) or drop the unused dependency so the package's deps match what it compiles.
- **A3.** `ide` declares `enterprise` but compiles only frames. Either import enterprise/base into
  `ide/main.less` so its `dist` is self-sufficient, or document loudly that consumers must load base
  (or enterprise) CSS *before* `ide` CSS, and change the dependency to `setmy-info-less` if enterprise
  is not actually consumed.

### B. Fix the empty packages
- **B1.** `extended` and `fancy` compile to **0 rules**. Before any further `3.x` publish, either give
  them real content or stop publishing them as if they carry styles. Shipping an empty `main.css` at a
  stable version is a silent breakage for consumers.
- **B2.** Add a **build-output smoke test** (shell assertion or tiny Jest check) that fails when a
  package's `dist/main.css` has zero selectors. This would have caught B1 automatically.

### C. Decide the cross-package import strategy
- **C1.** Cross-package `@import` of sibling *source* means published `dist` files don't reflect the
  dependency chain. Decide deliberately: either (a) keep source imports but make each `main.less`
  import the *full* chain it depends on (so each `dist` is self-contained), or (b) treat each package's
  `dist` as standalone and document that consumers compose multiple CSS files in load order. Document
  whichever you choose in README and DEVELOPERS-GUIDE.

### D. README / docs
- **D1.** Add a short "what each package's compiled CSS actually contains" note to the dependency-graph
  section, so the Layer diagram isn't read as a promise about CSS contents.
- **D2.** Restore `review2.md` or remove its reference from README line ~98.
- **D3.** Document the `.phone-hidden` / `.pc-hidden` breakpoint behavior (phone-hidden hides below
  1024px, not only on phones).

### E. LESS hygiene
- **E1.** Reorder `values/index.less` so `@headerHeight`/`@navigationHeight` precede
  `@headerPanelHeight`.
- **E2.** Rename `ide/frames/index.less` local `@headerHeight`/`@footerHeight` to frame-scoped names to
  stop silently shadowing shared tokens.
- **E3.** Remove or justify the empty `html-extended.less` and base `grid/index.less` stub imports.
- **E4.** Revisit `!important` in `panels.less` now that load order is controlled.
- **E5.** Review the base `css:experimental` script that reaches into `ide`'s experimental tree.

### F. Tests (carry-over from review.md, still open)
- **F1.** Give `enterprise` at least a smoke `verify` (build + non-empty dist + one render check) — it
  is the "full stable stack" product and is currently untested.
- **F2.** Delete dead `firefoxHelper.js` and the five `playwright.config.js` stubs.
- **F3.** Make `extended`/`fancy` e2e assert a class the package actually provides (after B1), not the
  base-provided `body`.
- **F4.** Add e2e for high-use base utilities and for the ide frame classes (`.contentHeader`,
  `.content`, `.sectionLeft/Right`, separators) — the biggest uncovered real CSS.
- **F5.** Add responsive `.phone-hidden` / `.pc-hidden` viewport tests.
- **F6.** Add a Chromium target alongside Firefox once parity matters.

### Priority order
1. **A + B** — correctness: deps/imports agreement and the empty-package problem (with the smoke test).
2. **C + D** — make the published artifacts and docs honest about what ships.
3. **E** — LESS hygiene.
4. **F** — test coverage, starting with enterprise smoke + dead-code removal.
