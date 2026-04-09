import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View an article edited by another user', async ({
  page1,
  page2,
  user1,
  articleWithoutTags,
  articleWithOneTag,
}) => {
  const viewArticlePageOnPage1 = new ViewArticlePage(page1);
  const viewArticlePageOnPage2 = new ViewArticlePage(page2);
  const editArticlePage = new EditArticlePage(page1);
  const homePage1 = new HomePage(page1);
  const homePage2 = new HomePage(page2);

  await homePage2.open(articleWithoutTags.url);

  await viewArticlePageOnPage2.
  assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePageOnPage2.
  assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePageOnPage2.assertArticleAuthorNameIsVisible(user1.username);

  await homePage1.open(articleWithoutTags.url);
  await viewArticlePageOnPage1.editArticleButtonClick();
  await editArticlePage.fillTitleField(articleWithOneTag.title);
  await editArticlePage.clickUpdateArticleButton();

  await homePage2.globalFeedClick();
  await homePage2.openArticle(articleWithOneTag.title);

  await viewArticlePageOnPage2.
  assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePageOnPage2.
  assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePageOnPage2.assertArticleAuthorNameIsVisible(user1.username);
});