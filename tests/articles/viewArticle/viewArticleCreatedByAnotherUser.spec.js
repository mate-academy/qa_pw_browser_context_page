import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../../src/ui/pages/article/CreateArticlePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View an article created by another user', async ({
  page2,
  user2,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user2.username);
});

test('View an article created by another user in the Global Feed', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  const viewArticlePage = new ViewArticlePage(page2);

  await homePage.open();
  await homePage.clickGlobalFeedTab();
  await homePage.clickArticleTitle(articleWithoutTags.title);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
});

test('User can follow the article created by another user', async ({
  page2,
  articleWithoutTags
}) => {
  const homePage = new HomePage(page2);
  const viewArticlePage = new ViewArticlePage(page2);

  await homePage.open();
  await homePage.clickGlobalFeedTab();
  await homePage.clickArticleTitle(articleWithoutTags.title);

  await viewArticlePage.assertFollowButtonIsVisible();

  await viewArticlePage.clickFollowAuthorButton();

  await viewArticlePage.assertUnfollowButtonIsVisible();
});

test('User can unfollow the article created by another user', async ({
  page2,
  articleWithoutTags
}) => {
  const homePage = new HomePage(page2);
  const viewArticlePage = new ViewArticlePage(page2);

  await homePage.open();
  await homePage.clickGlobalFeedTab();
  await homePage.clickArticleTitle(articleWithoutTags.title);

  await viewArticlePage.assertFollowButtonIsVisible();

  await viewArticlePage.clickFollowAuthorButton();

  await viewArticlePage.assertUnfollowButtonIsVisible();

  await viewArticlePage.clickUnfollowAuthorButton();

  await viewArticlePage.assertFollowButtonIsVisible();
});

test('User can view an article updated by another user', async ({
  page2,
  page1,
}) => {

  const viewArticlePageUser1 = new ViewArticlePage(page1);
  const createArticlePageUser1 = new CreateArticlePage(page1);

  const homePageUser2 = new HomePage(page2);
  const viewArticlePageUser2 = new ViewArticlePage(page2);

  const newTitle = 'New new';

  await viewArticlePageUser1.clickEditArticleButton();
  await createArticlePageUser1.fillTitleField(newTitle);
  await createArticlePageUser1.clickUpdateButton();

  await homePageUser2.open();
  await homePageUser2.clickGlobalFeedTab();
  await homePageUser2.clickArticleTitle(newTitle);

  await viewArticlePageUser2.assertArticleTitleIsVisible(newTitle);
});

test("User can see other user's new articles in 'Your Feed' " +
    'after following their profile', 
  async ({
  page2,
  page1,
  articleWithoutTags, 
}) => {
  const homePage = new HomePage(page2);
  const viewArticlePage = new ViewArticlePage(page2);

  const newArticle = {
      ...articleWithoutTags,
      title: 'New Feed Article ' + Date.now(),
    };

  await homePage.open();

  await homePage.clickGlobalFeedTab();
  await homePage.clickArticleTitle(articleWithoutTags.title);
  await viewArticlePage.clickFollowAuthorButton();

  await createArticle(page1, newArticle);

  await homePage.open();
  await homePage.clickGlobalFeedTab();

  await homePage.assertArticleIsVisibleInFeed(newArticle.title);
});

test("User doesn't see other user's articles in 'Your Feed'" +
   "after unfollowing their profile", async ({
  page2,
  articleWithoutTags
}) => {
  const homePage = new HomePage(page2);
  const viewArticlePage = new ViewArticlePage(page2);

  await homePage.open();

  await homePage.clickGlobalFeedTab();
  await homePage.clickArticleTitle(articleWithoutTags.title);
  await viewArticlePage.clickFollowAuthorButton();

  await homePage.open();
  await homePage.clickYourFeedTab();
  await homePage.assertArticleIsVisibleInFeed(articleWithoutTags.title);

  await homePage.clickArticleTitle(articleWithoutTags.title);
  
  await viewArticlePage.clickUnfollowAuthorButton();
  await homePage.open();
  await homePage.clickYourFeedTab();

  await homePage.assertArticleIsNotVisibleInFeed(
    articleWithoutTags.title)
});
