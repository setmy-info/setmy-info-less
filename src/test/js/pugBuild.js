const pug = require('pug');
const fs = require('fs');
const path = require('path');
const pugHelper = require('./pugHelper');

const pageNames = [
    "body",
    "app",
    "application",
    "layoutCenterBox",
    "layoutCenterBox2",
    "centerText"
];

function main() {
    for (let i = 0; i < pageNames.length; i++) {
        let pageName = pageNames[i];
        pugHelper.compilePug(pageName, {title: pageName + ".html"});
    }
}

main();
