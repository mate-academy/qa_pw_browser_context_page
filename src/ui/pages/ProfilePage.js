import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.profileLink = (username) => page.getByRole('link', { name: username });
    this.editProfileButton = page.getByRole('link',
      { name: 'Edit Profile Settings' })
    this.articlePreview = page.locator('.article-preview');
    this.newPasswordField = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.getByRole('button',
      { name: 'Update Settings' });
  }

  async clickProfileLink(username) {
    await test.step(`Click the 'Profile' link`, async () => {
      await this.profileLink(username).click();
    });
  }

  async clickEditProfileButton() {
    await test.step(`Click the 'Edit Profile Settings' button`, async () => {
      await this.editProfileButton.click();
    });
  }

  async clickUpdateSettingsButton() {
    await test.step(`Click the 'Update Settings' button`, async () => {
      await this.updateSettingsButton.click();
    });
  }

  async fillNewPasswordField(password) {
    await test.step(`Fill the 'New Password' field`, async () => {
      await this.newPasswordField.fill(password);
    });
  }

  async assertArticleDescriptionVisible(description) {
    await test.step(`Assert that article description is visible`, async () => {
      await expect(this.articlePreview).toContainText(description);
    });
  }
}
