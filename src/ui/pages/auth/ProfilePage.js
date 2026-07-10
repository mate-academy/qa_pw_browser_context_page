import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
  }

  authorizedUserName(username) {
    return this.page.getByRole('heading', { name: username });
  }

  async assertAuthorizedUserNameIsVisible(username) {
    const lowerCaseUsername = username.toLowerCase();

    await test.step(`Assert the authorized ${lowerCaseUsername} is visible`, async () => {
      await expect(this.authorizedUserName(lowerCaseUsername)).toContainText(
        lowerCaseUsername,
      );
    });
  }
}
