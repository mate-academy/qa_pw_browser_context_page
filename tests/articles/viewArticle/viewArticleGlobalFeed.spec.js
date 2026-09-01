import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import {EditArticlePage} from "../../../src/ui/pages/article/EditArticlePage";
import {HomePage} from "../../../src/ui/pages/HomePage";

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('User can view an article created by another user in the Global Feed.', async ({
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


test('User can see own article in "Global Feed" when logged out.', async ({
  page1,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page1);

  await homePage.clickLogoutButton();
  await page1.goto('/');
  await homePage.assertGlobalFeedTabIsVisible();
  await homePage.assertArticleTitleInGlobalFeedIsVisible(articleWithoutTags.title);
});
