# Xây dựng RESTful API CRUD

- Tạo file json danh sách products bao gồm những thông tin: id, name, price, description
- Xây dựng module Products và viết logic CRUD

GET /products --> Lấy danh sách products
GET /products/{id} --> Lấy chi tiết 1 product
POST /products --> Thêm product mới và trả về danh sách products sau khi đã thêm
PATCH /products/{id} --> Sửa thông tin product theo id và trả về danh sách products sau khi đã sửa
DELETE /products/{id} --> Xóa product theo id và trả về danh sách products sau khi đã xóa

- Kiểm tra lại bằng Postman
