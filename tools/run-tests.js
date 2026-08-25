#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

import { clearFailure, recordFailure } from "./failsafe.js";
import { getWorkspaceInfo, resolveLocalBin } from "./workspace-utils.js";

const phase = process.argv[2];
const cliArgs = process.argv.slice(3);

// Maven-style src/test layout, this repo's own existing convention:
// src/test/js/{unit,integration,e2e}. Each tier has its own jest config so a
// tier can set its own timeouts/workers (e2e needs maxWorkers: 1 against the
// shared Selenium grid).
//
// `deferred` marks the two failsafe tiers. Their failures are recorded and
// re-raised by post-integration-test / post-e2e-test instead of aborting
// here, so the cleanup step always gets to run. The unit tier is surefire:
// it fails immediately, like `mvn test`.
const phaseConfig = {
    unit: {
        directory: path.join("src", "test", "js", "unit"),
        config: "jest.config.js",
        deferred: false,
    },
    integration: {
        directory: path.join("src", "test", "js", "integration"),
        config: "jest.integration.config.js",
        deferred: true,
    },
    e2e: {
        directory: path.join("src", "test", "js", "e2e"),
        config: "jest.e2e.config.js",
        deferred: true,
    },
};

export function runPhaseTests(requestedPhase, extraArgs = cliArgs) {
    const workspace = getWorkspaceInfo();
    const settings = phaseConfig[requestedPhase];

    if (!settings) {
        console.error(`Unknown test phase: ${requestedPhase}`);
        process.exit(1);
    }

    const phaseDirectory = path.join(workspace.workspace, settings.directory);
    const configPath = path.join(workspace.workspace, settings.config);

    if (settings.deferred) {
        // A marker from an interrupted earlier run must never fail this one.
        clearFailure(requestedPhase, workspace.packageName);
    }

    if (!fs.existsSync(phaseDirectory) || !fs.existsSync(configPath)) {
        console.log(
            `No ${requestedPhase} tests found for ${workspace.packageName}`,
        );
        return;
    }

    console.log(`Running ${requestedPhase} tests for ${workspace.packageName}`);

    try {
        execFileSync(
            resolveLocalBin("jest"),
            [`--config=${settings.config}`, ...extraArgs],
            { cwd: workspace.workspace, stdio: "inherit" },
        );
    } catch (error) {
        if (!settings.deferred) {
            process.exit(typeof error.status === "number" ? error.status : 1);
        }

        recordFailure(requestedPhase, workspace.packageName, {
            status: typeof error.status === "number" ? error.status : 1,
            signal: error.signal ?? null,
        });
        console.error(
            `${workspace.packageName}: ${requestedPhase} tests FAILED - deferred to post-${requestedPhase === "e2e" ? "e2e" : "integration"}-test (Maven failsafe behaviour)`,
        );
    }
}

if (phase) {
    runPhaseTests(phase, cliArgs);
}
