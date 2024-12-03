// tro_giup.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Thư mục chứa các tài liệu trợ giúp
const helpFilesDirectory = path.join(__dirname, '..', 'assets', 'help_files');

// Route để lấy danh sách các tài liệu trợ giúp
router.get('/list', (req, res) => {
    fs.readdir(helpFilesDirectory, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Không thể đọc thư mục tài liệu trợ giúp.' });
        }
        // Trả về danh sách các tài liệu trợ giúp
        res.json({ files: files });
    });
});

// Route để tải lên một tài liệu trợ giúp mới
router.post('/upload', (req, res) => {
    const file = req.files && req.files.file;
    if (!file) {
        return res.status(400).json({ message: 'Không có tài liệu nào được chọn để tải lên.' });
    }

    const uploadPath = path.join(helpFilesDirectory, file.name);

    // Di chuyển tài liệu tới thư mục lưu trữ
    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Có lỗi xảy ra khi tải lên tài liệu trợ giúp.' });
        }
        res.json({ message: 'Tài liệu đã được tải lên thành công.', filename: file.name });
    });
});

// Route để tải xuống một tài liệu trợ giúp
router.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(helpFilesDirectory, filename);

    // Kiểm tra xem tài liệu có tồn tại không
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ message: 'Tài liệu không tồn tại.' });
        }

        // Trả về tài liệu cho người dùng tải xuống
        res.download(filePath, filename, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Có lỗi xảy ra khi tải xuống tài liệu trợ giúp.' });
            }
        });
    });
});

// Route để gửi yêu cầu trợ giúp từ người dùng
router.post('/request', (req, res) => {
    const { userId, issueDescription } = req.body;

    if (!userId || !issueDescription) {
        return res.status(400).json({ message: 'Yêu cầu trợ giúp cần có userId và mô tả vấn đề.' });
    }

    // Giả sử yêu cầu trợ giúp sẽ được lưu vào cơ sở dữ liệu (chưa triển khai trong mã này)
    // Gửi phản hồi cho người dùng rằng yêu cầu đã được nhận
    res.json({ message: 'Yêu cầu trợ giúp của bạn đã được gửi. Chúng tôi sẽ liên hệ với bạn sớm nhất.' });
});

module.exports = router;
