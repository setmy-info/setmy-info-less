## Third pass additions

- As we have two modules and extending by hierarchy, hierarchy adds complexity and weight. Plan a module hierarchy
  with more packages. Keep base simple and clean as it is now. Enhancements split into a hierarchy. Write into
  review.md for later implementation.
- Testing: not all tests are created for all possible options and combinations. Add notes about what kinds of tests
  to add and a test combination list.
- Review and fix README.md about correct building and package upgrade in a single npm workspace monorepo. Fix with
  minimum changes.

---

## Current prompt

Understand the LESS CSS code here, testing frameworks, cucumber testing and other things. As It tries to hold support
for old browsers also, check is there something to change. Write current prompt into `review.md` and add there also
review results about browser support. Also, I need to write documentation about these two modules and CSS. How these
are planned to use. I have classes, those are as I name them: activators, apply - so put to html elements these and it
guides something to do. Some of them are targeted with CSS selectors to act on some specific dom elements, in tree many
or one. I dont know exact name for these. Make new documentation page `developers-guide.md`. Also need to add similar
documentation to the less files. So I need to document usage for developers and in code usage. Also same time the
documentation is for AI agents.

Second pass additions:
- Need to understand previous review.md and make review again and rewrite review with new things.
- Current project contains two modules: minimalistic LESS/CSS for web system building. And extended, containing
  style and example CSS to build NetBeans IDE look and feel, frames.
- Need to mention in README.md for developers and in developers guide about that IDE building blocks.
- For the main CSS module, give step-by-step up to 5 level enhancements that can be done, to add more enhancements
  to improve LESS/CSS for most common cases for web page and web system and business, enterprise web systems, for
  data presentations etc. But same time holding it as minimal and holding the main few composition principles. What
  can be new CSS categories to cover and add. Categories are not these 5 levels, levels are just complexity direction.
  Categories are on some domain or functionality specific areas.
- How to document code, also generate documentation from comments.
- Mention browser market share reference: https://gs.statcounter.com/browser-market-share

---

## Review summary

The repository is an npm workspace with two publishable LESS modules:

- `packages/setmy-info-less`: the base module with variables, HTML defaults, utility classes, device breakpoints,
  flex helpers, and component hooks.
- `packages/setmy-info-less-extended`: an add-on module that depends on the base module and contributes extended
  frame and layout presets. Its frames are specifically designed to reproduce the look and feel of a
  **NetBeans-style IDE shell**: a header panel, a content area split into left/right panes, optional horizontal
  split within each pane, and a footer strip. This makes it a reusable building block for developer tools,
  admin dashboards, and any enterprise web application that uses an IDE-like panel composition.

CSS is generated from LESS, and example HTML pages are generated from Pug for visual and automated verification.

Testing currently consists of:
- `Jest` for placeholder/unit-style JavaScript tests.
- `Playwright` E2E checks, currently configured to run in `firefox` with a real browser executable.
- `Cucumber` feature files and shared step definitions for readable rendering checks.
- `stylelint` for LESS linting.

---

## Terminology review for CSS usage patterns

- `Utility activator classes`: classes applied directly to HTML elements to turn a behavior on, such as `.hidden`,
  `.centerText`, `.verticalStretchPanel`, or `.smi-flex-panel-row`.
- `Structural selectors`: selectors that intentionally target element names or fixed DOM anchors, such as `html`,
  `body`, `main`, `#application`, or `body.framesDefaultPadding`.
- `Modifier classes`: suffix or companion classes that refine a base utility, such as `.smi-flex-panel-left`,
  `.smi-flex-panel-column`, and `.phone-hidden`.

These terms fit the current codebase better than a generic `apply` name, while still matching the idea that classes
are attached to elements to activate behavior.

---

## Browser support review

### Browser market share reference

Before deciding on support targets, consult actual market data:
https://gs.statcounter.com/browser-market-share

At the time of writing, Chrome/Chromium-based browsers hold roughly 65 % of global market share, followed by Safari
at around 19 %, Firefox at around 3 %, and Edge (also Chromium-based) at around 5 %. For enterprise and developer
tools, Firefox and Chrome/Edge are the dominant pair. Safari matters mainly for mobile (iOS).

### What already helps older browsers

- Most rules are conservative CSS: spacing, sizing, `float`, text alignment, visibility, borders, padding, and direct
  element resets.
- LESS is compiled ahead of time, so runtime browser support is only about the final CSS, not about LESS syntax itself.
- The codebase is intentionally tested in Firefox, which matches the README statement that Firefox is the reference
  browser.
- There is no dependency on CSS-in-JS, custom properties, or heavy JavaScript-driven styling.

### Current browser support risks

- There is no explicit `browserslist` target in the project configuration, so support policy is implicit rather than
  documented.
