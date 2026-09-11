import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('User can view an article updated by another user', async ({
  page1,
  page2,
  user1,
  articleWithoutTags,
  editArticlePage,
  viewArticlePage,
}) => {
  const viewArticlePageasUser2 = new ViewArticlePage(page2);
  // const myProfilePage = new MyProfilePage(page2, user2);
  const newTitle = faker.lorem.words();

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);

  await viewArticlePage.clickEditArticleButton();
  await expect(page1).toHaveURL(/\/editor\//);
  await editArticlePage.updateArticleTitle(newTitle);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePageasUser2.open(articleWithoutTags.url);

  await viewArticlePageasUser2.assertArticleTitleIsVisible(newTitle);
  await viewArticlePageasUser2.assertArticleTextIsVisible(
    articleWithoutTags.text,
  );
  await viewArticlePageasUser2.assertArticleAuthorNameIsVisible(
    user1.username.toLowerCase(),
  );
});
