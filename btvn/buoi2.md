# Validation API

Xây dựng các API CRUD cho sản phẩm với các yêu cầu validate sau:

1. Thêm sản phẩm (Create Product):

- Tên sản phẩm (name) không được để trống, độ dài từ 5-50 ký tự.
- Mô tả (description) không bắt buộc, nhưng nếu có phải từ 20-200 ký tự.
- Giá (price) phải là số dương lớn hơn 0.
- Danh mục (category) phải thuộc danh sách cho phép: ['electronics', 'furniture', 'clothing'].
- Mỗi sản phẩm có thể có danh sách các từ khóa (tags) dưới dạng mảng chuỗi, mỗi từ khóa không quá 10 ký tự.

2. Cập nhật sản phẩm (Update Product):

- Các trường tương tự như thêm sản phẩm nhưng tất cả là tùy chọn.
- ID sản phẩm (id) phải là số hợp lệ đã tồn tại trong 1 mảng cho trước.

3. Xóa sản phẩm (Delete Product):

- Chỉ được xóa nếu sản phẩm không thuộc danh mục "electronics".

Lưu ý:

- Xây dựng đầy đủ module, controller, service
- Thông báo response API rõ ràng
- Thông báo exception rõ ràng đúng lỗi
