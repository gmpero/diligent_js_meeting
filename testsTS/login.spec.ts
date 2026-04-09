import { test, expect } from "@playwright/test";
import { LoginPage } from "./pageObject/loginPage";
import { UserData } from "./testData/userData";
import { LoginPageData } from "./testData/loginPageData";
import { InventoryPage } from "./pageObject/inventoryPage";
import { InventoryPageData } from "./testData/inventoryPageData";

test.describe("TC_01 | Authorization under different users", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        loginPage = new LoginPage(page);
    });

    test("TC_01.001.01 | Login page elements are displayed correctly", async () => {
        await expect(loginPage.usernameField).toBeVisible();
        await expect(loginPage.passwordField).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();

        await expect(loginPage.usernameField).toHaveAttribute(
            "placeholder",
            "Username",
        );
        await expect(loginPage.passwordField).toHaveAttribute(
            "placeholder",
            "Password",
        );
    });

    test("TC_01.001.02 | Login form accepts input correctly", async () => {
        await loginPage.fillUsername(UserData.standard_user.username);
        await loginPage.fillPassword(UserData.standard_user.password);

        await expect(loginPage.usernameField).toHaveValue(
            UserData.standard_user.username,
        );
        await expect(loginPage.passwordField).toHaveValue(
            UserData.standard_user.password,
        );
    });

    test("TC_01.001.03 | Password field masks entered text", async () => {
        await loginPage.fillPassword(UserData.standard_user.password);

        await expect(loginPage.passwordField).toHaveAttribute(
            "type",
            "password",
        );
    });

    test("TC_01.001.04 | Authorization under a standard user", async ({
        page,
    }) => {
        await loginPage.loginSuccess(
            UserData.standard_user.username,
            UserData.standard_user.password,
        );

        await expect(page).toHaveURL(InventoryPageData.URL);
    });

    test("TC_01.001.05 | Product inventory is displayed after successful login", async () => {
        const inventoryPage = await loginPage.loginSuccess(
            UserData.standard_user.username,
            UserData.standard_user.password,
        );
        const allCards = await inventoryPage.productCards.all();

        await expect(inventoryPage.productCards).toHaveCount(
            InventoryPageData.PRODUCTS_COUNT,
        );
        for (const card of allCards) {
            await expect(card).toBeVisible();
        }
    });

    test("TC_01.001.06 | No error message appears after successful login", async () => {
        await loginPage.loginSuccess(
            UserData.standard_user.username,
            UserData.standard_user.password,
        );

        await expect(loginPage.errorMessage).not.toBeVisible();
    });

    test("TC_01.002 | Invalid Username Login Attempt", async ({ page }) => {
        await loginPage.loginFail(
            UserData.invalid_user.username,
            UserData.standard_user.password,
        );

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText(
            LoginPageData.errorNotifications.invalidCredentials,
        );
        await expect(loginPage.errorCloseButton).toBeVisible();
        await expect(page).toHaveURL("/");
    });
    
    test("TC_01.003 | Locked Out User Access", async ({ page }) => {
        await loginPage.loginFail(
            UserData.locked_out_user.username,
            UserData.standard_user.password,
        );

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText(
            LoginPageData.errorNotifications.lockedUser,
        );
        await expect(loginPage.errorCloseButton).toBeVisible();
        await expect(page).toHaveURL("/");
    });

    test("TC_01.004 | Successful Login Problem User", async ({ page }) => {
        await loginPage.loginSuccess(
            UserData.problem_user.username,
            UserData.problem_user.password,
        );

        await expect(page).toHaveURL(InventoryPageData.URL);
        await expect(loginPage.errorMessage).not.toBeVisible();
    });

    test("TC_01.005 | Empty Username Validation", async ({ page }) => {
        await loginPage.loginFail("", UserData.standard_user.password);

        await expect(loginPage.errorMessage).toHaveText(
            LoginPageData.errorNotifications.missingUsername,
        );
        await expect(loginPage.usernameField).toHaveClass(/error/);
        await expect(loginPage.errorCloseButton).toBeVisible();
        await expect(page).toHaveURL("/");
    });

    test("TC_01.006 | Empty Password Validation", async ({ page }) => {
        await loginPage.loginFail(UserData.standard_user.username, "");

        await expect(loginPage.errorMessage).toHaveText(
            LoginPageData.errorNotifications.missingPassword,
        );
        await expect(loginPage.passwordField).toHaveClass(/error/);
        await expect(loginPage.errorCloseButton).toBeVisible();
        await expect(page).toHaveURL("/");
    });

    test("TC_01.008 | Error Message Dismissal", async () => {
        await loginPage.loginFail(
            UserData.invalid_user.username,
            UserData.invalid_user.password,
        );

        await expect(loginPage.errorMessage).toHaveText(
            LoginPageData.errorNotifications.invalidCredentials,
        );
        await loginPage.closeErrorMessage();
        await expect(loginPage.errorMessage).not.toBeVisible();
        await expect(
            loginPage.usernameField && loginPage.passwordField,
        ).toBeVisible();

        const inventoryPage = await loginPage.loginSuccess(
            UserData.standard_user.username,
            UserData.standard_user.password,
        );
        await expect(inventoryPage.title).toHaveText(InventoryPageData.TITLE);
    });

    test("TC_01.007 | Empty Credentials Validation", async ({ page }) => {
        await expect(loginPage.usernameField).toBeVisible();
        await expect(loginPage.passwordField).toBeVisible();
        await loginPage.clickLoginButton();

        await expect(loginPage.errorMessage).toHaveText(
            LoginPageData.errorNotifications.missingUsername,
        );
        await expect(page).toHaveURL("/");
        const buttonDisabled = loginPage.loginButton.isDisabled();
        expect(buttonDisabled).toBeTruthy();
    });

    test("TC_01.011 | Error User Login", async ({ page }) => {
        loginPage.loginSuccess(
            UserData.error_user.username,
            UserData.error_user.password
        );
        await expect(page).toHaveURL(InventoryPageData.URL);
    });

    test("TC_01.014 | Direct URL Access Protection", async ({ page }) => {
        await page.goto(InventoryPageData.URL);

        await expect(page).toHaveURL("/");
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText(
            LoginPageData.errorNotifications.accessDenied,
        );
    });

});
