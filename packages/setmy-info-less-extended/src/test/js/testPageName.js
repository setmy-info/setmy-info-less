const path = require('path');

module.exports = function getTestPageName() {
    const caller = new Error().stack
        .split('\n')[2]
        .match(/\(([^)]+)\)/)?.[1] || '';
    const fileName = path.basename(caller);
    const pageName = fileName.split('.')[0];
    return pageName;
};
