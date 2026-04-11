import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObject/loginPage';
import { UserData } from './testData/userData';
import { InventoryPage } from './pageObject/inventoryPage';
import { CartPage } from './pageObject/cartPage';   
import { CartPageData } from './testData/cartPageData';

test.describe("TC_05.003 | Shopping Cart", () => {
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

        test("TC_05.003 | Shopping Cart > Cart Page > Shopping Cart Page Access", async ({page}) => {
        await inventoryPage.clickAddToCartByIndex();
        await inventoryPage.header.openCart();

        cartPage = new CartPage(page);
        await expect(cartPage.page).toHaveURL(CartPageData.URL);

        await expect(cartPage.title).toBeVisible();
        await expect(cartPage.title).toHaveText(CartPageData.TITLE);

        await expect(cartPage.qtyHeader).toBeVisible();
        await expect(cartPage.qtyHeader).toHaveText(CartPageData.QTY_HEADER);

        await expect(cartPage.descriptionHeader).toBeVisible();
        await expect(cartPage.descriptionHeader).toHaveText(CartPageData.DESCRIPTION_HEADER);

        await expect(cartPage.continueShoppingButton).toBeVisible();
        await expect(cartPage.continueShoppingButton).toHaveText(CartPageData.CONTINUE_SHOPPING_BUTTON);
        
        await expect(cartPage.checkoutButton).toBeVisible();
        await expect(cartPage.checkoutButton).toHaveText(CartPageData.CHECKOUT_BUTTON);            
    });
});