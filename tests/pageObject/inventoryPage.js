import { Header } from "./components/header";

class InventoryPage {
    /**
     * @param {import('playwright').Page} page
     */

    constructor(page) {
        this.page = page;
        this.header = new Header(page);
        this.title = page.getByTestId("title");
        this.productCards = page.getByTestId("inventory-item");
        this.mainContent = page.getByTestId("inventory-container");
    }
}

export { InventoryPage };
