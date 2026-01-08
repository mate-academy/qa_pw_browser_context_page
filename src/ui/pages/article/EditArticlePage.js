import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.updateArticleButton = page.getByRole('button', { name: 'Update Article' });
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.clear();
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.clear();
      await this.descriptionField.fill(description);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.clear();
      await this.textField.fill(text);
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
      await this.page.waitForURL(/\/article\//);
      await this.page.waitForLoadState('networkidle');
    });
  }

  async updateArticle(updates) {
    await test.step(`Update article`, async () => {
      if (updates.title) {
        await this.fillTitleField(updates.title);
      }
      if (updates.description) {
        await this.fillDescriptionField(updates.description);
      }
      if (updates.text) {
        await this.fillTextField(updates.text);
      }
      await this.clickUpdateArticleButton();
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
