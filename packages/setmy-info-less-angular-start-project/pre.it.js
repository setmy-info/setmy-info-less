import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Starts the static server that serves this package's dist/ (the Pug demo
// pages plus the compiled CSS) for the integration/e2e tiers - the Node
// equivalent of `mvn jetty:run` before failsafe. Its own port, one above the
// manual `npm run server` port, so a manually started server never collides
// with an automated run.
const workspaceDir = path.dirname(fileURLToPath(import.meta.url));
const serverTool = path.join(
    workspaceDir,
    "..",
    "..",
    "tools",
    "http-server.js",
);

execFileSync(
    process.execPath,
    [serverTool, "start", "--port", "44132", "--directory", "dist"],
    { cwd: workspaceDir, stdio: "inherit" },
);
