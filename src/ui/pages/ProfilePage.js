import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.usernameHeader = this.page.locator('h4');
  }

  async assertUsernameIsVisible(username) {
    await test.step(`Assert that the username is visible: ${username}`, async () => {
      await expect(this.usernameHeader.filter({hasText: username})).toBeVisible();
    });
  }
}