- Some rules use modern CSS features that are fine in Firefox and modern evergreen browsers but weaker for older
  browsers:
    - `display: flex` in `packages/setmy-info-less/src/main/less/flex/index.less`
    - `calc(...)` in device and extended frame layouts
    - `margin-block` in `packages/setmy-info-less/src/main/less/html/html.less`
    - `linear-gradient(...)` in the `hr` rule
- Playwright coverage is Firefox-only, so Chromium/WebKit compatibility is not automatically checked.
- A few `!important` rules still exist, which complicates overrides for integrators.

### Recommended changes

- Documentation change (done in DEVELOPERS-GUIDE.md): define support as
  `Firefox-first, modern evergreen browsers supported, legacy browsers best-effort only unless explicitly tested`.
- Document that layout helpers based on `flex` and `calc()` should not be assumed to support very old browsers
  such as Internet Explorer without additional compatibility work.
- Optional future technical change: add an explicit `browserslist` policy if PostCSS or Autoprefixer is introduced.
- Optional future test change: add one Chromium run if cross-browser parity becomes important.
- No urgent LESS code rewrite is required right now.

---

## IDE building blocks (extended module)

The `setmy-info-less-extended` module is a separate, optional package layered on top of the base module. Its primary
purpose is to provide frame-composition building blocks that replicate a **NetBeans IDE-style window layout**:

```
┌──────────────────────────────────────────┐  ← .contentHeader / .defaultHeader
├────────────────┬─────────────────────────┤
│ .sectionLeft   │ .sectionRight           │
│  ┌──────────┐  │  ┌───────────────────┐  │
│  │ .sectionLeftUp │  │ .sectionRightUp   │  │
│  ├──────────┤  │  ├───────────────────┤  │
│  │ .horizontalSeparator               │  │
│  ├──────────┤  │  ├───────────────────┤  │
│  │ .sectionLeftBottom                 │  │
│  └──────────┘  │  └───────────────────┘  │
├────────────────┴─────────────────────────┤  ← .contentFooter
└──────────────────────────────────────────┘
```

Key classes:
- `.framesDefaultPadding` (body modifier): sets body to fill the viewport with zero padding
- `.contentHeader` / `.defaultHeader` / `.contentFooter`: fixed-height strips at top and bottom
- `.content`: takes the remaining height with `calc(100% - header - footer)`
- `.sectionLeft` / `.sectionRight`: left panel (30 %) and right panel (70 %) side by side
- `.verticalSeparator` / `.horizontalSeparator`: thin visual dividers between panes
- `.sectionLeftUp` / `.sectionLeftBottom` / `.sectionRightUp` / `.sectionRightBottom`: sub-panels within each pane
- `.contentLeftUp` / `.contentLeftBottom` / `.contentRightUp` / `.contentRightBottom`: inner content areas

These classes are composable building blocks. They do not impose markup depth or a specific framework.
They can be used with Angular, Vue, React, or plain HTML.

---

## Enhancement roadmap for the base module

The websites at setmy.info and hearandseesystems.com are both single-page applications sharing the same
codebase. Their structure drives the Level 0 plan: hero section, service cards, contact/key-value section,
privacy modal, language toggle, and footer. The existing LESS project CSS started from those sites and is
being migrated back to a reusable modular system. Level 0 captures everything that must exist in the base
module before the website migration can proceed. Levels 1-5 are ordered by complexity after that baseline.

All categories draw tokens from `values/index.less` instead of hardcoding values. All classes use camelCase,
behavior-first naming. All additions must be composable and must not break the existing base or extended module.

---

### Level 0 — Website migration baseline (implement first)

These classes are either already referenced in existing Pug templates or are directly required to build the
known page patterns of setmy.info and hearandseesystems.com. Nothing in Levels 1-5 should be implemented
before these are stable.

**Category: `color/` (named and semantic background/text utilities)**

The experimental-frames Pug template already uses CSS named colors as class names (`AliceBlue`, `Aquamarine`,
`Beige`, `Bisque`, `BurlyWood`, `Cornsilk`) but these classes do not exist in any LESS file. This is a
concrete missing piece that causes those templates to silently fail to apply color.

- Named background color classes for the most-used CSS named colors:
  `.AliceBlue`, `.Aquamarine`, `.Beige`, `.Bisque`, `.BurlyWood`, `.Cornsilk`, `.LightBlue`, `.LightGray`,
  `.LightYellow`, `.MintCream`, `.Lavender`, `.Honeydew`, `.OldLace`, `.Snow`, `.WhiteSmoke`
  Each sets `background-color: <name>`. Keep in `utility/color-named.less`.
- Semantic color helper classes built from existing palette tokens in `values/colors/index.less`:
  `.bgPrimary`, `.bgSecondary`, `.bgSuccess`, `.bgWarning`, `.bgDanger`, `.bgInfo`
  `.textSuccess`, `.textWarning`, `.textDanger`, `.textInfo`, `.textMuted`
  Keep in `utility/color.less`.

**Category: `section/` — page section patterns**

The website has a hero section (full viewport, centered content), plain content sections, and a narrow
width-constrained content section. The existing `.centerBox` handles horizontal centering but there is no
full-viewport or full-width section composition class.

