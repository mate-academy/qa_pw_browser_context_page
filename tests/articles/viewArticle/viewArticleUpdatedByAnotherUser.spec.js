import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { editArticle } from '../../../src/ui/actions/articles/editArticle';
import { HomePage } from '../../../src/ui/pages/HomePage';


test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);
  
  await createArticle(page1, articleWithoutTags);
  await editArticle(page1, articleWithoutTags.url, {
    title: articleWithoutTags.title + ' - updated',
    description: articleWithoutTags.description + ' - updated',
    text: articleWithoutTags.text + ' - updated'
  });
});

test('User can view an article updated by another user.', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
    const viewArticlePage = new ViewArticlePage(page2);
    const homePage = new HomePage(page2);


  await homePage.openGlobalFeed();
  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title + ' - updated');
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text + ' - updated');
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
  
});