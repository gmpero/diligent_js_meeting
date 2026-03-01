class LoginPage {
    /**
	 * @param {import('playwright').Page} page 
	 */

    constructor(page) {
        this.page = page;
    }
    
    getLocatorUsernameField = () => this.page.locator('[data-test="username"]');
    getLocatorPasswordField = () => this.page.locator('[data-test="password"]');
    getLocatorLoginButton = () => this.page.locator('[data-test="login-button"]');

    getLocatorH3ErrorMessage = () => this.page.locator('[data-test="error"]');

    async fillUsername(username) {
        await this.getLocatorUsernameField().fill(username);
    }

    async fillPassword(password) {
        await this.getLocatorPasswordField().fill(password);
    }

    async clickLoginButton() {
        await this.getLocatorLoginButton().click();
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
     * @returns {Promise<void>}
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
        if(username !== '') {
            await this.fillUsername(username);
        }
        
        if(password !== '') {
            await this.fillPassword(password);
        }
        
        await this.clickLoginButton();
    }
}

export {LoginPage};