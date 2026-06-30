# setmy-info-less

The base layer of the SMI LESS framework. Contains the complete token system (colors, fonts,
spacing, z-index), HTML element resets, and a full set of single-purpose utility classes for
layout, visibility, sizing, scrolling, text, and cursor behavior. Also includes responsive
device breakpoints (phone, pad, watch, print), float-based column helpers, and structural
component anchors for Angular/Vue application shells.

**For what:** Provides the CSS foundation that every other SMI LESS package builds on.
Start here if you want browser-consistent resets and a token-driven utility layer. The output
CSS is self-contained and can be used standalone for simple projects.

**For who:** Any web developer or team working with the SMI LESS ecosystem. This package is
always the first CSS file loaded in the HTML — every other package in this workspace depends
on it.

## Install

```shell
npm i setmy-info-less
```

* https://www.npmjs.com/package/setmy-info-less

## Usage

```html
<link rel="stylesheet" href="node_modules/setmy-info-less/dist/main.css">
```

Or from CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/setmy-info-less/dist/main.min.css">
<link rel="stylesheet" href="https://unpkg.com/setmy-info-less@latest/dist/main.min.css">
```

## What is included

| Group | Classes |
|---|---|
| Values | Color palette, font stack, spacing scale, z-index scale |
| HTML resets | `html`, `body`, `h1`–`h6`, `p`, `ul`, `li`, `hr`, `small` |
| Visibility | `.hidden`, `.invisible`, `.visible`, `.phone-hidden`, `.pc-hidden` |
| Spacing | `.noPadding`, `.noMargin`, `.defaultPadding`, `.doublePadding` etc. |
| Sizing | `.maxWidth`, `.halfWidth`, `.quarterWidth`, `.fullHeight` etc. |
| Layout | `.floatLeft`, `.floatRight`, `.floatClear`, `.centerBox`, `.tableElement` |
| Scroll | `.autoScrollBars`, `.verticalScrollBar`, `.noScrollBar` |
| Text | `.asUppercase`, `.asLowercase`, `.asCapitalize`, `.textRight` etc. |
| Cursor | `.textCursor`, `.pointerCursor`, `.notAllowedCursor` |
| Panels | `.verticalStretchPanel`, `.horizontalStretchPanel` |
| Visual style | `.normalBackground`, `.defaultBorder`, `.defaultShadow`, `.defaultRadius` |
| Colors | `.bgPrimary`, `.bgSuccess`, `.textMuted`, `.textDanger` etc. |
| Named colors | `.AliceBlue`, `.Lavender`, `.Snow` etc. |
| Components | Button (`.btn`, `.btnGroup`), modal (`.overlay`, `.modal`), card (`.card`), section (`.fullViewport`, `.pageSection`), key-value (`.kvList`), article (`.articleBody`) |
| Columns | `.grid2col`, `.grid3col`, `.grid4col` (float-based, IE 8+) |
| Devices | `@media` blocks for phone, pad, watch, print |

## Responsive breakpoints

The base module uses a single small-vs-wide width boundary at **1024px**, plus a print block.
Breakpoints are plain `@media only screen` queries (no JS), defined in `src/main/less/devices/`.

| Range            | File         | What happens                                                         |
|------------------|--------------|----------------------------------------------------------------------|
| ≤ 639px          | `watch.less` | `.phone-hidden` → `display:none`; `#header-panel` height auto; `main` height reduced by one header |
| 640px – 1023px   | `phone.less` | same rules as `watch.less`                                           |
| ≥ 1024px         | `pad.less`   | `.pc-hidden` → `display:none !important`                             |
| print media      | `print.less` | print-only overrides (placeholder)                                  |

Base (default, no-media-query) styles apply at every width; the rules above are added on top
within their range.

### Visibility utilities

Two classes toggle visibility by breakpoint. They are exact inverses around the 1024px line and
never overlap:

| Class           | Hidden when        | Visible when   | Use for                                               |
|-----------------|--------------------|----------------|-------------------------------------------------------|
| `.phone-hidden` | width **< 1024px** | width ≥ 1024px | content that should drop on small screens             |
| `.pc-hidden`    | width **≥ 1024px** | width < 1024px | small-screen-only content (e.g. a mobile menu button) |

> Note: `.phone-hidden` hides across **both** the watch and phone ranges — i.e. everything below
> 1024px, not only on phones. The name refers to "small screens", not literally phones.

```html
<!-- Visible on wide screens, hidden below 1024px -->
<nav class="phone-hidden">…full navigation…</nav>

<!-- Visible below 1024px, hidden on wide screens -->
<button class="pc-hidden">☰ Menu</button>
```

## Development

```shell
npm run build
npm run lint:less
npm run test
npm run verify
```

E2E tests require a running Selenium Grid. Start it before calling `npm run e2e`:

```shell
smi-selenium-hub
smi-selenium-node
npm run e2e
```
