import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
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

  async clickGlobalFeedTab() {
    await test.step(`Click Global Feed Tab`, async () => {
      await this.globalFeedTab.click();
    })
  }

  async openMainPage() {
    await test.step(`Open 'Main page'`, async () => {
      await this.page.goto('https://conduit.mate.academy/', 
        {waitUntil: 'domcontentloaded'});
    })
  }

  async assertYourFeedTabIsActive() {
    await test.step(`Assert 'Your Feed' tab is active`, async () => {
      await expect(this.yourFeedTab).toHaveClass(/active/);
    })
  }

  async assertYourFeedTabIsHidden() {
    await test.step(`Assert 'Your Feed' tab is hidden`, async () => {
      await expect(this.yourFeedTab).toBeHidden();
    })
  }
 
  async reloadHomePage() {
    await test.step(`Reload 'Home Page'`, async () => {
      await this.page.reload({waitUntil: 'domcontentloaded'});
    })
  }

  async clickOnArticle(articleTitle) {
    await test.step(`Click on article ${articleTitle}`, async () => {
      await this.page.getByRole('heading', { name: articleTitle }).click();
    })
  }

  async assertArticleIsVisible(articleTitle) {
    await test.step(`Assert article ${articleTitle} is visible`, async () => {
      await expect(this.page.getByRole('heading', 
        { name: articleTitle })).toBeVisible();
    })
  }

  async assertArticleIsHidden(articleTitle) {
    await test.step(`Assert article ${articleTitle} is hidden`, async () => {
      await expect(this.page.getByRole('heading', 
        { name: articleTitle })).toBeHidden();
    })
  }
}
