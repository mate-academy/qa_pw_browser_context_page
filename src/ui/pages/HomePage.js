import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.homeLink = page.getByRole('link', { name: 'Home' });
  }

  async open() {
    await test.step(`Open 'Home' page`, async () => {
      await this.page.goto('/');
    });
  }

  async clickHomeLink() {
    await test.step(`Click the 'Home' link`, async () => {
      await this.homeLink.click();
    });
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

  async assertArticleIsNotVisible(title) {
    await test.step(`Assert the article '${title}' is not visible`, async () => {
      await expect(
        this.page
          .locator('a.preview-link')
          .filter({ hasText: `Article title: ${title}` }),
      ).not.toBeVisible();
    });
  }

  async assertArticleIsVisible(title) {
    await test.step(`Assert the article '${title}' is visible`, async () => {
      await expect(
        this.page
          .locator('a.preview-link')
          .filter({ hasText: `Article title: ${title}` }),
      ).toBeVisible();
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async clickYourFeedTab() {
    await test.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }
  async clickArticleByTitle(title) {
    await test.step(`Click the article with title '${title}'`, async () => {
      await this.page
        .locator('a.preview-link')
        .filter({ hasText: `Article title: ${title}` })
        .click();
    });
  }
}
