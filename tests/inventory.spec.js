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

test.describe("TC_01 | Menu Functionality / Product Catalog", () => {
    /** @type {LoginPage} */
    let loginPage;

    /** @type {InventoryPage} */
    let inventoryPage;

    test.beforeEach(async ({ page }) => {
        await page.goto("/");

        loginPage = new LoginPage(page);
        inventoryPage = await loginPage.submitFormLogin(
            UserData.standard_user.username,
            UserData.standard_user.password,
        );
    });

    test("TC_02.001 | Hamburger Menu Open and Close", async () => {
        await expect(inventoryPage.title).toHaveText(InventoryPageData.TITLE);
        await expect(inventoryPage.mainContent).toBeVisible();

        await inventoryPage.header.openBurgerMenu();
        await expect(inventoryPage.header.sidebarMenu).toHaveAttribute(
            "aria-hidden",
            "false",
        );
        await expect(inventoryPage.header.sidebarlinks).toHaveText(
            InventoryPageData.MENU_ITEMS,
        );
        await expect(inventoryPage.mainContent).toBeVisible();

        await inventoryPage.header.closeBurgerMenu();
        await expect(inventoryPage.header.sidebarMenu).toHaveAttribute(
            "aria-hidden",
            "true",
        );
    });
});
