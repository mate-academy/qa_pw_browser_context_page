import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
  }

  articleLinkInList(title) {
    return this.page.getByRole('link', { name: title });
  }

   async open(username) {
    await test.step(`Open profile page`, async () => {
      await this.page.goto(`/profile/${encodeURIComponent(username)}`);
    });
  }

  async assertArticleIsVisible(title) {
    const stepName = `Assert the '${title}' article is visible in profile`;

    await test.step(stepName, async () => {
      await expect(this.articleLinkInList(title)).toBeVisible();
    });
  }
}
