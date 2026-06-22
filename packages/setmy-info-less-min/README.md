# setmy-info-less-min

Minimal CSS token layer. Contains only the base LESS variable definitions (colors, fonts,
spacing, z-index) with no utility classes, no HTML resets, and no components.

**Target audience:** Projects that want to consume the SMI token system but control exactly
which CSS rules are included by importing individual files themselves.

## Install

```shell
npm i setmy-info-less-min
```

## Dependency

Depends on [`setmy-info-less`](../setmy-info-less/README.md) for shared token values.

## Usage

Load the compiled CSS and then import token values in your own LESS files:

```html
<link rel="stylesheet" href="node_modules/setmy-info-less-min/dist/main.css">
```

```less
@import url("node_modules/setmy-info-less/src/main/less/values/index.less");
/* your rules here */
```

## Development

```shell
npm run build
npm run lint:less
npm run verify
```
