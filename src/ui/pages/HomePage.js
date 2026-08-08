import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeedTab = page.getByText('Global Feed');
    this.settingsPageLink = page.getByRole('link', { name: /Settings/ });
  }

  async open() {
    await test.step(`Open the Home page`, async () => {
      await this.page.goto('/');
    });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickSettingsPageLink() {
    await test.step(`Click the 'Settings' link`, async () => {
      await this.settingsPageLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Navigate to 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async clickYourFeedTab() {
    await test.step(`Navigate to 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async assertArticleIsVisibleInGlobalFeed(title) {
    const stepName = `Assert the article '${title}' is visible in Global Feed`;
    await test.step(stepName, async () => {
      const articlePreview = this.page
        .locator('.preview-link')
        .filter({ hasText: title });
      await expect(articlePreview).toBeVisible();
    });
  }

  async assertArticleIsVisibleInHomeFeed(title) {
    const stepName = `Assert the article '${title}' is visible in Home Feed`;
    await test.step(stepName, async () => {
      const articlePreview = this.page
        .locator('.preview-link')
        .filter({ hasText: title });
      await expect(articlePreview).toBeVisible();
    });
  }

  async assertArticleIsNotVisibleInHomeFeed(title) {
    const stepName = `Assert the article '${title}' is not visible in Home Feed`;
    await test.step(stepName, async () => {
      const articlePreview = this.page
        .locator('.preview-link')
        .filter({ hasText: title });
      await expect(articlePreview).toBeHidden();
    });
  }

async assertArticleIsVisibleInGlobalFeedEventually(title) {
  await test.step('Assert article is visible in Global Feed after reload', async () => {
    await expect(async () => {
      await this.page.reload();
      await this.assertArticleIsVisibleInGlobalFeed(title);
    }).toPass({ timeout: 15000 });
  });
}

}