- `.fullViewport` — `height: 100vh; width: 100%;` for hero sections
- `.pageSection` — `width: 100%; padding: @doubleDefaultPadding 0;` generic content section strip
- `.pageSectionNarrow` — `.pageSection` + `max-width: 1024px; margin: auto;` (works with `.centerBox`)
- `.sectionContentCenter` — centers children vertically and horizontally (flex column, center/center)
- `.sectionContentRow` — arranges children in a flex row with wrap

In `utility/section.less` (new file).

**Category: `button/` — base button and button group**

The website has a language switcher (two buttons side by side) and CTA buttons. No button classes exist yet.

- `.btn` — base button reset: `cursor: pointer; border: @buttonBorderWidth solid; padding: @defaultPadding @doubleDefaultPadding;`
- `.btnPrimary` — filled primary background from color tokens
- `.btnSecondary` — outlined secondary variant
- `.btnSmall` — compact variant (half default padding)
- `.btnGroup` — flex row of buttons with no internal gap (border joining)
- `.btnGroupItem` — item inside `.btnGroup`; suppresses border-radius on inner sides

In `utility/button.less` (new file).

**Category: `modal/` — overlay and dialog**

The website has a privacy modal / GDPR dialog. No modal classes exist. LESS only positions and sizes;
JS handles open/close state.

- `.overlay` — `position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: @z-index-8;`
- `.modal` — `position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%);`
  `max-width: 640px; width: 90%; max-height: 80vh; overflow-y: auto; z-index: @z-index-9;`
  Uses `@defaultRadius` and box-shadow token values.
- `.modalHeader` — fixed-height title strip with bottom border
- `.modalBody` — scrollable content area inside the modal
- `.modalFooter` — bottom strip for action buttons
- `.modalClose` — position absolute, top-right close button affordance

In `utility/modal.less` (new file).

**Category: `card/` — service card and content grouping**

The website services section is a grid of service cards (title + description). Cards appear in Level 3 by
complexity, but they are a Level 0 delivery dependency for the website migration.

- `.card` — `border: @defaultBorder solid @tertiaryColor; border-radius: @defaultRadius; padding: @doubleDefaultPadding;`
- `.cardTitle` — heading-style text inside a card
- `.cardBody` — body text area inside a card
- `.cardGrid` — flex row with wrap and token-driven gap; wraps cards into a responsive row

In `utility/card.less` (new file).

**Category: `keyvalue/` — contact and property display**

The contact section shows company name, registration code, email, phone, and location in a structured way.

- `.kvList` — container for a list of key-value pairs (flex column)
- `.kvRow` — a single key-value pair row (flex row, align-items baseline)
- `.kvLabel` — label side: muted color, fixed min-width, bold
- `.kvValue` — value side: normal text color

In `utility/keyvalue.less` (new file).

**Category: `article/` — body text and content typography for setmy.info**

setmy.info is a technical content site. Articles need:

- `.articleBody` — sets `line-height: @articleLineHeight; max-width: 75ch;` on the content container
- `.codeInline` — `font-family: monospace; background: @gray-100; padding: 0 4px; border-radius: 3px;`
- `.codePre` — `pre` block styling: monospace, background, horizontal scroll, padding
- `.blockquote` — left-border accent style (similar to existing `.detailed` but for quoted content)
- `.definitionTerm` — `dt` styling: bold
- `.definitionDesc` — `dd` styling: margin-left, text color from tokens

In `utility/article.less` (new file).

**Existing gap: `.invisible` class missing**

Currently `.hidden` sets `display: none` which removes the element from layout flow. There is no class for
`visibility: hidden` which hides visually but preserves space. Add to `visibility.less`:

- `.invisible` — `visibility: hidden;`
- `.visible` — `visibility: visible;` (to undo `.invisible` in a specific scope)

---

### Level 1 — Simple standalone additions

Small, independent utility classes that extend existing files without requiring new ones.

**Category: `states/`** (new file `utility/states.less`)
- `.disabled` — `opacity: 0.5; pointer-events: none; cursor: not-allowed;`
- `.loading` — `cursor: wait; pointer-events: none;`
- `.selected` — `outline: 2px solid @blue-500;`
- `.active` — `font-weight: bold;` (current nav item or active tab)
- `.readonly` — `background: @gray-100; cursor: default;` (read-only field containers)

**Category: `typography/`** (new file `utility/typography.less`)
- `.bold` — `font-weight: bold;`
- `.italic` — `font-style: italic;`
- `.underline` — `text-decoration: underline;`
- `.strikethrough` — `text-decoration: line-through;`
- `.truncate` — `overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`
- `.breakWord` — `word-break: break-word; overflow-wrap: break-word;`
- `.noSelect` — `user-select: none;`
- `.lineHeightRelaxed` — `line-height: @articleLineHeight;`
- `.fontSmall` / `.fontLarge` — use token values `@smallFontSize` / `@largeFontSize`

