# setmy-info-less-forms

Form element resets and layout helpers. Strips browser-default padding, border, and font
inheritance from `input`, `select`, `textarea`, and `fieldset` so they start from a
consistent baseline. Provides layout patterns for grouping form fields, aligning labels
with inputs inline, and marking required fields.

**For what:** Normalizing form controls across browsers and adding structural layout classes
for common form arrangements — stacked vertical forms, inline label-input pairs, full-width
inputs that fill their container, and required-field markers.

**For who:** Front-end developers building data-entry screens, configuration panels, search
interfaces, or any UI that contains user input. The resets are browser-neutral and do not
impose a visual style — you apply your own colors and borders on top.

## Install

```shell
npm i setmy-info-less-forms
```

## Dependencies

Depends on [`setmy-info-less`](../setmy-info-less/README.md). Load base CSS before this.

## Usage

```html
<link rel="stylesheet" href="node_modules/setmy-info-less/dist/main.css">
<link rel="stylesheet" href="node_modules/setmy-info-less-forms/dist/main.css">
```

## What is included

| Selector / Class | Purpose |
|---|---|
| `input`, `select`, `textarea` | Box-sizing reset, inherit font family and size from body |
| `fieldset` | Border shorthand reset using tokens |
| `legend` | Horizontal padding reset |
| `.formGroup` | Block-level wrapper with bottom margin between fields |
| `.fullWidthInput` | Makes an input or select fill 100% of its container |
| `.formRow` | Clearfix row for side-by-side field groups |
| `.inlineLabel` | `display: table` pattern for label + input on one line (IE 8+) |
| `.requiredMark::after` | Appends a red `*` to mark required fields |

## Development

```shell
npm run build
npm run lint:less
npm run verify
```
