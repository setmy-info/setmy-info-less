# setmy-info-less-brandpage

Brand page CSS — a LESS/CSS collection for building fancy, nice looking, distinctive pages with a
wide variety of UI/UX feel. It targets the CSS of a _specific brand page_: product promo pages,
advertisement and campaign landing pages, where each page is allowed its own strong look instead of
the neutral, reusable styling the lower layers provide.

**Status: 🧪 unstable, 🎯 targeted.** Under development — no public API yet. Class names, file
layout, and import paths may change in any release. Do not take a production dependency on it.

**Target audience:** Designers and front-end developers building brand, promo, and advertisement
pages.

## Install

```shell
npm i setmy-info-less-brandpage
```

## Dependencies

Depends on [`setmy-info-less-fancy`](../setmy-info-less-fancy/README.md), which depends on
[`setmy-info-less-extended`](../setmy-info-less-extended/README.md), which in turn depends on
[`setmy-info-less`](../setmy-info-less/README.md).

## Usage

Load all four CSS files in order:

```html
<link rel="stylesheet" href="node_modules/setmy-info-less/dist/main.css" />
<link
    rel="stylesheet"
    href="node_modules/setmy-info-less-extended/dist/main.css"
/>
<link
    rel="stylesheet"
    href="node_modules/setmy-info-less-fancy/dist/main.css"
/>
<link
    rel="stylesheet"
    href="node_modules/setmy-info-less-brandpage/dist/main.css"
/>
```

## What is included

The CSS of the setmy.info brand site, turned into LESS. The source pages (`index.html`,
`about.html`, `process.html`) each carried one hand-written `<style>` block, so their cascade
was pure document order: later rules won over earlier ones at equal specificity. That order is
what this package is organised around.

### brand/ — one directory per part of the page

| Directory   | Selectors                       | What it is                                  |
| ----------- | ------------------------------- | ------------------------------------------- |
| `values`    | —                               | design tokens (no CSS output)               |
| `base`      | `html`, `body`, `a`, `button`   | resets on top of `setmy-info-less`          |
| `header`    | `#hdr`, `.bm`, `.lb`            | fixed brand bar with the language buttons   |
| `dots`      | `#dots`, `.dot`                 | panel rail on the right edge                |
| `stage`     | `#stage`, `.panel`, `#p1`–`#p3` | the stacked, sliding panels                 |
| `panel`     | `.pb`, `.pc`                    | a panel's scrolling body and content column |
| `band`      | `.btop`, `.bt`, `.bs`           | centred title band                          |
| `slogan`    | `.srow`, `.simg`, `.stx`, `.sn` | zigzag picture / slogan rows                |
| `hint`      | `.hint`                         | scroll nudge                                |
| `heading`   | `.ph`, `.plead`                 | section heading with its green rule         |
| `prose`     | `.ptext`                        | running text column                         |
| `contact`   | `.cw`, `.cr`, `.cv`, `.sa`      | contact rows and social chips               |
| `note`      | `.cf`                           | closing footnote                            |
| `page-link` | `.pl`                           | inline button that reads as a link          |
| `preview`   | `#prv`, `.pv*`                  | full-screen privacy overlay                 |
| `consent`   | `#gb`, `.ga`                    | consent bar                                 |

Responsive rules live with the part they change (`dots`, `panel`, `slogan`) rather than in one
block at the end, so every `@media` rule sits directly below the rules it overrides.

### pages/ — which page uses which part, in which order

`pages/index.less`, `pages/about.less` and `pages/process.less` list the parts their page uses,
in that page's own order. LESS imports a file once, so the first page to ask for a part fixes
its position and later pages only append what they alone need:

| Part      | index | about | process |
| --------- | ----- | ----- | ------- |
| values    | ✅    | ✅    | ✅      |
| base      | ✅    | ✅    | ✅      |
| header    | ✅    | ✅    | ✅      |
| dots      | ✅    | ✅    | —       |
| stage     | ✅    | ✅    | ✅      |
| panel     | ✅    | ✅    | ✅      |
| band      | ✅    | —     | ✅      |
| slogan    | ✅    | —     | ✅      |
| hint      | ✅    | ✅    | —       |
| heading   | ✅    | ✅    | —       |
| prose     | —     | ✅    | —       |
| contact   | ✅    | —     | —       |
| note      | ✅    | ✅    | ✅      |
| page-link | ✅    | ✅    | ✅      |
| preview   | ✅    | ✅    | ✅      |
| consent   | ✅    | ✅    | ✅      |

`main.less` loads the three page files in that order and so emits the union of all three, in
the main page's order.

### Page-scoped overrides

Three declarations differ between the pages — `.ph::after` bottom margin, `.hint` top padding
and `.cf` top margin are all roomier on the about page. Since one stylesheet serves all three
pages, they are scoped to a body class in `pages/about.less`. **A page served this bundle must
carry its page class on `<body>`:**

```html
<body class="brandAboutPage"></body>
```

### Tokens instead of custom properties

The source used `:root` custom properties (`--red`, `--H`, …). Nothing in the HTML or the page
script read them back, so they are LESS variables here: they resolve at compile time, which
keeps the emitted CSS readable by older browsers and lets a value be used in arithmetic
(`@brandHeaderHeight + 26px`) instead of `calc()`. `@brandHeaderHeight` is the base module's
`@headerHeight`, and the `z-index` steps that line up with the base scale use `@z-index-*`.

### Test pages

`src/test/pug/` mirrors the same split: `include/brand/*.pug` is one mixin per part, and
`index.pug`, `about.pug` and `process.pug` compose them exactly as the corresponding brand page
does — the page files are the readable answer to "which parts does this page use". Text content
is Lorem Ipsum. `include/js/brand-page.js` is plain browser JS — no framework — standing in for
the Vue behaviour: it opens and closes the privacy overlay, accepts the consent bar, and moves
the `.on` class between the language buttons and the dots, so the e2e suite can measure both
states.

## Development

```shell
npm run build
npm run lint
npm run verify
```
