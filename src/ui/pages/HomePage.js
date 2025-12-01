import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.gLobalFeedLink = page.getByText('Global Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.homeLink = page.getByRole('link', { name: 'Home' });
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

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async clickHomeLink() {
    await test.step('Click the Home link', async () => {
      await this.homeLink.click();
    });
  }

  async clickYourFeedLink() {
    await test.step('Click the Your Feed link', async () => {
      await this.yourFeedTab.click();
    });
  }

  async clickGlobalFeedLink() {
    await test.step('Click the [Global Feed] link', async () => {
      await this.gLobalFeedLink.click();
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
        this.page.getByRole('link').getByRole('heading', { name: `${title}` }),
      ).toBeVisible();
    });
  }

  async assertArticleDescriptionIsVisible(description) {
    await test.step(`Assert the article has correct description`, async () => {
      await expect(
        this.page.getByRole('link', {
          name: `${description}`,
        }),
      ).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsVisible(author) {
    await test.step(`Assert the article has correct author`, async () => {
      await expect(
        this.page.getByRole('link', { name: `${author}` }),
      ).toBeVisible();
    });
  }

  async clickArticleFollowButtonByTitle(title) {
    await test.step('Follow article by title', async () => {
      const button = this.page
        .locator('.article-preview')
        .filter({ has: this.page.getByRole('link', { name: `${title}` }) })
        .getByRole('button');
      await button.click();
      await expect(button).toBeVisible();
    });
  }

  async assertArticleIsFollowed(title) {
    await test.step(`Assert article is followed`, async () => {
      await expect(
        this.page
          .locator('.article-preview')
          .filter({ has: this.page.getByRole('link', { name: `${title}` }) })
          .getByRole('button'),
      ).not.toHaveText('0');
    });
  }

  async assertArticleIsUnfollowed(title) {
    await test.step(`Assert article is followed`, async () => {
      await expect(
        this.page
          .locator('.article-preview')
          .filter({ has: this.page.getByRole('link', { name: `${title}` }) })
          .getByRole('button'),
      ).toHaveText('0');
    });
  }

  async assertNoArticleMessageDisplayed(message) {
    await test.step(`Assert 'No article' message is displayed`, async () => {
      await expect(this.page.getByText(`${message}`)).toBeVisible();
    });
  }
}
