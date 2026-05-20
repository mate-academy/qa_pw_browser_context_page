import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { UserProfilePage } from '../../src/ui/pages/userProfile/UserProfilePage';
import { UserSettingsPage } from '../../src/ui/pages/userProfile/UserSettingsPage';

test('createdArticleExistsAfterLogOut', async ({page1, user1, articleWithoutTags, homePage }) => {
    const userProfile = new UserProfilePage(page1)
    const userSettingsPage = new UserSettingsPage(page1)

    await signUpUser(page1, user1);
    await createArticle(page1, articleWithoutTags);

    await homePage.clickUserProfile()
    await userProfile.clickEditProfileSettings()

    await userSettingsPage.clickLogout()
    await homePage.assertArticleTitleIsVisibleForAuthor(user1.username, articleWithoutTags.title);
})