import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
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

  articlePreviewTitle(title) {
    return this.page.getByRole('heading', {
      name: `Article title: ${title}`,
      exact: true,
    });
  }

  async open() {
    await test.step(`Open 'Home' page`, async () => {
      await this.page.goto('/');
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async clickArticleInFeed(title) {
    await test.step(`Click the article '${title}' in the feed`, async () => {
      await this.articlePreviewTitle(title).click();
    });
  }

  // The home page is cached on the server for ~15 seconds, so fresh changes
  // appear with a delay: reload the page and re-open the feed tab until they do.
  async reloadFeedUntil(feedName, assertion) {
    await expect(async () => {
      await this.page.reload();
      await this.page.getByText(feedName).click();
      await assertion();
    }).toPass({ timeout: 40_000 });
  }

  async assertArticleIsVisibleInFeed(feedName, title) {
    await test.step(`Assert the article '${title}' is visible in '${feedName}'`,
      async () => {
        await this.reloadFeedUntil(feedName, async () => {
          await expect(this.articlePreviewTitle(title))
            .toBeVisible({ timeout: 3_000 });
        });
      });
  }

  async assertFeedIsEmpty(feedName) {
    await test.step(`Assert '${feedName}' has no articles`, async () => {
      await this.reloadFeedUntil(feedName, async () => {
        await expect(this.page.getByText('No articles are here... yet.'))
          .toBeVisible({ timeout: 3_000 });
      });
    });
  }
}
