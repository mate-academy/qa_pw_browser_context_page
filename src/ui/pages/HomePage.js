import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.homeButton = page.getByRole('link', { name: 'Home' });
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.emptyYourFeed = page.getByText('No articles are here... yet.');
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async reload() {
    await test.step('reload', async () => {
      await this.page.reload();
    });
  }

  async clickHomeButton() {
    await test.step('Click Home button', async () => {
      await this.homeButton.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticleTitleInGlobalFeed(title) {
    await test.step(`Assert the article in global feed`, async () => {
      await expect(
        this.page.getByRole('link', { name: `Article title: ${title}` }),
      ).toBeVisible();
    });
  }

  async assertArticleAuthor(username) {
    await test.step(`Assert the article author`, async () => {
      await expect(
        this.page.getByRole('link', { name: username }),
      ).toBeVisible();
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Clobal Feed'`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async clickYourFeedTab() {
    await test.step(`Click the 'Your Feed'`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async assertFollovingUserIsVisible(username) {
    await test.step('Assert following user is visible', async () => {
      await expect(
        this.page.getByRole('link', { name: username }),
      ).toBeVisible();
    });
  }
  w;

  async assertYourFeedTabIsEmpty() {
    await test.step('Assert your feed tab is empty', async () => {
      await expect(this.emptyYourFeed).toContainText(
        'No articles are here... yet.',
      );
    });
  }
}
