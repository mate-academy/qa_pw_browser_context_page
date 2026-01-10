import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.UpdateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.editArticleButton = page
      .getByRole('button')
      .filter({ hasText: 'Edit Article' })
      .first();
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

  async updateTitleAndText(newTitle, newText) {
    await this.titleField.fill(newTitle);
    await this.textField.fill(newText);
    await this.UpdateArticleButton.click();
  }
}
