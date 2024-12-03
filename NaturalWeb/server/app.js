const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Kết nối với các router
const tapTinRoutes = require('./routes/tap_tin');
const khacRoutes = require('./routes/khac');
const hoSoMoiTruongRoutes = require('./routes/ho_so_moi_truong');
const giaiQuyetKhieuNaiRoutes = require('./routes/giai_quyet_khieu_nai');
const troGiupRoutes = require('./routes/tro_giup');

// Khởi tạo ứng dụng Express
const app = express();

// Cấu hình CORS cho phép giao tiếp với các domain khác
app.use(cors());

// Cấu hình body-parser để xử lý dữ liệu từ form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình thư mục tĩnh (public folder) để phục vụ các tài nguyên như CSS, JS, và hình ảnh
app.use(express.static(path.join(__dirname, '../assets')));

// Các route API cho các module
app.use('/api/tap_tin', tapTinRoutes);
app.use('/api/khac', khacRoutes);
app.use('/api/ho_so_moi_truong', hoSoMoiTruongRoutes);
app.use('/api/giai_quyet_khieu_nai', giaiQuyetKhieuNaiRoutes);
app.use('/api/tro_giup', troGiupRoutes);

// Đặt trang chủ (home page)
app.get('/', (req, res) => {
    res.send('Welcome to NaturalWeb API');
});

// Khởi tạo server và lắng nghe cổng
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
