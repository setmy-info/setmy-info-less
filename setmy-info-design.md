# setmy.info composition design — build a marketing SPA from combinable blocks

Goal: build a page like **https://setmy.info** (a single-page marketing site for Hear And See
Systems) by **combining small CSS blocks**. Existing base/extended CSS stays untouched; everything
here is **unvalidated and staged in `setmy-info-less-experimental`** until it passes the refactorial
validation process. Everything is float-based and token-driven, per the project CSS design principles.

---

## 1. setmy.info — sections & components

Single-page marketing SPA, i18n (EN/ET), single centered column, mobile-first. Top to bottom:

| # | Section       | Pieces                                                |
|---|---------------|-------------------------------------------------------|
| 1 | Header        | brand/logo, language toggle (EN/ET)                   |
| 2 | Hero          | headline ("Hyperautomation"), slogan, scroll-hint (⇣) |
| 3 | Services      | lead paragraph + service offerings                    |
| 4 | Contact       | company name, email, phone, location (label→value)    |
| 5 | Footer        | copyright, privacy link                               |
| 6 | Privacy modal | GDPR/cookie overlay + accept button                   |

---

## 2. Block inventory (compose these — don't rebuild)

**Existing, reused as-is:**

| Need                             | Block(s)                                                                                  | Package (layer)        |
|----------------------------------|-------------------------------------------------------------------------------------------|------------------------|
| Centered container               | `.centerBox`                                                                              | base                   |
| Center text                      | `.centerText`                                                                             | base                   |
| Section strip + padding          | `.pageSection`, `.pageSectionNarrow`                                                      | extended               |
| Long text                        | `.articleBody`                                                                            | extended               |
| Overlay + dialog (privacy modal) | `.overlay`, `.modal`, `.modalHeader/Body/Footer/Close`                                    | extended               |
| Accept button                    | `.btn`, `.btnPrimary`                                                                     | experimental (`base/`) |
| Contact label→value              | `.kvList`, `.kvRow`, `.kvLabel`, `.kvValue`                                               | experimental (`base/`) |
| Header bar + brand               | `.siteHeader`, `.siteHeaderInner`, `.siteLogo`, `.siteNav`                                | experimental (`web/`)  |
| Service tiles + grid             | `.tileGrid`, `.tile`, `.tileTitle`, `.tileMeta`                                           | experimental (`web/`)  |
| Footer                           | `.siteFooter`, `.siteFooterInner`, `.siteFooterInfo`, `.siteFooterNav`, `.siteFooterLink` | experimental (`web/`)  |

**New small blocks added (this pass) — `experimental/web/`:**

| Block              | Classes                                                   | Purpose                                                  |
|--------------------|-----------------------------------------------------------|----------------------------------------------------------|
| `langToggle.less`  | `.langToggle`, `.langToggleItem`, `.langToggleItemActive` | inline EN/ET language switch                             |
| `scrollHint.less`  | `.scrollHint`                                             | centered "scroll down" indicator under the hero          |
| `slogan.less`      | `.slogan`                                                 | centered tagline under the hero headline                 |
| `sectionLead.less` | `.sectionLead`                                            | centered, width-constrained lead paragraph for a section |

> Note: the existing `.hero` block is **image**-centric (white title over a dim overlay). setmy.info's
> hero is **text** on a plain background, so the recipe below composes a text hero from
> `pageSection` + `centerText` + the base `h1` + `slogan` + `scrollHint` instead of using `.hero`. A
> dedicated `.heroText` variant is a candidate for a future block if this pattern recurs.

---

## 3. Composition recipes (per section)

Each section is a **combination** of small blocks — this is the point of the split.

- **Header:** `.siteHeader` › `.siteHeaderInner .centerBox` › `.siteLogo` + `.siteNav` › `.langToggle`
  (`.langToggleItem` ×2, one `.langToggleItemActive`).
- **Hero (text):** `section.pageSection.centerText` › `.centerBox` › `h1` + `.slogan` + `.scrollHint`.
- **Services:** `section.pageSection` › `.centerBox` › `.sectionLead` + `.tileGrid` (`.tile` ×N, each
  `.tileTitle` + `.tileMeta`).
- **Contact:** `section.pageSection` › `.centerBox` › `.kvList` (`.kvRow` › `.kvLabel` + `.kvValue`).
- **Footer:** `.siteFooter` › `.siteFooterInner .centerBox` › `.siteFooterInfo` + `.siteFooterNav`
  (`.siteFooterLink`).
- **Privacy modal:** `.overlay` › `.modal` › `.modalHeader` + `.modalBody` + `.modalFooter`
  (`.btn .btnPrimary`).

A full worked demo lives in **`packages/setmy-info-less-experimental/src/test/pug/spa.pug`** and builds
to `dist/spa.html` (load order: base → extended → experimental).

---

## 4. Where it all lives

- **base, extended — untouched.** Stable content components stay put.
- **experimental** holds every unvalidated piece: `base/` (button, keyvalue, forms, colors), `ui/`
  (states, typography, card, feedback, navigation, positioning + content patterns), `web/` (header,
  hero, tile, cta, footer + langToggle, scrollHint, slogan, sectionLead).
- `enterprise`, `fancy` remain empty skeletons.

---

## 5. Open / next

- Promote validated blocks out of `experimental` into `fancy` (public chrome) or `extended` (generic
  content) once they pass review.
- Candidate new blocks if patterns recur: `.heroText` (text hero variant), a two-column contact/map
  row, a sticky header variant (compose with `.fixedTop`/`.stickyTop`).
- Add e2e/cucumber for `spa` and the new blocks (deferred; the fixture is in place).
