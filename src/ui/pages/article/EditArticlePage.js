import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsFiled = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
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

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
      await this.page.waitForURL('**/article/**');
      await this.page.reload();
    });
  }

  async submitEditArticleForm(article) {
    await test.step(`Submit the 'Edit Article' form`, async () => {
      await this.titleField.clear();
      await this.titleField.fill(article.title);
      await this.descriptionField.clear();
      await this.descriptionField.fill(article.description);
      await this.textField.clear();
      await this.textField.fill(article.text);
      // eslint-disable-next-line playwright/no-conditional-in-test
      if (article.tags) {
        for (let i = 0; i < article.tags.length; i++) {
          await this.tagsFiled.fill(article.tags[i]);
          await this.page.keyboard.press('Enter');
        }
      }
      await this.clickUpdateArticleButton();
    });
  }
}
