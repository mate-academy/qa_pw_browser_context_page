import { expect, test } from '@playwright/test';

export class HomePage {
    constructor(page) {
        this.page = page;
        this.yourFeedTab = page.getByText('Your Feed');
        this.globalFeedTab = page.getByText('Global Feed');
        this.newArticleLink = page.getByRole('link', { name: 'New Article' });
        this.userImg = page.getByAltText('your profile image');
        this.userPage = page.getByRole('listitem').filter({ has: this.userImg });
    }

    async open(){
        await test.step('open home page', async () => {
            await this.page.goto('')
        })
    }

    async clickUserProfile() {
        await test.step('clicked user profile', async () => {
            await this.userPage.click()
        })
    }

    articleTitleForAuthor(userName, articleTitleText) {
        const articleTitle = this.page.getByRole('link', { name: `Article title: ${articleTitleText}` })
        const articleAuthor = this.page.getByRole('link', { name: userName });

        const articlePreview = this.page.locator('div.article-preview')
            .filter({has: articleTitle})
            .filter({has: articleAuthor})
            .first()

        return articlePreview;
    }

    async followArticle(userName, articleTitleText) {
        await test.step('follow article', async () => {
            const currentArticle = this.articleTitleForAuthor(userName, articleTitleText);
            const followArticleButton = currentArticle.locator('button.btn.btn-sm').first();

            await followArticleButton.click();
        });
    }

    async clickCurrentUserProfile(userName, articleTitleText) {
        await test.step('click current user profile', async () => {
            const currentArticle = this.articleTitleForAuthor(userName, articleTitleText);
            const currentUserProfileLink = currentArticle.getByRole('link', { name: userName });

            await currentUserProfileLink.click();
        });
    }

    async assertArticleTitleIsVisibleForAuthor(userName, articleTitleText) {
        await test.step('Assert the article has correct title and author', async () => {
            await expect(this.articleTitleForAuthor(userName, articleTitleText)).toBeVisible()
        })
    }

    async assertNoArticlesForAuthor(userName, articleTitleText) {
        await test.step('Assert no article for the current author', async () => {
            await expect(this.articleTitleForAuthor(userName, articleTitleText)).not.toBeVisible()
        })
    }

    async clickNewArticleLink() {
        await test.step(`Click the 'New Article' link`, async () => {
            await this.newArticleLink.click();
        });
    }

    async assertYourFeedTabIsVisible() {
        await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
            await expect(this.yourFeedTab).toBeVisible();
        });
    }

    async openGlobalFeedTab() {
        await test.step('open global feed', async () => {
            await this.globalFeedTab.click();
        })
    }

    async openYourFeedTab() {
        await test.step('open your feed', async () => {
            await this.yourFeedTab.click();
        })
    }
}
