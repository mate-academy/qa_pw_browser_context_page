import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.firstGlobalFeedArticle = page.locator(
      '.article-preview').first();
    this.noAriclesText = page.getByText('No articles are here... yet.');
    this.settingsButon = page.getByRole('link', { name: 'Settings' });
    this.signInLink = page.getByRole(
      'link', { name: 'Sign in' });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickSignInLink() {
    await test.step(`Click the 'signIn' link`, async () => {
      await this.signInLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async clickFirstAricleGlobalFeed() {
    await test.step(`Click the first article in Global Feed`, async () => {
      await this.firstGlobalFeedArticle.click();
    });
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { name: username }).first();
  }

  async assertArticleAuthorNameIsVisible(username) {
    await test.step(`Assert the article has correct author username`, 
      async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }

  async assertNoAriclesTextIsVisible() {
    await test.step(`Assert the no article text is visible`, 
      async () => {
      await expect(this.noAriclesText).toBeVisible();
    });
  }

  async clickOnSettingseButon() {
    await test.step(`Click 'Settings' button`, 
      async () => {
        await this.settingsButon.click();
      });
  }
}
