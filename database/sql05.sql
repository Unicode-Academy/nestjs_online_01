-- Bảng tạm 
-- Lưu ý: Phải có alias sau khi kết thúc câu lệnh truy vấn bảng tạm
-- Có thể dùng tên bảng tạm để giải quyết các bài toán phía sau: where, group, having, order,....
-- SELECT * FROM (SELECT * FROM users WHERE `status` = 0) AS user_tmp
-- WHERE user_tmp.age > 10

-- CASE
--     WHEN condition1 THEN result1
--     WHEN condition2 THEN result2
--     WHEN conditionN THEN resultN
--     ELSE result
-- END;

-- WITH course_type AS (
-- CASE 
-- 	WHEN price = 0 THEN 'Miễn phí'
-- 	ELSE 'Trả phí'
-- END
-- )
-- SELECT `id`, `name`, `price`, course_type, (
-- CASE WHEN price > 10000 THEN price - price * 5 / 100
-- ELSE price
-- END
-- ) AS sale_price FROM courses;
-- 


-- Bài tập: Thêm 1 cột sale_price ở câu lệnh truy vấn
-- Nếu giá > 10.000 --> Giảm giá 5%, ngược lại giữ nguyên

-- Bài tập: Trả về danh sách users có điểm cao hơn điểm trung bình của tất cả users

-- SELECT * FROM users WHERE grade > (SELECT AVG(grade) FROM users)

-- Bài tập: Trả về thông tin khách hàng có tổng tiền mua hàng lớn nhất

-- SELECT users.* from users
-- join (
-- 	select o.user_id, sum(o.amount) as total from orders o 
-- 	group by user_id 
-- 	order by total desc
-- 	limit 1
-- ) as total_amount
-- on users.id = total_amount.user_id

-- select users.*, MAX(total_amount.total) AS max_amount from users
-- join (
-- 	select o.user_id, sum(o.amount) as total from orders o 
-- 	group by user_id 
-- 	order by total desc
-- 	limit 1
-- ) as total_amount
-- on users.id = total_amount.user_id

WITH user_total_amount AS (SELECT user_id, SUM(amount) AS total_amount 
     FROM orders 
     GROUP BY user_id)  
SELECT 
    users.*, user_total_amount.total_amount
FROM 
    users
JOIN 
    user_total_amount
ON 
    users.id = user_total_amount.user_id
WHERE 
 user_total_amount.total_amount = (
     SELECT MAX(total_amount)
     FROM user_total_amount
 )