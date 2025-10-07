import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { HomePage } from '../../src/ui/pages/HomePage';

test('User can see own article in Global Feed when logged out', async ({
  page1,
  page2,
  user,
  articleWithoutTags,
}) => {
  await signUpUser(page1, user);
  await createArticle(page1, articleWithoutTags);

  const homePage = new HomePage(page2);
  await homePage.open();
  await homePage.openGlobalFeed();

  await homePage.assertArticleVisible(articleWithoutTags.title);
});
