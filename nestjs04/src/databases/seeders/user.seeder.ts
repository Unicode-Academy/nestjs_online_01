import { Connection } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Factory, Seeder } from 'typeorm-seeding';
import { hashPassword } from 'src/utils/hashing';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const usersRepository = connection.getRepository(User);
    const userData = usersRepository.create({
      fullname: 'admin',
      email: 'admin@gmail.com',
      password: hashPassword('123456'),
      status: true,
      verify_at: new Date(),
    });
    await usersRepository.save(userData);
    await factory(User)().createMany(50);
  }
}
