import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { packagesRoot, packageNameFromStack } = require("../../pageHelper.cjs");

const repoRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    "..",
    "..",
);

test("packagesRoot is the repo packages/ directory, not cwd's parent", () => {
    const root = packagesRoot();
    assert.equal(root, path.join(repoRoot, "packages"));
    assert.equal(fs.existsSync(path.join(root, "setmy-info-less")), true);
});

test("packageNameFromStack reads the package from a jest test path", () => {
    const stack = [
        "Error",
        "    at startServer (/repo/scripts/pageHelper.cjs:90:24)",
        "    at pageIsRendered (/repo/scripts/pageHelper.cjs:114:11)",
        "    at Object.<anonymous> (/repo/packages/setmy-info-less-extended/src/test/js/e2e/modal.e2e.js:9:9)",
    ].join("\n");
    assert.equal(packageNameFromStack(stack), "setmy-info-less-extended");
});

test("packageNameFromStack rejects a stack that is not under packages/", () => {
    assert.throws(
        () =>
            packageNameFromStack(
                "    at Object.<anonymous> (/repo/scripts/pageHelper.cjs:9:9)",
            ),
        /cannot infer/,
    );
});

test("packageNameFromStack reads the package from a Jest testPath alone", () => {
    assert.equal(
        packageNameFromStack(
            "/repo/packages/setmy-info-less/src/test/js/e2e/body.gherkin.e2e.js",
        ),
        "setmy-info-less",
    );
});
