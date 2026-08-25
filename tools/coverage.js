#!/usr/bin/env node

import { runPhaseTests } from "./run-tests.js";

// Coverage over the unit tier only - the same scoping decision the Elixir
// sibling had to make: an e2e tier needs a running Selenium grid, so folding
// it in makes "coverage" fail for reasons that have nothing to do with
// coverage.
runPhaseTests("unit", [
    "--coverage",
    "--coverageDirectory=site/coverage",
    "--coverageReporters=text",
    "--coverageReporters=lcov",
]);
