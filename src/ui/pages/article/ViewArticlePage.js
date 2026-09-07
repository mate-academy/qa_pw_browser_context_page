import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.folowButton = page
      .getByRole('button', { name: '   Follow ' })
      .first();
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { username }).first();
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await this.page.waitForTimeout(2000);

      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await test.step(`Assert the article has correct author username`, async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }
  async clickInArticleLink(title, page = this.page) {
    await test.step(`Click article '${title}' from Global Feed`, async () => {
      await page
        .locator('.article-preview')
        .filter({ hasText: title })
        .locator('a.preview-link')
        .click();
    });
  }
  async clickFolowUserButton() {
    await test.step('Click Folow User Button', async () => {
      await this.folowButton.click();
    });
  }
  async clickUnfollowUserButton(page = this.page) {
    await test.step('Click Unfollow User Button', async () => {
      await page.getByRole('button', { name: '   Unfollow' }).first().click();
    });
  }
  async assertArticleNotVisible(title, page = this.page) {
    await test.step(`Assert article '${title}' is not visible`, async () => {
      await expect(
        page
          .locator('.article-preview')
          .filter({ hasText: title })
          .locator('a.preview-link'),
      ).toBeHidden();
    });
  }
  async clickUpdateArticleButton(page = this.page) {
    await test.step('Click Update Article Button', async () => {
      page.getByRole('link', { name: ' Edit Article' }).first().click();
    });
  }
}
