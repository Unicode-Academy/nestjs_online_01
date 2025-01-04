-- SELECT users.*, phones.phone FROM users
-- INNER JOIN phones
-- ON users.id = phones.user_id
-- WHERE phones.phone = '0123456786'

-- Bài tập: Hiển thị danh sách posts của users có số điện thoại là 0123456786

-- SELECT posts.* FROM posts 
-- INNER JOIN phones
-- ON posts.user_id = phones.user_id
-- WHERE phones.phone = '0123456786' AND posts.title LIKE '%t 1%'

-- Bài tập: Hiển thị danh sách users sở hữu khóa học được cập nhật mới nhất
-- Vế 1: Hiển thị danh sách users sở hữu khóa học nào đó
-- SELECT users.* FROM users 
-- INNER JOIN users_courses
-- ON users.id = users_courses.user_id
-- WHERE users_courses.course_id = 2

-- Vế 2: Hiển thị 1 khóa học mới được cập nhật
-- SELECT * FROM courses ORDER BY updated_at DESC LIMIT 1

-- Nối 2 vế
SELECT users.* FROM users 
INNER JOIN users_courses
ON users.id = users_courses.user_id
WHERE users_courses.course_id = (SELECT id FROM courses ORDER BY id DESC LIMIT 1)
-- Kết hợp giữa JOIN và SubQuery