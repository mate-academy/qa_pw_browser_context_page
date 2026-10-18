import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { SignUpPage } from '../../../src/ui/pages/auth/SignUpPage';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(new SignUpPage(page1), new HomePage(page1), user1);
  await signUpUser(new SignUpPage(page2), new HomePage(page2), user2);

  const article = await createArticle(page1, articleWithoutTags);
});

test('View an article created by another user', async ({
  page2,
  user2,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user2.username);
});

const favoriteButtons = [
  { name: 'Top', getClickedButton: (page) => page.favoriteArticleButtonTop, getOtherButton: (page) => page.favoriteArticleButtonBottom },
  { name: 'Bottom', getClickedButton: (page) => page.favoriteArticleButtonBottom, getOtherButton: (page) => page.favoriteArticleButtonTop },
];

for (const { name, getClickedButton, getOtherButton } of favoriteButtons) {
  test(`User can favorite the article created by another user with ${name} Favorite Button.`, async ({
    page2,
    articleWithoutTags,
  }) => {
    const viewArticlePage = new ViewArticlePage(page2);
    const clickedButton = getClickedButton(viewArticlePage);
    const otherButton = getOtherButton(viewArticlePage);

    await viewArticlePage.open(articleWithoutTags.url);

    await viewArticlePage.assertFavoriteArticleButtonTopIsVisible();
    await viewArticlePage.assertFavoriteArticleButtonBottomIsVisible();

    await viewArticlePage.clickFavoriteArticleButton(clickedButton, `${name} Favorite Article`);

    for (const button of [clickedButton, otherButton]) {
      await viewArticlePage.assertFavoriteArticleButtonChangesToUnfavoriteWhenClicked(button);
      await viewArticlePage.assertFavoritesCount(button, 1);
    }

    await viewArticlePage.reload();
    await viewArticlePage.assertFavoriteArticleButtonChangesToUnfavoriteWhenClicked(clickedButton);
    await viewArticlePage.assertFavoritesCount(clickedButton, 1);
  });
}

for (const { name, getClickedButton, getOtherButton } of favoriteButtons) {
  test(`User can unfavorite the article created by another user with ${name} Favorite Button.`, async ({
    page2,
    articleWithoutTags,
  }) => {
    const viewArticlePage = new ViewArticlePage(page2);
    const clickedButton = getClickedButton(viewArticlePage);
    const otherButton = getOtherButton(viewArticlePage);

    await viewArticlePage.open(articleWithoutTags.url);

    await viewArticlePage.clickFavoriteArticleButton(clickedButton, `${name} Favorite Article`);
    await viewArticlePage.assertFavoritesCount(clickedButton, 1);

    await viewArticlePage.clickFavoriteArticleButton(clickedButton, `${name} Unfavorite Article`);

    for (const button of [clickedButton, otherButton]) {
      await viewArticlePage.assertUnfavoriteArticleButtonChangesToFavoriteWhenClicked(button);
      await viewArticlePage.assertFavoritesCount(button, 0);
    }

    await viewArticlePage.reload();
    await viewArticlePage.assertUnfavoriteArticleButtonChangesToFavoriteWhenClicked(clickedButton);
    await viewArticlePage.assertFavoritesCount(clickedButton, 0);
  });
}