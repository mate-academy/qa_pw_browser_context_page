import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.myProfileButton = page.getByRole('link', { name: 'your profile image' });
  }

  async open() {
    await test.step(`Open the home page`, async () => {
      await this.page.goto('/');
    });
  }

  async clickMyProfileButton() {
    await test.step(`Click the 'My Profile' button`, async () => {
      await this.myProfileButton.click();
    });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickYourFeedTab() {
    await test.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async assertUserIsNotLoggedIn() {
    await test.step(`Assert the user is not logged in`, async () => {
      await expect(this.signInLink).toBeVisible();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  articlePreview(title) {
    return this.page.locator('.article-preview').filter({
      has: this.page.getByRole('heading', { name: title }),
    });
  }

  async assertArticleWithAuthorIsVisible(title, username) {
    await test.step(`Assert the article '${title}' by '${username}' is visible`, async () => {
      await expect(this.articlePreview(title).locator('a.author')).toHaveText(username);
    });
  }

  async assertArticleIsHidden(title) {
    await test.step(`Assert the article '${title}' is not in the feed`, async () => {
      await expect(this.articlePreview(title)).toHaveCount(0);
    });
  }
}
