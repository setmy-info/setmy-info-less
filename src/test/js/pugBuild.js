//const pug = require('pug');
const fs = require('fs');
const path = require('path');
const pugTranspile = require('./pugTranspile');

const inputDir = path.join(__dirname, '../pug');
//const outputDir = path.join(__dirname, '../../../dist');

/*
const pageNames = [
    "body",
    "app",
    "application",
    "layoutCenterBox",
    "layoutCenterBox2",
    "centerText"
];
*/

function main() {
    const dir = inputDir;
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isFile() && file.endsWith('.pug')) {
            const relPath = path.relative(inputDir, filePath);
            //const pageName = path.basename(filePath);
            const pageName = path.basename(filePath, path.extname(filePath));
            pugTranspile.transpileHtml(pageName, {title: pageName + ".html"});
        }
    });
    /*
    for (let i = 0; i < pageNames.length; i++) {
        let pageName = pageNames[i];
        pugTranspile.transpileHtml(pageName, {title: pageName + ".html"});
    }
    */
}

main();
