import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { UserProfilePage } from '../../../src/ui/pages/userProfile/UserProfilePage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { openCurrentUserProfileByCreatedArticle } from '../../../src/ui/actions/articles/openCurrentUserProfile';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
    await signUpUser(page1, user1);
    await signUpUser(page2, user2);

    await createArticle(page1, articleWithoutTags);
});

test('View an article created by another user after following other user profile',
    async ({ articleWithoutTags, user1, page2 },
    ) => {
        const userPage = new UserProfilePage(page2);
        const homePage = new HomePage(page2);

        await openCurrentUserProfileByCreatedArticle(homePage, user1.username, articleWithoutTags.title);
        await userPage.followOrUnfollowUserProfile()

        await homePage.open()
        await homePage.openYourFeedTab()
        await homePage.assertArticleTitleIsVisibleForAuthor(user1.username, articleWithoutTags.title);
    },
);

test('No article by another user after unfollowing other user profile',
    async ({ articleWithoutTags, user1, page2 },
    ) => {
        const userPage = new UserProfilePage(page2);
        const homePage = new HomePage(page2);

        await openCurrentUserProfileByCreatedArticle(homePage, user1.username, articleWithoutTags.title);
        await userPage.followOrUnfollowUserProfile()

        await homePage.open()
        await homePage.openYourFeedTab()
        await homePage.clickCurrentUserProfile(user1.username, articleWithoutTags.title)
        await userPage.followOrUnfollowUserProfile()

        await homePage.open()
        await homePage.openYourFeedTab()

        await homePage.assertNoArticlesForAuthor(user1.username, articleWithoutTags.title);
    },
);