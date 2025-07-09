import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.favoriteButton = page.getByRole(
      'button', {name: 'Favorite Article'}).nth(0);
    this.unfavoriteButton = page.getByRole(
      'button', {name: 'Unfavorite Article'}
    ).nth(0);
    this.editArticleButton = page.getByRole(
      'link', {name: ' Edit Article'}
    ).nth(0);
    this.followUserButton = page.getByRole('button', {name: 'Follow'}).nth(0);
    this.unfollowUserButton = page.getByRole(
      'button', {name: 'Unfollow'}
    ).nth(0);
  }

  async clickFollowButton() {
    await test.step('Click follow button', async () => {
      await this.followUserButton.click();
    })
  }

  async clickUnfollowButton() {
    await test.step('Click unfollow button', async () => {
      await this.unfollowUserButton.click();
    })
  }

  async clickEditArticleButton() {
    await test.step('Click edit article button', async () => {
      await this.editArticleButton.click();
    })
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
      await this.page.waitForLoadState('load');
    });
  }

  async clickFavoriteButton() {
    await test.step('Click favorite button', async () => {
      await this.favoriteButton.click();
    });
  }

  async clickUnfavoriteButton() {
    await test.step('Click unfavorite button', async () => {
      await this.unfavoriteButton.click();
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
    await test.step(
      `Assert the article has correct author username`, 
      async () => {
        await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }

  async assertArticleLinkEqualTo(articleLink) {
    await test.step(
      `Assert article link equal to ${articleLink}`,
       async () => {
        expect( await this.url() ).toBe(articleLink);
       });
  }

  async assertButtonStateUnfavoriteFavoriteIsVisible(buttonState) {

    await test.step(
      `Assert is visible button state ${buttonState}`,
      async () => {
        if (buttonState === 'favorite') {
          await expect(this.favoriteButton).toBeVisible();
        }
        if (buttonState === 'unfavorite') {
          await expect(this.unfavoriteButton).toBeVisible();
        }
      });
  } 

  async assertUnfollowButtonIsVisible() {
    await test.step('Assert unfollow button is visible', async () => {
      await expect(this.unfollowUserButton).toBeVisible();
    });
  }

  async assertFollowButtonIsVisible() {
    await test.step('Assert follow button is visible', async () => {
      await expect(this.followUserButton).toBeVisible();
    });
  }

}
