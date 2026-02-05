import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.articleEditButton = page.getByRole(
      'link', 
      { name: 'Edit Article' })
      .first();
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { name: username }).first();
  }

  followUserLink(username) {
    return this.page.getByRole('button', 
      { name: `Follow ${username}` })
      .first()
  }

  unFollowUserLink(username) {
    return this.page.getByRole('button', 
      { name: `Unfollow ${username}` })
      .first()
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
    await test.step(`Assert the article has correct author username`, async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }

  async followUserLinkClick(username) {
    await test.step('Click follow user in viewed adrticle page', async () =>{
      await this.followUserLink(username).click();
    });
  }

  async unFollowUserLinkToBeVisible(username) {
    await test.step('Unfollow button to be visible', async () =>{
      await expect(this.unFollowUserLink(username)).toBeVisible();
    });
  }

  async unFollowUserLinkClick(username) {
    await test.step('Click Unfollow user in viewed adrticle page', async () =>{
      await this.unFollowUserLink(username).click();
    });
  }

  async followUserLinkToBeVisible(username) {
    await test.step('Follow button to be visible', async () =>{
      await expect(this.followUserLink(username)).toBeVisible();
    });
  }

  async clickArticleEditButton() {
    await test.step('Click Edit article page', async() =>{
      await this.articleEditButton.click();
    });
  }






}
