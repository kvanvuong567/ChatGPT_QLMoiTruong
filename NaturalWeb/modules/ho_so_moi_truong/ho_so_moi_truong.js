// Đảm bảo rằng cần thiết phải sử dụng một số module hỗ trợ
const express = require('express');
const router = express.Router();

// Kết nối đến cơ sở dữ liệu
const db = require('../../server/db');

// Lấy tất cả hồ sơ môi trường
router.get('/all', (req, res) => {
  db.query('SELECT * FROM HoSoMoiTruong', (err, result) => {
    if (err) {
      console.error('Error fetching data: ', err);
      res.status(500).send('Lỗi khi lấy dữ liệu.');
    } else {
      res.json(result);
    }
  });
});

// Lấy thông tin hồ sơ môi trường theo ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM HoSoMoiTruong WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error fetching data: ', err);
      res.status(500).send('Lỗi khi lấy dữ liệu.');
    } else if (result.length === 0) {
      res.status(404).send('Không tìm thấy hồ sơ môi trường với ID này.');
    } else {
      res.json(result[0]);
    }
  });
});

// Thêm mới hồ sơ môi trường
router.post('/add', (req, res) => {
  const { tenHoSo, moTa, ngayTao, nguoiTao } = req.body;
  const query = 'INSERT INTO HoSoMoiTruong (tenHoSo, moTa, ngayTao, nguoiTao) VALUES (?, ?, ?, ?)';
  db.query(query, [tenHoSo, moTa, ngayTao, nguoiTao], (err, result) => {
    if (err) {
      console.error('Error inserting data: ', err);
      res.status(500).send('Lỗi khi thêm hồ sơ.');
    } else {
      res.status(201).send('Hồ sơ môi trường đã được thêm thành công.');
    }
  });
});

// Cập nhật thông tin hồ sơ môi trường
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { tenHoSo, moTa, ngayTao, nguoiTao } = req.body;
  const query = 'UPDATE HoSoMoiTruong SET tenHoSo = ?, moTa = ?, ngayTao = ?, nguoiTao = ? WHERE id = ?';
  db.query(query, [tenHoSo, moTa, ngayTao, nguoiTao, id], (err, result) => {
    if (err) {
      console.error('Error updating data: ', err);
      res.status(500).send('Lỗi khi cập nhật hồ sơ.');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Không tìm thấy hồ sơ với ID này để cập nhật.');
    } else {
      res.send('Hồ sơ môi trường đã được cập nhật.');
    }
  });
});

// Xóa hồ sơ môi trường
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM HoSoMoiTruong WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting data: ', err);
      res.status(500).send('Lỗi khi xóa hồ sơ.');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Không tìm thấy hồ sơ với ID này để xóa.');
    } else {
      res.send('Hồ sơ môi trường đã được xóa.');
    }
  });
});

module.exports = router;
