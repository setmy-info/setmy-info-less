# Dark mode — implementation plan

How to add a dark theme to the SMI LESS framework and switch it on from the Angular start
project. The whole design is one idea: **a `darkMode` class on `<html>`, and one extra copy of
the colour-bearing rules nested under it.** No CSS custom properties, no second stylesheet, no
build flag.

Status: plan only. Nothing in this document is implemented yet.

## 1. Constraints this has to respect

- **Old browsers.** CSS custom properties (`var(--x)`) are the usual way to do runtime theming
  and are ruled out: IE 11 ignores them and the page would render unstyled colours. Everything
  below is plain static CSS.
- **No flex, no grid** — irrelevant here, dark mode touches colours only.
- **The delta model.** Every package ships only its own rules. Each package themes its own
  rules; nothing re-emits another package's CSS.
- **One stylesheet per package.** The switch must not require loading a different file, because
  swapping stylesheets at runtime flashes and doubles the deploy.

## 2. The mechanism

LESS variables are compile-time, so a theme switch means emitting the same declarations twice
with different values. The shortest way to do that without writing anything twice by hand is
`@import (multiple)` **inside a ruleset**: the imported file is evaluated in that ruleset's
scope, so the variables it reads are the ones the ruleset just redefined, and its rules come
out nested under the ruleset's selector.

`themed.less` — the colour-bearing rules, written once, against tokens only:

```less
body {
    background: @backgroundColor;
    color: @textColor;
}

.card {
    border: 1px solid @textColor;
}
```

`theme/index.less`:

```less
/* Light is the default: the tokens already hold the light values. */
@import (multiple) "themed.less";

/* Dark: redefine the tokens, then emit the same rules again, nested. */
.darkMode {
    @import "../values/colors/dark.less";
    @import (multiple) "themed.less";
}
```

Compiles to:

```css
body {
    background: white;
    color: black;
}
.card {
    border: 1px solid black;
}
.darkMode body {
    background: #111827;
    color: #e5e7eb;
}
.darkMode .card {
    border: 1px solid #e5e7eb;
}
```

Verified with this repo's `lessc` (4.9.0) before writing this plan. Two things to know:

- A plain mixin does **not** work for this. `.themedRules()` called inside `.darkMode { … }`
  resolves its variables in the scope where the mixin was _defined_, not where it is called, so
  both copies come out with the light values. Only the scoped `@import` picks up the
  redefinition.
- `(multiple)` is required on both imports. Without it LESS imports the file once and the
  second copy is silently dropped.

### Why the class goes on `<html>`

```html
<html class="darkMode"></html>
```

The generated selectors are `.darkMode <original selector>`, so the class must be on an
**ancestor of everything**, `<body>` included — several rules in this framework target `body`
itself. `<html>` is the only element that qualifies.

It also makes ordering a non-issue: prefixing a selector with a class always adds `0,1,0` to
its specificity, so the dark copy beats the light one no matter where the two land in the
bundle, and no matter how specific the original selector was.

Cost: the theme part of each stylesheet is emitted twice. On this framework that is a few
kilobytes before gzip, and gzip collapses near-identical blocks well.

## 3. Files to add

Nothing existing has to move for step 1. Per package:

```
src/main/less/
    values/colors/dark.less        the dark values of the semantic tokens
    theme/
        themed.less                the package's colour-bearing rules, tokens only
        index.less                 the two imports above
```

and one line in the package's `main.less`:

```less
@import url("theme/index.less");
```

`values/colors/dark.less` is only ever imported inside `.darkMode { … }`, so it must contain
variable declarations and nothing else — a rule in there would be emitted under `.darkMode`.

## 4. Dark palette

The base module already ships a full gray / slate / blue / emerald / red / amber scale in
`values/colors/index.less`. The dark theme is a remap of the **semantic** tokens onto that
scale; the numbered scales themselves do not change.

