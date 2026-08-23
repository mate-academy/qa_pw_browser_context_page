import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.titleField = page.getByPlaceholder('Article Title');
    this.textField = page.getByPlaceholder(
      'Write your article (in markdown)',
    );
    this.publishButton = page.getByRole('button', {
      name: 'Update Article',
    });
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }

  async clickPublishButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.publishButton.click();
    });
  }

  async submitEditArticleForm(article) {
    await test.step(`Update the article`, async () => {
      await this.fillTitleField(article.title);
      await this.fillTextField(article.text);
      await this.clickPublishButton();
    });
  }

  async assertArticleTitle(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleText(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
}
