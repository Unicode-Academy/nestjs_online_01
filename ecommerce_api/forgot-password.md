# Quên mật khẩu

1. Xác minh tài khoản

POST /auth/forgot-password

Body: email

Nếu email tồn tại trong db

- Tạo password token --> Update database
- Gửi email cho user

2. Xác minh token / otp

POST /auth/verfiy-password-token
Body: token

Logic: Kiểm tra xem token có tồn tại và còn hạn không?

3. Đặt lại mật khẩu

POST /auth/reset-password
Body: password, token

4. Gửi email chúc mừng
