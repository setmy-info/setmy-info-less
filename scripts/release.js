#!/usr/bin/env node
// Publish every workspace, the Maven way: two deployables, decided by the branch.
//
//     devel.*  -> the -SNAPSHOT version, dist-tag "snapshot", to NPM_SNAPSHOT_REGISTRY
//     master   -> the release version (no prerelease suffix), dist-tag "latest", to NPM_RELEASE_REGISTRY
//
// Publishing goes through npm's STAGED publishing (`npm stage publish`, npm >= 11.6):
// the tarball lands on the registry in a non-public state and a maintainer releases it
// later with `npm stage approve <stage-id>`. That is what lets an unattended Jenkins
// publish to npmjs at all - staging never prompts for 2FA (any token type will do),
// while the approval, which does prompt, stays a human step. `npm stage list` shows
// what is waiting; `npm stage reject` throws a staged version away.
//
// Consequences worth knowing (see `npm help stage`):
//   * The package must ALREADY exist on the registry - staging cannot create it.
//   * A staged version occupies its semver slot, so the same version cannot be staged
//     twice; reject the pending one or bump the version (hence -SNAPSHOT-<n>).
//   * The dist-tag is immutable once staged - it cannot be retagged, only rejected.
//   * `npm stage` is workspace-unaware, which is why each package is published from its
//     own directory below rather than with --workspaces.
//
// A version that does not match its branch is refused: master never publishes a
// prerelease, develop never publishes a release. NPM_TOKEN goes through .npmrc.publish
// and is also the gate that keeps a developer machine from publishing by accident. A
// version that is already on the registry is reported and is not a build failure - bump
// the version to release a new one.
//
// Publish order is topological: a package must exist on the registry before
// its dependents. `npm publish` would re-invoke this script (the "publish"
// lifecycle hook shares the name), so each package is published with
// --ignore-scripts.
import { execSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
    getWorkspaces,
    npmCommand,
    rootDir,
    sortWorkspacesTopologically,
} from "./workspace-utils.js";

export function resolvePublishTarget(branchName, version) {
    // -SNAPSHOT, plus the numbered -SNAPSHOT-1, -SNAPSHOT-2, ... form: a staged version holds
    // its semver slot on the registry until it is approved or rejected, so re-staging the same
    // release candidate needs a fresh number rather than a retry of the old one.
    const snapshot = /-SNAPSHOT(-\d+)?$/.test(version);
    // Any prerelease suffix, not just -SNAPSHOT. Testing only for -SNAPSHOT let a version like
    // 5.2.6-SNAPSHOT-1 through the master guard, and it would then have been staged for the
    // "latest" tag - the one thing master must never do with an unfinished version.
    const prerelease = version.includes("-");
    if (branchName === "master") {
        if (prerelease) {
            throw new Error(
                `master publishes releases - remove the prerelease suffix from the version (${version})`,
            );
        }
        return { tag: "latest", registryEnv: "NPM_RELEASE_REGISTRY" };
    }
    if (/^devel/.test(branchName)) {
        if (!snapshot) {
            throw new Error(
                `${branchName} publishes snapshots - the version must end in -SNAPSHOT or -SNAPSHOT-<n> (${version})`,
            );
        }
        return { tag: "snapshot", registryEnv: "NPM_SNAPSHOT_REGISTRY" };
    }
    return null;
}

export function resolveBranch() {
    if (process.env.BRANCH_NAME) {
        return process.env.BRANCH_NAME;
    }
    if (process.env.CI_BRANCH_NAME) {
        return process.env.CI_BRANCH_NAME;
    }
    try {
        return execSync("git rev-parse --abbrev-ref HEAD", {
            cwd: rootDir,
            encoding: "utf8",
        }).trim();
    } catch {
        return "unknown";
    }
}

function publishWorkspace(workspace, target, registry, execute) {
    const args = ["stage", "publish", "--tag", target.tag, "--ignore-scripts"];
    if (registry) {
        args.push("--registry", registry);
    }
    if (!execute) {
        args.push("--dry-run");
    }
    console.log(
        `${execute ? "Staging" : "Dry-run staging"} ${workspace.packageName}@${workspace.packageJson.version} to dist-tag "${target.tag}"${registry ? ` at ${registry}` : ""}`,
    );
    const result = spawnSync(npmCommand, args, {
        cwd: workspace.workspace,
        encoding: "utf8",
        shell: process.platform === "win32",
    });
    const output = `${result.stderr ?? ""}${result.stdout ?? ""}`;
    if (result.status === 0) {
        process.stdout.write(result.stdout ?? "");
        return;
    }
    if (output.includes("cannot publish over")) {
        console.log(
            `Skipping ${workspace.packageName}@${workspace.packageJson.version}: this version is already published — bump the version to release a new one.`,
        );
        return;
    }
    process.stderr.write(output);
    process.exit(result.status ?? 1);
}

function main() {
    const branch = resolveBranch();
    const version = JSON.parse(
        fs.readFileSync(path.join(rootDir, "package.json"), "utf8"),
    ).version;
    let target;
    try {
        target = resolvePublishTarget(branch, version);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
    if (!target) {
        console.log(
            `Skipping publish: branch "${branch}" is not a publish branch (devel.* or master).`,
        );
        return;
    }
    const registry = process.env[target.registryEnv];
    if (!registry) {
        console.log(
            `${target.registryEnv} is not set - staging to the default registry (registry.npmjs.org).`,
        );
    }
    // Staged publishing is a registry.npmjs.org feature, so an unset *_REGISTRY is the NORMAL
    // case here and must not force a dry run - requiring one is what would have left Jenkins
    // dry-running forever. NPM_TOKEN is the gate instead: Jenkins injects it from the NPMToken
    // credential, a developer machine has none, and PUBLISH_EXECUTE=true is the manual override.
    const execute =
        process.env.PUBLISH_EXECUTE === "true" ||
        Boolean(process.env.NPM_TOKEN);
    for (const workspace of sortWorkspacesTopologically(getWorkspaces())) {
        publishWorkspace(workspace, target, registry, execute);
    }
}

if (
    process.argv[1] &&
    path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
    main();
}
