const {test, expect} = require ('@playwright/test');
const { validUsername, validPassword } = require('./constants');



test.describe('Testing of cart page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.getByPlaceholder("Username").fill(validUsername);
        await page.getByPlaceholder("Password").fill(validPassword);
        await page.click(`input[data-test="login-button"]`);
    });

    test ('Counter increase: Adding product to the cart', async({page}) => {
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        const badge = await page.waitForSelector('[data-test="shopping-cart-badge"]');
        const badgeText = await badge.innerText();
        expect(badgeText).toBe('1');
    });
       
    test ('Counter decrease: Removing product from the cart', async({page}) => {
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('[data-test="remove-sauce-labs-backpack"]');
        const badge = await page.$('[data-test="shopping-cart-badge"]');
        expect(badge).toBeNull();
    });

    test ('Verify that product is added to the cart', async({page}) => {
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click(`a[data-test="shopping-cart-link"]`);
        //check the number of the product in the list
        const itemNubmerElement = page.locator('[data-test="item-quantity"]');
        await expect(itemNubmerElement).toHaveText('1'); 
        // check the name of the product
        const itemNameElement = page.locator('[data-test="inventory-item-name"]');
        await expect(itemNameElement).toHaveText('Sauce Labs Backpack'); 
        // check that name is a hyperlink
        const anchorElement = itemNameElement.locator('xpath=..'); 
        await expect(anchorElement).toBeVisible(); 
        await expect(anchorElement).toHaveAttribute('href'); 
        // check the description of the product
        const itemDescriptionElement = page.locator('[data-test="inventory-item-desc"]');
        await expect(itemDescriptionElement).toHaveText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'); 
        // check the price of the product
        const itemPriceElement = page.locator('[data-test="inventory-item-price"]');
        await expect(itemPriceElement).toHaveText('$29.99'); 
    });
});


