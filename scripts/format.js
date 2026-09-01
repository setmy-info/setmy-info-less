#!/usr/bin/env node
// Sequential formatters. Each tool owns one file set. This list is the
// extension point from the JS template (scripts/format.js). LESS is this
// repo's main sources: prettier first (indent/wrapping), then stylelint
// --fix so the tree matches stylelint-config-standard (blank lines, media
// notation, ...). Prettier keeps a single blank line between rules, so a
// later prettier pass does not undo stylelint. Stylelint check is also
// `npm run lint`.
//
//     npm run format            write
//     npm run format:check      check only (CI)
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { resolveLocalBin, rootDir } from "./workspace-utils.js";

const LESS_GLOB = "packages/*/src/main/less/**/*.less";

export const FORMATTERS = [
    {
        name: "less",
        write: ["prettier", "--write", LESS_GLOB],
        check: ["prettier", "--check", LESS_GLOB],
    },
    {
        name: "stylelint",
        write: ["stylelint", LESS_GLOB, "--fix"],
        check: ["stylelint", LESS_GLOB],
    },
    {
        name: "prettier",
        write: ["prettier", "--write", "."],
        check: ["prettier", "--check", "."],
    },
];

function runFormatter(spec, mode) {
    const argv = mode === "write" ? spec.write : spec.check;
    const [binName, ...args] = argv;
    console.log(
        `${mode === "write" ? "format" : "format:check"}: ${spec.name}`,
    );
    const result = spawnSync(resolveLocalBin(binName), args, {
        cwd: rootDir,
        stdio: "inherit",
        shell: process.platform === "win32",
    });

    return result.status ?? 1;
}

export function runFormat(mode) {
    if (mode !== "write" && mode !== "check") {
        throw new Error(`Unknown format mode "${mode}". Use write or check.`);
    }
    for (const spec of FORMATTERS) {
        const status = runFormatter(spec, mode);
        if (status !== 0) {
            return status;
        }
    }

    return 0;
}

if (
    process.argv[1] &&
    path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
    const mode = process.argv[2] === "--check" ? "check" : "write";
    process.exit(runFormat(mode));
}
