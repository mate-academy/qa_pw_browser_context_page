import { test } from '@playwright/test';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { EditArticlePage } from '../../pages/article/EditArticlePage';

export async function editArticle(page, article) {
  article['url'] = await test.step(`Edit an article`, async () => {
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await editArticlePage.open(article.url);
    await editArticlePage.submitEditArticleForm(article);
    await viewArticlePage.assertArticleTitleIsVisible(article.title);

    return viewArticlePage.url();
  });

  return article;
}
