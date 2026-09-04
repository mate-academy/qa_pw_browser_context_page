import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page.getByRole('link', { name: 'Edit Article' }).first();
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

  async clickOnEditArticleButton() {
    await test.step(`Click on the 'Edit Article' button`, async() => {
      await this.editArticleButton.click()
    })
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

  async clickOnTheFollowUserButton(username) {
    await test.step(`Click on the 'Follow ${username.toLowerCase()}' button`, async() =>{
      await (this.page.getByRole('button', { name: `Follow ${username.toLowerCase()}` }).first()).click();
    })
  }

  async clickOnTheUnfollowUserButton(username) {
    await test.step(`Click on the 'Unfollow ${username.toLowerCase()}' button`, async() =>{
      await (this.page.getByRole('button', { name: `Unfollow ${username.toLowerCase()}` }).first()).click();
    })
  }

  async assertFollowUserButtonsAreVisible(username) {
    await test.step(`Assert that 'Follow ${username}' buttons are visible`, async () => {
      const buttonLocator = this.page.getByRole('button', { name: `Follow ${username}`});
      const buttons = await buttonLocator.all();

      expect(buttonLocator).toHaveCount(2);

      for (const button of buttons) {
        await expect(button).toBeVisible();
      }
    });
  }

  async assertUnfollowUserButtonsAreVisible(username) {
    await test.step(`Assert that 'Unfollow ${username}' buttons are visible`, async () => {
      const buttonLocator = this.page.getByRole('button', { name: `Unfollow ${username}`});
      const buttons = await buttonLocator.all();

      expect(buttonLocator).toHaveCount(2);

      for (const button of buttons) {
        await expect(button).toBeVisible();
      }
    });
  }
}
