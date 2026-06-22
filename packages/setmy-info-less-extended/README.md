# setmy-info-less-extended

IDE-style application shell layout for web applications. Provides a NetBeans-inspired
split-pane frame structure: a fixed header bar, a footer bar, and a content area that can
hold left and right side panels alongside a main central panel. Also includes IDE frame color
variants and the experimental frames module for alternative frame combinations.

**For what:** Building the outer shell of a panel-driven web application — developer tools,
admin dashboards, workbench-style UIs, or any application that needs a persistent header,
footer, and collapsible side panels in the browser.

**For who:** Front-end developers building application-shell UIs that mimic desktop IDE
or enterprise admin tool layouts. Teams migrating a NetBeans-style desktop application to
the web will find this frame structure familiar.

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
| Frame layout | Header, footer, left panel, right panel, main content area |
| Frame colors | IDE color variants for panels and borders |
| Experimental frames | Alternative frame combinations (unstable) |

## Development

```shell
npm run build
npm run lint:less
npm run verify
```
