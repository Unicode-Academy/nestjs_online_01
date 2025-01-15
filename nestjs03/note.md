knex('users')
.where({
first_name: 'Test',
last_name: 'User',
})
.select('id');

=> SELECT id FROM users WHERE first_name = 'Test' AND last_name = 'USER'

Controller => Service => Repository => ORM

Repository thực hiện các thao tác CRUD với Database thông qua ORM

Mã hóa password

- md5, sha1 --> Mã hóa 1 chiều (Hàm băm). Nhược điểm: 2 password có cùng input sẽ có cùng output --> Dễ bị dò nếu đặt đơn giản.
- bcrypt --> Thuật toán băm --> 2 password có cùng input sẽ có output khác nhau
