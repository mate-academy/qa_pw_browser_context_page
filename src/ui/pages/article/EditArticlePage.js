import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading', { level: 1 });
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.updateArticleButton = page.getByRole('button', {
      name: /(Update|Publish) Article/,
    });
  }

  async submitEditArticleForm(article) {
    await test.step(`Submit the 'Edit Article' form`, async () => {
      // wait until the form is prefilled with the current article data,
      // otherwise the async load overwrites our input
      await expect(this.titleField).not.toHaveValue('');
      await this.titleField.fill(article.title);
      await this.descriptionField.fill(article.description);
      await this.textField.fill(article.text);
      await this.updateArticleButton.click();

      // wait for redirect from /editor/... to /article/... after saving
      await this.page.waitForURL(/\/article\//);
      // the view page shows a cached version, so reload to get fresh data
      await this.page.reload();
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
