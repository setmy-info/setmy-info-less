# setmy-info-less-angular-start-project

Application-specific CSS for the Angular start template project. This package extends the base
and extended modules with the application chrome styles of the Angular start template —
header panel, side navigation panel, modal overlay, footer, and view-level styles.

**Target audience:** Developers building applications from the Angular start template project
(and the template project itself).

## Install

```shell
npm i setmy-info-less-angular-start-project
```

## Dependencies

Depends on [`setmy-info-less-extended`](../setmy-info-less-extended/README.md), which in turn
depends on [`setmy-info-less`](../setmy-info-less/README.md).

## Usage

Load all three CSS files in order:

```html
<link rel="stylesheet" href="node_modules/setmy-info-less/dist/main.css" />
<link
    rel="stylesheet"
    href="node_modules/setmy-info-less-extended/dist/main.css"
/>
<link
    rel="stylesheet"
    href="node_modules/setmy-info-less-angular-start-project/dist/main.css"
/>
```

## What is included

The LESS of the Angular start template project's components, transferred out of the Angular
workspace so it is managed in one place and can be combined later. `src/main/less/components/`
mirrors `src/app/components/` of `angular-start-project` file for file, so a rule moves between
the two projects without being renamed or re-pathed:

    components/
        background/
        detail-level-panel/
        layout/          consent-panel, footer-panel, header-panel (header/, navigation/),
                         main-panel, modal-body-panel, pwa-panel,
                         side-navigation-panel (header/, content/)
        views/           one directory per routed view, plus shared/detail-rows.less

Files that are still empty in the Angular workspace are carried over as empty placeholders, so
each one keeps its home here from the moment it grows a rule. `index.less` in `components/`,
`components/layout/` and `components/views/` is the only thing added on top of the mirror: it
wires the tree into `main.less`.

What changed on the way over, and nothing else:

- the per-file `@import url("setmy-info-less/…/values/index.less")` is gone — `main.less`
  imports the base tokens once for the whole delta;
- the literal `DejaVu Serif, Roboto, …` font stack is now the base `@fontFamily` token it
  already matched exactly;
- one duplicated `#sideNavigationHeaderPanel` block was collapsed into one copy;
- `detail-level-panel`'s `:host` selector became `app-detail-level-panel` — `:host` only exists
  inside Angular's view encapsulation.

The Angular components still hold their own copies for now; this module is where the CSS is
managed from here on.

### Test pages

`src/test/pug/` mirrors the same component tree: `include/components/**.component.pug` is one
mixin per Angular template, and the pages at the top level compose them the way the application
does (`application.pug` is the full shell). `include/js/side-navigation-panel.js` is plain
browser JS — no Angular — that stands in for `ModalService`: it opens the side navigation from
the header's hamburger and closes it from the panel's close button, so the e2e suite can measure
both the closed and the open state.

## Development

```shell
npm run build
npm run lint
npm run verify
```
