import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View an article created by another user', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
});

test('User can view an article created by another user in the Global Feed', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);

  await page2.goto('/');
  await homePage.clickGlobalFeedLink();

  await homePage.assertTitleAtGlobalFeedIsVisible(articleWithoutTags.title);
  await homePage.assertDescriptionAtGlobalFeedIsVisible(
    articleWithoutTags.title,
    articleWithoutTags.description
  );
  await homePage.assertArticleAuthorAtGlobalFeedIsVisible(
    articleWithoutTags.title,
    user1.username
  );
});

test('User can follow the article created by another user', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.followUserLinkClick(user1.username);
  await viewArticlePage.unFollowUserLinkToBeVisible(user1.username);
});

test('User can unfollow the article created by another user', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.followUserLinkClick(user1.username);
  await viewArticlePage.unFollowUserLinkToBeVisible(user1.username);

  await viewArticlePage.unFollowUserLinkClick(user1.username);
  await viewArticlePage.followUserLinkToBeVisible(user1.username);
});

test('User can view an article updated by another user', async ({
  page2,
  user1,
  page1,
  articleWithOneTag,
  articleWithoutTags,
}) => {
  const viewArticlePageUser1 = new ViewArticlePage(page1);
  const editArticlePage = new EditArticlePage(page1);
  const viewArticlePageUser2 = new ViewArticlePage(page2);

  await viewArticlePageUser1.clickArticleEditButton();
  await editArticlePage.fillTitleField(articleWithOneTag.title);
  await editArticlePage.fillDescriptionField(articleWithOneTag.description);
  await editArticlePage.fillTextField(articleWithOneTag.text);
  await editArticlePage.clickupdateButton();

  await viewArticlePageUser2.open(articleWithoutTags.url);

  await viewArticlePageUser2.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePageUser2.assertArticleTextIsVisible(articleWithOneTag.text);
  await viewArticlePageUser2.assertArticleAuthorNameIsVisible(user1.username);
});

test('User can see other user\'s new articles in "Your Feed" after following their profile', async ({
  page2,
  user1,
  newArticleWithoutTags,
  page1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const homePage = new HomePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.followUserLinkClick(user1.username);
  await viewArticlePage.unFollowUserLinkToBeVisible(user1.username);

  await createArticle(page1, newArticleWithoutTags);

  await page2.goto('/');
  await homePage.yourFeedTab.click();

  await homePage.assertTitleAtGlobalFeedIsVisible(newArticleWithoutTags.title);
  await homePage.assertDescriptionAtGlobalFeedIsVisible(
    newArticleWithoutTags.title,
    newArticleWithoutTags.description
  );
  await homePage.assertArticleAuthorAtGlobalFeedIsVisible(
    newArticleWithoutTags.title,
    user1.username
  );
});

test('User doesn\'t see other user\'s articles in "Your Feed" after unfollowing their profile', async ({
  page2,
  user1,
  newArticleWithoutTags,
  page1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const homePage = new HomePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.followUserLinkClick(user1.username);
  await viewArticlePage.unFollowUserLinkToBeVisible(user1.username);

  await viewArticlePage.unFollowUserLinkClick(user1.username);
  await viewArticlePage.followUserLinkToBeVisible(user1.username);

  await createArticle(page1, newArticleWithoutTags);

  await page2.goto('/');
  await homePage.yourFeedTab.click();

  await homePage.assertArticleIsNotPresentAtFeed(newArticleWithoutTags.title);
});