**Color semantic extensions** (extend `utility/color.less` from Level 0)
- `.bgAccent`, `.textAccent`, `.textSubtle`, `.textEmphasis`

---

### Level 2 — Utility category additions

Require new `.less` files; self-contained, implement one file at a time.

**Category: `forms/`** (new file `utility/forms.less`)
- Base resets for `input`, `select`, `textarea`, `fieldset`, `legend`
- `.formGroup` — label + field wrapper
- `.fullWidthInput` — `width: 100%; box-sizing: border-box;`
- `.formRow` — flex row for multi-field inline layouts
- `.inlineLabel` — label that sits left of its field on the same line
- `.requiredMark` — adds a red `*` via `::after` pseudo-element

**Category: `tables/`** (new file `utility/tables.less`)
- Reset `table`, `th`, `td` — `border-collapse: collapse; width: 100%;`
- `.stripedTable tbody tr:nth-child(even)` — alternate row background from `@gray-50`
- `.denseTable td, .denseTable th` — reduces cell padding
- `.stickyHeader thead th` — `position: sticky; top: 0; background: white; z-index: @z-index-1`
- `.tableFullWidth` — `table { width: 100%; }`
- `.tableBordered td, .tableBordered th` — `border: 1px solid @tertiaryColor;`

---

### Level 3 — Composition helpers

Depend on tokens and spacing from Level 0/1. Cards started in Level 0; here they gain variants.

**Category: `card/` variants** (extend Level 0 `utility/card.less`)
- `.cardHighlight` — top colored border accent
- `.cardClickable` — `cursor: pointer;` + hover box-shadow
- `.cardCompact` — reduced padding variant

**Category: `feedback/`** (new file `utility/feedback.less`)
- `.alertSuccess`, `.alertWarning`, `.alertDanger`, `.alertInfo` — colored bars with padding and left border
- `.validationError` — small red inline message below a field
- `.badge` — small pill: `border-radius: 999px; padding: 2px 8px; font-size: @smallFontSize;`
- `.badgeSuccess`, `.badgeDanger`, `.badgeWarning` — color variants
- `.toastMessage` — `position: fixed; bottom: @doubleDefaultPadding; right: @doubleDefaultPadding; z-index: @z-index-7;`

---

### Level 4 — Layout composition

**Category: `grid/`** — fill the empty `grid/index.less`
- `.gridAuto` — `display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: @doubleDefaultPadding;`
- `.grid2col`, `.grid3col`, `.grid4col` — explicit column count variants
- `.gridSpan2`, `.gridSpan3` — `grid-column: span N;`

**Category: `navigation/`** (new file `utility/navigation.less`)
- `.breadcrumb` — flex row with separators via `li + li::before { content: " / "; }`
- `.tabBar` — flex row, border-bottom
- `.tabItem` — padding, active bottom border via `.tabItem.active`
- `.sideNavList` — flex column sidebar list
- `.sideNavItem` — left-border highlight on `.active`
- `.paginationBar` — flex row of page-number buttons, centered

**Category: `positioning/`** (new file `utility/positioning.less`)
- `.stickyTop` — `position: sticky; top: 0; z-index: @z-index-5;`
- `.fixedTop` — `position: fixed; top: 0; width: 100%; z-index: @z-index-7;`
- `.fixedBottom` — `position: fixed; bottom: 0; width: 100%; z-index: @z-index-7;`
- `.zIndex1` through `.zIndex9` — expose the z-index token scale
- `.aspectRatio16x9` — `aspect-ratio: 16 / 9;`
- `.aspectRatio4x3` — `aspect-ratio: 4 / 3;`

---

### Level 5 — Domain-specific patterns (enterprise / data systems)

**Category: `data/`** (new file `utility/data.less`)
- `.propertyPanel` — stacked `.kvRow` list with alternating background (IDE properties view)
- `.dataLabel` — small uppercase muted label above a value (dashboard metric label)
- `.statNumber` — large number + small label below (KPI display)
- `.emptyState` — centered placeholder when list is empty: icon + heading + subtext
- `.loadingPlaceholder` — pulsing skeleton block for async loading states

**Category: `dashboard/`** (new file, extends `grid/` and `card/`)
- `.dashboardGrid` — CSS grid with auto-fit columns, gap, and title bar
- `.widgetCard` — card variant with fixed height and overflow hidden
- `.widgetTitle` — small uppercase label at top of widget
- `.chartContainer` — aspect-ratio container for embedded chart/graph elements

---

## Summary of proposed new categories

