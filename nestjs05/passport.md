Request Login --> AuthGuard Local --> Local Strategy --> Auth Service / Database --> Controller / Action --> Generate JWT

Lưu ý: Sau nào Local Strategy return về user --> Đưa thông tin user vào request (Việc add user vào request do Guard thực hiện)

Request Authorization --> AuthGuard JWT --> JWT Strategy --> Decoded JWT --> User Service / Database

Lưu ý: Khi nào JWT Strategy trả về user --> Đưa thông tin user vào request (Guard thực hiện)
