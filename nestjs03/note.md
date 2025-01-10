knex('users')
.where({
first_name: 'Test',
last_name: 'User',
})
.select('id');

=> SELECT id FROM users WHERE first_name = 'Test' AND last_name = 'USER'

Controller => Service => Repository => ORM

Repository thực hiện các thao tác CRUD với Database thông qua ORM
