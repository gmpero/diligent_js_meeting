import { Header } from "./components/header";

class InventoryPage {
    /**
     * @param {import('playwright').Page} page
     */

    constructor(page) {
        this.header = new Header(page);
        this.page = page;
		this.title = page.getByTestId('title');
		this.productCards = page.getByTestId('inventory-item');
        this.mainContent = page.getByTestId("inventory-container");
    
	}

	getProductTitle(card) {
		return card.getByTestId('inventory-item-name');
	}

	getProductDescription(card) {
		return card.getByTestId('inventory-item-desc');
	}

	getProductPrice(card) {
		return card.getByTestId('inventory-item-price');
	}

	getAddToCardButton(card) {
		return card.locator('.btn');
	}

	getProductImage(card) {
		return card.locator('img.inventory_item_img');
	}
        
}

export { InventoryPage };