| Token                            | Light (today)              | Dark                        | Note                                    |
| -------------------------------- | -------------------------- | --------------------------- | --------------------------------------- |
| `@backgroundColor`               | `white`                    | `@gray-900` #111827         | page ground                             |
| `@textColor`                     | `black`                    | `@gray-100` #f3f4f6         | body text                               |
| `@primaryColor`                  | `black`                    | `@gray-100` #f3f4f6         | "ink" — flips with the ground           |
| `@secondaryColor`                | `#ffffff`                  | `@gray-900` #111827         | "paper" — flips with the ink            |
| `@tertiaryColor`                 | `#cccccc`                  | `@gray-700` #374151         | borders, rules                          |
| `@quaternaryColor`               | `#999999`                  | `@gray-500` #6b7280         | disabled, muted borders                 |
| `@quinaryColor`                  | `dimgray`                  | `@gray-400` #9ca3af         | secondary text                          |
| `@senaryColor`                   | `#333333`                  | `@gray-200` #e5e7eb         | strong text on the ground               |
| `@headingTextColor`              | `@quinaryColor`            | `@gray-300` #d1d5db         | headings need more contrast than body   |
| `@iconColor`                     | `gray`                     | `@gray-400` #9ca3af         |                                         |
| `@articleBackgroundColor`        | `@backgroundColor`         | `@gray-900` #111827         |                                         |
| `@articleTextColor`              | `#141412`                  | `@gray-200` #e5e7eb         |                                         |
| `@headerBackgroundColor`         | `@backgroundColor`         | `@gray-800` #1f2937         | chrome sits above the ground            |
| `@headerTextColor`               | `rgba(75, 75, 75, 0.87)`   | `rgba(229, 231, 235, 0.87)` | same 0.87 veil, inverted                |
| `@navigationBackgroundColor`     | `@backgroundColor`         | `@gray-800` #1f2937         |                                         |
| `@navigationHighLightTextColor`  | `darkslategray`            | `@emerald-300` #6ee7b7      |                                         |
| `@navigationInactiveTextColor`   | `midnightblue`             | `@blue-300` #93c5fd         |                                         |
| `@footerBackgroundColor`         | `@headerBackgroundColor`   | `@gray-800` #1f2937         |                                         |
| `@footerTextColor`               | `@headerTextColor`         | `rgba(229, 231, 235, 0.87)` |                                         |
| `@sideNavHeaderBackgroundColor`  | `gray`                     | `@gray-700` #374151         |                                         |
| `@sideNavHeaderTextColor`        | `rgba(255, 255, 255, .87)` | unchanged                   | already light-on-dark                   |
| `@primaryBackgroundColor`        | `@primaryColor`            | `@gray-900` #111827         |                                         |
| `@secondaryBackgroundColor`      | `@secondaryColor`          | `@gray-800` #1f2937         |                                         |
| `@primaryBorderColor`            | `@primaryColor`            | `@gray-700` #374151         |                                         |
| `@secondaryBorderColor`          | `@secondaryColor`          | `@gray-600` #4b5563         |                                         |
| `@primaryFontColor`              | `@secondaryColor`          | `@gray-900` #111827         |                                         |
| `@secondaryFontColor`            | `@primaryColor`            | `@gray-100` #f3f4f6         |                                         |
| `@overlayBackgroundColor`        | `rgba(0, 0, 0, 0.5)`       | `rgba(0, 0, 0, 0.7)`        | a dim needs to be darker on a dark page |
| `@activeSelectedMenuItemColor`   | `rgba(237, 38, 61, 0.87)`  | unchanged                   | brand accent, must stay recognisable    |
| `@cursorSelectableMenuItemColor` | `rgba(255, 157, 0, 0.87)`  | unchanged                   | brand accent                            |

So `values/colors/dark.less` is:

```less
/* Dark values of the semantic tokens. Variables only — this file is imported inside
   .darkMode { … }, so any rule in here would be emitted under that class. */
@backgroundColor: @gray-900;
@textColor: @gray-100;

@primaryColor: @gray-100;
@secondaryColor: @gray-900;
@tertiaryColor: @gray-700;
@quaternaryColor: @gray-500;
@quinaryColor: @gray-400;
@senaryColor: @gray-200;

@headingTextColor: @gray-300;
@iconColor: @gray-400;

@articleBackgroundColor: @gray-900;
@articleTextColor: @gray-200;

@headerBackgroundColor: @gray-800;
@headerTextColor: rgba(229, 231, 235, 0.87);
@navigationBackgroundColor: @gray-800;
@navigationHighLightTextColor: @emerald-300;
@navigationInactiveTextColor: @blue-300;
@footerBackgroundColor: @gray-800;
@footerTextColor: rgba(229, 231, 235, 0.87);
@sideNavHeaderBackgroundColor: @gray-700;

@primaryBackgroundColor: @gray-900;
@secondaryBackgroundColor: @gray-800;
@primaryBorderColor: @gray-700;
@secondaryBorderColor: @gray-600;
@primaryFontColor: @gray-900;
@secondaryFontColor: @gray-100;

@overlayBackgroundColor: rgba(0, 0, 0, 0.7);
```

