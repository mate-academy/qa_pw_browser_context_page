import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
  }

  async updateArticleTitle(title) {
    await test.step(`Update the article title'`, async () => {
      await this.articleTitleField.fill(title);
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click on "Update Article" button'`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async assertArticleTitle(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleText(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
}
