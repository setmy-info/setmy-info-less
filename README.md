# setmy-info-less

A modular, testable, and structured LESS-based styling framework for web projects. This project provides a clean system
for managing styles with LESS, generating HTML using Pug, and ensuring quality with both unit and end-to-end tests.
As the SMI standard browser is Firefox, values can be taken directly from Firefox DevTools and unified across all
browsers.

This workspace contains the following modules:

### Layer 0 — Base

- [`setmy-info-less`](packages/setmy-info-less/README.md) — core resets, tokens, spacing, layout, flex helpers, responsive breakpoints. All other packages depend on this.

### Layer 1 — Extensions (depend on base)

- [`setmy-info-less-min`](packages/setmy-info-less-min/README.md) — minimal token-only distribution; no utility classes, no resets. For projects that need precise CSS control.
- [`setmy-info-less-extended`](packages/setmy-info-less-extended/README.md) — IDE-style frame building blocks (NetBeans-style split-pane shell layout).
- [`setmy-info-less-ui`](packages/setmy-info-less-ui/README.md) — interaction states, typography helpers, and positioning utilities.
- [`setmy-info-less-forms`](packages/setmy-info-less-forms/README.md) — form element resets and layout helpers.
- [`setmy-info-less-data`](packages/setmy-info-less-data/README.md) — table styles and data presentation patterns.
- [`setmy-info-less-experimental`](packages/setmy-info-less-experimental/README.md) — prototype and in-progress CSS for framework developers only. Not for production use.

### Layer 2 — Consumer packages (depend on Layer 1)

- [`setmy-info-less-fancy`](packages/setmy-info-less-fancy/README.md) — visually rich, polished patterns for public-facing web pages. Depends on `setmy-info-less-extended`. **Audience: web designers and front-end developers building consumer sites.**
- [`setmy-info-less-enterprise`](packages/setmy-info-less-enterprise/README.md) — meta-package that compiles the full stack into one CSS file. For enterprise intranet and internal applications. **Audience: enterprise application developers.**

### Layer 3 — Specialist packages (depend on Layer 2)

- [`setmy-info-less-ide`](packages/setmy-info-less-ide/README.md) — developer tool and IDE-style UI patterns. Depends on `setmy-info-less-enterprise`. **Audience: developers building browser-based IDEs, dashboards, or admin consoles for engineers.**

### Dependency graph

```
setmy-info-less  (Layer 0 — base)
│
├── setmy-info-less-min          (tokens only, no classes)
│
├── setmy-info-less-extended     (IDE-style frame layout)
│   │
│   ├── setmy-info-less-fancy    (polished public web UI)
│   │
│   └── setmy-info-less-enterprise  (meta-package, compiles all into one CSS)
│       │
│       └── setmy-info-less-ide  (developer tool UI patterns)
│
├── setmy-info-less-ui           (states, typography, positioning)
│
├── setmy-info-less-forms        (form resets and helpers)
│
├── setmy-info-less-data         (tables and data display)
│
└── setmy-info-less-experimental (prototype — framework developers only)
```

Note: `setmy-info-less-enterprise` pulls in `setmy-info-less-extended`, `setmy-info-less-ui`,
`setmy-info-less-forms`, and `setmy-info-less-data` as dependencies.

---

- Developer documentation: `devlopers-guide.md` (`developers-guide.md` contains the same content)
- Review notes: `review.md`, `review2.md`

## Usage

### NPM

Base module:
```shell
npm i setmy-info-less
```

* https://www.npmjs.com/package/setmy-info-less

Extended module (IDE-style frame building blocks — NetBeans look and feel):
```shell
npm i setmy-info-less-extended
```

* https://www.npmjs.com/package/setmy-info-less-extended

### Using from CDN

Base module:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/setmy-info-less/dist/main.min.css">
```

```html
<link rel="stylesheet" href="https://unpkg.com/setmy-info-less@latest/dist/main.min.css">
```

Extended module:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/setmy-info-less-extended/dist/main.min.css">
```

## 📦 Project

This project includes:

- `LESS` – for modular and extendable CSS
- `Pug` – for HTML generation
- `Playwright` – for end-to-end (E2E) testing
- `Jest` – for unit testing JavaScript
- `Express` – for local development server
- `npm scripts` – for build and test automation

**main.less** is the entry point, which includes other files in the correct order.

### Principles

UI is grouped based on breakpoints:

* **Default** – Desktop / wide UI (full visibility, no collapsing)
* **Phone** – Small screen (pocket) devices
* **Pad** – Medium-width UIs (tablet-like), may hide or shrink some elements
* **Watch** – Minimal UI for small displays
* **Print** – Styles for printable documents

Utility CSS classes are provided to toggle CSS rules per element.

### Browser support

Firefox-first. Modern evergreen browsers (Chrome, Edge, Safari) are supported on a best-effort basis.
Legacy browsers such as Internet Explorer are not explicitly supported.

For current browser market share data see: https://gs.statcounter.com/browser-market-share

