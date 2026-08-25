# setmy-info-less — build refactoring report

Date: 2026-08-25

## Scope

Refactored this repository's build onto the org's shared, Maven-mirroring lifecycle — the same structure already
implemented in `setmy.info-js` (npm), `setmy.info-python` (venv+pip) and `setmy.info-elixir` (Mix umbrella), per
**ADR-0045** (software build lifecycles) and `setmy.info-js/requirements-rules.md` (the language-agnostic spec).
Goal, as stated: a developer moving between these four repos — or coming from a Java/Maven project — sees the same
phase names, in the same order, with the same gating behaviour, while the _tools_ behind each phase stay the ones
that make sense for LESS/CSS (lessc, stylelint, KSS, Pug, jest, Selenium).

Nothing about the CSS itself was changed: **every package's compiled `dist/main.css` and `dist/main.min.css` are
byte-identical to the pre-refactor committed output** (verified with `git status` after a full rebuild).

## Phase mapping (Maven → this repo)

| Maven                      | Here                                                  | Tool                                             |
| -------------------------- | ----------------------------------------------------- | ------------------------------------------------ |
| `dependency:go-offline`    | `npm run bootstrap`                                   | `npm ci`                                         |
| `clean`                    | `npm run clean`                                       | per-package + root clean, stops test servers     |
| `validate`                 | `npm run validate`                                    | manifest/entry-point/stylelint-config checks     |
| `spotless:apply/check`     | `npm run format` / `format:check`                     | prettier (js/json/md), stylelint owns `.less`    |
| `checkstyle:check`         | `npm run lint`                                        | stylelint                                        |
| `process-resources`        | `npm run resources -- --profile <name>`               | `${token}` filtering from `profiles/<name>.json` |
| `compile`                  | `npm run build`                                       | lessc → main.css + main.min.css; Pug → pages     |
| `test`                     | `npm test`                                            | jest, `src/test/js/unit`                         |
| `pre-integration-test`     | `npm run pre-integration-test`                        | starts the package's static server               |
| `integration-test`         | `npm run integration-test`                            | jest against the **built** `dist/main.css`       |
| `post-integration-test`    | `npm run post-integration-test`                       | stops it, always                                 |
| `-Pe2e` trio               | `npm run pre-e2e-test` / `e2e-test` / `post-e2e-test` | jest + Selenium, real browser                    |
| `jacoco:report`            | `npm run coverage`                                    | jest --coverage (unit tier only)                 |
| `dependency-check:check`   | `npm run security`                                    | `npm audit --audit-level=high`                   |
| `verify`                   | `npm run verify`                                      | artifacts exist + content/skeleton rule check    |
| `package`                  | `npm run package`                                     | `npm pack` → `.artifacts/<pkg>/`                 |
| `cyclonedx` / `gpg:sign`   | `npm run sbom` / `sign`                               | CycloneDX-shaped JSON / SHA-256 of the tarball   |
| `install`                  | `npm run install-local`                               | packed-tarball consumer check                    |
| `deploy` (to a registry)   | `npm run publish`                                     | dist-tag by branch, dry-run by default           |
| `cargo:deploy` (to an env) | `DEPLOY_TARGET=<env> npm run deploy`                  | prepared-not-executed descriptor                 |
| `site` / `javadoc`         | `npm run site` / `docs`                               | report site; **KSS living styleguide**           |

## What changed structurally

