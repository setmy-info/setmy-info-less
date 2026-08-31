#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

import {
    getWorkspaces,
    resolveLocalBin,
    rootDir,
    toArtifactDirectoryName,
} from "./workspace-utils.js";

const kssBin = resolveLocalBin("kss");
const docsRoot = path.join(rootDir, "reports", "docs");

fs.rmSync(docsRoot, { recursive: true, force: true });
fs.mkdirSync(docsRoot, { recursive: true });

for (const workspace of getWorkspaces()) {
    const lessDir = path.join(workspace.workspace, "src", "main", "less");
    if (!fs.existsSync(lessDir)) {
        console.log(`No LESS source to document for ${workspace.packageName}`);
        continue;
    }

    const outDir = path.join(
        docsRoot,
        toArtifactDirectoryName(workspace.packageName),
    );
    fs.mkdirSync(outDir, { recursive: true });

    console.log(`Generating KSS styleguide for ${workspace.packageName}`);
    execFileSync(
        kssBin,
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
}
