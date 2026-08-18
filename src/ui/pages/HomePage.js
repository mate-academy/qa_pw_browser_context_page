import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
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

  async assertArticleIsVisible(title) {
    await test.step(`Assert the article '${title}' is visible`, async () => {
      await expect(this.page.getByText(title)).toBeVisible();
    });
  }

  async clickArticle(title) {
    await test.step(`Click the article '${title}'`, async () => {
      await this.page.getByText(title).click();
    });
  }

  async assertArticleIsNotVisible(title) {
    await test.step(`Assert the article '${title}' is not visible`, 
      async () => { 
        const articleLocator = this.page.getByText(title);

      await expect(articleLocator).toHaveCount(0);
    });
  }

  async open() {
  await test.step(`Open 'Home' page`, async () => {
    await this.page.goto('/');
  });
}
}
