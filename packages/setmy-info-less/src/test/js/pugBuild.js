const fs = require('fs');
const path = require('path');
const pugTranspile = require('./pugTranspile');

const inputDir = path.join(__dirname, '../pug');
const partialsDir = path.join(inputDir, 'partials');

function getPartials() {
    return fs.readdirSync(partialsDir)
        .filter(file => file.endsWith('.pug'))
        .map(file => path.basename(file, '.pug'));
}

function main() {
    const dir = inputDir;
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isFile() && file.endsWith('.pug')) {
            const pageName = path.basename(filePath, path.extname(filePath));
            if (pageName === "main") {
                const partials = getPartials();
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
