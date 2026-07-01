# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- Experimental public-web building blocks under `setmy-info-less-experimental/src/main/less/web/`:
  site header + nav (`.siteHeader`, `.siteNav`, `.siteLogo`, `.siteNavCta`), hero (`.hero`,
  `.heroImage`, `.heroOverlay`, `.heroTitle`), content tiles + grid (`.tile`, `.tileGrid`,
  `.tileImage`, `.tileTitle`, `.tileMeta`), call-to-action (`.ctaButton`, `.ctaBanner`), footer
  (`.siteFooter*`), and small marketing-SPA blocks (`.langToggle`, `.scrollHint`, `.slogan`,
  `.sectionLead`).
- Experimental content patterns under `ui/`: price list, media object, profile block, notice banner.
- Composition design docs — `setmy-info-design.md` (build a setmy.info-style single-page marketing
  site by combining small blocks) and `web-page-design.md` (earlier marketing-site analysis) — plus a
  worked demo fixture (`spa.pug`) and an SVG placeholder asset for fixtures.

### Changed

- All new, not-yet-validated CSS is staged in `setmy-info-less-experimental` until it passes the
  refactorial validation process; the stable `extended` (section/modal/card/article) and `fancy`
  (empty skeleton) layers keep only validated content.

## [3.1.0] - 2026-06-30

### Added

- **Multi-module monorepo** (npm workspaces): `setmy-info-less` (base), `setmy-info-less-extended`,
  `setmy-info-less-fancy`, `setmy-info-less-enterprise`, `setmy-info-less-ide`,
  `setmy-info-less-experimental`.
- Content components moved out of base into `setmy-info-less-extended` — section, modal, card,
  article — each with e2e, Cucumber, and Pug fixtures.
- NetBeans-style IDE frame presets in `setmy-info-less-ide`; a staging area
  (`setmy-info-less-experimental`) for prototypes.
- Build-output smoke test (`npm run smoke:dist`) that checks every package's compiled CSS and allows
  intentional empty skeletons.
- E2E coverage for sizing utilities, responsive visibility (`.phone-hidden` / `.pc-hidden`), and the
  IDE frame layout, plus a `pageHelper.setViewport()` helper for responsive tests.
- `review3.md` code/test/dependency review; README "CSS design principles", "Module independence",
  and responsive-breakpoint documentation; shared common test utilities.

### Changed

- **E2E testing migrated from Playwright to Selenium Grid** (Rocky Linux support): tests run through
  the Jest runner against an external hub (`SELENIUM_HUB_URL`), serialized (`maxWorkers: 1`) with
  guaranteed session/server teardown, hardened with timeouts and socket force-close so cleanup cannot
  hang.
- **Standalone / delta packaging**: every package's `dist/main.css` contains only its own rules — no
  cumulative or meta packages. Each imports base `values` for tokens only; the consuming application
  loads the module stylesheets in dependency order.
- KSS styleguide generation uses the `kss-node` binary (from `kss@2.x`).
- `.verticalStretchPanel` / `.horizontalStretchPanel` no longer use `!important` (overridable by load
  order / specificity).
- README: install/setup order (Java + Selenium Grid, KSS), corrected publish order and "publish only
  the packages that have content" guidance.

### Fixed

- Reordered `values/index.less` token definitions; renamed the IDE frame-local `@headerHeight` /
  `@footerHeight` to frame-scoped names so they no longer shadow base tokens.

### Removed

- Empty stub imports (`html-extended.less`, base `grid/index.less`) and an orphan cross-package
  `css:experimental` script in the base package.

## [3.0.0] - 2025-07-06

### Added

- linter for LESS
- less-extended for more rich LESS support

### Fixed

- Lint complaint fixed

### Changed

- Cucumber build

## [2.0.0] - 2025-07-06

### Added

- More notes

## [1.1.0] - 2025-06-30

### Added

- Color variables
- some test pages added

### Fixed

- @maxHeigth to @maxHeight

### Changed

- **BREAKING change**: verticalStrechPanel renamed to verticalStretchPanel (therefore, the actual tag should be 2.0.0)
- **BREAKING change**: horisontalStrechPanel renamed to horizontalStretchPanel
- style for body moved back into html section
- Upgraded software versions

## [1.0.0-dist] - 2025-06-29

### Added

- Transpiled file from a build process **dist/main.css** and **dist/main.min.css**
- README.md notes

### Changed

- format with ide
- style for body moved out from an inner html section

### Removed

- **dist** folder from .gitignore

## [1.0.0] - 2024-10-23

### Added

- An initial LESS code from SMI home page and from the other internal projects into one single place.

[unreleased]: https://github.com/setmy-info/setmy-info-less/compare/3.1.0...HEAD

[3.1.0]: https://github.com/setmy-info/setmy-info-less/compare/3.0.0...3.1.0

[3.0.0]: https://github.com/setmy-info/setmy-info-less/compare/2.0.0...3.0.0

[2.0.0]: https://github.com/setmy-info/setmy-info-less/releases/tag/2.0.0

[1.1.0]: https://github.com/setmy-info/setmy-info-less/releases/tag/1.1.0

[1.0.0-dist]: https://github.com/setmy-info/setmy-info-less/releases/tag/1.0.0-dist

[1.0.0]: https://github.com/setmy-info/setmy-info-less/releases/tag/1.0.0
