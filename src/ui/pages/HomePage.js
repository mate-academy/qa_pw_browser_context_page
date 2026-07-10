import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
  }

  async open() {
    await test.step(`Open 'Home' page`, async () => {
      await this.page.goto('/');
    });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickNewSettingsLink() {
    await test.step(`Click the 'Settings' link`, async () => {
      await this.settingsLink.click();
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticleIsVisibleInGlobalFeed(title) {
    await test.step(`Assert article '${title}' is visible in Global Feed`, async () => {
      await expect(
        this.page.getByRole('heading').filter({ hasText: title }),
      ).toBeVisible();
    });
  }

  async assertArticleIsVisibleInYourlFeed(title) {
    await test.step(`Assert article '${title}' is visible in Your Feed`, async () => {
      await expect(
        this.page.getByRole('heading').filter({ hasText: title }),
      ).toBeVisible();
    });
  }

  async assertArticleIsNotVisibleInYourlFeed(title) {
    await test.step(`Assert article '${title}' is not visible in Your Feed`, async () => {
      await expect(
        this.page.getByRole('heading').filter({ hasText: title }),
      ).toHaveCount(0);
    });
  }
}
