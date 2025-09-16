import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.locator('a.preview-link h1');
    this.articleDescription = page.locator('a.preview-link p');
    this.articleTags = page.locator('ul.tag-list > li');
    this.homeButton = page.getByRole('link', { name: 'Home' });
    this.settingsButton = page.getByRole('link', { name: 'Settings' });
    this.updateProfileButton = page.getByRole('button', {
      name: 'Update Settings',
    });
    this.logOutButton = page.getByRole('button', {
      name: 'Or click here to logout.',
    });
  }

  async open(username) {
    await test.step(`Open 'Profile' page for user: ${username}`, async () => {
      await this.page.goto(`/profile/${username.toLowerCase()}`);
    });
  }

  async clickFollowButton(username) {
    await test.step(`Click on the 'Follow' button`, async () => {
      await this.page
        .getByRole('button', { name: new RegExp(`Follow ${username}$`) })
        .click();
    });
  }

  async clickUnfollowButton(username) {
    await test.step(`Click on the 'Unfollow' button`, async () => {
      await this.page
        .getByRole('button', { name: new RegExp(`Unfollow ${username}$`) })
        .click();
    });
  }

  async clickHomeButton() {
    await test.step(`Click on the 'Home' button`, async () => {
      await this.homeButton.click();
    });
  }

  async clickSettingsButton() {
    await test.step(`Click on the 'Settings' button`, async () => {
      await this.settingsButton.click();
    });
  }

  async clickUpdateProfileButton() {
    await test.step(`Click on the 'Update Profile' button`, async () => {
      await this.updateProfileButton.click();
    });
  }

  async clickLogOutButton() {
    await test.step(`Click on the 'Log Out' button`, async () => {
      await this.logOutButton.click();
    });
  }

  async assertArticleTitleContainsText(title) {
    await test.step(`Article 'Title' is shown`, async () => {
      await expect(this.articleTitle).toContainText(title);
    });
  }

  async assertArticleDescriptionContainsText(description) {
    await test.step(`Article 'Description' is shown`, async () => {
      await expect(this.articleDescription).toContainText(description);
    });
  }

  async assertTagsAreVisible(expectedTags) {
    const tagsLocator = this.articleTags;
    if (expectedTags.length === 0) {
      await test.step('Tags are not visible', async () => {
        await expect(tagsLocator).toHaveCount(0);
      });
      return;
    }

    await test.step('All tags are visible', async () => {
      const tagsCount = await tagsLocator.count();
      const actualTags = [];

      for (let i = 0; i < tagsCount; i++) {
        const tagText = await tagsLocator.nth(i).textContent();
        actualTags.push(tagText.trim());
      }

      for (const expectedTag of expectedTags) {
        expect(actualTags).toContain(expectedTag);
      }
    });
  }
}
