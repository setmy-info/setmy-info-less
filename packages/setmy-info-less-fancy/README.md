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

Polished public-web chrome (float-based, token-driven). Compose with base + extended utilities.

| Group               | Classes                                                                                                        |
|---------------------|----------------------------------------------------------------------------------------------------------------|
| Site header         | `.siteHeader`, `.siteHeaderInner`, `.siteLogo`, `.siteNav`, `.siteNavItem`, `.siteNavCta`                      |
| Hero                | `.hero`, `.heroImage`, `.heroOverlay`, `.heroContent`, `.heroTitle`, `.heroSubtitle`                           |
| Service card / grid | `.tileGrid`, `.tile`, `.tileImage`, `.tileTitle`, `.tileMeta`                                                  |
| Call to action      | `.ctaButton`, `.ctaBanner`, `.ctaBannerText`                                                                   |
| Site footer         | `.siteFooter`, `.siteFooterInner`, `.siteFooterInfo`, `.siteFooterNav`, `.siteFooterSocial`, `.siteFooterLink` |

These are original, project-native classes (camelCase, behavior-first, base-token-driven). A composed
demo page lives in `src/test/pug/salon.pug`.

## Development

```shell
npm run build
npm run lint:less
npm run verify
```
