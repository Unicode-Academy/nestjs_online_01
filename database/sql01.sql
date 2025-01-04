-- Đây là comment của sql
-- USE hocdb;
-- CREATE TABLE users (
-- 	`id` INT,
-- 	`name` VARCHAR(50),
-- 	`email` VARCHAR(100),
-- 	`password` VARCHAR(100),
-- 	`status` BOOLEAN,
-- 	`created_at` TIMESTAMP,
-- 	`updated_at` TIMESTAMP 
-- )

-- USE hocdb;
-- ALTER TABLE users ADD active_token VARCHAR(100) AFTER status;

-- USE hocdb;
-- ALTER TABLE users MODIFY COLUMN active_token INT;

-- USE hocdb;
-- ALTER TABLE users CHANGE active_token active_tokens VARCHAR(100)

-- USE hocdb;
-- SHOW TABLES;

-- USE hocdb;
-- DESCRIBE users;

-- USE hocdb;
-- INSERT INTO users(`name`, `emadbdiagramil`, `password`, created_at, updated_at) 
-- VALUES('User 2', 'user2@gmail.com', '123456', NOW(), NOW());
-- 
-- INSERT INTO users(`name`, `email`, `password`, created_at, updated_at) 
-- VALUES('User 3', 'user3@gmail.com', '123456', NOW(), NOW());
-- 
-- INSERT INTO users(`name`, `email`, `password`, created_at, updated_at) 
-- VALUES('User 4', 'user4@gmail.com', '123456', NOW(), NOW());


INSERT INTO users(`name`, `email`, `password`, created_at, updated_at)
VALUES ('User 5', 'user5@gmail.com', '123457', NOW(), NOW()), 
('User 6', 'user6@gmaildbdiagram.com', '123457', NOW(), NOW()), 
('User 7', 'user7@gmail.com', '123457', NOW(), NOW())



