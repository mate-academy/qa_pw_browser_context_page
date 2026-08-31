import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.locator('a:has-text("Your Feed")').first();
    this.globalFeedTab = page.locator('a:has-text("Global Feed")').first();
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
    this.newPasswordField = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
    this.logoutButton = page.getByRole('button', { name: 'Or click here to logout.' });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await this.yourFeedTab.waitFor({ state: 'visible', timeout: 10000 });
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertGlobalFeedTabIsVisible() {
    await test.step(`Assert the 'Global Feed' tab is visible`, async () => {
      await this.globalFeedTab.waitFor({ state: 'visible', timeout: 10000 });
      await expect(this.globalFeedTab).toBeVisible();
    });
  }

  async assertArticleTitleInGlobalFeedIsVisible(title) {
    await test.step(`Assert article '${title}' is visible in the Global Feed`, async () => {
      await this.globalFeedTab.click();
      await expect(this.page.locator('a').filter({ hasText: title }).first()).toBeVisible({ timeout: 125000 });
    });
  }

  async updatePassword(newPassword) {
    await test.step(`Update the password`, async () => {
      await this.settingsLink.click();
      await this.newPasswordField.waitFor({ state: 'visible', timeout: 10000 });
      await expect(this.newPasswordField).toBeVisible();
      await this.newPasswordField.fill(newPassword);
      await this.updateSettingsButton.click();
    });
  }

  async clickLogoutButton() {
    await test.step(`Click the 'Logout' button`, async () => {
      await this.settingsLink.click();
      await this.logoutButton.click();
    }); 
  }
}
