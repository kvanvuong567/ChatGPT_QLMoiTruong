// Import các module cần thiết
const express = require('express');
const router = express.Router();
const db = require('../../server/db'); // Giả sử chúng ta có một module kết nối đến cơ sở dữ liệu

// Middleware để kiểm tra và xử lý các lỗi
const handleError = (err, res) => {
    console.error(err);
    res.status(500).send('Đã xảy ra lỗi! Vui lòng thử lại sau.');
};

// Route để lấy dữ liệu từ cơ sở dữ liệu
router.get('/getData', (req, res) => {
    const query = 'SELECT * FROM khac_data'; // Giả sử chúng ta có bảng 'khac_data' trong cơ sở dữ liệu

    db.query(query, (err, results) => {
        if (err) {
            return handleError(err, res);
        }

        res.json(results); // Trả kết quả về cho phía client dưới dạng JSON
    });
});

// Route để thêm một mục mới vào cơ sở dữ liệu
router.post('/addItem', (req, res) => {
    const { itemName, itemDescription } = req.body; // Giả sử chúng ta cần 'itemName' và 'itemDescription'

    if (!itemName || !itemDescription) {
        return res.status(400).send('Tên và mô tả mục không được để trống!');
    }

    const query = 'INSERT INTO khac_data (name, description) VALUES (?, ?)';

    db.query(query, [itemName, itemDescription], (err, results) => {
        if (err) {
            return handleError(err, res);
        }

        res.status(201).send('Mục đã được thêm thành công!');
    });
});

// Route để cập nhật thông tin của một mục
router.put('/updateItem/:id', (req, res) => {
    const { id } = req.params;
    const { itemName, itemDescription } = req.body;

    if (!itemName || !itemDescription) {
        return res.status(400).send('Tên và mô tả mục không được để trống!');
    }

    const query = 'UPDATE khac_data SET name = ?, description = ? WHERE id = ?';

    db.query(query, [itemName, itemDescription, id], (err, results) => {
        if (err) {
            return handleError(err, res);
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Không tìm thấy mục cần cập nhật.');
        }

        res.send('Mục đã được cập nhật thành công!');
    });
});

// Route để xóa một mục
router.delete('/deleteItem/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM khac_data WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            return handleError(err, res);
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Không tìm thấy mục cần xóa.');
        }

        res.send('Mục đã được xóa thành công!');
    });
});

// Export router để sử dụng trong ứng dụng chính
module.exports = router;
