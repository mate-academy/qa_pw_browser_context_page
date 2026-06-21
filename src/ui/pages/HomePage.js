import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.yourProfileLink = page.getByRole('link', {
      name: 'your profile image',
    });
    this.homePageLink = page.getByRole('link', { name: 'Home' });
    this.globalFeedTab = page.getByRole('link', {
      name: 'Global Feed',
      exact: true,
    });
  }

  async clickYourFeedTab() {
    await test.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
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

  async clickYourProfileLink() {
    await test.step(`Click the 'Your Profile' link`, async () => {
      await this.yourProfileLink.click();
    });
  }

  async clickHomePageLink() {
    await test.step(`Click the 'Home' link`, async () => {
      await this.homePageLink.click();
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }
}
