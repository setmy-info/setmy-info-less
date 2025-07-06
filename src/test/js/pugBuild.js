const fs = require('fs');
const path = require('path');
const pugTranspile = require('./pugTranspile');

const inputDir = path.join(__dirname, '../pug');
const partials = ["abc"];

function main() {
    const dir = inputDir;
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isFile() && file.endsWith('.pug')) {
            const pageName = path.basename(filePath, path.extname(filePath));
            if (pageName === "main") {
                for (const partial of partials) {
                    pugTranspile.transpileHtml(pageName, {
                        title: partial + '.html',
                        page: partial
                    });
                }
            } else {
                pugTranspile.transpileHtml(pageName, {title: pageName + ".html"});
            }
        }
    });
}

main();
