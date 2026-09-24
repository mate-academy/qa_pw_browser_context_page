/* eslint-disable no-irregular-whitespace */
/* eslint-disable max-len */
import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.favoriteArticleButton = page.getByRole('button').filter({ hasText: 'Favorite Article'}).first();
    this.unfavoriteArticleButton = page.getByRole('button').filter({ hasText: 'Unfavorite Article'}).first();
    this.profileLink = page.getByRole('link', { name: 'your profile image' });
    this.editArticleButton = page.getByRole('link', { name: ' Edit Article' }).first();
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.noArticlesInTheFeed = page.getByText('No articles are here... yet.');
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', {name: username }).first();
  }

  authorFollowHeaderButton(username) { 
    return this.page.getByRole('button', { name: `   Follow ${username}` }).first()
  }

  authorUnfollowHeaderButton(username) { 
    return this.page.getByRole('button', { name: `   Unfollow ${username}` }).first()
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
    });
  }

  async followArticle() {
    await test.step(`Click Favorite Article button`, async () => {
      await this.favoriteArticleButton.click();
    });
  }

  async followAuthorProfile(username) {
    await test.step(`Click Follow ${username} profile in the header`, async () => {
      await this.authorFollowHeaderButton(username).click();
    });
  }

  async unfollowAuthorProfile(username) {
    await test.step(`Click Unfollow ${username} profile in the header`, async () => {
      await this.authorUnfollowHeaderButton(username).click();
  });
}

  async goToProfile() {
    await test.step(`Go to profile link in the header`, async () => {
      await this.profileLink.click();
    });
  }

  async goToHomeLink() {
    await test.step(`Go to Home link in the header`, async () => {
      await this.homeLink.click();
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click on Edit Article Button`, async () => {
      await this.editArticleButton.click();
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

  async assertUnfollowButtonIsVisible() {
    await test.step(`Assert Unfavorite (unfollow) Article button is visible`, async () => {
      await expect(this.unfavoriteArticleButton).toBeVisible();
    });
  }

  async assertNoArticlesInTheFeed() {
    await test.step( `Assert there are no articles in the feed`, async () => {
      await expect(this.noArticlesInTheFeed).toBeVisible();
    });
  }

}
