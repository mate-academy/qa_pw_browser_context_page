/* eslint-disable max-len */
import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;

    this.yourFeedTab = page.getByRole('link', { name: 'Your Feed' }).or(page.getByText('Your Feed'));
    this.globalFeedTab = page.getByRole('link', { name: 'Global Feed' }).or(page.getByText('Global Feed'));
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  articleCard(title) {
    return this.page
      .locator('.article-preview', {
        has: this.page.locator('h1', { hasText: title }),
      })
      .first();
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async clickYourFeedTab() {
    await test.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async assertArticleCardVisible(title) {
    await test.step(`Assert article card "${title}" is visible`, async () => {
      await expect(this.articleCard(title)).toBeVisible();
    });
  }

  async openArticleCardByTitle(title) {
    await test.step(`Open article card "${title}"`, async () => {
      const card = this.articleCard(title);
      await expect(card).toBeVisible();

      const previewLink = card.locator('a.preview-link').first();
      if ((await previewLink.count()) > 0) {
        await previewLink.click();
      } else {
        await card.getByRole('link').first().click();
      }
    });
  }

  async assertArticleCardNotPresent(title) {
    await test.step(`Assert article card "${title}" is NOT present`, async () => {
      await expect(
        this.page.locator('.article-preview', {
          has: this.page.locator('h1', { hasText: title }),
        })
      ).toHaveCount(0);
    });
  }
  // count cards with a given title
countArticleCardsByTitle(title) {
  return this.page.locator('.article-preview', {
    has: this.page.locator('h1', { hasText: title }),
  }).count();
}

// wait until the article shows up in Global Feed (handles slow indexing)
async waitForArticleInGlobalFeed(title, timeout = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    // ensure Global Feed tab is active
    await this.clickGlobalFeedTab().catch(() => {});
    if (await this.countArticleCardsByTitle(title) > 0) {
      await this.assertArticleCardVisible(title);
      return;
    }
    // small backoff + refresh
    await this.page.waitForTimeout(800);
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }
  throw new Error(`Article "${title}" not found in Global Feed within ${timeout}ms`);
}}
