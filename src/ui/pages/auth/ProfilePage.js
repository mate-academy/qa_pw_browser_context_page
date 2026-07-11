import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.settingsLink = page.getByRole('link', { name: 'Settings' }).first();
  }

  async clickSettingsLink() {
    await test.step(`click settings link`, async () => {
      await this.settingsLink.click();
    });
  }

  authorizedUserName(username) {
    return this.page.getByRole('heading', { name: username });
  }

  async assertAuthorizedUserNameIsVisible(username) {
    const lowerCaseUsername = username.toLowerCase();

    await test.step(
      `Assert the authorized ${lowerCaseUsername} is visible`,
      async () => {
      await expect(this.authorizedUserName(lowerCaseUsername))
      .toContainText(
        lowerCaseUsername,
      );
    });
  }
}
