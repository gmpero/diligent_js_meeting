import { Page, Locator } from '@playwright/test';

class Header {
    readonly page: Page;
    readonly openMenuButton: Locator;
    readonly closeMenuButton: Locator;
    readonly sidebarMenu: Locator;
    readonly sidebarlinks: Locator;

    constructor(page: Page) {
        this.page = page;
        this.openMenuButton = page.getByRole("button", { name: "Open Menu" });
        this.closeMenuButton = page.getByRole("button", { name: "Close Menu" });
        this.sidebarMenu = page.locator(".bm-menu-wrap");
        this.sidebarlinks = page.locator(".bm-menu-wrap nav a");
    }

    async openBurgerMenu() {
        await this.openMenuButton.click();
    }

    async closeBurgerMenu() {
        await this.closeMenuButton.click();
    }
}

export { Header };
