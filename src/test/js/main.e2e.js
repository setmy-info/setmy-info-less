const { test, expect } = require('@playwright/test');
const path = require('path');

test('should load the page and check title', async ({ page }) => {
    const filePath = 'file://' + path.resolve(__dirname, '../../../dist/index.html');
    await page.goto(filePath);

    const title = await page.title();
    expect(title).toBe('LESS TEST');
});

test('should check if <h1> has correct text', async ({ page }) => {
    const filePath = 'file://' + path.resolve(__dirname, '../../../dist/index.html');
    await page.goto(filePath);

    const headingText = await page.textContent('h1');
    expect(headingText).toBe('LESS TEST');
});