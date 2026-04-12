import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObject/loginPage';
import { UserData } from './testData/userData';
import { InventoryPageData } from './testData/inventoryPageData';
import { InventoryAssertions } from './assertions/inventoryAssertions'
import { InventoryPage } from './pageObject/inventoryPage';
import { HeaderData } from './testData/headerData';

test.describe("TC_03 | Menu Functionality / Product Catalog", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        await page.goto("/");

        loginPage = new LoginPage(page);
        inventoryPage = await loginPage.loginSuccess(
            UserData.standard_user.username,
            UserData.standard_user.password,
        );
    });

    test("TC_03.001.01 | Page title is displayed correctly", async () => {
        await expect(inventoryPage.title).toHaveText(InventoryPageData.TITLE);
    });

    test("TC_03.001.02 | Correct number of products is displayed", async () => {
        await expect(inventoryPage.productCards).toHaveCount(InventoryPageData.PRODUCTS_COUNT);
    });

    test("TC_03.001.03 | All product card elements are visible", async () => {
        await InventoryAssertions.validateAllProductCards(inventoryPage);
    });

    test("TC_03.001.04 | Product Catalog Validate Data", async () => {
        await InventoryAssertions.validateProductCardsData(inventoryPage, InventoryPageData.PRODUCTS);
    });

    test("TC_02.001 | Hamburger Menu Open and Close", async () => {
        await expect(inventoryPage.title).toHaveText(InventoryPageData.TITLE);
        await expect(inventoryPage.mainContent).toBeVisible();

        await inventoryPage.header.openBurgerMenu();
        await expect(inventoryPage.header.sidebarMenu).toHaveAttribute(
            "aria-hidden",
            "false",
        );
        await expect(inventoryPage.header.sidebarLinks).toHaveText(
            HeaderData.getMenuNames(),
        );
        await expect(inventoryPage.mainContent).toBeVisible();

        await inventoryPage.header.closeBurgerMenu();
        await expect(inventoryPage.header.sidebarMenu).toHaveAttribute(
            "aria-hidden",
            "true",
        );
    });

    test("TC_02.002 | About External Link Navigation", async ({page, context}) => {
        await inventoryPage.header.openBurgerMenu();
        
        const [aboutPage] = await Promise.all([
            context.waitForEvent('page'),
            inventoryPage.header.openInNewTab(HeaderData.MENU.ABOUT.name),
        ]);

        await expect(aboutPage).toHaveURL(HeaderData.MENU.ABOUT.url);
        await expect(page).toHaveURL(InventoryPageData.URL);
    });

    test("TC_03.002 | Sort Products by Price Low to High", async () => {
        await inventoryPage.selectSortDropdown(InventoryPageData.SELECT_SORT.lohi);
        await InventoryAssertions.validateProductCardsData(inventoryPage, InventoryPageData.getSortProduct(InventoryPageData.PRODUCTS, InventoryPageData.SELECT_SORT.lohi));
        await InventoryAssertions.validateAllProductCards(inventoryPage);
    });
});
