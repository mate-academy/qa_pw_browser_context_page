import { faker } from '@faker-js/faker';

export function generateNewUserData(logger) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const password = faker.internet.password({ length: 12, memorable: true });

  const user = {
    username: `${firstName}_${lastName}`.replace(/'/g, ''),
    email: faker.internet.email().toLowerCase(),
    password,
  };

  logger?.debug?.(`Generated new user data: ${JSON.stringify(user)}`);

  return user;
}
