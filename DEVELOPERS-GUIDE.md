## Purpose

This repository contains a Firefox-first LESS workspace for building reusable CSS foundations and optional layout
presets.
It is written for both human developers and AI agents that need to understand where styles live, how classes are meant
to
be applied, and how the verification setup is organized.

## Workspace modules

### `setmy-info-less`

The base module in `packages/setmy-info-less` is the main package.

It contains:

- shared design values in `src/main/less/values`
- base HTML element rules in `src/main/less/html`
- utility activator classes in `src/main/less/utility`
- responsive device-specific rules in `src/main/less/devices`
- flex helpers in `src/main/less/flex`
- component hooks in `src/main/less/components`

Use this module when a project needs the common CSS language: resets, typography, spacing, layout helpers, visibility
helpers, panel helpers, and baseline responsive rules.

### `setmy-info-less-extended`

The extended module in `packages/setmy-info-less-extended` depends on `setmy-info-less`.

It adds:

- frame-oriented presets in `src/main/less/frames`
- experimental styles in `src/main/less/experimental`

Use this module when the application already uses the base module and also wants opinionated frame/page compositions
such as header-content-footer or split-pane layouts.

#### IDE building blocks (NetBeans-style frame layout)

The extended module's primary purpose is to provide a set of composable frame classes that reproduce the
**NetBeans IDE window composition**. This makes it a reusable kit for developer tools, admin dashboards, file
managers, and any enterprise web application that uses an IDE-like panel structure.

```
┌────────────────────────────────────────────────┐  ← .contentHeader or .defaultHeader
├───────────────────┬────────────────────────────┤
│  .sectionLeft     │  .sectionRight             │
│  ┌─────────────┐  │  ┌──────────────────────┐  │
│  │.sectionLeftUp│  │  │  .sectionRightUp     │  │
│  ├─────────────┤  │  ├──────────────────────┤  │
│  │.horizontalSeparator                       │  │
│  ├─────────────┤  │  ├──────────────────────┤  │
│  │.sectionLeftBottom  │  .sectionRightBottom │  │
│  └─────────────┘  │  └──────────────────────┘  │
│  .verticalSeparator                             │
├───────────────────┴────────────────────────────┤  ← .contentFooter
└────────────────────────────────────────────────┘
```

**Frame class reference:**

| Class                       | Purpose                                                  |
| --------------------------- | -------------------------------------------------------- |
| `body.framesDefaultPadding` | Sets body to fill the full viewport with zero padding    |
| `.contentHeader`            | Top strip, two-row-height (`header + navigation`)        |
| `.defaultHeader`            | Top strip, single-row-height                             |
| `.content`                  | Middle area; height computed as `100% - header - footer` |
| `.contentFooter`            | Bottom strip, single-row-height                          |
| `.sectionLeft`              | Left pane (30 % of width by default)                     |
| `.verticalSeparator`        | Thin vertical divider between left and right panes       |
| `.sectionRight`             | Right pane (70 % of width by default)                    |
| `.sectionHeader`            | Sub-header strip inside a pane                           |
| `.sectionLeftUp`            | Upper portion of the left pane                           |
| `.horizontalSeparator`      | Thin horizontal divider inside a pane                    |
| `.sectionLeftBottom`        | Lower portion of the left pane                           |
| `.sectionRightUp`           | Upper portion of the right pane                          |
| `.sectionRightBottom`       | Lower portion of the right pane                          |
| `.contentLeftUp`            | Inner content area within `.sectionLeftUp`               |
| `.contentLeftBottom`        | Inner content area within `.sectionLeftBottom`           |
| `.contentRightUp`           | Inner content area within `.sectionRightUp`              |
| `.contentRightBottom`       | Inner content area within `.sectionRightBottom`          |

These classes are framework-agnostic. They work with Angular, Vue, React, or plain HTML.
The experimental sub-module (`src/main/less/experimental/`) contains color overlays and additional presets
that are not yet stabilized.

## LESS architecture

### Main entry points

- Base module entry: `packages/setmy-info-less/src/main/less/main.less`
- Extended module entry: `packages/setmy-info-less-extended/src/main/less/main.less`

The base module imports style groups in this order:

1. `values`
2. `html`
3. `utility`
4. `devices`
5. `flex`
6. `grid`
7. `components`

This order matters. Global variables and resets come first. Utilities and responsive adaptations come before framework
or
application-specific hooks.

### CSS usage pattern names

The current codebase fits these names well:

- `utility activator classes`: apply directly to an element to switch on a behavior
- `modifier classes`: refine a base utility class with a variant
- `structural selectors`: selectors that target element names or well-known DOM anchors

