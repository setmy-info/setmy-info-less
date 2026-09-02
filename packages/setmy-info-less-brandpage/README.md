# setmy-info-less-brandpage

Brand page CSS — a LESS/CSS collection for building fancy, nice looking, distinctive pages with a
wide variety of UI/UX feel. It targets the CSS of a _specific brand page_: product promo pages,
advertisement and campaign landing pages, where each page is allowed its own strong look instead of
the neutral, reusable styling the lower layers provide.

**Status: 🧪 unstable, 🎯 targeted, 🚧 skeleton.** Empty and under development — no public API yet.
Class names, file layout, and import paths may change in any release. Do not take a production
dependency on it.

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

Currently a **skeleton** — no rules of its own yet. It is the planned home of the LESS/CSS that
today lives inside the existing targeted brand pages; those rules are moved here step by step.
Where `fancy` holds general-purpose polished patterns meant to be reused across many public web
pages, `brandpage` holds the page-specific brand expression built on top of them.

## Development

```shell
npm run build
npm run lint
npm run verify
```
