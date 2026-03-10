import { expect, test } from "@playwright/test";

export class UserProfile {
  constructor(page) {
    this.page = page;
    this.settingsLink = page.getByRole('link', {
      name: 'Settings'
    });
    this.passwordField = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.getByRole('button', {
      name: 'Update Settings'
    });

  }

  async openProfileSettingsPage() {
    await test.step(`Open profile settings page`, async() => {
      await this.settingsLink.click();
    })
  }

  async fillPasswordField(password) {
    await test.step(`Fill password field with ${password}`, async() => {
      await this.passwordField.fill(password);
    })
  }

  async clickUpdateSettingsButton() {
    await test.step(`Click 'Update Settings' button`, async() => {
      await this.updateSettingsButton.click();
    })
  }

  async assertUsernameIsVisible(username) {
    await test.step(`Username ${username} is visible`, async () => {
      await expect(this.page.getByRole('heading', 
        {name: username})).toBeVisible();
    })
  }
}