import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeedButton = page.getByText('Global Feed');
    this.setingsButton = page.getByRole('link', { name: '  Settings' });
    this.newPassword = page.getByPlaceholder('New Password');
    this.updateSetingButton = page.getByRole('button', {
      name: 'Update Settings',
    });
    this.logoutButton = page.getByRole('button', {
      name: 'Or click here to logout.',
    });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async assertYourFeedTabIsVisible(page = this.page) {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(page.getByText('Your Feed')).toBeVisible();
    });
  }

  async clickGlobalFeedButton(page = this.page) {
    await test.step(`Click Global Feed Button`, async () => {
      await page.getByText('Global Feed').click();
    });
  }
  async clickHomePageButton(page = this.page) {
    await test.step('Click Home Page Button', async () => {
      await page.getByRole('link', { name: 'Home' }).click();
    });
  }
  async clickSetingButton() {
    await test.step('Click Seting Button', async () => {
      await this.setingsButton.click();
    });
  }
  async fillNewPassword() {
    await test.step('Create new password', async () => {
      await this.newPassword.fill('12345678Qq');
    });
  }
  async clickUpdateSetingButton() {
    await test.step('Click Update Seting Button', async () => {
      await this.updateSetingButton.click();
    });
  }
  async clickLogoutButton() {
    await test.step('Click logout button', async () => {
      await this.logoutButton.click();
    });
  }
  async clickYourFeedButton(page = this.page) {
    await test.step('Click Your Feed button', async () => {
      await page.getByText('Your Feed').click();
    });
  }
}
