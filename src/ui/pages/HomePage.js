import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  async open() {
    await test.step(`Open 'Home' page`, async () => {
      await this.page.goto('/', { waitUntil: 'commit' });
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

  async clickYourFeedTab() {
    await test.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article with title '${title}' is visible`, async () => {
      await expect(this.page.getByText(title)).toBeVisible();
    });
  }

  async assertArticleTitleIsNotVisible(title) {
    await test.step(`Assert the article with title '${title}' is not visible`, async () => {
      await expect(this.page.getByText(title)).toBeHidden();
    });
  }

  async clickOnArticleWithTitle(title) {
    await test.step(`Click on article with title '${title}'`, async () => {
      await this.page.getByText(title).click();
    });
  }

  async goToProfileSettings() {
    await test.step(`Go to profile settings`, async () => {
      await this.page.getByRole('link', { name: 'Settings' }).click();
    });
  }

  async fillNewPasswordField(password) {
    await test.step(`Fill the 'New Password' field`, async () => {
      await this.page.getByPlaceholder('New Password').fill(password);
    });
  }

  async clickUpdateSettingsButton() {
    await test.step(`Click the 'Update Settings' button`, async () => {
      await this.page.getByRole('button', { name: 'Update Settings' }).click();
    });
  }

  async clickLogoutButton() {
    await test.step(`Click the 'Logout' button`, async () => {
      await this.page
        .getByRole('button', { name: 'Or click here to logout.' })
        .click();
    });
  }
}
