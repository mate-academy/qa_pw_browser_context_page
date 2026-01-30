import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { updateArticle } from '../../../src/ui/actions/articles/updateArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('User can view an article updated by another user', async ({
  page1,
  page2,
  user1,
  user2,
  articleWithoutTags,
  articleWithOneTag,
  viewArticlePage
}) => {
  const homePage = new HomePage(page2);
  const viewArticlePage2 = new ViewArticlePage(page2);

  await viewArticlePage2.open(articleWithoutTags.url);

  await viewArticlePage2.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage2.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage2.assertArticleAuthorNameIsVisible(user1.username);

  const viewArticlePage1 = new ViewArticlePage(page1);
  await viewArticlePage1.open(articleWithoutTags.url);
  await viewArticlePage1.clickOnEditBtn();
  await updateArticle(page1, articleWithOneTag);

  await viewArticlePage2.open(articleWithoutTags.url);
  await viewArticlePage2.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage2.assertArticleTextIsVisible(articleWithOneTag.text);
  await homePage.assertUsernameIsVisible(user2.username);
});