| Category        | Domain / area                               | Level | File                        |
|-----------------|---------------------------------------------|-------|-----------------------------|
| `color/`        | Named + semantic color utilities            | 0     | `utility/color.less` + `utility/color-named.less` |
| `section/`      | Hero, page section, content row             | 0     | `utility/section.less`      |
| `button/`       | Base button, button group                   | 0     | `utility/button.less`       |
| `modal/`        | Overlay, dialog, header/body/footer         | 0     | `utility/modal.less`        |
| `card/`         | Content card, service card, card grid       | 0     | `utility/card.less`         |
| `keyvalue/`     | Contact, property label-value pairs         | 0     | `utility/keyvalue.less`     |
| `article/`      | Article body, code, blockquote, definition  | 0     | `utility/article.less`      |
| visibility ext. | `.invisible`, `.visible`                    | 0     | `utility/visibility.less`   |
| `states/`       | disabled, loading, selected, active         | 1     | `utility/states.less`       |
| `typography/`   | bold, italic, truncate, noSelect, lineHeight| 1     | `utility/typography.less`   |
| color ext.      | Remaining semantic color tokens             | 1     | `utility/color.less`        |
| `forms/`        | Form resets, formGroup, formRow             | 2     | `utility/forms.less`        |
| `tables/`       | Table resets, striped, dense, sticky header | 2     | `utility/tables.less`       |
| `card/` variants| highlight, clickable, compact               | 3     | `utility/card.less`         |
| `feedback/`     | Alerts, badges, validation, toast           | 3     | `utility/feedback.less`     |
| `grid/`         | CSS grid utilities                          | 4     | `grid/index.less`           |
| `navigation/`   | Breadcrumb, tabs, side nav, pagination      | 4     | `utility/navigation.less`   |
| `positioning/`  | Sticky, fixed, z-index, aspect-ratio        | 4     | `utility/positioning.less`  |
| `data/`         | KPI, property panel, empty state, skeleton  | 5     | `utility/data.less`         |
| `dashboard/`    | Dashboard grid, widget card                 | 5     | `utility/dashboard.less`    |

Level 0 deliverables should be implemented together as a migration sprint before anything in Level 1-5
is started. The website cannot complete its CSS migration without all Level 0 categories being present.

---

## Code documentation and generation from comments

### Inline LESS documentation style

LESS has no native documentation format. The project should adopt a consistent inline comment style that:
- Is readable as plain text in the source file.
- Can be extracted or processed by a documentation tool if needed.

**Recommended format:**

```less
/* visibility.less */

/**
 * @class .hidden
 * @desc Hides an element by removing it from layout.
 * @usage <div class="hidden"></div>
 */
.hidden {
    display: none;
}
```

For simple utility classes a single-line comment is sufficient:

```less
/* Removes element from layout and document flow */
.hidden {
    display: none;
}
```

Use the block `/** ... */` form only when the behavior is non-obvious, has important caveats, or the class
is part of a composition group. Keep comments short — they describe the *why*, not the *what*.

### Variable documentation style

```less
/* Default spacing unit — used in spacing.less, sizing.less, and frames/index.less */
@defaultPadding: 10px;
```

Document variables that have cross-file impact or whose values are deliberately chosen.

### Documentation generator options

**Option 1: KSS (Knyle Style Sheets) via `kss-node`**

KSS is the most mature living styleguide generator for CSS/LESS/Sass. It reads structured comments and produces
an HTML styleguide.

Install:
```shell
npm i kss --save-dev
```

Comment format example:
```less
// Button row
//
// A flex row of buttons aligned left by default.
//
// Markup:
// <div class="smi-flex-panel smi-flex-panel-row smi-flex-panel-left {{modifier_class}}">
//   <button>One</button>
//   <button>Two</button>
// </div>
//
// .smi-flex-panel-center - Center-aligned buttons.
// .smi-flex-panel-right  - Right-aligned buttons.
//
// Styleguide flex.button-row

.smi-flex-panel {
    ...
}
```

Build the styleguide:
```shell
npx kss --source packages/setmy-info-less/src/main/less \
         --destination docs/styleguide \
         --builder builder/handlebars
```

**Option 2: Pug-based living examples (already in the project)**

The project already generates example HTML from Pug. This is already a form of visual documentation. Extend it:
- Create one Pug template per category (e.g., `forms.pug`, `tables.pug`, `feedback.pug`).
- Each template demonstrates every class in that category with a usage snippet.
- These become the HTML files in `dist/` and serve both as visual tests and as living documentation.

**Option 3: DocumentCSS / StyleDocco (lightweight alternative)**

`StyleDocco` reads CSS comments and generates a styleguide. Less maintained than KSS but simpler to set up.

```shell
npm i styledocco --save-dev
npx styledocco -n "setmy-info-less" -o docs packages/setmy-info-less/src/main/less/main.less
```

### Recommended approach

Use **Option 2 (Pug templates)** as the primary documentation mechanism because it is already in the project,
already tested, and already works. Add KSS comments incrementally when a category needs its own living styleguide
section. Do not introduce a separate documentation build step until there are at least three categories with
documented classes.

---

## Module hierarchy plan (for future implementation)

### Problem

The current two-module structure already has a layering relationship: `setmy-info-less-extended` depends on
`setmy-info-less`. Every new enhancement category added to either module increases the weight of that package for
all consumers, even those who do not need the extra functionality. As the number of proposed categories grows
(see enhancement roadmap above), a two-module hierarchy becomes a weight problem.

