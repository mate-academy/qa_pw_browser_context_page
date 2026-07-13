import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let article;

const updatedArticle = {
  title: 'Updated title',
  description: 'Updated description',
  body: 'Updated body',
  tags: ['tag1', 'tag2'],
};

test.beforeEach(
  async ({
    page,
    page2,
    user,
    user2,
    articleWithTwoTags,
    viewArticlePage,
    editArticlePage,
  }) => {
    await test.step('Register two users', async () => {
      await signUpUser(page, user);
      await signUpUser(page2, user2);
    });

    await test.step('Create article as user1', async () => {
      article = await createArticle(page, articleWithTwoTags);
    });

    await test.step('Edit article as user1', async () => {
      await viewArticlePage.clickEditButton();
      await editArticlePage.updateTitleField(updatedArticle.title);
      await editArticlePage.updateDescriptionField(updatedArticle.description);
      await editArticlePage.updateBodyField(updatedArticle.body);
      await editArticlePage.updateTagsField(updatedArticle.tags);
      await editArticlePage.clickUpdateArticleButton();

      await page.waitForURL(article.url);
    });

    await test.step('Assert article updated for user1', async () => {
      await viewArticlePage.open(article.url);

      await viewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);
    });
  },
);

test('User can view an article updated by another user', async ({
  user,
  viewArticlePage2,
}) => {
  await test.step('Open article as user2', async () => {
    await viewArticlePage2.open(article.url);
  });

  await test.step(
    'Assert updated article content is visible for user2',
    async () => {
    await viewArticlePage2
    .assertArticleTitleIsVisible(updatedArticle.title);
    await viewArticlePage2
    .assertArticleTagsAreVisible(updatedArticle.tags);
    await viewArticlePage2
    .assertArticleAuthorNameIsVisible(user.username);
  });
});
