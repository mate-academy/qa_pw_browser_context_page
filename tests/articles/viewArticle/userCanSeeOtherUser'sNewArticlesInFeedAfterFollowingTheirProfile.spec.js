import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { expect } from '@playwright/test';

test.beforeEach(async ({ page, page2, user1, user2 }) => {
    await signUpUser(page, user1);
    await signUpUser(page2, user2);
});

test("User can see other user's new articles in 'Your Feed' after following their profile", async ({
    page,
    page2,
    articleWithoutTags,
    user1
}) => {
    test.setTimeout(180000);

    const homePage2 = new HomePage(page2);

    // Create an intermediate article so user1 appears in Global Feed
    await createArticle(page, articleWithoutTags);

    // Wait until user1 appears in Global Feed
    await expect(async () => {
        await page2.reload();
        await homePage2.openGlobalFeed();

        await expect(
            page2.locator('.author').filter({ hasText: user1.username })
        ).toBeVisible({ timeout: 10000 });
    }).toPass({
        intervals: [15000],
        timeout: 90000,
    });

    // Open user1's profile and follow them
    await homePage2.openAuthor(user1.username);
    await homePage2.followAuthor();

    // Create a new article after following user1
    const newArticle = {
        ...articleWithoutTags,
        title: `${articleWithoutTags.title} new`,
    };

    await createArticle(page, newArticle);

    // Open Your Feed
    await homePage2.openHomeMainPage();

    // Wait until the new article appears in Your Feed
    await expect(async () => {
        await page2.reload();
        await homePage2.openHomeMainPage();

        await expect(
            homePage2.getArticleByTitle(newArticle.title)
        ).toBeVisible({ timeout: 10000 });
    }).toPass({
        intervals: [15000],
        timeout: 60000,
    });
});