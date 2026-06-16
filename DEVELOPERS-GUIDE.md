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
such
as header-content-footer or split-pane layouts.

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

Important notes:

- Flexbox-based helpers assume modern browser support.
- `calc(...)`, `margin-block`, and gradient usage mean very old browsers may not render identically.
- There is currently no explicit `browserslist` policy and no Autoprefixer pipeline.
- Playwright tests currently verify Firefox behavior, not full multi-browser parity.

If stronger legacy support is needed, define exact browser versions first and then introduce compatibility work from
that
requirement.

## Build and verification flow

### CSS and HTML generation

- CSS is compiled from LESS with `lessc`
- Minified CSS is produced with `--clean-css`
- Example HTML is generated from Pug

### Test stack

- `Jest`: lightweight JavaScript/unit-style tests and placeholders
- `Playwright`: rendered CSS verification using Firefox
- `Cucumber`: readable BDD scenarios backed by shared step definitions
- `stylelint`: LESS linting

The `verify` script in each package combines these checks.

## Notes for AI agents

- Read `main.less` first to understand import order.
- Treat `values/index.less` as the main source of design constants.
- When documenting or extending the CSS, describe classes by behavior, not only by file location.
- Prefer minimal, layered additions instead of adding ad hoc selectors deep in component files.
- Before renaming classes, check the README notes for backwards-compatibility name changes.
- If browser support is discussed, state clearly that the current automated browser baseline is Firefox.
