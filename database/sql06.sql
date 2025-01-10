-- START TRANSACTION;
-- UPDATE `users` SET grade=80 WHERE id=4;
-- -- ROLLBACK;
-- COMMIT;
-- 
-- Giải thích
-- ROLLBACK ==> Khôi phục lại các lệnh đã thực hiện: thêm, sửa, xóa
-- COMMIT ==> Lưu lại các thay đổi

START TRANSACTION;

UPDATE `users` SET balance = balance - 500000 WHERE id = 4;

INSERT INTO orders(user_id, amount) VALUES (4, 500000);

COMMIT;
