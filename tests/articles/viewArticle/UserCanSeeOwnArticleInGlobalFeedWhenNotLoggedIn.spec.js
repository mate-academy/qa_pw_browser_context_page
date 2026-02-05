import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, user1, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await createArticle(page1, articleWithoutTags);
});

test('User can see own article in "Global feed" when not logged in', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);

  
 


  await page2.goto('/');

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
