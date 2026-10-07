import { expect, test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async submitEditArticleForm(article) {
    await test.step(`Submit the 'Edit Article' form`, async () => {
      await this.fillTitleField(article.title);
      await this.fillDescriptionField(article.description);
      await this.fillTextField(article.text);
      await this.clickUpdateArticleButton();
    });
  }

  async assertArticleTitle(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.page.getByRole('heading')).toContainText(title);
    });
  }

  async assertArticleText(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
}
