import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeedTab = page.getByText('Global Feed');
    this.settingButton = page.getByRole('link', { name: '  Settings' });
    this.newPasswordInput = page.getByPlaceholder('New Password');
    this.updateSettings = page.getByRole('button', { name: 'Update Settings' });
    this.logoutTab = page.getByRole('button', 
      { name: 'Or click here to logout.' });
    this.signInTab = page.getByRole('link', { name: 'Sign in' });
  }

  async open() {
  await test.step(`Open Home Page`, async () => {
    await this.page.goto('/');
  });
}

  async clickGlobalFeedTab() {
    await test.step(`Click 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async clickSignInTab() {
    await test.step(`Click 'Sign In' tab`, async () => {
      await this.signInTab.click();
    });
  }

  async clickLogoutTab() {
    await test.step(`Click 'Or click here to logout.' tab`, async () => {
      await this.logoutTab.click();
    })
  }

  async clickUpdateSettingsButton() {
    await test.step(`Click 'Update Settings' tab`, async () => {
      await this.updateSettings.click();
    })
  }

  async clickYourFeedTab() {
    await test.step(`Click 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async clickArticleTitle(title) {
    await test.step(`Click article title '${title}' in feed`, async () => {
      await this.page.getByRole('heading', { name: title }).click();
    });
  }

  async clickSettingButton() {
    await test.step(`Click 'Setting' button`, async () => {
      await this.settingButton.click();
    })
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async fillNewPassword(password) {
    await test.step(`Fill the 'New Password' field`, async () => {
      await this.newPasswordInput.fill(password);
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertYourProfileIsVisible() {
    await test.step(`Assert the 'Name' tab is visible`, async () => {
      await expect(this.page.getByRole('link', 
        { name: /^your profile image/ })).toBeVisible();
    });
  }
}
