# setmy-info-less

A modular and testable LESS-based styling framework for web projects. This project provides a structured system for
managing CSS using LESS, generating HTML with Pug, and ensuring quality through unit and end-to-end testing.

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

```
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

```
npm install
# Or use 'ci' cub-command, to install by lock file. 
npm ci
npx playwright install
```

### LESS to CSS transpiling

```
npm run css
npm run css-min
```

### Pug to HTML transpiling

```
npm run html
```

### Full build

```
npm run build
```

### 🧪 Test execution

Currently, no useful unit tests, just working placeholder.

#### Unit test execution

```
npm test
```

### E2E test execution

```
npm run e2e
```

### Combined test execution

```
npm run verify
```

### Run local server

```
npm run start
```

### Continuous building

```
npm run watch
```

### Packaging

```
npm pack
npm pack --dry-run
```

### Cleaning

### Dist folder removal

```
npm run clean
```

### Clean project removal

```
npm run clean:all
```

## Publishing

```
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
