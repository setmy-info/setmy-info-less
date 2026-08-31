#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

import { getWorkspaces } from "./workspace-utils.js";
import { readRuleCount, resolveExpectation } from "./css-utils.js";

let failed = false;

for (const workspace of getWorkspaces()) {
    if (!verifyWorkspace(workspace)) {
        failed = true;
    }
}

if (failed) {
    process.exit(1);
}

function verifyWorkspace(workspace) {
    const errors = [];
    const requiredArtifacts = ["main.css", "main.min.css"].map((artifact) =>
        path.join(workspace.distDir, artifact),
    );
    for (const artifact of requiredArtifacts) {
        if (!fs.existsSync(artifact)) {
            errors.push(`Missing build artifact: ${artifact}`);
        }
    }

    if (errors.length === 0) {
        const expectation = resolveExpectation(workspace.packageJson);
        const rules = readRuleCount(requiredArtifacts[0]);
        if (expectation === "content" && rules === 0) {
            errors.push(
                `dist/main.css has no CSS rules, but this package is declared as content ` +
                    `(set config.cssExpectation to "skeleton" in package.json if it is an intentional placeholder).`,
            );
        } else {
            console.log(
                `Verified ${workspace.packageName} (${rules} rule(s), expectation: ${expectation})`,
            );
        }
    }

    if (errors.length > 0) {
        console.error(`\n${workspace.packageName}: verification failed:`);
        for (const error of errors) {
            console.error(`- ${error}`);
        }
        return false;
    }
    return true;
}
