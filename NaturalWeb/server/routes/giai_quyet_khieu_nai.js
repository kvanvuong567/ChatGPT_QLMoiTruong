const express = require('express');
const router = express.Router();
const giaiQuyetKhieuNai = require('../modules/giai_quyet_khieu_nai/giai_quyet_khieu_nai');

// Lấy danh sách các khiếu nại
router.get('/danh-sach', async (req, res) => {
    try {
        const khiuNaiList = await giaiQuyetKhieuNai.getAllKhiuNai();
        res.status(200).json(khiuNaiList);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách khiếu nại', error: error.message });
    }
});

// Lấy chi tiết một khiếu nại
router.get('/chi-tiet/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const khiuNai = await giaiQuyetKhieuNai.getKhiuNaiById(id);
        if (!khiuNai) {
            return res.status(404).json({ message: 'Không tìm thấy khiếu nại' });
        }
        res.status(200).json(khiuNai);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy chi tiết khiếu nại', error: error.message });
    }
});

// Thêm khiếu nại mới
router.post('/them', async (req, res) => {
    const { nguoiKhiuNai, noiDung, trangThai } = req.body;
    try {
        const newKhiuNai = await giaiQuyetKhieuNai.addKhiuNai({ nguoiKhiuNai, noiDung, trangThai });
        res.status(201).json({ message: 'Khiếu nại đã được thêm thành công', khiuNai: newKhiuNai });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm khiếu nại', error: error.message });
    }
});

// Cập nhật trạng thái của khiếu nại
router.put('/cap-nhat/:id', async (req, res) => {
    const { id } = req.params;
    const { trangThai } = req.body;
    try {
        const updatedKhiuNai = await giaiQuyetKhieuNai.updateKhiuNai(id, { trangThai });
        if (!updatedKhiuNai) {
            return res.status(404).json({ message: 'Không tìm thấy khiếu nại để cập nhật' });
        }
        res.status(200).json({ message: 'Khiếu nại đã được cập nhật', khiuNai: updatedKhiuNai });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật khiếu nại', error: error.message });
    }
});

// Xóa một khiếu nại
router.delete('/xoa/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedKhiuNai = await giaiQuyetKhieuNai.deleteKhiuNai(id);
        if (!deletedKhiuNai) {
            return res.status(404).json({ message: 'Không tìm thấy khiếu nại để xóa' });
        }
        res.status(200).json({ message: 'Khiếu nại đã được xóa thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa khiếu nại', error: error.message });
    }
});

module.exports = router;