Examples:

- Utility activator classes: `.hidden`, `.centerText`, `.verticalStretchPanel`, `.horizontalStretchPanel`,
  `.smi-flex-panel`
- Modifier classes: `.smi-flex-panel-left`, `.smi-flex-panel-center`, `.smi-flex-panel-row`, `.phone-hidden`
- Structural selectors: `html`, `body`, `main`, `#application`, `body.framesDefaultPadding`

If you were informally calling these `activators` or `apply` classes, the recommended term in docs is `utility activator
class`.

## How developers should use the CSS

### 1. Start from the module level

- Use only `setmy-info-less` for baseline UI styling.
- Add `setmy-info-less-extended` only when the project needs its opinionated frame layouts.

### 2. Prefer classes over selector overrides

The framework is mostly built around attaching utility classes to HTML elements.

Example:

```html
<div class="hidden"></div>
<section class="centerBox verticalStretchPanel"></section>
<nav class="smi-flex-panel smi-flex-panel-row smi-flex-panel-left"></nav>
```

This is the intended usage style because it keeps behavior explicit in markup.

### 3. Use structural selectors only for agreed anchors

Some rules intentionally target element names or stable IDs like `body`, `main`, `#header-panel`, or `#application`.
These should be treated as framework anchor points, not as a pattern to duplicate everywhere.

When adding new styles, prefer a reusable class unless the selector truly represents a stable application shell element.

### 4. Keep values centralized

Add shared sizes, spacing, z-index values, and other constants under `values` first. Reuse variables instead of
repeating
raw numbers across files.

### 5. Match the current layering model

- `values`: tokens and variables
- `html`: element-level defaults and resets
- `utility`: reusable element classes
- `devices`: breakpoint-specific behavior
- `flex` and `grid`: composition helpers
- `components` or `frames`: application or layout-specific hooks

## Browser support policy

The current repository should be treated as:

- Firefox-first
- Compatible with modern evergreen browsers on a best-effort basis
- Not explicitly committed to very old browsers unless a feature is separately tested and documented

For current browser market share data, consult: https://gs.statcounter.com/browser-market-share

As of 2025-2026, Chrome/Chromium-based browsers hold roughly 65 % of global share, Safari around 19 %,
Edge (Chromium) around 5 %, and Firefox around 3 %. For developer tools and enterprise web applications,
Firefox and Chrome/Edge are the dominant pair. Safari matters for users on macOS and iOS.

Practical targets for this framework:

- **Firefox** — primary tested baseline (all E2E tests run here)
- **Chrome / Edge** — best-effort; add a Chromium Selenium run when cross-browser parity matters
- **Safari** — best-effort; most modern CSS used here is supported in Safari 15+
- **Internet Explorer** — not supported; no fallbacks are maintained

Important notes:

- Flexbox-based helpers assume modern browser support.
- `calc(...)`, `margin-block`, and gradient usage mean very old browsers may not render identically.
- There is currently no explicit `browserslist` policy and no Autoprefixer pipeline.
- Selenium e2e currently verifies Firefox behavior only.

If stronger legacy support is needed, define exact browser versions first and then introduce compatibility work from
that requirement.

## Build and verification flow

This repo uses the same **npm command set and Jenkinsfile 1.2.0 stages** as `setmy.info-js`. The tools behind each
command are the LESS/CSS ones. The full ordered command list lives in `README.md` ("Lifecycle").

### CSS and HTML generation (`npm run build`)

- `npm run build` compiles LESS with `lessc` into `dist/main.css`, and again with `--clean-css` into
  `dist/main.min.css` — then generates the Pug demo/fixture pages into `dist/`.
- It removes only the files it writes, never `dist/` wholesale: `dist/main.css` / `main.min.css` are tracked
  artifacts and the resources command's output (`dist/resources/`) must survive it.
- The KSS living styleguide is **not** part of build — it is generated documentation, so it belongs to
  `npm run docs` (output in `reports/docs/`), next to the documents from `npm run reports`.

### Test stack, by tier

This repo's `src/main` / `src/test` layout:

- **Unit** — `src/test/js/unit/*.test.js`, jest. Assertions about the package's own source and manifest; no build
  output involved. Run by `npm test`. Tooling tests under `scripts/test/unit` run with `node --test`.
- **Integration** — `src/test/js/integration/*.test.js`, jest. Runs against the **built** `dist/main.css`, so it
  fails if the build was skipped. That is the point of the tier.
