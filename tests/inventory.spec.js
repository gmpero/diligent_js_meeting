import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObject/loginPage';
import { UserData } from './testData/userData';
import { InventoryPageData } from './testData/inventoryPageData';
import { InventoryAssertions } from './assertions/inventoryAssertions'

test.describe("TC_03 | Product Catalog > Display and Content", () => {
    let loginPage;
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        loginPage = new LoginPage(page);
    });

    test("TC_03.001.01 | Page title is displayed correctly", async ({page}) => {
        const inventoryPage = await loginPage.submitFormLogin(UserData.standard_user.username, UserData.standard_user.password);
        await expect(inventoryPage.title).toHaveText(InventoryPageData.TITLE);
    });

    test("TC_03.001.02 | Correct number of products is displayed", async ({page}) => {
        const inventoryPage = await loginPage.submitFormLogin(UserData.standard_user.username, UserData.standard_user.password);
        await expect(inventoryPage.productCards).toHaveCount(InventoryPageData.PRODUCTS_COUNT);
    });

    test("TC_03.001.03 | All product card elements are visible", async ({page}) => {
        const inventoryPage = await loginPage.submitFormLogin(UserData.standard_user.username, UserData.standard_user.password);
        await InventoryAssertions.validateAllProductCards(inventoryPage);
    });

    test("TC_03.001.04 | Product Catalog Validate Data", async ({page}) => {
        const inventoryPage = await loginPage.submitFormLogin(UserData.standard_user.username, UserData.standard_user.password);
        await InventoryAssertions.validateProductCardsData(inventoryPage);
    });
});