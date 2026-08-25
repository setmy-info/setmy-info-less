#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

import { getWorkspaceInfo, resolveLocalBin } from "./workspace-utils.js";

// Docs phase (Maven `javadoc:javadoc`, JSDoc/ExDoc/pdoc in the siblings):
// KSS reads the LESS source comments and generates a living styleguide.
//
// It writes into site/styleguide/, NOT dist/, because a styleguide is
// generated documentation, not a published artifact - the same place the
// siblings' API docs go, and it keeps the npm tarball to CSS only.
const workspace = getWorkspaceInfo();
const lessDir = path.join(workspace.workspace, "src", "main", "less");
const outDir = path.join(workspace.workspace, "site", "styleguide");

if (!fs.existsSync(lessDir)) {
    console.log(`No LESS source to document for ${workspace.packageName}`);
    process.exit(0);
}

fs.rmSync(outDir, { recursive: true, force: true });

console.log(`Generating KSS styleguide for ${workspace.packageName}`);

execFileSync(
    resolveLocalBin("kss"),
    [
        "--source",
        lessDir,
        "--destination",
        outDir,
        "--css",
        path.relative(outDir, path.join(workspace.distDir, "main.css")),
    ],
    { cwd: workspace.workspace, stdio: "inherit" },
);

console.log(`Created ${outDir}`);
