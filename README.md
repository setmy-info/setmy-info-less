# setmy-info-less

A modular, testable, and structured LESS-based styling framework for web projects. This project provides a clean system
for managing styles with LESS, generating HTML using Pug, and ensuring quality with both unit and end-to-end tests.
As the SMI standard browser is Firefox, values can be taken directly from Firefox DevTools and unified across all
browsers.

This workspace contains the following modules:

### Layer 0 — Base

- [`setmy-info-less`](packages/setmy-info-less/README.md) — core resets, tokens, spacing, layout, flex helpers,
  responsive breakpoints. All other packages depend on this.

### Layer 1 — Extensions (depend on base)

- [`setmy-info-less-extended`](packages/setmy-info-less-extended/README.md) — IDE-style frame building blocks (
  NetBeans-style split-pane shell layout).

### Layer 2 — Consumer packages (depend on Layer 1)

- [`setmy-info-less-fancy`](packages/setmy-info-less-fancy/README.md) — visually rich, polished patterns for
  public-facing web pages. Depends on `setmy-info-less-extended`. **Audience: web designers and front-end developers
  building consumer sites.**
- [`setmy-info-less-enterprise`](packages/setmy-info-less-enterprise/README.md) — meta-package that compiles the stable
  stack into one CSS file. For enterprise intranet and internal applications. Depends on `setmy-info-less-extended`. *
  *Audience: enterprise application developers.**

### Layer 3 — Specialist packages (depend on Layer 2)

- [`setmy-info-less-ide`](packages/setmy-info-less-ide/README.md) — developer tool and IDE-style UI patterns. Depends on
  `setmy-info-less-enterprise`. **Audience: developers building browser-based IDEs, dashboards, or admin consoles for
  engineers.**

### Experimental (depends on enterprise)

- [`setmy-info-less-experimental`](packages/setmy-info-less-experimental/README.md) — prototype and in-progress CSS for
  framework developers only. Depends on `setmy-info-less-enterprise`, so all stable LESS variables and rules are in
  scope. Not for production use. Contains subdirectories of code staged for future promotion:
    - `grid/` — grid layout helpers (moved from `setmy-info-less` grid/ folder)
    - `base/` — button, color, color-named, and keyvalue utilities (moved from `setmy-info-less` utility/ folder)
    - `ui/` — interaction states, typography helpers, card variants, feedback alerts, navigation, and positioning
      utilities (moved from the removed `setmy-info-less-ui` package)
    - `forms/` — form element resets and layout helpers (moved from the removed `setmy-info-less-forms` package)
    - `data/` — table styles, data display patterns, and dashboard widgets (moved from the removed
      `setmy-info-less-data` package)

### Dependency graph

```
setmy-info-less  (Layer 0 — base)
│
└── setmy-info-less-extended     (Layer 1 — IDE-style frame layout)
    │
    ├── setmy-info-less-fancy    (Layer 2 — polished public web UI)
    │
    └── setmy-info-less-enterprise  (Layer 2 — meta-package, compiles stable stack)
        │
        ├── setmy-info-less-ide          (Layer 3 — developer tool UI patterns)
        │
        └── setmy-info-less-experimental (experimental — framework developers only)
            ├── grid/   (grid layout helpers — from setmy-info-less grid/)
            ├── base/   (button, color, color-named, keyvalue — from setmy-info-less utility/)
            ├── ui/     (states, typography, cards, feedback, navigation, positioning)
            ├── forms/  (form resets and layout helpers)
            └── data/   (table styles, data patterns, dashboard widgets)
```

### Stability rules

Packages in this workspace fall into two stability tiers:

**Stable** — `setmy-info-less`, `setmy-info-less-extended`, `setmy-info-less-fancy`,
`setmy-info-less-enterprise`, `setmy-info-less-ide`

- Public API (class names, token names, LESS variable names) follows
  [Semantic Versioning](https://semver.org/spec/v2.0.0.html): breaking changes require a major version bump.
- Changes are documented in `CHANGELOG.md`.
- Production use is supported and encouraged.

**Experimental** — `setmy-info-less-experimental`

- No API stability guarantees. Class names, file layout, and import paths may change in any release without a major
  version bump.
- Depends on `setmy-info-less-enterprise`, so all stable LESS tokens and rules are available when
  writing or evaluating experimental code. This also makes it straightforward to move code between
  experimental and any stable module — the full parent context is always in scope.
- The `ui/`, `forms/`, and `data/` subdirectories preserve the original module names of the removed
  packages (`setmy-info-less-ui`, `setmy-info-less-forms`, `setmy-info-less-data`) to make it clear
  what each directory came from. Code here is being evaluated for eventual promotion to a new stable
  module, merging into an existing module, or removal.
- Do not take a production dependency on `setmy-info-less-experimental`. It is intended for framework
  developers and internal evaluation only.

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
- `Selenium WebDriver` – for end-to-end (E2E) testing via Selenium Grid
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

Complete setup in order — all prerequisites first, then install.

#### 1. System prerequisites

Java is required to run the Selenium Grid hub and node:

```shell
# Verify Java is available
java -version
```

KSS styleguide generation uses the `kss-node` CLI from the `kss` npm package (v2.x).
It is installed automatically by `npm install` as a devDependency — no separate global install needed.
Note: `kss@2.x` registers the binary as `kss-node`, not `kss`. The build scripts call `kss-node` directly.

#### 2. Selenium Grid

E2E tests run against an external Selenium Grid. Start the hub and node **before** running
`npm run e2e` or `npm run verify`:

```shell
smi-selenium-hub
smi-selenium-node
```

Override the hub URL or browser via environment variables if your grid differs from the defaults:

```shell
export SELENIUM_HUB_URL=http://localhost:4444/wd/hub
export SELENIUM_BROWSER=firefox
```

#### 3. Node dependencies

All workspace packages share the single `node_modules` tree at the repository root. Always run
install from the root directory, not from inside a package folder:

```shell
# Install all workspace dependencies (run from repository root)
npm install

# Or install strictly from the lock file — recommended for CI environments
npm ci
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
# This builds CSS, minified CSS, example HTML, and KSS styleguides.
npm run build --workspaces

# Or build each workspace explicitly in dependency order
npm run build --workspace setmy-info-less
npm run build --workspace setmy-info-less-extended
```

### Styleguide generation

Uses `kss-node` (from the `kss@2.x` devDependency). The binary is in `node_modules/.bin/kss-node`
and is called automatically by `npm run build` and `npm run styleguide`.

```shell
# Generate only the KSS styleguides without rerunning the rest of the build
npm run styleguide --workspaces
```

### 🧪 Test execution

Currently, no useful unit tests, just working placeholder.

#### Unit test execution

```shell
npm test --workspaces
```

### E2E test execution

Requires Selenium Grid running at `http://localhost:4444/wd/hub` (or override via `SELENIUM_HUB_URL`).
Each package starts its own HTTP server on a random port for the duration of the test run.
Tests within a package run serially (`maxWorkers: 1`) to prevent session collisions.

```shell
npm run e2e --workspaces
```

### Specific E2E test execution

```shell
# Run all e2e tests in one package
npm run e2e --workspace setmy-info-less

# Run a single test file by name pattern
npm run e2e:one --workspace setmy-info-less -- --testPathPattern=application
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
# This workflow includes KSS styleguide generation via each workspace build script.
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
