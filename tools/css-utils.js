import fs from "node:fs";

// Counts CSS rule blocks, ignoring comments so a commented-out brace never
// counts. Ported from the old packages/common/test/js/distSmoke.js, which the
// Verify phase (tools/verify.js) and the per-package integration tests now
// both build on.
export function countRules(css) {
    return (css.replace(/\/\*[\s\S]*?\*\//g, "").match(/\{/g) ?? []).length;
}

export function readRuleCount(cssPath) {
    return countRules(fs.readFileSync(cssPath, "utf8"));
}

// "content" - the package must emit at least one rule.
// "skeleton" - the package is wired into the load order on purpose but emits
// nothing yet (README's 🚧 marker); zero rules is correct, not a failure.
export function resolveExpectation(packageJson) {
    return packageJson.config?.cssExpectation === "skeleton"
        ? "skeleton"
        : "content";
}
