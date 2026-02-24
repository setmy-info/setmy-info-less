const {Given} = require('@cucumber/cucumber');
const pageHelper = require('../pageHelper');

Given('page name is {string}', function (name) {
    pageHelper.pageName(name);
    pageHelper.getPath();
});
