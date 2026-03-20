import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObject/loginPage';
import { UserData } from './testData/userData';
import { LoginPageData } from './testData/loginPageData';
import { InventoryPageData } from './testData/inventoryPageData';

test.describe("US_01 | Authorization under different users", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });
    
});