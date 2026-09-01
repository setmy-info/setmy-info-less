import test from "node:test";
import assert from "node:assert/strict";

import { FORMATTERS } from "../../format.js";

test("FORMATTERS runs prettier on LESS before the rest", () => {
    assert.deepEqual(
        FORMATTERS.map((spec) => spec.name),
        ["less", "prettier"],
    );
});

test("each formatter has write and check commands", () => {
    for (const spec of FORMATTERS) {
        assert.ok(Array.isArray(spec.write) && spec.write.length > 0);
        assert.ok(Array.isArray(spec.check) && spec.check.length > 0);
        assert.equal(spec.write[0], spec.check[0]);
        assert.equal(spec.write[0], "prettier");
    }
});

test("less write is the check command with --write instead of --check", () => {
    const less = FORMATTERS.find((spec) => spec.name === "less");
    assert.ok(less);
    assert.equal(less.write[1], "--write");
    assert.equal(less.check[1], "--check");
    assert.deepEqual(less.write.slice(2), less.check.slice(2));
});
