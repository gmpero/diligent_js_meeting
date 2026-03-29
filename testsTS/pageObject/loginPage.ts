import { Page, Locator } from '@playwright/test';
import { InventoryPage } from './inventoryPage';

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

    /**
     * Submits the login form with specified or omitted credentials.
     * Allows testing various scenarios: full login, only username, 
     * only password, or empty form.
     * 
     * @param username - User's username. If empty string is passed, 
     *                   the username field will be left blank.
     * @param password - User's password. If empty string is passed, 
     *                   the password field will be left blank.
     * 
     * @returns {Promise<LoginPage | InventoryPage>} Returns:
     * - {LoginPage} - if login fails (error message appears)
     * - {InventoryPage} - if login is successful
     * 
     * @example
     * // Full login
     * await loginPage.submitFormLogin('standard_user', 'secret_sauce');
     * 
     * @example
     * // Username only (no password)
     * await loginPage.submitFormLogin('standard_user');
     * 
     * @example  
     * // Password only (no username)
     * await loginPage.submitFormLogin('', 'secret_sauce');
     * 
     * @example
     * // Empty form
     * await loginPage.submitFormLogin();
     * 
     * @throws {Error} If an error occurs while filling fields or submitting the form
     */
    async submitFormLogin(username: string = '', password: string = '') {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();

        const hasError: boolean = await this.errorMessage.isVisible();
        return hasError ? this : new InventoryPage(this.page);
    }
}

export { LoginPage };