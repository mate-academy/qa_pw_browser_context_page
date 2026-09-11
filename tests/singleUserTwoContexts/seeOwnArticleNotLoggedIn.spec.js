import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { HomePage } from '../../src/ui/pages/HomePage';

test('User can see own article in Global feed when not logged in', async ({
  page1,
  page2,
  user1,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);

  await signUpUser(page1, user1);
  await createArticle(page1, articleWithoutTags);

  await homePage.open();
  await homePage.clickFieldGlobalFeed();

  await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
});
