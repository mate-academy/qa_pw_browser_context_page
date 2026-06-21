import { test as base } from '@playwright/test';
import type { Page, TestInfo } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { createPageInNewContext } from './createPageInNewContext';

type UserData = ReturnType<typeof generateNewUserData>;

type GenericFixtures = {
  page1: Page;
  page2: Page;
  user: UserData;
  user1: UserData;
  user2: UserData;
  infoTestLog: string;
};

type GenericWorkerFixtures = {
  logger: Logger;
};

export const test = base.extend<GenericFixtures, GenericWorkerFixtures>({
  page1: async ({ page }, use) => {
    await use(page);
  },
  page2: async ({ browser }, use) => {
    const { context, page } = await createPageInNewContext(browser);

    await use(page);
    await context.close();
  },
  user: async ({ logger }, use) => {
    const user = generateNewUserData(logger);

    await use(user);
  },
  user1: async ({ user }, use) => {
    await use(user);
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
    async ({ logger }, use, testInfo: TestInfo) => {
      const indexOfTestSubfolderStart = testInfo.file.indexOf('/tests') + 7;
      const fileName = testInfo.file.substring(indexOfTestSubfolderStart);

      logger.info(`Test started: ${fileName}`);

      await use('infoTestLog');

      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],
});
