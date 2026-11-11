import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { followArticleAuthor } from '../../../src/ui/actions/articles/followArticleAuthor';
import { unfollowArticleAuthor } from '../../../src/ui/actions/articles/unfollowArticleAuthor';

test.describe('Article author follow functionality', () => {
  test.beforeEach(
    async ({ page1, page2, user1, user2, articleWithoutTags }) => {
      await signUpUser(page1, user1);
      await signUpUser(page2, user2);

      await createArticle(page1, articleWithoutTags);
    },
  );

  test('Follow the author of an article', async ({
    page2,
    user1,
    articleWithoutTags,
  }) => {
    await followArticleAuthor(page2, articleWithoutTags.title, user1.username);
  });

  test('Unfollow the author of an article', async ({
    page2,
    user1,
    articleWithoutTags,
  }) => {
    await unfollowArticleAuthor(
      page2,
      articleWithoutTags.title,
      user1.username,
    );
  });
});
