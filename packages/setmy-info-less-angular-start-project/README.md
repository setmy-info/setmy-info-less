# setmy-info-less-angular-start-project

Application-specific CSS for the Angular start template project. This package extends the base
and extended modules with the application chrome styles of the Angular start template —
header panel, side navigation panel, modal overlay, footer, and view-level styles.

**Target audience:** Developers building applications from the Angular start template project
(and the template project itself).

## Install

```shell
npm i setmy-info-less-angular-start-project
```

## Dependencies

Depends on [`setmy-info-less-extended`](../setmy-info-less-extended/README.md), which in turn
depends on [`setmy-info-less`](../setmy-info-less/README.md).

## Usage

Load all three CSS files in order:

```html

<link rel="stylesheet" href="node_modules/setmy-info-less/dist/main.css">
<link rel="stylesheet" href="node_modules/setmy-info-less-extended/dist/main.css">
<link rel="stylesheet" href="node_modules/setmy-info-less-angular-start-project/dist/main.css">
```

## What is included

Currently a **skeleton** — no rules of its own yet. It is the planned future home of the
application chrome styles that today live inside the Angular start template workspace
(`angular-start-project-style` and the per-component `*.less` files: header panel, side
navigation panel, modal overlay, footer, views). Those rules will be moved here step by step
during the LESS cleanup and refactoring (see `unused.md` in the Angular start template project
for the migration plan).

## Development

```shell
npm run build
npm run lint:less
npm run verify
```
