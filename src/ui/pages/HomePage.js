import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeed = page.getByText('Global Feed');
    this.followAuthorButton = page.getByRole('button')
    .filter({hasText : 'Follow', exact: true});
    this.homeButton = page.getByRole('link', { name: 'Home', exact: true });
    this.unfollowAuthorButton = page.getByRole('button')
    .filter({ hasText : 'Unfollow', exact: true}).nth(0);
    this.settingsButton = page.getByRole('link', { name : 'Settings'});
    this.newPasswordFiled = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.getByRole('button', { name : 'Update Settings'});
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

  async openGlobalFeed() {
    await test.step(`Open the 'Global Feed'`, async () => {
      await this.globalFeed.click();
    });
  }

  getArticleByTitle(title) { 
    return this.page.locator('h1').filter({ hasText: title });
  }

  async openCreatedArticle(title) {
    await test.step(`Open created article`, async() => { 
      const createdArticle = await this.getArticleByTitle(title);
      await createdArticle.click();
      await expect(createdArticle).toBeVisible({ timeout: 60000 });
    });
  }

  async getAuthorName(username) {
    return this.page.locator('.author').filter({ hasText: username });
  }

  async openAuthor(username) {
    await test.step(`Open author's profile`, async() => {
      const authorName = await this.getAuthorName(username);
      await authorName.click();
    });
  }

  async followAuthor() {
    await test.step(`Follow author`, async() => {
      await this.followAuthorButton.click();
    });
  }

  async openHomeMainPage() {
    await test.step(`Open Main Home Page`, async() => {
      await this.homeButton.click();
    });
  }

  async assertArticleCreaterByAuthorIsVisible(title) {
    await test.step(`Assert article creater by author is visible`, async() => {
      const createdArticle = await this.getArticleByTitle(title);
      await expect(createdArticle).toBeVisible();
    });
  }

  async unfollowAuthor() {
    await test.step(`Unfollow author`, async() => {
      await this.unfollowAuthorButton.click();
    });
  }

  async assertArticleCreaterByAuthorIsHidden(title) {
    await test.step(`Assert that the article is not visible`, async() => {
      const createdArticle = await this.getArticleByTitle(title);
      await expect(createdArticle).toBeHidden();
    });
  }

  async openSettings() {
    await test.step(`Open Settings`, async() => {
      await this.settingsButton.click();
    });
  }

  async changePassword(newPassword) {
    await test.step(`Enter new password`, async() => {
      await this.newPasswordFiled.fill(newPassword);
    });
  }

  async updateSettings() {
    await test.step(`Click on the 'Update Settings' button`, async() => {
      await this.updateSettingsButton.click();
    });
  }

}
