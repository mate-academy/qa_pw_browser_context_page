import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { updateArticle } from '../../../src/ui/actions/articles/updateArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let updatedTitle;
let updatedText;

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);

  updatedTitle = 'Updated Title by User1';
  updatedText = 'This is the updated text content of the article';
  
  const newUrl = await updateArticle(page1, articleWithoutTags.url, {
    title: updatedTitle,
    text: updatedText,
  });
  
  articleWithoutTags.url = newUrl;
});

test('User can view an article updated by another user', async ({
  page2,
  articleWithoutTags,
  user1,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(updatedTitle);
  await viewArticlePage.assertArticleTextIsVisible(updatedText);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
});
