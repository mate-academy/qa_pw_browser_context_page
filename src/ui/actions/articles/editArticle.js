import { test } from '@playwright/test';
import { EditArticlePage } from '../../pages/article/EditArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

export async function editArticle(page, articleUrl, article) {
  article['url'] = await test.step(`Edit an article`, async () => {
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await editArticlePage.open(articleUrl);
    await editArticlePage.submitEditArticleForm(article);
    await viewArticlePage.assertArticleTitleIsVisible(article.title);

    return articleUrl;
  });

  return article;
}

