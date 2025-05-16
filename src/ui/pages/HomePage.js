import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.homeButton = page.getByRole('link', { name: 'Home' });
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

  async clickHomePageButton() {
    await test.step(`Click Home Button`, async () => {
      await this.homeButton.click();
    });
  }

  async assertArticleIsNotVisible(title) {
    await test.step(`Assert article\
       with title ${title} is not visible`, async () => {
      await expect(this.page.getByRole('link', { name: title })).toBeHidden();
    });
  }
}