### Proposed hierarchy

Keep the base module exactly as it is. Add new packages at well-defined layers. Packages at the same layer are
independent — they do not depend on each other. Only a higher-layer combining package pulls several of them in.

```
Layer 0 (base — never changes its published API):
  setmy-info-less
      │
      ├── Layer 1a: setmy-info-less-extended     (IDE frame layouts)
      ├── Layer 1b: setmy-info-less-ui           (states, typography, cards, badges, feedback, navigation)
      ├── Layer 1c: setmy-info-less-forms        (form resets and layout utilities)
      └── Layer 1d: setmy-info-less-data         (tables, data presentation, enterprise patterns)
              │
              └── Layer 2: setmy-info-less-enterprise
                      (meta-package: depends on all Layer 1 packages, adds nothing of its own,
                       is just a single install for the full stack)
```

### Package responsibility map

| Package                       | Layer | Contents                                                        |
|-------------------------------|-------|-----------------------------------------------------------------|
| `setmy-info-less`             | 0     | values, html resets, utility, devices, flex, grid stub, components |
| `setmy-info-less-extended`    | 1     | IDE frames (NetBeans-style panels, separators, header/footer)   |
| `setmy-info-less-ui`          | 1     | states, typography ext., color helpers, cards, badges, feedback |
| `setmy-info-less-forms`       | 1     | form resets, `.formGroup`, `.formRow`, `.fullWidthInput`        |
| `setmy-info-less-data`        | 1     | table resets, `.stripedTable`, `.denseTable`, `.propertyPanel`  |
| `setmy-info-less-enterprise`  | 2     | re-exports all Layer 1 packages — one install for full stack    |

### Design rules for the hierarchy

1. **Layer 0 stays minimal.** Do not add new categories to `setmy-info-less`. Bugfixes and token additions are
   allowed; new utility categories are not.
2. **Layer 1 packages depend only on Layer 0.** No cross-dependencies between Layer 1 packages.
3. **Layer 2 is a meta-package.** Its `package.json` lists all Layer 1 packages as peer or direct dependencies.
   Its `main.less` imports them all. It adds no new CSS of its own.
4. **Each Layer 1 package is independently publishable and usable.** A project can install only
   `setmy-info-less` + `setmy-info-less-forms` without pulling in IDE frames or data utilities.
5. **All packages share the same monorepo workspace** under `packages/`. The workspace root `package.json`
   lists `"packages/*"` so all packages are discovered automatically.
6. **Build order within the monorepo:** base (Layer 0) → Layer 1 packages (alphabetical, independent) →
   Layer 2 meta-package. npm workspace alphabetical ordering naturally satisfies this because:
   `setmy-info-less` < `setmy-info-less-data` < `setmy-info-less-enterprise` < `setmy-info-less-extended`
   < `setmy-info-less-forms` < `setmy-info-less-ui` (lexicographic).

### When to implement

- Implement when the first new Layer 1 category is ready to be written (Level 2 enhancements in the roadmap
  above, i.e., `forms/` or `tables/`).
- Do not create empty placeholder packages — create a package only when at least three classes in a category
  are ready.
- The `setmy-info-less-enterprise` meta-package should be the last thing created, after at least two Layer 1
  packages exist.

---

## Testing review

### What currently exists

- `Jest` — JavaScript unit test stubs in `packages/common/test/js/unit/main.test.js`. Placeholder only; no CSS
  behavior is verified here.
- `Playwright` — E2E tests for the base module: `application.e2e.js`, `body.e2e.js`, `background.e2e.js`,
  `centerText.e2e.js`, `layoutCenterBox.e2e.js`, `layoutCenterBox2.e2e.js`, `flex-center.e2e.js`. One E2E test
  for the extended module (`body.e2e.js`). All run in Firefox.
- `Cucumber` — `body.feature` in both modules. Step definitions in `packages/common/test/js/bdd/`. Only the
  body rendering scenario is covered.
- `stylelint` — LESS linting via `npm run lint:less`.
- Pug → HTML produces the fixture pages that Playwright and Cucumber test against.

### Current E2E test coverage summary

| Test file                   | What it checks                                          | Gaps                          |
|-----------------------------|----------------------------------------------------------|-------------------------------|
| `body.e2e.js`               | `body` dimensions, margin, padding, font                | No modifier class checks      |
| `application.e2e.js`        | `body` + `app` element dimensions                       | No `#application` ID check    |
| `background.e2e.js`         | background page rendering                               | Unknown — not fully reviewed  |
| `centerText.e2e.js`         | `.centerText` — text-align and element position         | Only one text element tested  |
| `layoutCenterBox.e2e.js`    | `.centerBox` — margin:auto and 1024px max-width         | No narrow-viewport test       |
| `layoutCenterBox2.e2e.js`   | Second centering variant                                | Unknown — not fully reviewed  |
| `flex-center.e2e.js`        | **Title only** — no layout properties checked at all    | Entire test is missing        |
| extended `body.e2e.js`      | `body` dimensions in extended module                    | No frame class checks at all  |

