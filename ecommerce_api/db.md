Sản phẩm 1

- Màu: Đen, Trắng, Xanh
- Dung lượng: 256, 128

Tạo biến thể (Tổ hợp)

- Biến thể 1: Đen - 256
- Biến thể 2: Đen - 128
- Biến thể 3: Trắng - 256
- Biến thể 4: Trắng - 128
- Biến thể 5: Xanh - 256
- Biến thể 6: Xanh - 128

Nguyên tắc tạo mã đơn hàng

1. Xác định số lượng sản phẩm

- Nhiều sản phẩm: YYYYMMDD_random_number
- Ít sản phẩm: Prefix_random_number

2. Xác định số lượng đơn tối đa

Thiết kế độ dài của random_number

Lưu khi tạo random_number (Thường mã đơn hàng hay được đưa vào nội dung chuyển khoản để khách hàng thanh toán)

- Tránh các ký tự: 8, B, 0, O, I, L

Phương thức thanh toán

1. Chuyển khoản ngân hàng

- Số tài khoản
- Tên tài khoản
- Tên ngân hàng
- Nội dung: Thanh toan {orderId}

2. QR Code

3. Cổng thanh toán

- API key
- API Secret
  ...

Khi khách hàng thực hiện thanh toán --> Tạo đơn hàng bên cổng thanh toán --> Chuyển hướng sang web của cổng để khách thực hiện thanh toán (ATM, Visa/Master, Quét QR,...) --> Thanh toán xong --> Chuyển hướng về web kèm theo trạng thái --> Update database

Mã giảm giá

(customer) && (brand || product || categories || condition)

Link Diagram: https://dbdiagram.io/d/Nestjs01_Ecommerce_API-67e695734f7afba184927d09
