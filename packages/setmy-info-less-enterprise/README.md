# setmy-info-less-enterprise

Stable distribution layer intended for enterprise intranet and internal web applications.

> **Status: placeholder.** This package currently has **no CSS rules of its own** — it is held as a
> skeleton for future enterprise-specific additions. Its compiled `dist/main.css` is intentionally
> empty.

**Distribution model: standalone / delta.** Like every package in this workspace, `setmy-info-less-enterprise`
ships **only its own CSS** — it does **not** bundle base, extended, or any other package's CSS. There are no
cumulative/meta packages here. The final application selects the packages it needs and loads their stylesheets
in dependency order.

**For what:** A reserved, versioned home for stable enterprise-only patterns once they exist. Until then it
adds nothing to the cascade.

**For who:** Enterprise application teams who will extend this layer with internal-app-specific rules.

## Install

```shell
npm i setmy-info-less-enterprise
```

## Dependencies

Declared dependencies express **load order**, not CSS bundling — load each package's stylesheet in this order:

| Package | Role |
|---|---|
| `setmy-info-less` | Base tokens, resets, utility classes |
| `setmy-info-less-extended` | Content components (sections, modal, cards, article) |

## Usage

Load the dependency stylesheets first, then this package's own CSS (empty for now):

```html
<link rel="stylesheet" href="node_modules/setmy-info-less/dist/main.css">
<link rel="stylesheet" href="node_modules/setmy-info-less-extended/dist/main.css">
<link rel="stylesheet" href="node_modules/setmy-info-less-enterprise/dist/main.css">
```

## Development

```shell
npm run build
npm run lint:less
```

Note: the `e2e` script is intentionally absent while this package has no CSS of its own.
The repository-root `npm run smoke:dist` treats it as an intentional skeleton (zero rules allowed).
