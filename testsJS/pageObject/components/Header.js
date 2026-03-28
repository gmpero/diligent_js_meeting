class Header {
    /**
     * @param {import('playwright').Page} page
     */

    constructor(page) {
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
