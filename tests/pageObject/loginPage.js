import { InventoryPage } from './inventoryPage';

class LoginPage {
    /**
	 * @param {import('playwright').Page} page 
	 */

    constructor(page) {
        this.page = page;

        this.usernameField = page.getByTestId('username');
        this.passwordField = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
        this.errorMessage = page.getByTestId('error');
        this.errorCloseButton = page.getByTestId('error-button');
    }

    async fillUsername(username) {
        await this.usernameField.fill(username);
    }

    async fillPassword(password) {
        await this.passwordField.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    /**
     * Отправляет форму логина с указанными или пропущенными данными.
     * Позволяет тестировать различные сценарии: полный логин, только логин,
     * только пароль или пустую форму.
     * 
     * @async
     * @param {string} [username=''] - Логин пользователя. Если передана пустая строка,
     *                                 поле логина останется незаполненным.
     * @param {string} [password=''] - Пароль пользователя. Если передана пустая строка,
     *                                 поле пароля останется незаполненным.
     * 
     * @returns {Promise<LoginPage|InventoryPage>} Возвращает:
     * - {LoginPage} - если вход не удался (появляется сообщение об ошибке)
     * - {InventoryPage} - если вход выполнен успешно
     * 
     * @example
     * // Полный логин
     * await loginPage.submitFormLogin('standard_user', 'secret_sauce');
     * 
     * @example
     * // Только логин (без пароля)
     * await loginPage.submitFormLogin('standard_user');
     * 
     * @example  
     * // Только пароль (без логина)
     * await loginPage.submitFormLogin('', 'secret_sauce');
     * 
     * @example
     * // Пустая форма
     * await loginPage.submitFormLogin();
     * 
     * @throws {Error} Если произошла ошибка при заполнении полей или отправке формы
     */
    async submitFormLogin(username = '', password = '') {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();

        const hasError = await this.errorMessage.isVisible();
        return hasError ? this : new InventoryPage(this.page);
    }
}

export {LoginPage};