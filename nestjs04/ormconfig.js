module.exports = {
  seeds: ['src/databases/seeders/**/*{.ts,.js}'],
  factories: ['src/databases/factories/**/*{.ts,.js}'],
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'nestjs_migrations',
};
