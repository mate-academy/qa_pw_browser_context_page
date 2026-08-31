import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleLink = page.getByRole('link', { name: 'Edit Article' }).first();
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
  }

  async open(articleUrl) {
    await test.step(`Open the article and switch to edit mode`, async () => {
      await this.page.goto(articleUrl);
      await this.editArticleLink.click();
    });
  }

  async fillTitleField(title) {
    await test.step(`Fill the updated title`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the updated text`, async () => {
      await this.textField.fill(text);
    });
  }

  async updateArticle(newTitle, newText) {
    await test.step(`Update the article`, async () => {
      await this.fillTitleField(newTitle);
      await this.fillTextField(newText);
      await this.publishArticleButton.click();
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
