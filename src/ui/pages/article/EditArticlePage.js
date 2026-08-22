import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.updateButton = page.getByRole('button', {
      name: 'Update',
    });
    this.removeTagButtons = page.locator('div.tag-list i.ion-close-round');
    this.errorMessage = page.locator('ul.error-messages');
    this.articleTitleHeader = page.getByRole('heading');
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
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

  async fillTagsField(tags) {
    await test.step(`Fill the 'Tags' field`, async () => {
      for (const tag of tags) {
        await this.tagsField.fill(tag);
        await this.tagsField.press('Enter');
      }
    });
  }

  async clickUpdateButton() {
    await test.step(`Click 'Update Article' button`, async () => {
      await this.updateButton.click();
    });
  }

  async removeArticleDescription() {
    await test.step(`Remove the 'Description'`, async () => {
      await this.descriptionField.clear();
    });
  }

  async removeArticleBody() {
    await test.step(`Remove the 'Text'`, async () => {
      await this.textField.clear();
    });
  }

  async removeArticleTitle() {
    await test.step(`Remove the 'Title'`, async () => {
      await this.titleField.clear();
    });
  }

  async clickRemoveTagButton(index = 0) {
    await test.step(`Click 'Remove Tag' button`, async () => {
      await this.removeTagButtons.nth(index).click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
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
