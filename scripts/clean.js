#!/usr/bin/env node
// Removes every build result: generated HTML inside packages/*/dist, packed
// tarballs (dist/), the reports (reports/) and the running-instance / deploy
// state (build/). node_modules stays - `npm ci` is the Preparation stage's
// job; `rm -rf node_modules` when a developer wants a from-scratch checkout.
//
// dist/main.css and dist/main.min.css are tracked in git on purpose (the
// 1.0.0-dist decision) and are left in place for `build` to rewrite - unlike
// the JS sibling, which git-ignores all generated output.
//
// The lifecycle's post phases run first: build/ holds their state (http-server
// pid files), and removing that from under something still running would leave
// it orphaned.
import fs from "node:fs";
import path from "node:path";

import { runPhases } from "./lifecycle.js";
import { getWorkspaces, removeDirectory, rootDir } from "./workspace-utils.js";

await runPhases(["post-integration-test", "post-e2e-test"]);

const trackedCss = new Set(["main.css", "main.min.css"]);

for (const workspace of getWorkspaces()) {
    for (const extra of [
        "site",
        "coverage",
        ".cache",
        ".tmp",
        "test-results",
        "playwright-report",
        ".artifacts",
    ]) {
        removeDirectory(path.join(workspace.workspace, extra));
    }
    const distDir = workspace.distDir;
    if (fs.existsSync(distDir)) {
        removeDirectory(path.join(distDir, "styleguide"));
        removeDirectory(path.join(distDir, "resources"));
        for (const entry of fs.readdirSync(distDir)) {
            if (trackedCss.has(entry)) {
                continue;
            }
            fs.rmSync(path.join(distDir, entry), {
                recursive: true,
                force: true,
            });
        }
    }
    console.log(`Cleaned ${workspace.packageName}`);
}

for (const name of ["dist", "reports", "build", "coverage", "site"]) {
    const target = path.join(rootDir, name);
    if (fs.existsSync(target)) {
        fs.rmSync(target, { recursive: true, force: true });
        console.log(`Removed ${path.relative(rootDir, target)}`);
    }
}
