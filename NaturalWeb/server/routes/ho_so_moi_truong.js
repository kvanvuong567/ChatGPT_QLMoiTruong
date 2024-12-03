const express = require('express');
const router = express.Router();
const hoSoMoiTruongModel = require('../modules/ho_so_moi_truong/ho_so_moi_truong');

// Lấy danh sách hồ sơ môi trường
router.get('/ho-so-moi-truong', async (req, res) => {
    try {
        const hoSoMoiTruongList = await hoSoMoiTruongModel.getAllHoSoMoiTruong();
        res.status(200).json(hoSoMoiTruongList);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách hồ sơ môi trường.', error });
    }
});

// Lấy thông tin chi tiết một hồ sơ môi trường
router.get('/ho-so-moi-truong/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const hoSoMoiTruong = await hoSoMoiTruongModel.getHoSoMoiTruongById(id);
        if (hoSoMoiTruong) {
            res.status(200).json(hoSoMoiTruong);
        } else {
            res.status(404).json({ message: 'Không tìm thấy hồ sơ môi trường.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy hồ sơ môi trường.', error });
    }
});

// Thêm mới hồ sơ môi trường
router.post('/ho-so-moi-truong', async (req, res) => {
    const newHoSoMoiTruong = req.body;
    try {
        const createdHoSo = await hoSoMoiTruongModel.createHoSoMoiTruong(newHoSoMoiTruong);
        res.status(201).json(createdHoSo);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm hồ sơ môi trường.', error });
    }
});

// Cập nhật hồ sơ môi trường
router.put('/ho-so-moi-truong/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    try {
        const updatedHoSo = await hoSoMoiTruongModel.updateHoSoMoiTruong(id, updatedData);
        if (updatedHoSo) {
            res.status(200).json(updatedHoSo);
        } else {
            res.status(404).json({ message: 'Không tìm thấy hồ sơ môi trường để cập nhật.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật hồ sơ môi trường.', error });
    }
});

// Xóa hồ sơ môi trường
router.delete('/ho-so-moi-truong/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedHoSo = await hoSoMoiTruongModel.deleteHoSoMoiTruong(id);
        if (deletedHoSo) {
            res.status(200).json({ message: 'Hồ sơ môi trường đã được xóa.' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy hồ sơ môi trường để xóa.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa hồ sơ môi trường.', error });
    }
});

module.exports = router;
