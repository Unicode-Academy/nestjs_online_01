-- HÀM trong SQL: MIN, MAX, AVG, SUM, COUNT --> GROUP BY

-- SELECT age, COUNT(age) AS age_count FROM users GROUP BY age HAVING age_count >= 2;

-- Bài toán: Hiển thị tuổi xuất hiện >= 2

-- Bài toán: Hiển thị danh sách users có tuổi bằng giá trị đã tìm được ở trên

-- SELECT age, `name`, `email`, COUNT(age) AS age_count FROM users GROUP BY age

-- SELECT * FROM users WHERE age IN (SELECT age FROM users GROUP BY age HAVING COUNT(*) >= 2)

-- Bài tập: Hiển thị danh sách users và số lượng bài viết từng users 
-- (Nếu users không có posts sẽ hiển thị 0)
-- Gợi ý: Dùng COUNT kết hợp LEFT JOIN kết hợp GROUP BY

-- SELECT users.*, COUNT(posts.id) AS post_count FROM users LEFT JOIN posts 
-- ON users.id = posts.user_id
-- GROUP BY users.id

-- Có cách nào khác không?
-- SELECT *, (SELECT COUNT(id) FROM posts WHERE posts.user_id = users.id) AS post_count FROM users;

-- Buổi sau: SubQuery
-- + Sau select
-- + Sau from --> Gọi bảng bảng tạm
-- + Sau where
-- + Sau having