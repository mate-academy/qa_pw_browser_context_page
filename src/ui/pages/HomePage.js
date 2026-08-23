import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
    this.nextPageButton = page.getByText('>', { exact: true });
  }

  articleLinkInFeed(title) {
    return this.page.getByRole('link', { name: title });
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

  async clickSettingsLink() {
    await test.step(`Click the 'Settings' link`, async () => {
      await this.settingsLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticleIsVisibleInFeed(title) {
    const stepName = `Assert the '${title}' article is visible in feed`;

    await test.step(stepName, async () => {
      await expect(this.articleLinkInFeed(title)).toBeVisible();
    });
  }

  async assertArticleIsHiddenInFeed(title) {
    const stepName = `Assert the '${title}' article is hidden in feed`;

    await test.step(stepName, async () => {
      await expect(this.articleLinkInFeed(title)).toBeHidden();
    });
  }

  async assertArticleIsVisibleInFeedWithPagination(title, maxPages = 10) {
    const stepName = `Assert the '${title}' article is visible (any page)`;

    await test.step(stepName, async () => {
      await this.page.reload();

      for (let attempt = 0; attempt < maxPages; attempt += 1) {
        const isVisible = await this.articleLinkInFeed(title)
          .isVisible()
          .catch(() => false);

        if (isVisible) {
          return;
        }

        const canGoNext = await this.nextPageButton
          .isVisible()
          .catch(() => false);

        if (!canGoNext) {
          break;
        }

        await this.nextPageButton.click();
        await this.page.waitForTimeout(500);
      }

      await expect(this.articleLinkInFeed(title)).toBeVisible();
    });
  }
}