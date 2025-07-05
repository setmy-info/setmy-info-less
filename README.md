# setmy-info-less

A modular and testable LESS-based styling framework for web projects. This project provides a structured system for
managing CSS using LESS, generating HTML with Pug, and ensuring quality through unit and end-to-end testing.

As SMI standard browser is Firefox, then values can be taken from FF development tool and make these similar for all
browsers.

## 📦 Project

This project includes:

- `LESS` – for managing styles
- `Pug` – for generating HTML
- `Playwright` – for end-to-end (e2e) testing
- `Jest` – for JavaScript unit testing
- `Express` – for simple local serving
- `npm scripts` – for build and test workflows

**main.less** is starting point, that includes the rest of the files in correct order.

### Principles

UI is divided in (breaking point) groups:

* **Default** is PC or wide UI, no elements shrinking, collapsing and hiding needed. For full visibility.
* **Phone**: is usual pocket and handheld smartphone devices.
* **Pad** usually a little wider UI, that can handle more elements but not all. Something can be hidden/shrunken.
* **Watch** usually hand watch UI-s.
* **Print** system for printing.

Utility CSS classes are switches to apply some CSS rules on elements.

### Project creation process

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
npx playwright install
```

## Development

### 🔧 Setup

```shell
npm install
# Or use 'ci' cub-command, to install by lock file. 
npm ci
npx playwright install
```

### LESS to CSS transpiling

```shell
npm run css
npm run css-min
```

### Pug to HTML transpiling

```shell
npm run html
```

### Full build

```shell
npm run build
```

### 🧪 Test execution

Currently, no useful unit tests, just working placeholder.

#### Unit test execution

```shell
npm test
```

### E2E test execution

```shell
npm run e2e
```

### Specific E2E test execution

```shell
npm run e2e:one -- src/test/js/e2e/application.e2e.js
```

### Combined test execution

```shell
npm run verify
```

### Run local server

```shell
npm run start
```

### Continuous building

```shell
npm run watch
```

### Packaging

```shell
npm pack
npm pack --dry-run
```

### Cleaning

### Dist folder removal

```shell
npm run clean
```

### Clean project removal

```shell
npm run clean:all
```

### Full build for CI and build checkup

```shell
npm run clean:all && npm ci && npm run build && npm run verify && npm pack && npm pack --dry-run
```

## Publishing

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

Some classes were changed after 1.0.0 release. On case of using upgraded changes in depending code need to search and
replace.

* verticalStrechPanel -> verticalStretchPanel
* horisontalStrechPanel -> horizontalStretchPanel

+ some more other possible changes

## TODO

* Consider font correctness

```less
@fontFamily: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

* get rid of !important. Probably right order helps here.
