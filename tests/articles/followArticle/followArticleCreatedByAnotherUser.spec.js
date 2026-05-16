import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { FavoriteArticlesPage } from '../../../src/ui/pages/userProfile/FavoriteArticlesPage';
import { followArticle } from '../../../src/ui/actions/articles/followArticle';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
    await signUpUser(page1, user1);
    await signUpUser(page2, user2);

    await createArticle(page1, articleWithoutTags);
});

test('follow article created by another user', async ({page2, user2, user1, articleWithoutTags}) => {
    const favoriteArticlesPage = new FavoriteArticlesPage(page2);

    await followArticle(page2, user1, articleWithoutTags);

    await favoriteArticlesPage.open(user2.username)
    await favoriteArticlesPage.checkFollowedArticle(articleWithoutTags.title)
})

test('unfollow article created by another user', async ({page2, user2, user1, articleWithoutTags}) => {
    const favoriteArticlesPage = new FavoriteArticlesPage(page2);

    await followArticle(page2, user1, articleWithoutTags);

    await favoriteArticlesPage.open(user2.username)
    await favoriteArticlesPage.unfollowArticle(user1.username, articleWithoutTags.title);
    await page2.reload();

    await favoriteArticlesPage.checkArticleUnfollowed(articleWithoutTags.title);
})