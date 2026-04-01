import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .first();
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { name: username }).first();
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url, { waitUntil: 'commit' });
    });
  }

  async clickEditArticle() {
    await test.step(`Click on the Edit Article button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async followUserArticle(username) {
    await test.step(`Click on the button to follow user article`, async () => {
      this.page
        .getByRole('button', {
          name: `Follow ${username}`,
        })
        .first()
        .click();
    });
  }

  async unfollowUserArticle(username) {
    await test.step(`Click on the button to unfollow user article`, async () => {
      this.page
        .getByRole('button', {
          name: `Unfollow ${username}`,
        })
        .first()
        .click();
    });
  }

  async assertArticleFollowed(username) {
    await test.step(`Assert user can unfollow the author`, async () => {
      const buttons = this.page.getByRole('button', {
        name: `Unfollow ${username}`,
      });
      await expect(buttons).toHaveCount(2);
      await expect(buttons.first()).toBeVisible();
      await expect(buttons.last()).toBeVisible();
    });
  }

  async assertArticleUnfollowed(username) {
    await test.step(`Assert user can unfollow the author`, async () => {
      const buttons = this.page.getByRole('button', {
        name: `Follow ${username}`,
      });
      await expect(buttons).toHaveCount(2);
      await expect(buttons.first()).toBeVisible();
      await expect(buttons.last()).toBeVisible();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await test.step(`Assert the article has correct author username`, async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }
}
