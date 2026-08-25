#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

import { getWorkspaceInfo, resolveLocalBin } from "./workspace-utils.js";
import { escapeHtml, writePage } from "./site-utils.js";

// Lint report (Maven's checkstyle *report* goal - informational, never
// gating; `npm run lint` is the gate). stylelint is this module type's lint
// tool, the eslint/ruff/credo equivalent.
const workspace = getWorkspaceInfo();
const outDir = path.join(workspace.workspace, "site", "lint");

fs.mkdirSync(outDir, { recursive: true });

console.log(`Generating lint report for ${workspace.packageName}`);

let output = "[]";

try {
    output = execFileSync(
        resolveLocalBin("stylelint"),
        ["src/main/less/**/*.less", "--formatter", "json"],
        {
            cwd: workspace.workspace,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"],
        },
    );
} catch (error) {
    // stylelint exits non-zero when findings exist; this report step is
    // informational, so the findings become the report instead of a failure.
    output = error.stdout || "[]";
}

let results;

try {
    results = JSON.parse(output);
} catch {
    results = [];
}

fs.writeFileSync(
    path.join(outDir, "stylelint.json"),
    `${JSON.stringify(results, null, 2)}\n`,
);

const rows = results
    .flatMap((fileResult) =>
        (fileResult.warnings ?? []).map(
            (warning) => `<tr>
      <td>${escapeHtml(path.relative(workspace.workspace, fileResult.source ?? ""))}</td>
      <td>${warning.line}:${warning.column}</td>
      <td class="${warning.severity === "error" ? "error" : "warn"}">${escapeHtml(warning.severity ?? "")}</td>
      <td>${escapeHtml(warning.rule ?? "")}</td>
      <td>${escapeHtml(warning.text ?? "")}</td>
    </tr>`,
        ),
    )
    .join("\n");

const findings = results.reduce(
    (sum, result) => sum + (result.warnings?.length ?? 0),
    0,
);

writePage(
    path.join(outDir, "index.html"),
    `Lint report (stylelint) - ${workspace.packageName}`,
    rows
        ? `<p>${findings} finding(s)</p>
     <table>
       <thead><tr><th>File</th><th>Position</th><th>Severity</th><th>Rule</th><th>Message</th></tr></thead>
       <tbody>${rows}</tbody>
     </table>`
        : `<p class="ok">No lint findings.</p>`,
);

console.log(`Created ${path.join(outDir, "index.html")}`);
