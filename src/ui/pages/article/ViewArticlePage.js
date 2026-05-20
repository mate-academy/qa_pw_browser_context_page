import { test, expect } from '@playwright/test';

export class ViewArticlePage {
    constructor(page) {
        this.page = page;
        this.articleTitleHeader = page.getByRole('heading');
        this.editButton = page.getByRole('link', { name: 'Edit Article', exact: false }).first();
    }

    authorLinkInArticleHeader(username) {
        return this.page.getByRole('link', { name: username, exact: false }).first();
    }

    url() {
        return this.page.url();
    }

    async clickEditArticle() {
        await this.editButton.click();
    }

    async open(url) {
        await test.step(`Open 'View Article' page`, async () => {
            await this.page.goto(url);
        });
    }

    async assertArticleTitleIsVisible(title) {
        await test.step(`Assert the article has correct title`, async () => {
            await expect(this.articleTitleHeader).toContainText(title);
        });
    }

    async assertArticleTitleChangedAndVisible(changedTitle) {
        await test.step(`Assert the changed article has correct title`, async () => {
            await expect(this.articleTitleHeader).toContainText(changedTitle);
        })
    }

    async assertArticleTextIsVisible(text) {
        await test.step(`Assert the article has correct text`, async () => {
            await expect(this.page.getByText(text)).toBeVisible();
        });
    }

    async assertArticleAuthorNameIsVisible(username) {
        await test.step(`Assert the article has correct author username`, async () => {
            await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
        });
    }
}
