import { test } from '@playwright/test';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

export async function updateArticle(page, article) {
  article['url'] = await test.step(`Update an article`, async () => {
    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await createArticlePage.open();
    await createArticlePage.submitCreateArticleForm(article);
    await viewArticlePage.assertArticleTitleIsVisible(article.title);

    return viewArticlePage.url();
  });

  return article;
}
