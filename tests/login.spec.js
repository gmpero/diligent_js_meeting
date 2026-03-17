import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObject/loginPage';
import { UserData } from './testData/userData';
import { LoginPageData } from './testData/loginPageData';

test.describe("US_01 | Authorization under different users", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });
    
    test("TC_01.01 | Login page elements are displayed correctly", async ({ page }) => {    
        const loginPage = new LoginPage(page);
        
        await expect(loginPage.usernameField).toBeVisible();
        await expect(loginPage.passwordField).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();

        await expect(loginPage.usernameField).toHaveAttribute('placeholder', 'Username');
        await expect(loginPage.passwordField).toHaveAttribute('placeholder', 'Password')
    });

    test("TC_01.02 | Login form accepts input correctly", async ({ page }) => {    
        const loginPage = new LoginPage(page);
        await loginPage.fillUsername(UserData.standard_user.username);
        await loginPage.fillPassword(UserData.standard_user.password);

        await expect(loginPage.usernameField).toHaveValue(UserData.standard_user.username);
        await expect(loginPage.passwordField).toHaveValue(UserData.standard_user.password);
    });

    test("TC_01.03 | Password field masks entered text", async ({ page }) => {    
        const loginPage = new LoginPage(page);
        await loginPage.fillPassword(UserData.standard_user.password);

        await expect(loginPage.passwordField).toHaveAttribute('type', 'password');
    });

    test("TC_01.04 | Authorization under a standard user", async ({ page }) => {    
        const loginPage = new LoginPage(page);
        await loginPage.submitFormLogin(UserData.standard_user.username, UserData.standard_user.password);
       
        await expect(page).toHaveURL('/inventory.html');
    });
});


test.describe("US_02 | Login Functionality > Negative Login Scenarios", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test("TC_02.001 | Invalid Username Login Attempt", async ({ page }) => {    
        const loginPage = new LoginPage(page);
        await loginPage.submitFormLogin(UserData.invalid_user.username, UserData.standard_user.password);
       
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText(LoginPageData.errorNotifications.invalidCredentials);
        await expect(loginPage.errorCloseButton).toBeVisible();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
});