#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

import {
    ensureDirectory,
    getWorkspaceInfo,
    resolveLocalBin,
    rootDir,
} from "./workspace-utils.js";

// Compile phase (Maven `compile`): LESS -> CSS. Two outputs per entry point,
// the same two-artifact convention the JS sibling has for index.js /
// index.min.js:
//   dist/main.css      - readable
//   dist/main.min.css  - minified via less-plugin-clean-css
//
// Like the JS sibling's build.js, this removes ONLY the files it writes -
// never the whole dist/ - so the resources phase's dist/resources/ output
// (Maven process-resources, which runs just before compile) survives, and so
// do the tracked CSS artifacts until they are rewritten.

const workspace = getWorkspaceInfo();
const lesscBin = resolveLocalBin("lessc");

// Default entry point plus any extra ones a package declares, e.g.
// setmy-info-less-ide's experimental bundle:
//   "config": { "less": { "additionalEntries": [
//       { "input": "src/main/less/experimental/main.less",
//         "output": "experimental.css", "minify": false } ] } }
const entries = [
    {
        input: path.relative(workspace.workspace, workspace.srcEntry),
        output: "main.css",
        minify: true,
    },
    ...(workspace.packageJson.config?.less?.additionalEntries ?? []),
];

console.log(`Building ${workspace.packageName}`);

ensureDirectory(workspace.distDir);

for (const entry of entries) {
    const inputPath = path.join(workspace.workspace, entry.input);

    if (!fs.existsSync(inputPath)) {
        console.error(`Missing LESS entry point: ${inputPath}`);
        process.exit(1);
    }

    compile(inputPath, path.join(workspace.distDir, entry.output), false);

    if (entry.minify !== false) {
        const minifiedName = entry.output.replace(/\.css$/, ".min.css");

        compile(inputPath, path.join(workspace.distDir, minifiedName), true);
    }
}

// Pug -> HTML demo/fixture pages. They are both the browsable examples and
// the e2e fixtures the Selenium suite drives, so they are part of Compile,
// not of Site (which owns the KSS styleguide instead).
const pugDir = path.join(workspace.workspace, "src", "test", "pug");

if (fs.existsSync(pugDir)) {
    execFileSync(
        process.execPath,
        [path.join(rootDir, "tools", "pugBuild.cjs")],
        {
            cwd: workspace.workspace,
            stdio: "inherit",
        },
    );
    console.log(
        `Generated demo pages from ${path.relative(workspace.workspace, pugDir)}`,
    );
}

function compile(inputPath, outputPath, minify) {
    fs.rmSync(outputPath, { force: true });

    const args = [inputPath, outputPath];

    if (minify) {
        args.push("--clean-css");
    }

    execFileSync(lesscBin, args, {
        cwd: workspace.workspace,
        stdio: "inherit",
    });

    console.log(`Created ${outputPath}`);
}
