import { User } from 'src/entities/user.entity';
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { hashPassword } from 'src/utils/hashing';

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.fullname = `${faker.name.firstName()} ${faker.name.lastName()}`;
  user.email = faker.internet.email();
  user.password = hashPassword(faker.random.word());
  user.status = faker.random.boolean();
  user.verify_at = new Date();
  return user;
});