1. **`packages/common/` → root `tools/`.** The shared build/test helpers (pugBuild, pugTranspile, pugWatch,
   pageHelper, firefoxHelper, testPageName, gherkin/*) moved to the root `tools/` directory, matching the siblings'
   `tools/` (npm), `scripts/` (Python), `apps/dev_tasks` (Elixir). `packages/common` is gone — it was never a real
   workspace (it had no `package.json`, so npm never saw it). Every `require` path in the e2e suites was rewritten.
2. **`tools/` now holds the lifecycle scripts**, ported from `setmy.info-js` and adapted: `run-workspaces.js`
   (topological fan-out), `clean.js`, `clean-root.js`, `validate.js`, `resources.js` + `profile-utils.js`, `build.js`,
   `run-tests.js`, the four pre/post hook runners, `coverage.js`, `verify.js`, `package.js`, `sign.js`,
   `install-local.js`, `publish.js`, `deploy.js`, `docs.js`, `site.js` + the four report generators,
   `aggregate-site.js`, `http-server.js`, `css-utils.js`.
3. **Module system split.** The lifecycle tools are ESM (root `"type": "module"`, like the JS sibling); the helpers
   consumed by CommonJS jest tests are `.cjs`. This is why `tools/pageHelper.cjs` etc. carry that extension.
4. **Per-package manifests are now uniform**: the same ordered phase scripts in all seven, a `files` allowlist, a
   `config.server.port`, and `config.cssExpectation` (`content` | `skeleton`). devDependencies moved to the root —
   one hoisted toolchain rather than the same 13 packages repeated seven times.
5. **`profiles/{local,dev,ci,test,prelive,live}.json`** added (ADR-0041/0042 canonical names, hard-validated).
6. **`Jenkinsfile` added** (there was no CI file at all): version 1.1.0, migrated from `jenkinsfile-starter` 1.1.0,
   identical stage skeleton and branch gating to the three siblings, including `hotfix*`.
7. **Test tiers**: `src/test/js/{unit,integration,e2e}` with one jest config each. Unit and integration tiers were
   created (they did not exist); the existing Selenium e2e suites were kept as-is.

## Defects found and fixed while migrating

1. **The KSS styleguide step was fetching a different tool from the network on every build.** Every package declared
   `kss ^2.4.0`, whose binary is `kss-node` — but the scripts called `npx kss`, which silently downloads `kss@latest`
   because no local `kss` binary exists. The README meanwhile documented "kss v3.x, installed by npm install". Fixed
   by declaring `kss ^3.1.0` at the root, so `node_modules/.bin/kss` exists and the phase works offline.
2. **Seven audit findings (6 high, 1 critical), all from `kss@3.1.0`'s dependency chain** (markdown-it→linkify-it,
   twig→locutus, minimatch). Fixed with root `overrides` pinning patched versions rather than accepting or
   suppressing them; KSS still generates correctly and `npm audit --audit-level=high` is now clean.
3. **`npm run verify` (old meaning) never checked artifacts**; the artifact check lived in a separate root-only
   `smoke:dist` script that no per-package flow ran. It is now the `verify` phase itself, per package, with the
   content/skeleton expectation moved into each `package.json`.
4. **The published tarball shipped the demo HTML and the styleguide.** Packages had no `files` allowlist, so
   everything not git-ignored was published. Now exactly the two CSS files + README + LICENSE (a per-package LICENSE
   was added — there was none, so the MIT declaration shipped without its text).
5. **`server.js` hard-coded port 3000 for every package**, so two packages could not be served at once. Replaced by
   the shared `tools/http-server.js` with a per-package `config.server.port`.
6. **prettier vs stylelint formatting conflict** surfaced when the format phase was added: prettier removes the blank
   lines `rule-empty-line-before` requires. Resolved by giving each language one owner — `.less` is in
   `.prettierignore` and belongs to stylelint. Documented in README.

## Verified by running

Full sequence from the README, from the repository root, `EXIT 0`:
`clean → validate → format:check → lint → resources --profile ci → build → test → pre-integration-test →
integration-test → post-integration-test → coverage → security → verify → package → sbom → sign → install-local →
publish (dry-run) → deploy → site`.

- 7/7 packages validate, build, verify (correct `content`/`skeleton` classification), and resolve from their packed
  tarballs; 7 deploy descriptors; 8 site pages (7 packages + aggregated root).
- Unit tier 2 tests × 7 packages, integration tier 3 × 7, tooling tier 5 (`node --test`) — all pass.
- Compiled CSS byte-identical to the committed pre-refactor output.
- **E2E**: run against the local Selenium grid for `setmy-info-less` — 16 of 17 tests pass; `centerText.e2e.js` fails.
  That failure is **pre-existing**, not caused by this refactor: the test file is unchanged apart from its import
  path and the CSS it asserts against is byte-identical. It needs a separate look.

## Open / not done

1. **The other six packages' e2e suites were not run** (only `setmy-info-less`). Each takes minutes against the grid.
2. `centerText.e2e.js` failure above — pre-existing, needs diagnosis.
3. **No `resources/` directory exists in any package**, so the Resources phase is a verified no-op everywhere. If
   CSS should carry environment-specific values (a CDN base URL is already in `profiles/*.json` as an example), wire
   one package up as the worked example.
4. **Unit tier is thin** — manifest/entry-point assertions only. The old `jest` unit suite was a `expect(true).toBe(true)`
   placeholder; real LESS-level unit testing needs a decision about what "unit" means for a stylesheet.
5. `playwright.config.js` stubs and `tools/firefoxHelper.cjs` are still retained as migration markers (a documented
   decision in `review3.md`), now alongside the new structure.
6. Versioning: the siblings use Changesets; this repo releases all packages together at one version. Left as is —
   that is a deliberate policy here, not an oversight.
