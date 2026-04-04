import { Page, Locator } from '@playwright/test';

class Header {
    readonly page: Page;
    readonly openMenuButton: Locator;
    readonly closeMenuButton: Locator;
    readonly sidebarMenu: Locator;
    readonly sidebarLinks: Locator;

    constructor(page: Page) {
        this.page = page;
        this.openMenuButton = page.getByRole("button", { name: "Open Menu" });
        this.closeMenuButton = page.getByRole("button", { name: "Close Menu" });
        this.sidebarMenu = page.locator(".bm-menu-wrap");
        this.sidebarLinks = page.locator(".bm-menu-wrap nav a");
    }

    async openBurgerMenu() {
        await this.openMenuButton.click();
    }

    async closeBurgerMenu() {
        await this.closeMenuButton.click();
    }

    async openInNewTab(menuText: string) {
        const menuItem = this.sidebarLinks.filter({hasText: menuText});
        await menuItem.waitFor({ state: 'visible' });
        await menuItem.click({ button: 'middle' });
    }
}

export { Header };
