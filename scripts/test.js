#!/usr/bin/env node
// One test tier at a time. Package tests run with jest (Selenium e2e needs a
// real browser runner; CSS integration asserts against built dist/main.css).
// Tooling tests under scripts/test/ run with Node's own test runner, the
// same runner the JS sibling uses for its packages:
//
//     npm test                    unit
//     npm run integration-test    integration
//     npm run e2e-test            e2e
//     npm run coverage            unit tier under coverage (reports/coverage/)
//
// Coverage is the unit tier only: the e2e tier needs an external Selenium
// Grid, so folding it in would make "coverage" fail for reasons that have
// nothing to do with coverage. Every jest run also writes JUnit XML to
// reports/junit/<tier>.xml - what Jenkins' junit step reads.
//
// This runner only runs tests. What the integration and e2e tiers need around
// them (static servers for the Pug fixtures) is the lifecycle's job:
//
//     npm run pre-e2e-test
//     npm run e2e-test
//     npm run post-e2e-test       # idempotent - run it after a failed tier too
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

import { resolveLocalBin, rootDir } from "./workspace-utils.js";

const TIERS = ["unit", "integration", "e2e"];
const tier = process.argv[2];

if (!tier || (tier !== "coverage" && !TIERS.includes(tier))) {
    console.error("Usage: node scripts/test.js unit|integration|e2e|coverage");
    process.exit(1);
}

const jestBin = resolveLocalBin("jest");
const reportsDir = path.join(rootDir, "reports");
fs.mkdirSync(path.join(reportsDir, "junit"), { recursive: true });

function run(command, args, extraEnv = {}) {
    const result = spawnSync(command, args, {
        cwd: rootDir,
        stdio: "inherit",
        env: { ...process.env, ...extraEnv },
        shell: process.platform === "win32",
    });
    return result.status ?? 1;
}

function jestArgs(name, { coverage = false } = {}) {
    const match =
        name === "e2e"
            ? "**/src/test/js/e2e/**/*.e2e.js"
            : `**/src/test/js/${name}/**/*.test.js`;
    const args = [
        `--testMatch=${match}`,
        "--reporters=default",
        "--reporters=jest-junit",
    ];
    if (name === "e2e") {
        args.push("--testTimeout=60000", "--maxWorkers=1");
    }
    if (coverage) {
        fs.mkdirSync(path.join(reportsDir, "coverage"), { recursive: true });
        args.push(
            "--coverage",
            `--coverageDirectory=${path.join(reportsDir, "coverage")}`,
            "--coverageReporters=text",
            "--coverageReporters=lcov",
        );
    }
    return args;
}

function junitEnv(name) {
    return {
        JEST_JUNIT_OUTPUT_DIR: path.join(reportsDir, "junit"),
        JEST_JUNIT_OUTPUT_NAME: `${name}.xml`,
        JEST_JUNIT_ADD_FILE_ATTRIBUTE: "true",
    };
}

let status = 0;

if (tier === "unit" || tier === "coverage") {
    const toolPattern = path.join("scripts", "test", "unit", "**", "*.test.js");
    if (
        fs.existsSync(path.join(rootDir, "scripts", "test", "unit")) &&
        fs.readdirSync(path.join(rootDir, "scripts", "test", "unit")).length > 0
    ) {
        status = run(process.execPath, ["--test", toolPattern]);
        if (status !== 0) {
            process.exit(status);
        }
    }
}

const names = tier === "coverage" ? ["unit"] : [tier];
for (const name of names) {
    status = run(
        jestBin,
        jestArgs(name, { coverage: tier === "coverage" }),
        junitEnv(tier === "coverage" ? "coverage" : name),
    );
    if (status !== 0) {
        process.exit(status);
    }
}

process.exit(0);
