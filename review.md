## Current prompt

Understand the LESS CSS code here, testing frameworks, cucumber testing and other things. As It tries to hold support
for old browsers also, check is there something to change. Write current prompt into `review.md` and add there also
review results about browser support. Also, I need to write documentation about these two modules and CSS. How thes are
planned to use. I have classes, those are as I name them: activators, apply - so puut to html elements these and it
guides something to do. Some of them are targeted with CSS selectors to act on some specifig dom elements, in tree many
or one. I dont know exact name for these. Make new documentation page `devlopers-guide.md`. Also need to add similar
documentation to the less files. So I need to document usage for developers and in code usage. Also same time the
documentation is for AI agents.

## Review summary

- The repository is an npm workspace with two publishable LESS modules:
    - `packages/setmy-info-less`: the base module with variables, HTML defaults, utility classes, device breakpoints,
      flex helpers, and component hooks.
    - `packages/setmy-info-less-extended`: an add-on module that depends on the base module and contributes extended
      frame/layout presets.
- CSS is generated from LESS, and example HTML pages are generated from Pug for visual and automated verification.
- Testing currently consists of:
    - `Jest` for placeholder/unit-style JavaScript tests.
    - `Playwright` E2E checks, currently configured to run in `firefox` with a real browser executable.
    - `Cucumber` feature files and shared step definitions for readable rendering checks.
    - `stylelint` for LESS linting.

## Terminology review for CSS usage patterns

- `Utility activator classes`: classes applied directly to HTML elements to turn a behavior on, such as `.hidden`,
  `.centerText`, `.verticalStretchPanel`, or `.smi-flex-panel-row`.
- `Structural selectors`: selectors that intentionally target element names or fixed DOM anchors, such as `html`,
  `body`, `main`, `#application`, or `body.framesDefaultPadding`.
- `Modifier classes`: suffix or companion classes that refine a base utility, such as `.smi-flex-panel-left`,
  `.smi-flex-panel-column`, and `.phone-hidden`.

These terms fit the current codebase better than a generic `apply` name, while still matching the idea that classes are
attached to elements to activate behavior.

## Browser support review

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
- A few `!important` rules still exist, which is more of a maintainability issue than a browser issue, but it can
  complicate overrides for integrators.

### Recommended changes

- Documentation change required: define support as
  `Firefox-first, modern evergreen browsers supported, legacy browsers best-effort only unless explicitly tested`.
- Documentation change required: explain that layout helpers based on `flex` and `calc()` should not be assumed to
  support very old browsers such as Internet Explorer without additional compatibility work.
- Optional future technical change: add an explicit `browserslist` policy if the project later introduces PostCSS or
  Autoprefixer.
- Optional future test change: add one Chromium run if cross-browser parity becomes important.
- No urgent LESS code rewrite is required right now because the current code already reflects a modern-browser baseline
  and the repository does not currently maintain IE-specific fallbacks.

## Conclusion

- The most valuable improvement right now is documentation, not CSS rewrites.
- The codebase should describe itself as a Firefox-first, modern-browser LESS framework with best-effort behavior for
  older browsers.
