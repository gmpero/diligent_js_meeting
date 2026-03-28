import { expect, test } from '@playwright/test';
import { InventoryPageData } from '../testData/inventoryPageData';

class InventoryAssertions {
    static async validateAllProductCards(inventoryPage) {
		const allCards = await inventoryPage.productCards.all();

		for (let i = 0; i < allCards.length; i++) {
            const card = allCards[i];
            const title = await inventoryPage.getProductTitle(card).textContent();

			await test.step(`Product ${i + 1}: ${title}`, async () => {
				await expect(card).toBeVisible();
				await expect(inventoryPage.getProductTitle(card)).toBeVisible();
				await expect(inventoryPage.getProductDescription(card)).toBeVisible();
				await expect(inventoryPage.getProductPrice(card)).toBeVisible();
				await expect(inventoryPage.getAddToCardButton(card)).toBeVisible();
                await expect(inventoryPage.getProductImage(card)).toBeVisible();
			});
		}
	}

    static async validateProductCardsData(inventoryPage) {
        const allCards = await inventoryPage.productCards.all();
        
        for (let i = 0; i < allCards.length; i++) {
            const card = allCards[i];
            const title = await inventoryPage.getProductTitle(card).textContent();
            const expectData = InventoryPageData.PRODUCTS[i]
            
            await test.step(`validate Data Product ${i + 1}: ${title}`, async () => {
                await expect(inventoryPage.getProductTitle(card)).toHaveText(expectData.title);
                await expect(inventoryPage.getProductDescription(card)).toHaveText(expectData.description);
                await expect(inventoryPage.getProductPrice(card)).toHaveText(expectData.price);
                await expect(inventoryPage.getAddToCardButton(card)).toHaveText(InventoryPageData.BUTTON_TEXT.ADD);
                await expect(inventoryPage.getProductImage(card)).toHaveAttribute('alt', expectData.imageAlt);
                await expect(inventoryPage.getProductImage(card)).toHaveAttribute('src', expectData.imageSrc);
            });
        }
    }
}

export {InventoryAssertions};