#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import { getWorkspaceInfo } from "./workspace-utils.js";
import { readRuleCount, resolveExpectation } from "./css-utils.js";

// Verify phase (Maven `verify`): the build's artifacts exist and are
// well-formed. This absorbs the old repository-root `smoke:dist` script -
// same checks, now a per-package lifecycle phase that runs in the normal
// sequence instead of a separate one-off command.

const workspace = getWorkspaceInfo();
const expectation = resolveExpectation(workspace.packageJson);
const requiredArtifacts = ["main.css", "main.min.css"].map((artifact) =>
    path.join(workspace.distDir, artifact),
);

for (const artifact of requiredArtifacts) {
    if (!fs.existsSync(artifact)) {
        console.error(`Missing build artifact: ${artifact}`);
        process.exit(1);
    }
}

const rules = readRuleCount(requiredArtifacts[0]);

if (expectation === "content" && rules === 0) {
    console.error(
        `${workspace.packageName}: dist/main.css has no CSS rules, but this package is declared as content ` +
            `(set config.cssExpectation to "skeleton" in package.json if it is an intentional placeholder).`,
    );
    process.exit(1);
}

console.log(
    `Verified build artifacts for ${workspace.packageName} (${rules} rule(s), expectation: ${expectation})`,
);
