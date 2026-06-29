/*
Build-output smoke test (suggestion B2).

Runs after `npm run build --workspaces` and verifies that every package produced a
`dist/main.css`. Packages expected to carry rules must contain at least one rule; packages
that are intentional standalone/delta skeletons are allowed to compile to zero rules.

Usage: node packages/common/test/js/distSmoke.js   (run from the repository root)
Exit code 0 = all good, 1 = at least one failure.
*/

const fs = require('fs');
const path = require('path');

// Expectation per package:
//   'content'  -> dist/main.css must exist AND contain at least one rule
//   'skeleton' -> dist/main.css must exist; zero rules is allowed (placeholder for future LESS)
const EXPECTATIONS = {
    'setmy-info-less': 'content',
    'setmy-info-less-extended': 'skeleton',
    'setmy-info-less-fancy': 'skeleton',
    'setmy-info-less-enterprise': 'content',
    'setmy-info-less-ide': 'content',
    'setmy-info-less-experimental': 'content'
};

// Count CSS rule blocks. Strips comments first so commented-out braces don't count.
function countRules(css) {
    const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
    const matches = withoutComments.match(/\{/g);
    return matches ? matches.length : 0;
}

// __dirname is packages/common/test/js — go up to packages/
const packagesDir = path.resolve(__dirname, '..', '..', '..');
const errors = [];
const lines = [];

for (const [pkg, expectation] of Object.entries(EXPECTATIONS)) {
    const cssPath = path.join(packagesDir, pkg, 'dist', 'main.css');
    if (!fs.existsSync(cssPath)) {
        errors.push(`${pkg}: dist/main.css is missing — run "npm run build --workspaces" first`);
        lines.push(`  MISSING  ${pkg}`);
        continue;
    }
    const rules = countRules(fs.readFileSync(cssPath, 'utf8'));
    if (expectation === 'content' && rules === 0) {
        errors.push(`${pkg}: expected CSS rules but dist/main.css has none`);
        lines.push(`  EMPTY!   ${pkg} (expected content, 0 rules)`);
    } else if (expectation === 'skeleton' && rules === 0) {
        lines.push(`  skeleton ${pkg} (0 rules — intentional)`);
    } else if (expectation === 'skeleton') {
        lines.push(`  ok       ${pkg} (${rules} rules — skeleton now carries content)`);
    } else {
        lines.push(`  ok       ${pkg} (${rules} rules)`);
    }
}

console.log('dist/main.css smoke test:');
console.log(lines.join('\n'));

if (errors.length > 0) {
    console.error('\nFAILED:');
    for (const e of errors) {
        console.error('  - ' + e);
    }
    process.exit(1);
}

console.log('\nAll packages OK.');
