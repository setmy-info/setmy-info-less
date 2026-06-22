# setmy-info-less-data

Table styles and structured data display patterns. Provides a consistent look for HTML
tables — border collapse, alternating row backgrounds, compact density option, sticky
header — plus a property panel pattern for displaying records, semantic data label and
statistic number styles, and empty-state and loading-placeholder patterns.

**For what:** Presenting tabular data, record detail views, and summary statistics in a
readable, structured layout. Covers the common enterprise data screen patterns: a list view
with a striped table, a detail view with a key-value property panel, a KPI row with large
stat numbers, and an empty-state placeholder when no data is available.

**For who:** Developers building data-heavy screens — back-office tools, reporting pages,
admin panels, and CRM or ERP-style UIs where users spend most of their time reading and
scanning rows of information. Also useful for any application that shows a loading skeleton
while fetching remote data.

## Install

```shell
npm i setmy-info-less-data
```

## Dependencies

Depends on [`setmy-info-less`](../setmy-info-less/README.md). Load base CSS before this.

## Usage

```html
<link rel="stylesheet" href="node_modules/setmy-info-less/dist/main.css">
<link rel="stylesheet" href="node_modules/setmy-info-less-data/dist/main.css">
```

## What is included

| File | Classes |
|---|---|
| `tables.less` | `table` reset, `.tableFullWidth`, `.tableBordered`, `.stripedTable`, `.denseTable`, `.stickyHeader` |
| `data.less` | `.propertyPanel`, `.dataLabel`, `.statNumber`, `.emptyState`, `.loadingPlaceholder` (shimmer animation) |

## Development

```shell
npm run build
npm run lint:less
npm run verify
```
