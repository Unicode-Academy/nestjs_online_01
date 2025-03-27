# Deploy

## Cần chuẩn bị

- Server/VPS
- Kiến thức Linux (Ubuntu)
- Tên miền

## Các thành phần trên server để ứng dụng web hoạt động được

- WebServer: Nginx (HTTP Request, Response) --> Cấu hình tên miền vào web server
- Công nghệ liên quan: NodeJS, Git,...
- Database: Mariadb

## Cách hoạt động của tên miền

Domain --> DNS Server --> Phân giải tên miền ta địa chỉ IP --> Trả về trình duyệt
Trình duyệt --> Server --> Trả về response

## Khi update code --> toang

- Code
- Push code
- Về server
- Pull code
- npm i
- npm run build
- npm run migration:run
