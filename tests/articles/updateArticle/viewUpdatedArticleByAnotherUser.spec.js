import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, page2, user1, user2 }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);
});

test.describe('View updated article created by another user', () => {
  test('Another user can view the updated article', async ({
    page1,
    page2,
    user1,
    articleWithoutTags,
  }) => {
    // User 1 creates article
    await createArticle(page1, articleWithoutTags);

    // User 1 edit article
    const user1ViewArticlePage = new ViewArticlePage(page1);
    const editArticlePage = new EditArticlePage(page1);
    await user1ViewArticlePage.open(articleWithoutTags.url);
    await user1ViewArticlePage.clickEditArticleButton();
    await editArticlePage.fillTitleField(articleWithoutTags.newTitle);
    await editArticlePage.clickUpdateButton();

    // User 2 views the updated article
    const user2ViewArticlePage = new ViewArticlePage(page2);
    await user2ViewArticlePage.open(articleWithoutTags.url);
    await user2ViewArticlePage.assertArticleTitleIsVisible(
      articleWithoutTags.newTitle,
    );
    await user2ViewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
  });
});
