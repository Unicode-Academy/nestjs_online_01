-- USE hocdb; 
-- CREATE TABLE customers LIKE users;

-- USE hocdb; 
-- INSERT INTO customers (SELECT * FROM users);

-- UPDATE users SET `name`='User 111', `status`=0;

-- DELETE FROM users WHERE id <= 5;

-- SELECT * FROM customers ORDER BY `name` ASC, id DESC

-- LIMIT

-- PHÂN TRANG: offset = (page - 1) * limit 

SELECT * FROM customers ORDER BY id DESC LIMIT 3 OFFSET 6;