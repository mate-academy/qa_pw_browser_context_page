import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.articlePreviewCardItem = page.locator('.article-preview');
    this.articlePreviewDate = page.locator('.date');
    this.noArticlesMessageInYourFeed = page.getByText(
      'No articles are here... yet.',
    );
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
  }

  async open() {
    await test.step(`Open 'Home' page`, async () => {
      await this.page.goto('');
    });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickOnSettingsLink() {
    await test.step(`CLick on the 'Settings' link`, async () => {
      await this.settingsLink.click();
    });
  }

  async clickHomeLink() {
    await test.step(`Click on the 'Home' link`, async () => {
      await this.homeLink.click();
    });
  }

  async clickOnGlobalFeedTab() {
    await test.step(`Click on the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertNoArticleMessageInYourFeedTabIsVisible() {
    await test.step(
      `Assert the message 'No articles are here... yet.' is visible`,
      async () => {
      await expect(this.noArticlesMessageInYourFeed).toBeVisible();
    });
  }

  async getArticlePreviewItemByLink(articleUrl) {
    const articleSubstringLink = new URL(articleUrl).pathname;
    const locator =
      await test.step(
        `Get article preview card by link '${articleSubstringLink}'`,
        async () => {
        const articleItem = await this.articlePreviewCardItem.filter({
          has: this.page.locator(`a[href*="${articleSubstringLink}"]`),
        });

        return articleItem;
      });

    return locator;
  }

  async clickOnArticlePreviewCard(articleUrl) {
    await test.step(`Click on the article preview card'`, async () => {
      await (await this.getArticlePreviewItemByLink(articleUrl)).click();
    });
  }

  async assertArticlePreviewHasCorrectTitle(articleUrl, articleTitle) {
    await test
    .step(`Assert article preview has title '${articleTitle}'`, async () => {
      await expect(
        await this.getArticlePreviewItemByLink(articleUrl),
      ).toBeVisible({ timeout: 15000 });

      await expect(
        (await this.getArticlePreviewItemByLink(articleUrl)).locator('h1'),
      ).toContainText(articleTitle);
    });
  }

  async assertArticlePreviewHasCorrectDescription(
    articleUrl,
    articleDescription,
  ) {
    await test
    .step(`Assert article preview has description '${articleDescription}'`,
       async () => {
      await expect(
        (await this.getArticlePreviewItemByLink(articleUrl)).locator('p'),
      ).toContainText(articleDescription);
    });
  }

  async assertArticlePreviewHasCorrectUserName(articleUrl, username) {
    await test.step(`Assert article preview has user name '${username}'`,
      async () => {
      const usernameElement = (
        await this.getArticlePreviewItemByLink(articleUrl)
      ).locator('.info');
      await expect(usernameElement).toContainText(username.toLowerCase());
    });
  }

  async assertArticlePreviewHasCorrectDate(articleUrl, expectedDate) {
    await test
    .step(`Assert article preview has correct date '${expectedDate}'`, async () => {
      const dateElement = (
        await this.getArticlePreviewItemByLink(articleUrl)
      ).locator(this.articlePreviewDate);
      await expect(dateElement).toHaveText(expectedDate);
    });
  }
}
