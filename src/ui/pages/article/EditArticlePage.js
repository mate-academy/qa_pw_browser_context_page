import { test, expect } from '@playwright/test';
import { 
  generateNewTitle, 
  generateNewDescr, 
  generateNewText 
} from '../../../common/testData/generateNewArticleData';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.articleTitle = page.getByPlaceholder('Article Title');
    this.articleDescr = page.getByPlaceholder("What's this article about?");
    this.articleText = page
    .getByPlaceholder('Write your article (in markdown)');
    this.updateArticleButton = page.getByRole('button', { name: 'Update Article', exact : true});
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

  async editArticleTitle() {
    return test.step(`Edit article title`, async() => {
      const newTitle = generateNewTitle()
      await this.articleTitle.fill(newTitle);
      return newTitle;
    });
  }

  async editArticleDescr() {
    return test.step(`Edit article description`, async() => {
      const newDescr = generateNewDescr();
      await this.articleDescr.fill(newDescr);
      return newDescr;
    });
  }

  async editArticleText() {
    return test.step(`Edit article text`, async() => {
      const newText = generateNewText();
      await this.articleText.fill(newText);
      return newText;
    });
  }

  async updateArticle() {
    await test.step(`Click on the 'Update Article' button`, async() => {
      await this.updateArticleButton.click();
    });
  }
}