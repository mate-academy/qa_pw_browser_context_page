import { faker } from '@faker-js/faker';

export function generateNewUserData(logger) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const user = {
    username: `${firstName}_${lastName}`.replaceAll(`'`, ''),
    email: faker.internet.email().toLowerCase(),
    password: `${faker.internet.password(10)}`,
  };

  logger.debug(`Generated new user data: ${JSON.stringify(user)}`);

  return user;
}
