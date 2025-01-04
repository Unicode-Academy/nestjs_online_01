# Database

- NoSQL --> Cơ sở dữ liệu phi quan hệ
- SQL --> Cơ sở dữ liệu quan hệ

==> Học ngôn ngữ truy vấn SQL ==> Học 1 lần và nó sẽ không thay đổi theo thời gian

==> Hệ quản trị cơ sở dữ liệu: Phần mềm để quản lý các cơ sở dữ liệu và thực thi ngôn ngữ truy vấn (Thay đổi theo thời gian)

- PostgreSQL --> Nodejs, php,...
- MySQL
- MariaDB (Tương tự MySQL) --> Nodejs, php,...
- SQL Server (MS SQL) --> Thường kết hợp với C#
- Oracle --> Java

NoSQL:

- MongoDB --> Hay đi với NodeJS

GUI Tool là gì?

- Phần mềm giúp tương tác với hệ quản trị CSDL thông qua giao diện đồ họa
- Một số phần mềm: HeidiSQL, Navicat, phpmyadmin,...

Thuật ngữ

- Máy chủ
- Database
- Table: Bảng lưu trữ dữ liệu
- Field: Các cột trong bảng
- Record: Dữ liệu của bảng

Ngôn ngữ truy vấn SQL => 2 phần

1. Cấu trúc (struct)

- Tạo ra database, table, field,....
- Thao tác thay đổi: Sửa, xóa

==> Thường sẽ dùng công cụ hỗ trợ (GUI tools, thư viện ORM,...)

2. Truy vấn (Query)

- Thêm, sửa, xóa, truy vấn dữ liệu

## Các nhóm kiểu dữ liệu

1. Kiểu số

- tinyint
- int
- bigint
- float
- double

2. Kiểu chuỗi

- char: Chuỗi có độ dài cố định (Ví dụ: char(5))
- varchar: Chuỗi có độ dài biến đổi (Ví dụ: varchar(200))
- text: Chuỗi không giới hạn độ dài (Phụ thuộc vào hệ quản trị)
- tinytext
- longtext

3. Kiểu boolean

4. Kiểu thời gian

- date
- datetime
- time
- timestamp

## Câu lệnh tạo cấu trúc

### Thao tác với cơ sở dữ liệu

1. Tạo CSDL mới

```
CREATE DATABASE tencsdl;
```

2. Hiển thị danh sách CSDL

```
SHOW DATABASES;
```

3. Xóa cơ sở dữ liệu

```
DROP DATABASE tencsdl;
```

4. Chọn database để sử dụng

```
use tendatabase;
```

### Thao tác với table

1. Tạo bảng

```
CREATE TABLE tenbang (
    tencot1 kieudulieu,
    tencot2 kieudulieu,
    tencot3 kieudulieu
)
```

2. Thêm cột vào bảng đã có

```
ALTER TABLE tenbang ADD tencot kieudulieu
```

Lưu ý: Bổ sung AFTER tencot nếu muốn cột mới đứng sau 1 cột chỉ định, nếu không sẽ đẩy xuống cuối cùng

3. Xóa cột trong bảng đã có

```
ALTER TABLE tenbang DROP COLUMN tencot
```

4. Đổi kiểu dữ liệu của cột đã có

```
ALTER TABLE tenbang MODIFY COLUMN tencot kieudulieumoi
```

5. Đổi tên cột

```
ALTER TABLE tenbang CHANGE tencot tencotmoi kieudulieu
```

6. Hiển thị danh sách bảng

```
SHOW TABLES;
```

7. Xem cấu trúc của 1 table

```
DESCRIBE tenbang;
```

8. Xóa bảng

```
DROP TABLE tenbang;
```

### Ràng buộc trong bảng

1. primary key

- Ràng buộc tương ứng với 1 hoặc nhiều cột để xác định bản ghi này với bản ghi khác
- Trong 1 table chỉ có 1 khóa chính
- Cột chọn làm khóa chính không được phép có giá trị NULL
- Các bản ghi của cột khóa chín không được trùng nhau

2. Not null

- Không được phép null khi instert, update dữ liệu
- Mặc định sẽ là null

3. unique

- Giá trị không được trùng giữa các bản ghi
- Mặc định khóa chính đã tồn tại unique

4. Default

- Giá trị mặc định của 1 cột
- Có tác dụng khi insert không được cung cấp giá trị cho cột đó

Lưu ý: Khóa chính, khóa ngoại, unique là index

Index cơ sở được dùng để tăng tốc độ truy vấn (Tìm hiểu sau)

5. Thiết lập giá trị tự động tăng (Auto_incrment)

### Thao tác cập nhật dữ liệu cho table

1. Thêm dữ liệu vào table

```
INSERT INTO tenbang(cot1, cot2, ...cotn) VALUES (giatri1, giatri2, ...giatrin)
```

Lưu ý: Định dạng thời gian: Y-m-d H:i:s (Năm - Tháng - Ngày Giờ:phút:giây)

Có thể sử dụng NOW trong SQL để lấy thời gian hiện tại (Theo server)

2. Cập nhật dữ liệu

- Xác định bản ghi cần cập nhật (Dùng mệnh đề where)

```
UPDATE tenbang SET tencot1=giatri1, tencot2=giatri2,... WHERE dieukien
```

Các toán tử:

=, >, >=, <, <=, <>, !=, between, like, in, or, not,
and, is null, exists

3. Xóa bản ghi

- Xác định bản ghi cần Xóa

```
DELETE FROM tenbang WHERE dieukien
```

### Thao tác truy vấn dữ liệu

```
SELECT *|tencot1,tencot2,... FROM tenbang WHERE dieukien
```

### Relationship

Từ 2 bảng trở lên

1. One to One (1-1)

- 1 bản ghi của bảng này chỉ liên kết tới 1 bản ghi của bảng khác
- Xác định trường sẽ liên kết (Đánh khóa ngoại)
- Ví dụ:

* 1 chồng CHỈ có 1 vợ
* 1 vợ chỉ thuộc về 1 chồng

2. One to Many (1-n)

- 1 bản ghi của bảng này sẽ liên kết tới 1 hoặc nhiều bản ghi của bảng khác
- Xác định trường sẽ liên kết (Đánh khóa ngoại)
- Ví dụ:

* 1 công dân có thể có nhiều sổ đỏ
* 1 sổ đỏ chỉ thuộc về 1 công dân

3. Many to Many (n-n)

- 1 bản ghi cảu bảng này sẽ liên kết tới 1 hoặc nhiều bản ghi của bảng khác và ngược lại
- Cần phải có bảng trung gian
- Trường liên kết nằm ở bảng trung gian
- Ví dụ:

* 1 tác giả có thể có nhiều cuốn sách
* 1 cuốn sách có thể thuộc nhiều tác giả

Bài toán gặp vấn đề query n + 1

- Hiển thị danh sách users và số điện thoại từng user

- Giải pháp 1: ==> Bị query n + 1

* Viết truy vấn lấy danh sách users: `SELECT * FROM users`
* Dùng lập trình lặp qua từng phần tử của user sau đó lấy được id của từng user và thực hiện truy vấn bên trong vòng lặp: `SELECT phone FROM phones WHERE user_id = ${userId}`

- Giải pháp 2: Join bảng, subquery, where in ở tầng database
