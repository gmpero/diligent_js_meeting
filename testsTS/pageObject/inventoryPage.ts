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
	readonly addToCart: Locator;
	readonly cartBadge: Locator;

    constructor(page: Page) {
        this.header = new Header(page);
        this.page = page;
		this.title = page.getByTestId('title');
		this.productCards = page.getByTestId('inventory-item');
        this.mainContent = page.getByTestId('inventory-container');
		this.select = page.getByTestId('product-sort-container');
		this.addToCart = page.locator('button.btn_inventory');
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

	async clickAddToCart(position: number) {
		const index = position - 1;
		await this.addToCart.nth(index).click();
		return this.addToCart.nth(index);
	}

	getButtonText(card: Locator) {
		return card.locator('button.btn_inventory');
	}

	async selectSortDropdown(option: string ) {
		await this.select.selectOption({ label: option });
	}   
}

export { InventoryPage};
