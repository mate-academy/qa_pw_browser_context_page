import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page.getByRole('link', { name: ' Edit Article' }).first()
    this.articleTitle = page.getByPlaceholder('Article Title');
    this.updateArticleButton = page.getByRole('button', {name: 'Update Article'});
  }

  async fillArticleTitleField(title) {
    await test.step('fill article title field', async () => {
      await this.articleTitle.fill(title);
    });
  }

  async clickUpdateArticleButton() {
    await test.step('click update article button', async () => {
      await this.updateArticleButton.click();
    });
  }

  async clickEditArticleButton() {
    await test.step('click edit article button', async () => {
      await this.editArticleButton.click();
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
