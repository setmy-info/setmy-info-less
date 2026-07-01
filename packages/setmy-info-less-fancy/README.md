# setmy-info-less-fancy

Visually rich, polished CSS patterns for public-facing web pages. This package extends the
base and extended modules with decorative, high-visual-impact utility classes designed for
consumer websites and marketing pages.

**Target audience:** Front-end developers building public web pages that need polished,
attractive UI — landing pages, product sites, and portfolio sites.

## Install

```shell
npm i setmy-info-less-fancy
```

## Dependencies

Depends on [`setmy-info-less-extended`](../setmy-info-less-extended/README.md), which in turn
depends on [`setmy-info-less`](../setmy-info-less/README.md).

## Usage

Load all three CSS files in order:

```html

<link rel="stylesheet" href="node_modules/setmy-info-less/dist/main.css">
<link rel="stylesheet" href="node_modules/setmy-info-less-extended/dist/main.css">
<link rel="stylesheet" href="node_modules/setmy-info-less-fancy/dist/main.css">
```

## What is included

Currently a **skeleton** — no rules of its own yet. The public-web chrome prototypes (header, hero,
tiles, CTA, footer) that briefly lived here have been moved to `setmy-info-less-experimental/web/`
until they pass the refactorial validation process; they will be promoted back here (or to
`extended`) once stable.

## Development

```shell
npm run build
npm run lint:less
npm run verify
```
