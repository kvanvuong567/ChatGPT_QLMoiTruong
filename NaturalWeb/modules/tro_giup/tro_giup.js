// tro_giup.js - Logic cho thẻ Trợ Giúp

// Import các module cần thiết
const express = require('express');
const router = express.Router();
const db = require('../../server/db'); // Kết nối cơ sở dữ liệu

// API để lấy danh sách các câu hỏi trợ giúp
router.get('/api/faq', (req, res) => {
    const query = 'SELECT * FROM faq ORDER BY created_at DESC'; // Truy vấn để lấy tất cả các câu hỏi
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching FAQ data:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json(results); // Trả về dữ liệu câu hỏi
    });
});

// API để gửi câu hỏi trợ giúp mới
router.post('/api/faq', (req, res) => {
    const { question, answer } = req.body;
    if (!question || !answer) {
        return res.status(400).json({ message: 'Both question and answer are required' });
    }

    const query = 'INSERT INTO faq (question, answer, created_at) VALUES (?, ?, NOW())';
    db.query(query, [question, answer], (err, results) => {
        if (err) {
            console.error('Error inserting FAQ data:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'FAQ added successfully' });
    });
});

// API để tìm kiếm câu hỏi trợ giúp
router.get('/api/search', (req, res) => {
    const { searchQuery } = req.query;
    if (!searchQuery) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    const query = 'SELECT * FROM faq WHERE question LIKE ? ORDER BY created_at DESC';
    db.query(query, [`%${searchQuery}%`], (err, results) => {
        if (err) {
            console.error('Error searching FAQ data:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json(results); // Trả về kết quả tìm kiếm
    });
});

// Export module router
module.exports = router;
