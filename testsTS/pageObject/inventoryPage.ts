import { Page, Locator } from '@playwright/test';
import { Header } from './components/Header';

// type Position = 1 | 2 | 3 | 4 | 5 | 6;

class InventoryPage {
    readonly page: Page;
    readonly header: Header;
    readonly title: Locator;
    readonly productCards: Locator;
    readonly mainContent: Locator;
	readonly select: Locator;
	readonly cartBadge: Locator;
	readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.header = new Header(page);
        this.page = page;
		this.title = page.getByTestId('title');
		this.productCards = page.getByTestId('inventory-item');
        this.mainContent = page.getByTestId('inventory-container');
		this.select = page.getByTestId('product-sort-container');
		this.addToCartButton = page.locator('button.btn_inventory');
		this.cartBadge = page.getByTestId('shopping-cart-badge');
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

	async clickAddToCart(position: number = 1) {
		const index = position - 1;
		await this.addToCartButton.nth(index).click();
		return this.addToCartButton.nth(index);
	}

	getButtonText(card: Locator) {
		return card.locator('button.btn_inventory');
	}

	async selectSortDropdown(option: string ) {
		await this.select.selectOption({ label: option });
	}  

}

export { InventoryPage};