Compiled against the real `values/index.less` before writing this plan, a sample of those
tokens comes out as:

```css
.darkMode body {
    background: #111827;
    color: #f3f4f6;
}
.darkMode #header-panel {
    background: #1f2937;
    color: rgba(229, 231, 235, 0.87);
    border-bottom: 1px solid #374151;
}
.darkMode .overlay {
    background: rgba(0, 0, 0, 0.7);
}
```

### Brand page

`setmy-info-less-brandpage` has its own token set (`brand/values/index.less`). Its dark values:

| Token                                      | Light                     | Dark                        |
| ------------------------------------------ | ------------------------- | --------------------------- |
| `@brandBackgroundColor`                    | `#fff`                    | `#0f172a` (`@slate-900`)    |
| `@brandAlternateBackgroundColor`           | `#f6f8fa`                 | `#1e293b` (`@slate-800`)    |
| `@brandChipBackgroundColor`                | `#dfe7f2`                 | `#334155` (`@slate-700`)    |
| `@brandBlue`                               | `midnightblue`            | `#93c5fd` (`@blue-300`)     |
| `@brandSteel`                              | `steelblue`               | `#94a3b8` (`@slate-400`)    |
| `@brandGray`                               | `dimgray`                 | `#cbd5e1` (`@slate-300`)    |
| `@brandSteelTextColor`                     | `rgba(76, 123, 168, .85)` | `rgba(148, 163, 184, 0.85)` |
| `@brandGhostNumberColor`                   | `rgba(70, 130, 180, .08)` | `rgba(148, 163, 184, 0.12)` |
| `@brandSteelBorderColor`                   | `rgba(70, 130, 180, .22)` | `rgba(148, 163, 184, 0.28)` |
| `@brandSteelLineColor`                     | `rgba(70, 130, 180, .2)`  | `rgba(148, 163, 184, 0.25)` |
| `@brandRed`, `@brandOrange`, `@brandGreen` | —                         | unchanged (brand accents)   |

The bars that use `rgba(255, 255, 255, 0.96)` directly (`#hdr`, `.pvh`, `#gb`) need a token
first — see step 5.

## 5. The actual work: literals → tokens

The mechanism above only themes declarations that read a token. Declarations with a literal
colour stay light in both themes. Current count of literal colour declarations:

| Package                                 | Literal colour declarations |
| --------------------------------------- | --------------------------- |
| `setmy-info-less`                       | 6                           |
| `setmy-info-less-extended`              | 2                           |
| `setmy-info-less-ide`                   | 0                           |
| `setmy-info-less-brandpage`             | 9                           |
| `setmy-info-less-angular-start-project` | 56                          |
| `setmy-info-less-experimental`          | 24                          |

The angular-start-project number is the price of the 1:1 transfer from the Angular workspace —
that CSS hardcodes `white`, `#4b4b4bde`, `#696969`, `gray`, `lightyellow` and so on. Those have
to become tokens before that package can go dark. `experimental` can be skipped: it is
unstable and not shipped.

This is the bulk of the effort and it is mechanical: for each literal, either point it at an
existing semantic token or add one.

## 6. Optional: follow the operating system

The class is an explicit choice. To also serve visitors who never chose, add a third copy under
a media query:

```less
@media (prefers-color-scheme: dark) {
    html:not(.lightMode) {
        @import "../values/colors/dark.less";
        @import (multiple) "themed.less";
    }
}
```

This needs a `lightMode` class as the "I explicitly chose light" escape hatch, and emits the
theme rules a third time. Old browsers ignore the whole media query and get light, which is the
correct fallback. **Recommendation: leave this out of step 1.** Ship the class first, add this
only if it is actually wanted.

## 7. Angular start project

### 7.1 No flash on first paint

The class has to be on `<html>` before the first paint, so it cannot wait for Angular to boot.
One inline script in `src/index.html`, before the app root:

```html
<script>
    (function () {
        try {
            var stored = localStorage.getItem("smi.theme");
            var dark =
                stored === "dark" ||
                (stored === null &&
                    window.matchMedia &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches);
            if (dark) {
                document.documentElement.className += " darkMode";
            }
        } catch (e) {
            /* private mode: stay light */
        }
    })();
</script>
```

