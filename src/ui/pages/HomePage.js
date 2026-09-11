import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.homeButton = page.getByRole('link', { name: 'Home' });
    this.settingsButton = page.getByRole('link', { name: '  Settings' });
  }

  articleAuthorLinkInFeed(username, articleTitle) {
    return this.page
      .locator('.article-preview', { hasText: articleTitle })
      .getByRole('link', { name: username, exact: true });
  }

  articleTitleHeadingInFeed(title) {
    return this.page
      .locator('.article-preview', { hasText: title })
      .getByRole('heading', { name: `Article title: ${title}`, exact: true });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickHomeButton() {
    await test.step('Click on "Home" Button', async () => {
      await this.homeButton.click();
    });
  }
  async clickSettingsButton() {
    await test.step('Click on "Settings" Button', async () => {
      await this.settingsButton.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticleAuthorLinkInFeedIsVisible(username, articleTitle) {
    await test.step(`Assert the article author link is visible in feed`, async () => {
      await expect(
        this.articleAuthorLinkInFeed(username, articleTitle),
      ).toBeVisible();
    });
  }

  async assertarticleTitleHeadingInFeedIsVisible(title) {
    await test.step(`Assert the 'Article Title in feed' is visible`, async () => {
      await expect(this.articleTitleHeadingInFeed(title)).toBeVisible();
    });
  }

  async assertarticleTitleHeadingInFeedNotVisible(title) {
    await test.step(`Assert the 'Article Title in feed' is Not visible`, async () => {
      await expect(this.articleTitleHeadingInFeed(title)).toBeHidden();
    });
  }
}
