import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeedArticlesTitles = page.locator(
      'div.article-preview a.preview-link h1',
    );
    this.homePageLink = page.getByRole('link', { name: 'Home' });
    this.profilePageLink = page.getByRole('link', { name: 'Settings' });
    this.noArticlesText = page.getByText('No articles are here... yet.');
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

  async assertGlobalFeedTabIsVisible() {
    await test.step(`Assert the 'Global Feed' tab is visible`, async () => {
      await expect(this.globalFeedTab).toBeVisible();
    });
  }

  async assertGlobalFeedArticleTitle(title) {
    await test.step(
      `Assert article in the Global Feed has correct title`, async () => {
      await expect(this.globalFeedArticlesTitles).toContainText(title);
    });
  }

  async openArticle(title) {
    await test.step (`Open article in Global Feed`, async () => {
      await this.globalFeedArticlesTitles.
      filter({ hasText: title }).first().click();
    });
  }

  async globalFeedClick() {
    await test.step(`Click Global Feed`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async yourFeedClick() {
    await test.step(`Click Your Feed`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async openHomePage () {
    await test.step(`Click home page link`, async () => {
      await this.homePageLink.click();
    });
  }

  async openSettingsPage () {
    await test.step(`Click settings page link`, async () => {
      await this.profilePageLink.click();
    });
  }

  async AssertNoArticlesTextVisible () {
    await test.step(`Assert no arcticle text is visible`, async () => {
      await expect(this.noArticlesText).toBeVisible();
    });
  }

  async AssertNoArticlesTextNotVisible () {
    await test.step(`Assert no arcticle text is not visible`, async () => {
      await expect(this.noArticlesText).toBeHidden();
    });
  }
}
