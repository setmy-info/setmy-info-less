# setmy-info-less-extended

Extended LESS package for optional layout additions and experiments on top of the base module.
This package no longer owns the NetBeans-inspired IDE frame shell; that stable frame layout now
lives in `setmy-info-less-ide`. The extended package remains the place for alternative or
experimental additions such as the experimental frames module.

**For what:** Trying optional layout additions on top of the base package without pulling in the
IDE-specific module.

**For who:** Front-end developers who want extra layout experiments beyond the base package while
keeping the stable IDE shell rules separate.

## Install

```shell
npm i setmy-info-less-extended
```

* https://www.npmjs.com/package/setmy-info-less-extended

## Dependencies

Depends on [`setmy-info-less`](../setmy-info-less/README.md). Load base CSS before this.

## Usage

```html
<link rel="stylesheet" href="node_modules/setmy-info-less/dist/main.css">
<link rel="stylesheet" href="node_modules/setmy-info-less-extended/dist/main.css">
```

Or from CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/setmy-info-less-extended/dist/main.min.css">
```

## What is included

| Group | Classes |
|---|---|
| Extended additions | Optional layout-related additions on top of the base package |
| Experimental frames | Alternative frame combinations (unstable) |

## Development

```shell
npm run build
npm run lint:less
npm run verify
```
