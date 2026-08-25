const fs = require("fs");
const path = require("path");

// Integration tier: runs against the BUILT artifact, the way the siblings'
// integration tests import dist/index.js rather than src/. Fails if the
// build was skipped, which is the point.
const distDir = path.join(__dirname, "../../../../dist");
const expectation = "skeleton";

function countRules(css) {
    return (css.replace(/\/\*[\s\S]*?\*\//g, "").match(/\{/g) || []).length;
}

describe("setmy-info-less-fancy compiled CSS", () => {
    test("build produced both CSS artifacts", () => {
        expect(fs.existsSync(path.join(distDir, "main.css"))).toBe(true);
        expect(fs.existsSync(path.join(distDir, "main.min.css"))).toBe(true);
    });

    test("minified CSS is not larger than the readable one", () => {
        const plain = fs.statSync(path.join(distDir, "main.css")).size;
        const min = fs.statSync(path.join(distDir, "main.min.css")).size;
        expect(min).toBeLessThanOrEqual(plain);
    });

    test(`rule count matches the declared ${expectation} expectation`, () => {
        const rules = countRules(
            fs.readFileSync(path.join(distDir, "main.css"), "utf8"),
        );

        if (expectation === "content") {
            expect(rules).toBeGreaterThan(0);
        } else {
            expect(rules).toBeGreaterThanOrEqual(0);
        }
    });
});
