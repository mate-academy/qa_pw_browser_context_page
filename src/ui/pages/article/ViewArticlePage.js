import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page.getByRole(
      'link', { name: ' Edit Article' }
    ).first();
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { username }).first();
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url, {waitUntil: 'domcontentloaded'});
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
    await test.step(`Assert the article has correct author username`, 
      async () => {
        await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
      });
  }

  async followArticleAuthor(username) {
    await test.step(`Follow article author ${username}`, async() => {
      await this.page.getByRole('button', {name: 
        `Follow ${username}`
      }).first().click();
    })
  }

  async unFollowArticleAuthor(username) {
    await test.step(`Unfollow article author ${username}`, async() => {
      await this.page.getByRole('button', {name: 
        `Unfollow ${username}`
      }).first().click();
    })
  }

  async assertUserFollowingArticleAuthor(username) {
    await test.step(`Assert user following article author ${username}`, 
      async() => {
        await expect(this.page.getByRole('button', {name: 
          `Unfollow ${username}`
        }).first()).toBeVisible();
      })
  }

  async assertUserIsNotFollowingArticleAuthor(username) {
    await test.step(`Assert user is not following article author ${username}`, 
      async() => {
        await expect(this.page.getByRole('button', {name: 
          `Follow ${username}`
        }).first()).toBeVisible();
      })
  }

  async clickEditArticleButton() {
    await test.step(`Click 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    })
  }

  async reloadArticlePage() {
    await test.step(`Reload 'Article Page'`, async () => {
      await this.page.reload({waitUntil: 'domcontentloaded'});
    })
  }
}
