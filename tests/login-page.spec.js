const {test, expect} = require ('@playwright/test');
const { validUsername, validPassword } = require('./constants');

const invalidUsername = "user123";
const invalidPassword = "12345";

async function submitLoginAndExpectError(page) {
    await page.click(`input[data-test="login-button"]`);
    await expect(page.locator('h3[data-test="error"]')).toBeVisible();
}

test.describe('Login Page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test ('Verify the page title', async({page}) => {
        await expect(page).toHaveTitle("Swag Labs");
    });

    test ('Verify the login with valid data', async({page}) => {
        await page.getByPlaceholder("Username").fill(validUsername);
        await page.getByPlaceholder("Password").fill(validPassword);
        await page.click(`input[data-test="login-button"]`);
        await expect(page.url()).toContain('/inventory.html');
    });

    test ('Verify the login with invalid username', async({page}) => {
        await page.getByPlaceholder("Username").fill(invalidUsername);
        await page.getByPlaceholder("Password").fill(validPassword);
        await submitLoginAndExpectError(page);
    });

    test  ('Verify the login with invalid password', async({page}) => {
        await page.getByPlaceholder("Username").fill(validUsername);
        await page.getByPlaceholder("Password").fill(invalidPassword);
        await submitLoginAndExpectError(page);
    });

    test.only ('Verify the login with invalid usernane and password', async({page}) => {
        await page.getByPlaceholder("Username").fill(invalidUsername);
        await page.getByPlaceholder("Password").fill(invalidPassword);
        await submitLoginAndExpectError(page);
    });
});


