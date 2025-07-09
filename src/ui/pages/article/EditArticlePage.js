import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.articleDescriptionField = page.getByPlaceholder(
      'What\'s this article about?'
    );
    this.articleTextField = page.getByPlaceholder(
      'Write your article (in markdown)'
    );
    this.articleTagsField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole(
      'button', { name: 'Update  Article' }
    );

  }

   async clickUpdateArticleButton() {
    await test.step('Click update article button', async () => {
      await this.updateArticleButton.click()
    });
  }

  async updateArticle(newArticleData) {
    const articleMethodsObject = {
      title: this.articleTitleField,
      description: this.articleDescriptionField,
      text: this.articleTextField,
      tags: this.articleTagsField,
    };

    await test.step('Update article data', async () => {
      for (const articleKey in newArticleData) {
        if ( !( typeof newArticleData[articleKey] === 'string' ) ) {
          continue;
        }
        await articleMethodsObject[articleKey].fill(
          newArticleData[articleKey]
        );
      }
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
