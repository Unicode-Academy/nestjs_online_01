## Event

TH2: Khách hàng đặt đơn hàng

- Thêm dữ liệu vào database --> hàm thêm
- Gửi email --> hàm gửi
- Tính toán hoa hồng --> hàm tính
- Gửi thông báo cho đại lý --> hàm gửi thông báo đại lý
- Gửi thông báo cho admin --> hàm gửi thông báo admin

Vấn đề: Không đồng bộ logic

TH2: Đại lý tạo đơn hàng cho khách hàng

- Thêm dữ liệu vào database --> hàm thêm
- Gửi email --> hàm gửi
- Tính toán hoa hồng --> hàm tính
- Gửi thông báo cho đại lý --> hàm gửi thông báo đại lý
- Gửi thông báo cho admin --> hàm gửi thông báo admin

TH3: Admin tạo đơn hàng cho khách hàng

- Thêm dữ liệu vào database --> hàm thêm
- Gửi email --> hàm gửi
- Tính toán hoa hồng --> hàm tính
- Gửi thông báo cho đại lý --> hàm gửi thông báo đại lý
- Gửi thông báo cho admin --> hàm gửi thông báo admin

Giải pháp: Phát đi event tới toàn bộ project

Nơi lắng nghe event --> Thực hiện logic cần thiết
