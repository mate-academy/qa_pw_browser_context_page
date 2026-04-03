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
      await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    });
  }
  getArticleBlock(articleTitle) {
    return this.page.locator('.article-preview', { hasText: articleTitle });
  }

  getTag(articleTitle, tagName) {
    return this.getArticleBlock(articleTitle).locator('.tag-default', { hasText: tagName });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }
  async clickSettingsLink() {
    await test.step(`Click the 'Settings' link`, async () => {
      await this.settingsLink.click();
    });
  }
  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async clickYourFeedTab() {
    await test.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async clickLikeButton(articleTitle) {
    await test.step(`Click the 'Like' button`, async () => {
      await this.getArticleBlock(articleTitle).locator('button').click();
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

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(
        this.getArticleBlock(title).locator('h1')
      ).toContainText(title);
    });
  }

  async assertArticleDescriptionIsVisible(title, description) {
    await test.step(`Assert the article has correct description`, async () => {
      await expect(
        this.getArticleBlock(title).locator('p')
      ).toContainText(description);
    });
  }

  async assertArticleAuthorNameIsVisible(title, username) {
    await test.step(`Assert the article has correct author`, async () => {
      await expect(
        this.getArticleBlock(title).locator('.author')
      ).toContainText(username.toLowerCase());
    });
  }

  async assertArticleTagIsVisible(title, tagName) {
    await test.step(`Assert the article has correct tag`, async () => {
      await expect(this.getTag(title, tagName)).toBeVisible();
    });
  }
  async clickAuthorName(title) {
    await test.step(`Click the author name`, async () => {
      await this.getArticleBlock(title).locator('.author').click();
    });
  }
  async assertArticleBlockIsHidden(title) {
    await test.step(`Assert the article is hidden`, async () => {
      await expect(this.getArticleBlock(title)).toBeHidden();
    });
  }
  async assertArticleAuthorNameIsHidden(title) {
    await test.step(`Assert the article author is hidden`, async () => {
      await expect(
        this.getArticleBlock(title).locator('.author')
      ).toBeHidden();
    });
  }
}