### 7.2 The service

`src/app/services/theme.service.ts` — a signal, `localStorage`, and one `classList` call. No
dependency, nothing framework-specific beyond the signal.

```ts
@Injectable({ providedIn: "root" })
export class ThemeService {
    private static readonly STORAGE_KEY = "smi.theme";
    private static readonly DARK_CLASS = "darkMode";

    readonly isDark = signal(
        document.documentElement.classList.contains(ThemeService.DARK_CLASS),
    );

    toggle(): void {
        this.select(!this.isDark());
    }

    select(dark: boolean): void {
        this.isDark.set(dark);
        document.documentElement.classList.toggle(
            ThemeService.DARK_CLASS,
            dark,
        );
        try {
            localStorage.setItem(
                ThemeService.STORAGE_KEY,
                dark ? "dark" : "light",
            );
        } catch {
            /* private mode: the choice just does not survive the session */
        }
    }
}
```

The inline script and the service must agree on the key (`smi.theme`) and the class
(`darkMode`).

### 7.3 The toggle button

Goes in the header panel next to the language buttons — the same `header > ul:last-child`
group, so it inherits the button styling already there:

```html
<li>
    <button
        type="button"
        [attr.aria-pressed]="themeService.isDark()"
        [attr.aria-label]="languageService.translate('app.theme.toggle')"
        (click)="themeService.toggle()"
    >
        <i>{{ themeService.isDark() ? 'light_mode' : 'dark_mode' }}</i>
    </button>
</li>
```

Its LESS goes in this repo, not in the Angular workspace:
`packages/setmy-info-less-angular-start-project/src/main/less/components/layout/header-panel/header/theme-toggle.less`,
imported from `header/index.less` like its siblings.

### 7.4 Translations

Two keys: `app.theme.toggle`, and optionally `app.theme.dark` / `app.theme.light` if the button
ever gets a text label.

## 8. Tests

Same pattern as the existing suites — a pug page plus e2e in both flavours.

- `src/test/pug/dark-mode.pug` — the same markup as an existing page, with `darkMode` on the
  `<html>` element:

    ```pug
    html(lang="en", class="darkMode")
    ```

- `src/test/js/e2e/dark-mode.e2e.js` and `dark-mode.gherkin.e2e.js` — assert the dark values on
  `#body` and on a couple of chrome elements, and assert that the light page still reports the
  light values, so a leak in either direction fails.
- The Angular toggle itself is not e2e-tested here (no Angular in this repo). The plain-JS
  helper pattern from `include/js/side-navigation-panel.js` can drive the class from a button on
  a test page if a click-through test is wanted.

## 9. Order of work

| Step | What                                                                                | Size   |
| ---- | ----------------------------------------------------------------------------------- | ------ |
| 1    | `values/colors/dark.less` in `setmy-info-less` (values only, nothing consumes it)   | small  |
| 2    | `theme/themed.less` + `theme/index.less` in `setmy-info-less`, wired into main.less | small  |
| 3    | Move `setmy-info-less`'s 6 literal colours onto tokens                              | small  |
| 4    | Dark-mode pug page + e2e for the base module                                        | small  |
| 5    | Same three files for `setmy-info-less-extended` (2 literals)                        | small  |
| 6    | `setmy-info-less-angular-start-project`: 56 literals → tokens, then theme files     | large  |
| 7    | Angular: inline script, `ThemeService`, header toggle, translations                 | medium |
| 8    | `setmy-info-less-brandpage`: brand dark token set + theme files                     | medium |
| 9    | Optional `prefers-color-scheme` block (section 6)                                   | small  |

Steps 1–4 give a working, testable dark mode for the base module on their own. Nothing after
step 4 is required for the mechanism to be proven.

## 10. Rejected alternatives

- **CSS custom properties.** The obvious modern answer and the shortest of all — one `:root`
  block, one `.darkMode` block, no duplicated rules. Ruled out by the IE 11 requirement: the
  colours would simply not apply.
- **Two stylesheets, swapped at runtime.** Doubles the artifacts, needs a loader, and flashes
  while the new sheet is fetched.
- **A build flag producing a dark bundle.** Same problem, plus the theme stops being a runtime
  choice.
- **A LESS mixin instead of the scoped import.** Does not work — verified in section 2.
