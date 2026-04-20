import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.followArticleButon = page.getByRole(
      'button', {name:  /Follow/ }).first();
    this.unfollowArticleButon = page.getByRole(
      'button', {name: /Unfollow/}).first();
    this.editArticleButon = page.getByRole(
      'link', {name: 'Edit Article'}).first();
    this.homePageLink = page.getByRole('link', { name: 'Home' });
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { name: username }).first();
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
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await test.step(`Assert the article has correct author username`, 
      async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }

  async clickUnfollowArticleButon() {
    await test.step(`Unfollow article`, async() => {
      await this.page.reload();
      await this.unfollowArticleButon.click();
    });
  }
  async clickfollowArticleButon() {
    await test.step(`Follow article`, async() => {
      await this.followArticleButon.click();
    });
  }

  async clickEditArticleButon() {
    await test.step(`Edit article`, async() => {
      await this.editArticleButon.click();
    });
  }

  async assertUnfollowArticleButonIsVisible() {
    await test.step(`Assert the Unfollow Buton IsVisible`, async () => {
      await expect(this.unfollowArticleButon).toBeVisible();
    });
  }

  async assertfollowArticleButonIsVisible() {
    await test.step(`Assert the follow Buton IsVisible`, async () => {
      await expect(this.followArticleButon).toBeVisible();
    });
  }

  async clickHomeButon() {
    await test.step(`Go to Home page from aricle view`, async() => {
      await this.homePageLink.click();
    });
  }
}
