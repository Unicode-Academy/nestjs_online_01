-- USE hocdb; 
-- CREATE TABLE customers LIKE users;

-- USE hocdb; 
-- INSERT INTO customers (SELECT * FROM users);

-- UPDATE users SET `name`='User 111', `status`=0;

-- DELETE FROM users WHERE id <= 5;

SELECT * FROM customers ORDER BY `name` ASC, id DESC