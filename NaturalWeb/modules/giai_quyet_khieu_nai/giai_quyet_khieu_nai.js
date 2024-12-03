const db = require('../../server/db');  // Kết nối cơ sở dữ liệu
const express = require('express');
const router = express.Router();

// Lấy danh sách khiếu nại
router.get('/getAllComplaints', (req, res) => {
    const query = 'SELECT * FROM complaints ORDER BY complaint_date DESC';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching complaints:', err);
            res.status(500).json({ message: 'Lỗi khi lấy dữ liệu khiếu nại' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Lấy chi tiết một khiếu nại cụ thể theo ID
router.get('/getComplaintById/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM complaints WHERE complaint_id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error fetching complaint:', err);
            res.status(500).json({ message: 'Lỗi khi lấy chi tiết khiếu nại' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Không tìm thấy khiếu nại với ID này' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
});

// Thêm mới một khiếu nại
router.post('/fileComplaint', (req, res) => {
    const { user_id, complaint_title, complaint_description, complaint_date } = req.body;

    const query = 'INSERT INTO complaints (user_id, complaint_title, complaint_description, complaint_date) VALUES (?, ?, ?, ?)';

    db.query(query, [user_id, complaint_title, complaint_description, complaint_date], (err, result) => {
        if (err) {
            console.error('Error filing complaint:', err);
            res.status(500).json({ message: 'Lỗi khi nộp khiếu nại' });
        } else {
            res.status(201).json({ message: 'Nộp khiếu nại thành công', complaint_id: result.insertId });
        }
    });
});

// Cập nhật trạng thái giải quyết của khiếu nại
router.put('/updateComplaintStatus/:id', (req, res) => {
    const { id } = req.params;
    const { status, resolution_date } = req.body;

    const query = 'UPDATE complaints SET status = ?, resolution_date = ? WHERE complaint_id = ?';

    db.query(query, [status, resolution_date, id], (err, result) => {
        if (err) {
            console.error('Error updating complaint status:', err);
            res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái khiếu nại' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Không tìm thấy khiếu nại với ID này' });
            } else {
                res.status(200).json({ message: 'Cập nhật trạng thái khiếu nại thành công' });
            }
        }
    });
});

// Xóa một khiếu nại
router.delete('/deleteComplaint/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM complaints WHERE complaint_id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting complaint:', err);
            res.status(500).json({ message: 'Lỗi khi xóa khiếu nại' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Không tìm thấy khiếu nại với ID này' });
            } else {
                res.status(200).json({ message: 'Xóa khiếu nại thành công' });
            }
        }
    });
});

module.exports = router;
