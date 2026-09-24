/* eslint-disable max-len */
import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed', { exact: true });
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.settingsLink = page.getByRole('link', { name: '  Settings' });
    this.homePageLink = page.getByRole('link', { name: 'Home' });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  } 

  async clickHomePageLink() {
    await test.step(`Click the 'Home Page' link`, async () => {
      await this.homePageLink.click();
      await this.page.reload();
    });
  } 

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    }); 
  }

  async goToSettings() {
    await test.step(`Go to Settings link`, async () => {
      await this.settingsLink.click();
    });
  }

  articleCard(title) {
    return this.page.locator(".article-preview").filter({ hasText: `Article title: ${title}` });
  }

  async assertGlobalFeedIsSelected() {
    await test.step(`Assert the 'Global Feed' tab is selected`, async () => {
      await expect(this.globalFeedTab).toHaveClass(/active/);
    });
  }

  async assertArticleInFeedIsVisible(articleTitle, authorName) {
    await test.step(`Assert the article with title '${articleTitle}' by ${authorName} is visible in the global feed`, async () => {
      await expect(this.articleCard(articleTitle)).toBeVisible();
      await expect(this.articleCard(articleTitle).getByRole('link', { name: authorName })).toBeVisible();
    });  
  }


  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

}
