#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import { getWorkspaceInfo } from "./workspace-utils.js";

const workspace = getWorkspaceInfo();

console.log(`Validating workspace: ${workspace.packageName}`);
console.log(`Location: ${workspace.workspace}`);

const errors = [];
const pkg = workspace.packageJson;

if (!pkg.name) {
    errors.push("package.json: name missing");
}

if (!pkg.version) {
    errors.push("package.json: version missing");
}

if (!fs.existsSync(workspace.srcEntry)) {
    errors.push(
        `LESS entry point missing: ${path.relative(workspace.workspace, workspace.srcEntry)}`,
    );
}

if (pkg.main !== "dist/main.min.css") {
    errors.push("package.json: main must point to dist/main.min.css");
}

// A LESS package's public surface is its compiled CSS, so the tarball must
// declare exactly what it ships - the equivalent of the JS sibling's
// main/./min export checks.
if (
    !Array.isArray(pkg.files) ||
    !pkg.files.some((entry) => entry.startsWith("dist/"))
) {
    errors.push(
        "package.json: files must be an array declaring the dist/ CSS artifacts it ships",
    );
}

// stylelint is this module type's Lint phase (the eslint/ruff/credo
// equivalent), so its config is a required structural file.
if (!fs.existsSync(path.join(workspace.workspace, "stylelint.config.js"))) {
    errors.push("stylelint.config.js missing");
}

if (errors.length > 0) {
    console.error("");
    console.error("Validation failed:");

    for (const error of errors) {
        console.error(`- ${error}`);
    }

    process.exit(1);
}

console.log("Validation successful");
