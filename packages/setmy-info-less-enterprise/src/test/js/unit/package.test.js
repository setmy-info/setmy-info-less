const fs = require("fs");
const path = require("path");

// Unit tier: assertions about the package's own source/manifest, no build
// output involved (that is the integration tier's job).
const pkg = require("../../../../package.json");

describe("setmy-info-less-enterprise package manifest", () => {
    test("declares the CSS entry points it ships", () => {
        expect(pkg.main).toBe("dist/main.min.css");
        expect(pkg.style).toBe("dist/main.css");
        expect(pkg.files).toContain("dist/main.css");
    });

    test("has a LESS entry point on disk", () => {
        const entry = path.join(__dirname, "../../../main/less/main.less");
        expect(fs.existsSync(entry)).toBe(true);
    });
});
