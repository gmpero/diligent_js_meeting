import { Page, Locator } from '@playwright/test';
import { Header } from './components/Header';
import { InventoryPageData } from '../testData/inventoryPageData';

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

	async getRemoveButtonsCount() {
		const cards = await this.productCards.all();
		let count = 0;

		for (let i = 0; i < cards.length; i++) {
			const text = await this.getAddToCardButton(cards[i]).textContent();

			if (text === InventoryPageData.BUTTON_TEXT.REMOVE) {
				count++;
			}
		}
		return count;
	}
}

export { InventoryPage};
