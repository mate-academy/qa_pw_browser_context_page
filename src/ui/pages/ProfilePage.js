import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.followButton = page.getByRole('button', { name: /follow/i });
  }

  articleLinkInList(title) {
    return this.page.getByRole('link', { name: title });
  }

  async open(username) {
    await test.step(`Open profile page`, async () => {
      await 
      this.page.goto(`/profile/${encodeURIComponent(username.toLowerCase())}`);
    });
  }

  async clickFollowButton() {
    await test.step(`Click the 'Follow' button on profile`, async () => {
      await this.followButton.click();
    });
  }

  async assertFollowButtonHasText(text) {
    const stepName = `Assert the profile follow button shows '${text}'`;

    await test.step(stepName, async () => {
      await expect(this.followButton).toContainText(text, { timeout: 10000 });
    });
  }

  async assertArticleIsVisible(title) {
    const stepName = `Assert the '${title}' article is visible in profile`;

    await test.step(stepName, async () => {
      await expect(this.articleLinkInList(title)).toBeVisible();
    });
  }
}