import { Page, Locator } from '@playwright/test';
import { Header } from "./components/Header";

class InventoryPage {
    readonly page: Page;
    readonly header: Header;
    readonly title: Locator;
    readonly productCards: Locator;
    readonly mainContent: Locator;

    constructor(page: Page) {
        this.header = new Header(page);
        this.page = page;
		this.title = page.getByTestId('title');
		this.productCards = page.getByTestId('inventory-item');
        this.mainContent = page.getByTestId("inventory-container");
    
	}

	getProductTitle(card: Locator) {
		return card.getByTestId('inventory-item-name');
	}

	getProductDescription(card: Locator) {
		return card.getByTestId('inventory-item-desc');
	}

	getProductPrice(card: Locator) {
		return card.getByTestId('inventory-item-price');
	}

	getAddToCardButton(card: Locator) {
		return card.locator('.btn');
	}

	getProductImage(card: Locator) {
		return card.locator('img.inventory_item_img');
	}
        
}

export { InventoryPage };
