import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.noArticlesMessage = page.getByText('No articles are here... yet.');
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

  async open() {
    await test.step(`Open 'Home' page`, async () => {
      await this.page.goto('/');
    });
  }

  async clickYourFeedTab() {
    await test.step(`Click the 'Your feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async assertArticlePreviewLinkIsVisible(title) {
    await test.step(
      `Assert the article '${title}' is visible in the feed`, 
      async () => {
      await expect(this.articlePreviewLink(title)).toBeVisible();
    });
  }

  async assertNoArticlesMessageIsVisible() {
    await test.step(
      `Assert the empty feed message is visible`, 
      async () => {
      await expect(this.noArticlesMessage).toBeVisible();
    });
  }

  async assertArticlePreviewLinkIsHidden(title) {
    await test.step(
      `Assert the article '${title}' is not in the feed`, 
      async () => {
      await expect(this.articlePreviewLink(title)).toBeHidden();
    });
  }

  async clickArticlePreviewLink(title) {
    await test.step(`Click the article '${title}' in the feed`, async () => {
      await this.articlePreviewLink(title).click();
    });
  }

  async assertArticlePreviewLinkIsVisibleAfterReload(title) {
    await test.step(
      `Assert the article '${title}' appears in the feed after reload`,
      async () => {
      // Global Feed for guests is cached, 
      // so the new article appears only after reload
      await expect(async () => {
        await this.page.reload();
        await this.clickGlobalFeedTab();
        await expect(this.articlePreviewLink(title)).toBeVisible({
          timeout: 2000,
        });
      }).toPass({ timeout: 60000 });
    });
  }
}
