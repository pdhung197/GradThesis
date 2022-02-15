HƯỚNG DẪN CÀI ĐẶT VÀ SỬ DỤNG CHƯƠNG TRÌNH

**Điều kiện trước:**

- Máy tính đã được cài đặt .NET SDK và .NET Runtime phiên bản 3.1 (<https://dotnet.microsoft.com/download/dotnet-core/3.1>), Nodejs (<https://nodejs.org/en/download/>) và Angular CLI (<https://angular.io/guide/setup-local>) cùng với hệ cơ sở dữ liệu MS SQLServer bản Developer (<https://www.microsoft.com/en-us/sql-server/sql-server-downloads>)
- Import file backup Cơ sở dữ liệu (file PDHUNG) vào SQL Server. Cập nhật giá trị tại file `appsettings.json` tại `FinalProject\FinalProject\appsettings.json`.
- Các file `Dish.xls`, `NguyenLieu.xls` có thể được sử dụng để import vào các bảng `Dishes`, `DishCategories`, `Materials`.

**Các bước cài đặt và sử dụng chương trình:**

1. Tải file zip của dự án final-project-master.zip về máy và gỡ nén
1. Cài đặt cơ sở dữ liệu và khởi động server:

- Tại thư mục FinalProject mở cmd và gõ lệnh `dotnet-ef database update -s FinalProject -p DataModels` để cài đặt cơ sở dữ liệu

- Tại thư mục con FinalProject mở cmd và gõ lệnh `dotnet build -c Release` để biên dịch chương trình

- Tại thư mục đã biên dịch mở cmd và gõ lệnh`dotnet FinalProject.dll` để khởi động server

3. Cài đặt cho web client phía frontend:

- Tại thư mục final-project-fe mở cmd và gõ lệnh

        npm install

  để cài đặt các thư viện và gói cần thiết

- Gõ lệnh

        ng serve

  để biên dịch và chạy chương trình

- Tại trình duyệt web, mở đường link <http://localhost:4200/> và tiến hành sử dụng chương trình
