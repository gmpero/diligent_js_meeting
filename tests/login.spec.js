import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObject/loginPage';
import { UserData } from './testData/userData';
import { LoginPageData } from './testData/loginPageData';
import { InventoryPageData } from './testData/inventoryPageData';

test.describe("TC_01 | Authorization under different users", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });
    
    /* TC_01.001 | Login Functionality > Positive Login Scenarios > Successful Login Standard User */
    test("TC_01.001.01 | Login page elements are displayed correctly", async ({ page }) => {    
        const loginPage = new LoginPage(page);
        
        await expect(loginPage.usernameField).toBeVisible();
        await expect(loginPage.passwordField).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();

        await expect(loginPage.usernameField).toHaveAttribute('placeholder', 'Username');
        await expect(loginPage.passwordField).toHaveAttribute('placeholder', 'Password')
    });

    test("TC_01.001.02 | Login form accepts input correctly", async ({ page }) => {    
        const loginPage = new LoginPage(page);
        await loginPage.fillUsername(UserData.standard_user.username);
        await loginPage.fillPassword(UserData.standard_user.password);

        await expect(loginPage.usernameField).toHaveValue(UserData.standard_user.username);
        await expect(loginPage.passwordField).toHaveValue(UserData.standard_user.password);
    });

    test("TC_01.001.03 | Password field masks entered text", async ({ page }) => {    
        const loginPage = new LoginPage(page);
        await loginPage.fillPassword(UserData.standard_user.password);

        await expect(loginPage.passwordField).toHaveAttribute('type', 'password');
    });

    test("TC_01.001.04 | Authorization under a standard user", async ({ page }) => {    
        const loginPage = new LoginPage(page);
        await loginPage.submitFormLogin(UserData.standard_user.username, UserData.standard_user.password);
       
        await expect(page).toHaveURL(InventoryPageData.URL);
    });

    test("TC_01.001.05 | Product inventory is displayed after successful login", async ({ page }) => {    
        const loginPage = new LoginPage(page);
        const inventoryPage = await loginPage.submitFormLogin(UserData.standard_user.username, UserData.standard_user.password);
        const allCards = await inventoryPage.productCards.all();

        await expect(inventoryPage.productCards).toHaveCount(InventoryPageData.PRODUCTS_COUNT);
        for(const card of allCards) {
            await expect(card).toBeVisible();
        }
        
    });

    test("TC_01.001.06 | No error message appears after successful login", async ({ page }) => {    
        const loginPage = new LoginPage(page);
        await loginPage.submitFormLogin(UserData.standard_user.username, UserData.standard_user.password);
       
        await expect(loginPage.errorMessage).not.toBeVisible();
    });
    /*END TC_01.001*/


    test("TC_01.002 | Invalid Username Login Attempt", async ({ page }) => {    
        const loginPage = new LoginPage(page);
        await loginPage.submitFormLogin(UserData.invalid_user.username, UserData.standard_user.password);
       
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText(LoginPageData.errorNotifications.invalidCredentials);
        await expect(loginPage.errorCloseButton).toBeVisible();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
});