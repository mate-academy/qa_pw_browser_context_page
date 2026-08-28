import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed', { exact: true });
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeedTab = page.getByText('Global Feed', { exact: true });
    this.conduitIcon = page.getByRole('link', { name: 'conduit' }).first();
  }

  articlePreviewLink(title) {
    return this.page.getByRole('link', { name: title });
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

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async assertArticleIsVisibleInFeed(title) {
    await test.step(`Assert the article '${title}' is visible in the feed`, async () => {
      await expect(this.articlePreviewLink(title)).toBeVisible();
    });
  }
  
  async clickYouFeedTab() {
    await test.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async clickConduitIcon() {
    await test.step(`Click the 'Conduit' icon`, async () => {
      await this.conduitIcon.click();
    });
  }

  async openArticleFromFeed(title) {
    await test.step(`Open the article "${title}" from the feed`, async () => {
      await this.articlePreviewLink(title).click();
    });
  }
}
