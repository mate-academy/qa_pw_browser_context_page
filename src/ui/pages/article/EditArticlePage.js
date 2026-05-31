import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.updatedDataButton = page.getByRole('button', { name: 'Update Article' });
    this.titleField = page.getByRole('textbox', { name: 'Article Title' });
    this.descriptionField = page.getByRole('textbox', { name: 'What\'s this article about?' });
    this.textField = page.getByRole('textbox', { name: 'Write your article (in markdown)' });
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
 
  async clickUpdateButton() {
    await test.step(`Click 'Update Article' button`, async () => {
      await this.updatedDataButton.click();
    
    });
  }

async fillTitleField(title){
 await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);

 });
 }

 async fillDescriptionField(description){
  await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
 }

 async fillTextField(text){
  await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
 }

}

