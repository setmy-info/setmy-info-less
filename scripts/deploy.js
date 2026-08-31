#!/usr/bin/env node
// Deploying is installing the packed tarballs (dist/*.tgz, from `npm run package`)
// into a fresh prefix and confirming the CSS the manifests promise actually
// arrived - the artifact, not the workspace link:
//
//     node scripts/deploy.js dev|test|prelive|live
//
// No real target host is wired up yet, so the installation is proven in the
// workspace: build/deploy/<env>/ gets a package.json that depends on every
// tarball and `overrides` every sibling to its tarball too (a tarball's own
// dependencies would otherwise be resolved from the registry, where a version
// may already exist), then `npm install --omit=dev`, then each stylesheet's
// `style` / `main` files are checked for presence and rule-count expectation.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

import { readRuleCount, resolveExpectation } from "./css-utils.js";
import {
    getWorkspaces,
    npmCommand,
    rootDir,
    toArtifactDirectoryName,
} from "./workspace-utils.js";

const environment = process.argv[2];

if (!["dev", "test", "prelive", "live"].includes(environment)) {
    console.error("Usage: node scripts/deploy.js dev|test|prelive|live");
    process.exit(1);
}

const distDir = path.join(rootDir, "dist");
const workspaces = getWorkspaces();
const tarballs = fs.existsSync(distDir)
    ? fs.readdirSync(distDir).filter((name) => name.endsWith(".tgz"))
    : [];
if (tarballs.length === 0) {
    console.error("No dist/*.tgz - run `npm run package` first");
    process.exit(1);
}

function tarballFor(packageName) {
    const prefix = `${toArtifactDirectoryName(packageName)}-`;
    return tarballs.find(
        (name) => name.startsWith(prefix) && name.endsWith(".tgz"),
    );
}

const specs = {};
for (const workspace of workspaces) {
    const name = tarballFor(workspace.packageName);
    if (!name) {
        console.error(
            `No tarball for ${workspace.packageName} in dist/ - run \`npm run package\` first`,
        );
        process.exit(1);
    }
    specs[workspace.packageName] = `file:${path.join(distDir, name)}`;
}

const deployDir = path.join(rootDir, "build", "deploy", environment);
fs.rmSync(deployDir, { recursive: true, force: true });
fs.mkdirSync(deployDir, { recursive: true });
fs.writeFileSync(
    path.join(deployDir, "package.json"),
    JSON.stringify(
        {
            name: `setmy-info-less-deploy-${environment}`,
            private: true,
            dependencies: specs,
            overrides: specs,
        },
        null,
        4,
    ) + "\n",
);

const install = spawnSync(
    npmCommand,
    [
        "install",
        "--omit=dev",
        "--no-audit",
        "--no-fund",
        "--loglevel=error",
        "--ignore-scripts",
    ],
    {
        cwd: deployDir,
        stdio: "inherit",
        shell: process.platform === "win32",
    },
);
if (install.status !== 0) {
    process.exit(install.status ?? 1);
}

for (const workspace of workspaces) {
    const installedDir = path.join(
        deployDir,
        "node_modules",
        workspace.packageName,
    );
    const manifest = JSON.parse(
        fs.readFileSync(path.join(installedDir, "package.json"), "utf8"),
    );
    for (const entry of [manifest.main, manifest.style]) {
        const cssPath = path.join(installedDir, entry);
        if (!fs.existsSync(cssPath)) {
            console.error(
                `${workspace.packageName}: ${entry} is declared in package.json but missing from the packed tarball`,
            );
            process.exit(1);
        }
    }
    const rules = readRuleCount(path.join(installedDir, manifest.style));
    const expectation = resolveExpectation(workspace.packageJson);
    if (expectation === "content" && rules === 0) {
        console.error(
            `${workspace.packageName}: packed ${manifest.style} contains no CSS rules`,
        );
        process.exit(1);
    }
    console.log(
        `${workspace.packageName} resolves from its tarball (${rules} rule(s), ${expectation})`,
    );
}

console.log(
    `Installed into ${path.relative(rootDir, deployDir)} for ${environment}`,
);
