const { createStylelintConfig } = require("../../stylelint.base.cjs");

module.exports = createStylelintConfig({
    ignoreFiles: ["**/node_modules/**", "**/dist/**"],
});
