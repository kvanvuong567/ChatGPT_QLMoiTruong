// Import các mô-đun cần thiết
const express = require('express');
const router = express.Router();
const khacModule = require('../modules/khac/khac'); // Logic cho thẻ Khác

// API route cho thẻ Khác
// Lấy tất cả các thông tin liên quan đến thẻ Khác
router.get('/api/khac', async (req, res) => {
    try {
        const result = await khacModule.getAllData();
        res.status(200).json(result); // Trả về dữ liệu dưới dạng JSON
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy dữ liệu', error: error.message });
    }
});

// API route cho việc tạo mới thông tin trong thẻ Khác
router.post('/api/khac', async (req, res) => {
    try {
        const { name, description } = req.body; // Nhận dữ liệu từ body
        if (!name || !description) {
            return res.status(400).json({ message: 'Name và Description là bắt buộc' });
        }
        const newItem = await khacModule.createData(name, description);
        res.status(201).json(newItem); // Trả về dữ liệu vừa tạo
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra khi tạo mới', error: error.message });
    }
});

// API route cho việc cập nhật thông tin thẻ Khác
router.put('/api/khac/:id', async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ tham số
        const { name, description } = req.body; // Nhận dữ liệu từ body
        if (!name || !description) {
            return res.status(400).json({ message: 'Name và Description là bắt buộc' });
        }
        const updatedItem = await khacModule.updateData(id, name, description);
        if (!updatedItem) {
            return res.status(404).json({ message: 'Không tìm thấy thông tin cần cập nhật' });
        }
        res.status(200).json(updatedItem); // Trả về dữ liệu đã cập nhật
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật thông tin', error: error.message });
    }
});

// API route cho việc xóa thông tin thẻ Khác
router.delete('/api/khac/:id', async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ tham số
        const deletedItem = await khacModule.deleteData(id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Không tìm thấy thông tin cần xóa' });
        }
        res.status(200).json({ message: 'Xóa thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra khi xóa thông tin', error: error.message });
    }
});

// Export router để sử dụng trong file chính app.js
module.exports = router;
