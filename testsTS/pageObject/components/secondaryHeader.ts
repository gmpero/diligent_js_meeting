import { Page, Locator } from '@playwright/test';
import { CartPage } from '../cartPage';

class secondaryHeader {
    readonly page: Page;
    readonly backButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.backButton = page.getByRole("button", { name: "Back to products" });
    }
}

export { secondaryHeader };