import { test, expect } from "@playwright/test";
import { LoginPage } from "./pageObject/loginPage";
import { UserData } from "./testData/userData";
import { InventoryPageData } from "./testData/inventoryPageData";
import { InventoryPage } from "./pageObject/inventoryPage";

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
