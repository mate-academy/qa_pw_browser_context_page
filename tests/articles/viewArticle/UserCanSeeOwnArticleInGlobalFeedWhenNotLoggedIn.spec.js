/* eslint-disable max-len */
import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';


test.beforeEach(async ({ page1, user, articleWithoutTags }) => {
  await signUpUser(page1, user);
  await createArticle(page1, articleWithoutTags);
});

test('User can see own article in the global feed when not logged in', async ({
  page2,
  user,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  const viewArticlePage = new ViewArticlePage(page2);
  
  await viewArticlePage.open(articleWithoutTags.url);

  await homePage.clickHomePageLink();
  await homePage.clickGlobalFeedTab();
  await homePage.clickHomePageLink();
  await homePage.assertGlobalFeedIsSelected();
  await homePage.assertArticleInFeedIsVisible(articleWithoutTags.title, user.username);
  
});
