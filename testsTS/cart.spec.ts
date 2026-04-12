import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObject/loginPage';
import { UserData } from './testData/userData';
import { InventoryPage } from './pageObject/inventoryPage';
import { CartPage } from './pageObject/cartPage';
import { CartPageData } from './testData/cartPageData';

test.describe("TC_05 | Shopping Cart", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        await page.goto("/");

        loginPage = new LoginPage(page);
        inventoryPage = await loginPage.loginSuccess(
            UserData.standard_user.username,
            UserData.standard_user.password,
        );
    });

    test("TC_05.003.01 | Shopping Cart > Cart Page > Shopping Cart Page Access > URL Validation", async () => {
        await inventoryPage.clickAddToCart();
        cartPage = await inventoryPage.header.openCart();

        await expect(cartPage.page).toHaveURL(CartPageData.URL);
    });

    test("TC_05.003.02 | Shopping Cart > Cart Page > Shopping Cart Page Access > Title Validation", async () => {
        await inventoryPage.clickAddToCart();
        cartPage = await inventoryPage.header.openCart();

        await expect(cartPage.title).toBeVisible();
        await expect(cartPage.title).toHaveText(CartPageData.TITLE);
    });

    test("TC_05.003.03 | Shopping Cart > Cart Page > Shopping Cart Page Access > Headers Validation", async () => {
        await inventoryPage.clickAddToCart();
        cartPage = await inventoryPage.header.openCart();

        await expect(cartPage.qtyHeader).toBeVisible();
        await expect(cartPage.qtyHeader).toHaveText(CartPageData.QTY_HEADER);

        await expect(cartPage.descriptionHeader).toBeVisible();
        await expect(cartPage.descriptionHeader).toHaveText(CartPageData.DESCRIPTION_HEADER);
    });

    test("TC_05.003.04 | Shopping Cart > Cart Page > Shopping Cart Page Access > Buttons Validation", async () => {
        await inventoryPage.clickAddToCart();
        cartPage = await inventoryPage.header.openCart();

        await expect(cartPage.continueShoppingButton).toBeVisible();
        await expect(cartPage.continueShoppingButton).toHaveText(CartPageData.CONTINUE_SHOPPING_BUTTON);

        await expect(cartPage.checkoutButton).toBeVisible();
        await expect(cartPage.checkoutButton).toHaveText(CartPageData.CHECKOUT_BUTTON);
    });
});