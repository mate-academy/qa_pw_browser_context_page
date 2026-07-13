import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let article;

test.beforeEach(async ({ page, page2, user, user2, articleWithoutTags }) => {
  await signUpUser(page, user);

  await signUpUser(page2, user2);

  article = await createArticle(page, articleWithoutTags);
});

test(
  'User can view an article created by another user in the Global Feed',
  async ({
  homePage2
}) => {
  await homePage2.open();
  await homePage2.clickGlobalFeedTab();

  await homePage2.assertArticleIsVisibleInGlobalFeed(article.title);
});