## Development

Using:

* [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
* [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

### 🔧 Setup

All workspace packages share the single `node_modules` tree at the repository root. Always run install from
the root directory, not from inside a package folder.

```shell
# Install all workspace dependencies (run from repository root)
npm install

# Or install strictly from the lock file — recommended for CI environments
npm ci

# Install Playwright browser binaries (needed once, and after each Playwright version upgrade)
npx playwright install
```

## Upgrade packages

All commands below must be run from the **repository root**.

```shell
# Check which packages have newer versions available (includes root and all workspaces)
npx npm-check-updates --workspaces --root

# Write updated versions into all package.json files
npx npm-check-updates -u --workspaces --root

# Or update a single workspace only
npx npm-check-updates -u --workspace setmy-info-less

# Install the updated versions
npm install

# Check for security vulnerabilities across all packages
npm audit

# Fix automatically fixable vulnerabilities
npm audit fix

# Force-fix remaining vulnerabilities — review the diff before committing
npm audit fix --force

# Reinstall Playwright browser binaries after a Playwright version change
npx playwright install
```

Useful workspace commands:

```shell
npm run build --workspaces
npm run css --workspace setmy-info-less
npm run css --workspace setmy-info-less-extended
npm run html --workspace setmy-info-less
```

### LESS to CSS transpiling

```shell
npm run css --workspaces
npm run css-min --workspaces
```

### Pug to HTML transpiling

```shell
npm run html --workspaces
```

### Full build

```shell
# Build all workspaces (npm processes them in alphabetical order: base before extended)
npm run build --workspaces

# Or build each workspace explicitly in dependency order
npm run build --workspace setmy-info-less
npm run build --workspace setmy-info-less-extended
```

### 🧪 Test execution

Currently, no useful unit tests, just working placeholder.

#### Unit test execution

```shell
npm test --workspaces
```

### E2E test execution

```shell
npm run e2e --workspaces
```

### Specific E2E test execution

```shell
npm run e2e:one --workspace setmy-info-less -- src/test/js/e2e/application.e2e.js
```

### Check LESS style

```shell
npm run lint:less --workspaces
```

### Fix LESS style

```shell
npm run lint:fix-less --workspaces
```

### Combined test execution

```shell
npm run verify --workspaces
```

### 🌐 Local Development Server

```shell
npm start --workspace setmy-info-less
```

### 🔄 Watch for changes

```shell
npm run watch --workspace setmy-info-less
```

### 📦 Packaging

```shell
npm pack --workspaces
npm pack --dry-run --workspaces
```

### 🧹 Cleaning

### Dist folder removal

```shell
npm run clean --workspaces
```

### Clean project removal

```shell
npm run clean:all --workspaces
```

### 🏗 Full build for CI and build checkup

```shell
# Clean, install, build, verify, and pack — run from repository root
npm run clean:all --workspaces && npm install && npm run build --workspaces && npm run verify --workspaces && npm pack --workspaces && npm pack --dry-run --workspaces
```

## 📤 Publishing

Login to npm:

```shell
npm login
```

Dry run:

```shell
npm pack --workspaces --dry-run
```

Publish in dependency order — base module must be published before the extended module because
`setmy-info-less-extended` declares `setmy-info-less` as a dependency:

```shell
npm publish --workspace setmy-info-less
npm publish --workspace setmy-info-less-extended
```

Or publish all at once (only safe when the base version is already on npm from a previous release):

```shell
npm publish --workspaces
```

## Load order

The actual import tree as of the current codebase (`main.less` → group index → individual files):

    main.less
      values/index.less
        colors/index.less
        fonts/index.less
      html/index.less
        html.less
        html-extended.less
      utility/index.less
        visibility.less
        spacing.less
        sizing.less
        layout.less
        scroll.less
        text.less
        cursor.less
        panels.less
        visual-style.less
        notes.less
      devices/index.less
        print.less
        watch.less
        phone.less
        pad.less
      flex/index.less
      grid/index.less
      components/index.less
        application.less

## Changed

Some class names were updated after v1.0.0. If you're upgrading, search and replace as needed:

* verticalStrechPanel -> verticalStretchPanel
* horisontalStrechPanel -> horizontalStretchPanel

(+ other possible minor updates)

## Project was created

Project creation steps and commands:

```shell
npm init --yes
npm i less --save-dev
npm i less-plugin-clean-css --save-dev
npm i less-watch-compiler --save-dev
npm i express --save-dev
npm i jest --save-dev
npm i playwright --save-dev
npm i @playwright/test@latest --save-dev
npm i pug --save-dev
npm i rimraf --save-dev
npm i @cucumber/cucumber --save-dev
npx playwright install
```

## TODO

* Consider font correctness

```
@fontFamily: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

#headerPanel - > #header-panel

;
```

* Eliminate use of !important — proper load order should help avoid it.

sudo dnf install \
flite \
libavif \
libjpeg-turbo \
libmanette
