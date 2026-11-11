import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
  }

  async open() {
    await test.step(`Open 'Home' page`, async () => {
      await this.page.goto('/');
    });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickSettingsLink() {
    await test.step(`Click the 'Settings' link`, async () => {
      await this.settingsLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  findArticleByTitle(title) {
    return this.page.locator('.article-preview').filter({ hasText: title });
  }
  async clickArticleByTitle(title) {
    await test.step(`Click article '${title}'`, async () => {
      await this.findArticleByTitle(title).locator('.preview-link').click();
    });
  }
  async clickGlobalFeedTab() {
    await test.step(`Open a 'Global feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }
  async assertGlobalFeedTabIsActive() {
    await test.step(`Assert the 'Global Feed' tab is active`, async () => {
      await expect(this.globalFeedTab).toHaveClass(/active/);
    });
  }
  async assertYourFeedTabIsActive() {
    await test.step(`Assert the 'Your Feed' tab is active`, async () => {
      await expect(this.yourFeedTab).toHaveClass(/active/);
    });
  }
  async assertArticleIsVisible(title) {
    // eslint-disable-next-line max-len
    await test.step(`Assert the article is visible in the 'Your Feed' tab`, async () => {
      await expect(this.findArticleByTitle(title)).toBeVisible();
    });
  }

  async assertArticleIsNotVisible(title) {
    // eslint-disable-next-line max-len
    await test.step(`Assert the article to be hidden in the 'Your Feed' tab`, async () => {
      await expect(this.findArticleByTitle(title)).toBeHidden();
    });
  }
  async assertUserIsLoggedIn(username) {
    await test.step('Assert the user is logged in', async () => {
      await expect(
        this.page
          .getByRole('navigation')
          .locator(`a[href="/profile/${username.toLowerCase()}"]`),
      ).toBeVisible();
    });
  }
  async assertSignInLinkIsVisible() {
    await test.step(`Assert the 'Sign In' link is visible`, async () => {
      await expect(this.signInLink).toBeVisible();
    });
  }
}
