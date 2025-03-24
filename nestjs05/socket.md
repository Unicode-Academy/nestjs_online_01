# Websocket

- Giao thức HTTP: Không liên tục
- Cần triển khai Realtime (Thời gian thực)

1. HTTP

- Short Polling: Client gửi request liên tục lên server, mong nhận về 1 response mới từ server (Tiêu tốn tài nguyên cả client và server)
- Long Polling:

* B1: Client gửi 1 yêu cầu lên server
* B2: Server nhận yêu cầu và treo response cho đến khi nào muốn trả về (while true kết hợp với break)
* B3: Khi client nhận được response --> gửi yêu cầu mới (Đệ quy)
  ==> Tiêu tốn tài nguyên của server

Áp dụng:

- Triển khai nhanh, ít chi phí
- Các case cần độ chính xác cao, an toàn

2. Websocket

- Giao thức 2 chiều
- Kết nối sẽ được giữ cho đến khi client hoặc server ngắt kết nối

## Websocket hỗ trợ trong các ngôn ngữ lập trình nào?

- Gần như các ngôn ngữ lập trình web đều có
- Ưu tiên: NodeJS, Go

## Điều kiện

- Xây dựng được websocket server (NodeJS)
- Gọi websocket server qua client (JS)

Lưu ý: Thao tác với websocket giữa client và server thông qua message
