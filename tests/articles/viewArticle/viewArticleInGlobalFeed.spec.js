import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, user1, articleWithoutTags }) => {
  await signUpUser(page1, user1);

  await createArticle(page1, articleWithoutTags);
});

test('View own article in Global Feed from anonymous tab', async ({
  user1,
  page1,
  articleWithoutTags,
  browser
}) => {
  const viewArticlePage = new ViewArticlePage(page1);
  

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);

  const newContext = await browser.newContext();
  const pageNewContext = await newContext.newPage();
  const homePage = new HomePage(pageNewContext);

  await homePage.openMainPage();
  await homePage.assertYourFeedTabIsHidden();
  await homePage.reloadHomePage();
  await homePage.assertArticleIsVisible(articleWithoutTags.title);

});
