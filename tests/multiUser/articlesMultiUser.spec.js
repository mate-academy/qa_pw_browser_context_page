import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('User can view an article created by another user in the Global Feed.', async ({
  page2,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  const viewArticlePage = new ViewArticlePage(page2);

  await homePage.open();
  await homePage.clickFieldGlobalFeed();

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
});

test('User can view an article updated by another user.', async ({
  page1,
  page2,
  articleWithoutTags,
  logger,
}) => {
  const editArticlePage = new EditArticlePage(page1);
  const viewArticlePage1 = new ViewArticlePage(page1);
  const viewArticlePage2 = new ViewArticlePage(page2);

  // Генеруємо динамічні унікальні дані для оновлення статті
  const updatedArticleData = generateNewArticleData(logger);

  await viewArticlePage1.open(articleWithoutTags.url);
  await viewArticlePage1.clickEditArticleButton();
  await editArticlePage.editArticleTitleField(updatedArticleData.title);
  await editArticlePage.editArticleTextField(updatedArticleData.text);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage2.open(articleWithoutTags.url);
  await viewArticlePage2.assertArticleTitleIsVisible(updatedArticleData.title);
  await viewArticlePage2.assertArticleTextIsVisible(updatedArticleData.text);
});

test('User can follow the article created by another user', async ({
  page2,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickFavoriteArticleButton();
  await viewArticlePage.assertArticleIsFavorited();
});

test('User can unfollow the article created by another user', async ({
  page2,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickFavoriteArticleButton();
  await viewArticlePage.clickFavoriteArticleButton();
  await viewArticlePage.assertArticleIsNotFavorited();
});
