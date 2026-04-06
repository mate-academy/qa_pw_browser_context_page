import { test as base, Page } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

export interface GenerateNewUserData {
  username: string;
  email: string;
  password: string;
}

export const test = base.extend<
  {
    page1: Page;
    page2: Page;
    user: GenerateNewUserData;
    user1: GenerateNewUserData;
    user2: GenerateNewUserData;
    infoTestLog: string;
  },
  {
    logger: Logger;
  }
>({
  page1: async ({ browser }, use) => {
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();

    await use(page1);
  },
  page2: async ({ browser }, use) => {
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();

    await use(page2);
  },
  user: async ({ logger }, use) => {
    const user = generateNewUserData(logger);

    await use(user);
  },
  user1: async ({ logger }, use) => {
    const user1 = generateNewUserData(logger);

    await use(user1);
  },
  user2: async ({ logger }, use) => {
    const user2 = generateNewUserData(logger);

    await use(user2);
  },
  logger: [
    async ({}, use) => {
      const logger = new Logger('error');

      await use(logger);
    },
    { scope: 'worker' },
  ],
  infoTestLog: [
    async ({ logger }, use, testInfo) => {
      const indexOfTestSubfolderStart = testInfo.file.indexOf('/tests') + 7;
      const fileName = testInfo.file.substring(indexOfTestSubfolderStart);

      logger.info(`Test started: ${fileName}`);

      await use('infoTestLog');

      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],
});
