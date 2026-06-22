# setmy-info-less-ide

CSS patterns for developer-facing UIs: code editors, debugging panels, output consoles,
split-pane workspaces, and developer dashboards. Extends the enterprise package with
patterns specific to developer tool web applications.

**Target audience:** Developers building IDE-style or developer-tool web UIs — think
browser-based code editors, CI dashboards, log viewers, or admin consoles for engineers.

## Install

```shell
npm i setmy-info-less-ide
```

## Dependencies

Depends on [`setmy-info-less-enterprise`](../setmy-info-less-enterprise/README.md), which
pulls in the full stack: base, extended, UI, forms, and data packages.

## Usage

Load the enterprise compiled CSS (includes everything) plus this package:

```html
<link rel="stylesheet" href="node_modules/setmy-info-less-enterprise/dist/main.min.css">
<link rel="stylesheet" href="node_modules/setmy-info-less-ide/dist/main.css">
```

## Development

```shell
npm run build
npm run lint:less
npm run verify
```
