import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.updateArticleButton = page.getByRole('button', 
      {name: 'Update Article'}
    );
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

  async changeArticleTitleField(newArticleTitle) {
    await test.step(`Change current article title to ${newArticleTitle}`, 
      async() => {
        await this.articleTitleField.clear();
        await this.articleTitleField.fill(newArticleTitle);
      })
  }

  async clickUpdateArticleButton() {
    await test.step(`Click 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    })
  }
}
