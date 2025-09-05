import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.settingsButton = page.getByRole('link', { name: 'Settings' });
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  articleTitleLinkInTabs(title) {
    return this.page.getByRole('heading', { name: title });
  }

  readMoreLinkInArticlePreview(title) {
    return this.page
      .getByRole('link', { name: title })
      .getByText('Read more...');
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

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async clickReadMoreLinkInArticlePreview(title) {
    await test.step(`Click the 'Read more...' link in article preview`, async () => {
      await this.readMoreLinkInArticlePreview(title).click();
    });
  }

  async clickSettingsButton() {
    await test.step(`Click the 'Settings' button`, async () => {
      await this.settingsButton.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticleIsVisibleInGlobalFeed(title) {
    await test.step(`Assert the article is visible in the 'Global Feed'`, async () => {
      await expect(this.articleTitleLinkInTabs(title)).toContainText(title);
    });
  }

  async assertArticleIsVisibleInYourFeed(title) {
    await test.step(`Assert the article is visible in the 'Your Feed'`, async () => {
      await expect(this.articleTitleLinkiInTabs(title)).toContainText(title);
    });
  }

  async assertArticleIsNotVisibleInYourFeed(title) {
    await test.step(`Assert the article is visible in the 'Your Feed'`, async () => {
      await expect(this.articleTitleLinkiInTabs(title)).toBeHidden();
    });
  }
}
