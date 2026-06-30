# setmy-info-less-extended

Extended content components on top of the base module: page sections, modal/overlay, cards, and
article typography. These higher-level patterns were moved out of the base package to keep the base
minimal (resets, tokens, single-purpose utilities). This package does **not** own the
NetBeans-inspired IDE frame shell — that lives in `setmy-info-less-ide`.

**For what:** Adding common content patterns (sections, modals, cards, article text) on top of the
base utilities.

**For who:** Front-end developers building page content on top of the base module.

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

| Group                | Classes                                                                                              |
|----------------------|------------------------------------------------------------------------------------------------------|
| Section              | `.fullViewport`, `.pageSection`, `.pageSectionNarrow`, `.sectionContentCenter`, `.sectionContentRow` |
| Modal                | `.overlay`, `.modal`, `.modalHeader`, `.modalBody`, `.modalFooter`, `.modalClose`                    |
| Card                 | `.card`, `.cardTitle`, `.cardBody`, `.cardGrid`                                                      |
| Article              | `.articleBody`, `.codeInline`, `.codePre`, `.blockquote`, `.definitionTerm`, `.definitionDesc`       |
| Button (promoted)    | `.btn`, `.btnPrimary`, `.btnSecondary`, `.btnSmall`, `.btnGroup`, `.btnGroupItem`                    |
| Forms (promoted)     | `.formGroup`, `.formRow`, `.fullWidthInput`, `.inlineLabel`, `.requiredMark`                         |
| Key–value (promoted) | `.kvList`, `.kvRow`, `.kvLabel`, `.kvValue`                                                          |
| Price list           | `.priceList`, `.priceRow`, `.priceName`, `.priceValue`                                               |
| Media object         | `.mediaObject`, `.mediaFigure`, `.mediaBody`, `.mediaFigureRight`                                    |
| Profile block        | `.profileBlock`, `.profileByline`, `.profileText`, `.profilePhoto`                                   |
| Notice banner        | `.noticeBanner`, `.noticeBannerStrong`                                                               |

These reference base design tokens but ship only as this package's own CSS (standalone/delta — base
CSS is not bundled). Load the base stylesheet before this one.

## Development

```shell
npm run build
npm run lint:less
npm run verify
```
