import type { Browser, BrowserContext, Page } from '@playwright/test';

export async function createPageInNewContext(
  browser: Browser,
): Promise<{ context: BrowserContext; page: Page }> {
  const context = await browser.newContext();
  const page = await context.newPage();

  return { context, page };
}
