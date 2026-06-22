# setmy-info-less-ui

Interaction state modifiers, text typography helpers, and positioning utilities. This package
covers the visual layer that sits on top of the base resets: how elements look when they are
disabled, loading, selected, or active; how text is truncated or broken; how elements are
anchored to the viewport edge.

**For what:** Applying consistent visual behavior to interactive elements across a web
application. Use `.disabled` to grey out unavailable controls, `.truncate` to clip long text
in table cells, `.stickyTop` to keep a toolbar visible while the page scrolls, and the
z-index scale to manage layering without magic numbers.

**For who:** Front-end developers building interactive web applications who need a controlled,
token-driven vocabulary for element states and positioning — rather than writing one-off
CSS for each component.

## Install

```shell
npm i setmy-info-less-ui
```

## Dependencies

Depends on [`setmy-info-less`](../setmy-info-less/README.md). Load base CSS before this.

## Usage

```html
<link rel="stylesheet" href="node_modules/setmy-info-less/dist/main.css">
<link rel="stylesheet" href="node_modules/setmy-info-less-ui/dist/main.css">
```

## What is included

| File | Classes |
|---|---|
| `states.less` | `.disabled`, `.loading`, `.selected`, `.active`, `.readonly` |
| `typography.less` | `.bold`, `.italic`, `.underline`, `.strikethrough`, `.truncate`, `.breakWord`, `.noSelect`, `.fontSmall`, `.fontLarge` |
| `card.less` | `.cardHighlight`, `.cardClickable`, `.cardCompact` (variants extending base `.card`) |
| `positioning.less` | `.stickyTop`, `.fixedTop`, `.fixedBottom`, `.zIndex1`–`.zIndex9`, `.aspectRatio16x9`, `.aspectRatio4x3`, `.aspectRatio1x1` |

## Development

```shell
npm run build
npm run lint:less
npm run verify
```
