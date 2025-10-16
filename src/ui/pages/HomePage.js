import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.conduitLogo = page.getByRole('link', {name: 'conduit'}).first();
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeed = page.getByText('Global Feed');
    this.noArticlesText = page.getByText('No articles are here... yet.');
    this.settingsButton = page.getByRole('link', {name: ' Settings'});
    this.newPasswordField = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.getByRole('button', {name: 'Update Settings'});
    this.logoutButton = page.getByRole('button', {name: 'Or click here to logout.'});
  }

  async clickLogoutButton() {
    test.step('click logout button', async () => {
      await this.logoutButton.click();
    });
  }

  async clickUpdateSettingsButton() {
    test.step('click update settings button', async () => {
      await this.updateSettingsButton.click();
    });
  }

  async fillNewPasswordField(password) {
    test.step('fil new password', async () => {
      await this.newPasswordField.fill(password);
    });
  }

  async clickSettingsButton() {
    test.step('click settings button', async () => {
      await this.settingsButton.click();
    });
  }

  async clickConduitLogo() {
    test.step('click conduit logo icon', async () => {
      await this.conduitLogo.click();
    });
  }

  async clickGlobalFeed() {
    await test.step('click global feed', async () => {
      await this.globalFeed.click();
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

  async assertNoArticlesTextIsVisible() {
    await test.step('Assert no article text is visible', async () => {
      await expect(this.noArticlesText).toBeVisible();
    })
  }
}
