#!/usr/bin/env node
// One tarball per package into dist/, then SHA-256 checksums next to them.
// `npm pack --workspaces` is npm's own packaging; the checksums are a labelled
// placeholder, not a real signature, until key material exists.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

import { npmCommand, rootDir } from "./workspace-utils.js";

const distDir = path.join(rootDir, "dist");
fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

const result = spawnSync(
    npmCommand,
    ["pack", "--workspaces", `--pack-destination=${distDir}`],
    {
        cwd: rootDir,
        stdio: "inherit",
        shell: process.platform === "win32",
    },
);
if (result.status !== 0) {
    process.exit(result.status ?? 1);
}

for (const name of fs
    .readdirSync(distDir)
    .filter((entry) => entry.endsWith(".tgz"))) {
    const file = path.join(distDir, name);
    const digest = crypto
        .createHash("sha256")
        .update(fs.readFileSync(file))
        .digest("hex");
    fs.writeFileSync(
        path.join(distDir, `${name}.sha256`),
        `${digest}  ${name}\n`,
    );
    console.log(`Packed ${name}`);
}