### Missing E2E tests — base module

**`visibility.less`**
- `.hidden` — verify `display: none` is applied
- `.hidden` — verify children are inaccessible (bounding box zero)

**`spacing.less`**
- `.noPadding` — verify computed padding is `0px`
- `.noMargin` — verify computed margin is `0px`
- `.defaultPadding` — verify computed padding is `10px`
- `.doublePadding` — verify computed padding is `20px`
- `.defaultMargin` — verify computed margin is `10px`
- `.noMarginFirstChild` — verify only first child has zero margin, siblings unchanged
- `.noMarginLastChild` — verify only last child has zero margin

**`sizing.less`**
- `.maxWidth` / `.maxHeight` — verify 100%
- `.halfWidth` — verify 50%
- `.quarterWidth` — verify 25%
- `.threeQuartersWidth` — verify 75%
- `.elementHeight` — verify 50px
- `.defaultHeight` — verify `@defaultHeight` value

**`layout.less`**
- `.floatLeft` — verify `float: left`
- `.floatRight` — verify `float: right`
- `.tableElement` — verify `display: table`
- `.noWrap` — verify `white-space: nowrap`
- `.leftText` / `.rightText` — verify text-align values

**`scroll.less`**
- `.autoScrollBars` — verify `overflow: auto`
- `.verticalScrollBar` — verify `overflow-y: auto`, `overflow-x` unset or visible
- `.horizontalScrollBar` — verify `overflow-x: auto`
- `.noScrollBars` — verify `overflow: hidden`
- `.noVerticalScrollBar` — verify `overflow-y: hidden`
- `.noHorizontalScrollBar` — verify `overflow-x: hidden`

**`text.less`**
- `.asUppercase` — verify `text-transform: uppercase`
- `.asLowercase` — verify `text-transform: lowercase`
- `.firstAsUppercase` — verify `text-transform: capitalize`
- `.textColorGray` — verify computed `color` matches `@quinaryColor` (`dimgray`)

**`cursor.less`**
- `.pointerCursor` — verify `cursor: pointer`
- `.textCursor` — verify `cursor: text`
- `.cursorVerticalResize` — verify `cursor: e-resize`
- `.cursorHorizontalResize` — verify `cursor: n-resize`

**`panels.less`**
- `.verticalStretchPanel` — verify `min-height: 0`, `overflow: hidden`
- `.horizontalStretchPanel` — verify `min-width: 0`, `overflow: hidden`

**`visual-style.less`**
- `.normalBackground` — verify `background: white`
- `.defaultBorder` — verify `border-style: solid`, `border-width: 2px`, `border-color: steelblue`
- `.defaultShadow` — verify `box-shadow` is applied (non-none)
- `.defaultRadius` — verify `border-radius: 6px`
- `.minifiedText` — verify `font-size: xx-small`

**`notes.less`**
- `.importantNote` — verify `color: red` and `font-weight: bold`
- `.detailed` — verify `border-left-width: 6px` and `padding-left`

**`flex/index.less` — currently `flex-center.e2e.js` only checks the title**
- `.smi-flex-panel` — verify `display: flex`
- `.smi-flex-panel-row` — verify `flex-direction: row`
- `.smi-flex-panel-column` — verify `flex-direction: column`
- `.smi-flex-panel-left` — verify `justify-content: flex-start`
- `.smi-flex-panel-center` — verify `justify-content: center`
- `.smi-flex-panel-right` — verify `justify-content: flex-end`

**`devices/`**
- `.phone-hidden` — verify hidden at viewport width 640–1023 px, visible outside that range
- `.pc-hidden` — verify hidden at viewport width ≥ 1024 px, visible below that
- Responsive `main` height reduction — verify at phone viewport width

### Missing E2E tests — extended module

**`frames/index.less`** — the core purpose of the extended module, zero frame tests exist:
- `.contentHeader` — verify computed height equals `@headerHeight`
- `.content` — verify computed height equals `calc(100% - @headerFooterSum)`
- `.contentFooter` — verify computed height equals `@footerHeight`
- `.sectionLeft` — verify width is approximately 30 % of viewport
- `.verticalSeparator` — verify width is `8px`
- `.sectionRight` — verify width is approximately 70 % of viewport
- `.horizontalSeparator` — verify height is `4px`
- `.sectionLeftUp` and `.sectionLeftBottom` — verify heights sum to pane height minus separator
- `.contentLeftUp` / `.contentRightUp` — verify inner content fills pane minus section header

**Experimental module**
- `experimental-frames.html` — no E2E test at all; a basic title check plus one dimension check is the minimum

### Test combination matrix

The following combinations should each have at least one E2E test scenario:

