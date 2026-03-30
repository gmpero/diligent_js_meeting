import { Page, Locator } from '@playwright/test';
import { InventoryPage } from './inventoryPage';
import { InventoryPageData } from '../testData/inventoryPageData';

class LoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly errorCloseButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.usernameField = page.getByTestId('username');
        this.passwordField = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
        this.errorMessage = page.getByTestId('error');
        this.errorCloseButton = page.getByTestId('error-button');
    }

    async fillUsername(username: string) {
        await this.usernameField.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async closeErrorMessage() {
        await this.errorCloseButton.click();
    }

    async loginSuccess(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();

        await this.page.waitForURL(InventoryPageData.URL, {timeout: 5000});

        return new InventoryPage(this.page);
    }

    async loginFail(username: string = '', password: string = '') {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();

        await this.errorMessage.waitFor({state: 'visible', timeout: 5000});
    }
}

export { LoginPage };