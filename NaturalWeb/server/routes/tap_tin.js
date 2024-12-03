// tap_tin.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Thư mục chứa các tập tin
const filesDirectory = path.join(__dirname, '..', 'assets', 'files');

// Route để lấy danh sách các tập tin
router.get('/list', (req, res) => {
    fs.readdir(filesDirectory, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Không thể đọc thư mục tập tin.' });
        }
        // Trả về danh sách tập tin
        res.json({ files: files });
    });
});

// Route để tải lên một tập tin
router.post('/upload', (req, res) => {
    const file = req.files && req.files.file;
    if (!file) {
        return res.status(400).json({ message: 'Không có tập tin nào được chọn để tải lên.' });
    }

    const uploadPath = path.join(filesDirectory, file.name);

    // Di chuyển tập tin tới thư mục lưu trữ
    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Có lỗi xảy ra khi tải lên tập tin.' });
        }
        res.json({ message: 'Tập tin đã được tải lên thành công.', filename: file.name });
    });
});

// Route để tải xuống một tập tin
router.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(filesDirectory, filename);

    // Kiểm tra xem tập tin có tồn tại không
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ message: 'Tập tin không tồn tại.' });
        }

        // Trả về tập tin cho người dùng tải xuống
        res.download(filePath, filename, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Có lỗi xảy ra khi tải xuống tập tin.' });
            }
        });
    });
});

module.exports = router;
