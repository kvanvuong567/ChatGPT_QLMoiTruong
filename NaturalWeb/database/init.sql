-- Khởi tạo cơ sở dữ liệu
CREATE DATABASE NaturalWeb;
GO

USE NaturalWeb;
GO

-- Bảng chứa thông tin các thẻ (Tab) trong hệ thống
CREATE TABLE Tabs (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(255) NOT NULL
);
GO

-- Bảng chứa thông tin người dùng
CREATE TABLE Users (
    id INT PRIMARY KEY IDENTITY(1,1),
    username NVARCHAR(100) NOT NULL,
    password NVARCHAR(255) NOT NULL,
    email NVARCHAR(255),
    role NVARCHAR(50) DEFAULT 'user', -- Có thể là 'user' hoặc 'admin'
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- Bảng chứa thông tin tài liệu của thẻ Tập tin (tap_tin)
CREATE TABLE TapTin (
    id INT PRIMARY KEY IDENTITY(1,1),
    title NVARCHAR(255) NOT NULL,
    description NVARCHAR(255),
    file_path NVARCHAR(500) NOT NULL,
    uploaded_at DATETIME DEFAULT GETDATE()
);
GO

-- Bảng chứa thông tin hồ sơ môi trường (ho_so_moi_truong)
CREATE TABLE HoSoMoiTruong (
    id INT PRIMARY KEY IDENTITY(1,1),
    title NVARCHAR(255) NOT NULL,
    description NVARCHAR(255),
    file_path NVARCHAR(500) NOT NULL,
    uploaded_at DATETIME DEFAULT GETDATE()
);
GO

-- Bảng chứa thông tin khiếu nại
CREATE TABLE KhieuNai (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT,
    complaint_title NVARCHAR(255),
    complaint_description NVARCHAR(1000),
    status NVARCHAR(50) DEFAULT 'pending', -- Trạng thái của khiếu nại: 'pending', 'resolved'
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
GO

-- Bảng chứa thông tin trợ giúp
CREATE TABLE TroGiup (
    id INT PRIMARY KEY IDENTITY(1,1),
    question NVARCHAR(255),
    answer NVARCHAR(1000),
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- Thêm dữ liệu mẫu vào bảng Tabs
INSERT INTO Tabs (name, description) 
VALUES
('Tập tin', 'Quản lý tài liệu và tập tin'),
('Khác', 'Thông tin và các chức năng khác'),
('Hồ sơ Môi trường', 'Quản lý hồ sơ môi trường'),
('Giải Quyết Khiếu Nại', 'Giải quyết các khiếu nại của người dùng'),
('Trợ Giúp', 'Hướng dẫn và hỗ trợ người dùng');
GO

-- Thêm dữ liệu mẫu vào bảng Users
INSERT INTO Users (username, password, email, role)
VALUES 
('admin', 'adminpassword', 'admin@naturalweb.com', 'admin'),
('user1', 'userpassword', 'user1@naturalweb.com', 'user');
GO

-- Thêm dữ liệu mẫu vào bảng TapTin
INSERT INTO TapTin (title, description, file_path)
VALUES 
('Hướng dẫn sử dụng', 'Tài liệu hướng dẫn sử dụng hệ thống', '/assets/docs/huong_dan_su_dung.pdf');
GO

-- Thêm dữ liệu mẫu vào bảng HoSoMoiTruong
INSERT INTO HoSoMoiTruong (title, description, file_path)
VALUES 
('Hồ sơ Môi Trường 2024', 'Báo cáo môi trường năm 2024', '/assets/docs/ho_so_moi_truong_2024.pdf');
GO

-- Thêm dữ liệu mẫu vào bảng KhieuNai
INSERT INTO KhieuNai (user_id, complaint_title, complaint_description, status)
VALUES 
(2, 'Chậm xử lý yêu cầu', 'Tôi đã yêu cầu hỗ trợ nhưng chưa nhận được phản hồi.', 'pending');
GO

-- Thêm dữ liệu mẫu vào bảng TroGiup
INSERT INTO TroGiup (question, answer)
VALUES 
('Cách thay đổi mật khẩu?', 'Bạn có thể thay đổi mật khẩu trong phần Cài đặt tài khoản.');
GO
