import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObject/loginPage';
import { UserData } from './testData/userData';
import { LoginPageData } from './testData/loginPageData';

test.describe("US_01 | Authorization under different users", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test("TC_01.01 | Authorization under a standard user", async ({ page }) => {    
        const loginPage = new LoginPage(page);
        await loginPage.submitFormLogin(UserData.standard_user.username, UserData.standard_user.password);
       
        await expect(page).toHaveURL('/inventory.html');
    });
});