| Combination                                                         | What to verify                            |
|---------------------------------------------------------------------|-------------------------------------------|
| `.smi-flex-panel` + `.smi-flex-panel-row` + `.smi-flex-panel-left`  | flex row, items align left                |
| `.smi-flex-panel` + `.smi-flex-panel-row` + `.smi-flex-panel-center`| flex row, items align center              |
| `.smi-flex-panel` + `.smi-flex-panel-row` + `.smi-flex-panel-right` | flex row, items align right               |
| `.smi-flex-panel` + `.smi-flex-panel-column`                        | flex column direction                     |
| `.centerBox` alone                                                  | max-width 1024 px, margin auto            |
| `.centerBox` + `.verticalStretchPanel`                              | centered box that can shrink vertically   |
| `.autoScrollBars` + overflow content                                | scrollbars appear on both axes            |
| `.verticalScrollBar` + overflow content                             | only vertical scrollbar                   |
| `.noScrollBars` + overflow content                                  | no scrollbars appear                      |
| `.defaultBorder` + `.defaultShadow` + `.defaultRadius`              | all three visual styles applied together  |
| `.defaultPadding` + `.defaultBorder`                                | padding and border do not collapse        |
| `.hidden` at desktop viewport                                       | element not rendered                      |
| `.phone-hidden` at phone viewport (640–1023 px)                     | element hidden                            |
| `.phone-hidden` at desktop viewport (≥ 1024 px)                     | element visible                           |
| `.pc-hidden` at desktop viewport                                    | element hidden                            |
| `.pc-hidden` at phone viewport                                      | element visible                           |
| `.noPadding` + `.noMargin` combined                                 | both zeroed, no interaction               |
| `.verticalStretchPanel` inside a flex column container              | shrinks to available space                |
| Extended `.content` + `.sectionLeft` + `.sectionRight`              | widths sum to 100 % minus separator       |
| Extended `.sectionLeftUp` + `.horizontalSeparator` + `.sectionLeftBottom` | heights sum to pane height        |

### Missing Cucumber feature files

| Feature file to add         | Classes / scenarios to cover                                |
|-----------------------------|-------------------------------------------------------------|
| `visibility.feature`        | `.hidden` — hidden at all viewports                         |
| `spacing.feature`           | `.noPadding`, `.noMargin`, `.defaultPadding`, `.doubleMargin` |
| `sizing.feature`            | `.maxWidth`, `.halfWidth`, `.elementHeight`                  |
| `layout.feature`            | `.centerBox`, `.floatLeft`, `.floatRight`, `.noWrap`        |
| `flex.feature`              | `.smi-flex-panel` + row/column + alignment modifiers        |
| `scroll.feature`            | `.autoScrollBars`, `.verticalScrollBar`, `.noScrollBars`    |
| `visual.feature`            | `.defaultBorder`, `.defaultShadow`, `.defaultRadius`        |
| `text.feature`              | `.asUppercase`, `.asLowercase`, `.textColorGray`            |
| `panels.feature`            | `.verticalStretchPanel`, `.horizontalStretchPanel`          |
| `responsive.feature`        | `.phone-hidden`, `.pc-hidden` at multiple viewports         |
| `frames.feature` (extended) | full IDE frame composition                                  |

### Browser coverage gap

- All Playwright tests run in Firefox only. Chrome/Chromium (the browser with ~65 % market share per
  https://gs.statcounter.com/browser-market-share) is not tested automatically.
- Recommended: add one `chromium` project in `playwright.config.js` alongside `firefox` for both modules.
  Do not add WebKit/Safari until there is a specific need — it requires additional OS dependencies.

### Build output smoke test (missing)

No test verifies that `dist/main.css` is produced and non-empty after `npm run build`. A simple Jest check or
a shell assertion in the `verify` script would catch broken builds before publishing.

### Recommended testing priorities

1. Fix `flex-center.e2e.js` — add actual layout property assertions (currently only title is checked).
2. Add E2E tests for all extended module frame classes — the biggest uncovered area.
3. Add responsive viewport tests for `.phone-hidden` and `.pc-hidden` using `page.setViewportSize()`.
4. Add Chromium to `playwright.config.js` projects.
5. Add Cucumber feature files for `visibility`, `flex`, and `layout` — highest daily-use classes.
6. Add a build output smoke test.
7. Work through the combination matrix above one Pug page + E2E test at a time.

---

## Conclusion

- The most valuable short-term improvement is still documentation, not CSS rewrites.
- The extended module should be described as a NetBeans-style IDE frame composition kit, not just an add-on.
- The base module has a clear 5-level enhancement path organized by domain categories.
- Browser support policy should reference actual market share data at https://gs.statcounter.com/browser-market-share
  and commit to Firefox + Chrome (Chromium) as the two tested baselines, with Safari as best-effort.
- Documentation should rely on Pug-based living examples (already present) and KSS comments where needed.
- Testing has significant gaps in E2E coverage for the extended module and cross-browser parity. Addressing these
  should be the next testing priority after documentation.
