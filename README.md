# setmy-info-less

A modular, testable, and structured LESS-based styling framework for web projects. This project provides a clean system
for managing styles with LESS, generating HTML using Pug, and ensuring quality with both unit and end-to-end tests.
As the SMI standard browser is Firefox, values can be taken directly from Firefox DevTools and unified across all
browsers.

## Usage

### NPM

```shell
npm i setmy-info-less
```

* https://www.npmjs.com/package/setmy-info-less

### Using from CDN

```html

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/setmy-info-less/dist/main.min.css">
```

```html

<link rel="stylesheet" href="https://unpkg.com/setmy-info-less@latest/dist/main.min.css">
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

## Development

Using:

* [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
* [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

### 🔧 Setup

```shell
npm install
# Or use 'ci' cub-command, to install by lock file. 
npm ci
npx playwright install
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
npm run build --workspaces
# Or
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
npm run clean:all --workspaces && npm install && npm run build --workspaces && npm run verify --workspaces && npm pack --workspaces && npm pack --dry-run  --workspaces
```

## 📤 Publishing

```shell
npm login
npm publish
```

## Load order

    @import "values.less";
    ...
    @import "colors/index.less";
    @import "fonts/index.less";
    ...
    @import "html/index.less";
    @import "html.less";
    @import "html-extended.less";
    @import "utility/index.less";
    @import "visibility.less";
    @import "spacing.less";
    @import "spacing2.less";
    @import "sizing.less";
    @import "spacing3.less";
    @import "layout.less";
    @import "scroll.less";
    @import "text.less";
    @import "cursor.less";
    @import "layout2.less";
    @import "text2.less";
    @import "sizing3.less";
    @import "panels.less";
    @import "sizing2.less";
    @import "visual-style.less";
    @import "layout3.less";
    @import "notes.less";
    @import "visual-style2.less";
    @import "devices/index.less";
    @import "print.less";
    @import "watch.less";
    @import "phone.less";
    @import "pad.less";
    @import "components/application.less";

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