- **E2E** — `src/test/js/e2e/*.e2e.js`, jest + `selenium-webdriver` driving a real Firefox through an external
  Selenium Grid. Bracket the tier with `npm run pre-e2e-test` / `post-e2e-test` (defined in
  `scripts/lifecycle.js`). Post steps are idempotent: CI runs them again after a failed tier, and `npm run clean`
  runs them first. Jenkins also runs both post phases in `post { always }`.
- E2E page serving is currently `scripts/pageHelper.cjs`'s own ephemeral express server, started per test file at the
  `packages/` root so cross-package hrefs like `../../setmy-info-less/dist/main.css` resolve. The `pre-e2e-test`
  server serves only its own package's `dist`, so no e2e test connects to it today; it is kept for the manual
  `npm run server` workflow and as the lifecycle slot for when page serving moves out of `pageHelper`.
- E2E assertions are exact pixel geometry, which is safe for block layout but **not** for text: a shrink-wrapped
  inline element measures whatever font the grid node actually has installed (`DejaVu Serif` is absent on stock
  Fedora and most Selenium images, so the stack falls through to Arial). Assert the property under test — the
  centring, the alignment — not the text's own width. See `centerText.e2e.js`.
- Gherkin DTOs: readable BDD scenarios held as data objects (`scripts/gherkin/`) and executed as Jest e2e tests;
  `toGherkin()` serializes them back into `.feature` text when needed.
- `prettier` is first in `npm run format` / `format:check` on `.less` (this repo's main sources), then on
  js/cjs/json/md/yml. `stylelint` is `npm run lint`.
- E2E uses Selenium Grid, not Playwright.

`npm run verify` is CSS-specific: the built artifacts exist and each package's rule count matches its declared
`content` / `skeleton` expectation.

## Code documentation and generation from comments

### Inline LESS comment style

LESS has no native documentation format. Use these conventions consistently:

**File-level header** — first line of every `.less` file, identifies the file:

```less
/* spacing.less */
```

**Class-level comment** — written above a class when the behavior is non-obvious or the class is part of a
group. Keep it to one line unless a caveat must be explained:

```less
/* Hides element and removes it from layout — use .invisible to keep space reserved */
.hidden {
    display: none;
}
```

**Variable comment** — for variables with cross-file impact or deliberately chosen values:

```less
/* Base spacing unit used across spacing.less, sizing.less, and frames/index.less */
@defaultPadding: 10px;
```

**Group header** — for a block of related classes:

```less
/* --- Scroll helpers --- */
```

Do not write multi-line block comments for things a good name already expresses. One short line is the maximum.

### Generating a living styleguide with KSS

KSS (Knyle Style Sheets) reads structured comments and generates an HTML styleguide from LESS/CSS source.

`kss` is already installed as a root devDependency. The Docs command runs it for every package.

KSS comment format (add above any class you want in the styleguide):

```less
// Flex button row
//
// A horizontal row of buttons. Combine with alignment modifiers.
//
// Markup:
// <div class="smi-flex-panel smi-flex-panel-row {{modifier_class}}">
//   <button>First</button>
//   <button>Second</button>
// </div>
//
// .smi-flex-panel-left   - Align buttons to the left.
// .smi-flex-panel-center - Center buttons.
// .smi-flex-panel-right  - Align buttons to the right.
//
// Styleguide flex.button-row

.smi-flex-panel {
    display: flex;
    ...;
}
```

Generate the styleguide:

```shell
# The Docs command does this for every package, into reports/docs/
npm run docs
```

### Generating living examples with Pug (already in the project)

The project already generates HTML from Pug templates under `src/test/pug/`. Each Pug file produces a
corresponding HTML page in `dist/` that is both a visual example and a Selenium e2e fixture.

This is already the primary documentation mechanism. Extend it by:

- Adding one Pug template per new category (e.g., `forms.pug`, `tables.pug`, `feedback.pug`).
- Showing every class in the category with a code snippet and rendered result on the same page.
- Running `npm run build --workspaces` to rebuild all example pages.

Prefer Pug templates over a separate documentation build step until there are many documented classes.

### When to use KSS vs Pug templates

| Situation                                     | Use              |
| --------------------------------------------- | ---------------- |
| Visual example of a rendered component        | Pug template     |
| Searchable, indexed class reference           | KSS styleguide   |
| AI agent reading source to understand classes | Inline comments  |
| Quick check during development                | Pug + dev server |

---

## Notes for AI agents

- Read `main.less` first to understand import order.
- Treat `values/index.less` as the main source of design constants.
- When documenting or extending the CSS, describe classes by behavior, not only by file location.
- Prefer minimal, layered additions instead of adding ad hoc selectors deep in component files.
- Before renaming classes, check the README notes for backwards-compatibility name changes.
- If browser support is discussed, state clearly that the current automated browser baseline is Firefox.
