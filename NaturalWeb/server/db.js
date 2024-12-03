const sql = require('mssql');  // Thư viện để kết nối với SQL Server

// Cấu hình kết nối với cơ sở dữ liệu SQL Server
const config = {
    user: 'sa',      
    password: '1111',  
    server: 'DESKTOP-GVDQ046',     
    database: 'NaturalWeb',  // Tên cơ sở dữ liệu
    options: {
        encrypt: true,          // Mã hóa kết nối (dành cho Azure)
        trustServerCertificate: true // Đảm bảo chứng chỉ server được tin cậy
    }
};

// Kết nối cơ sở dữ liệu
sql.connect(config).then(pool => {
    console.log('Connected to SQL Server');
    module.exports = pool;  // Xuất pool kết nối để sử dụng ở các module khác
}).catch(err => {
    console.error('Error connecting to SQL Server:', err);
    process.exit(1); // Dừng ứng dụng nếu không thể kết nối
});

// Định nghĩa một số phương thức tiện ích cho việc truy vấn
const query = (queryString, params = []) => {
    return sql.query(queryString).then(result => {
        return result.recordset; // Trả về dữ liệu kết quả truy vấn
    }).catch(err => {
        console.error('Error executing query:', err);
        throw new Error('Database query error');
    });
};

// Phương thức truy vấn với parameterized queries (truy vấn an toàn)
const executeQuery = (queryString, params) => {
    return sql.connect(config).then(pool => {
        return pool.request()
            .input('param1', sql.Int, params.param1)  // Ví dụ, truyền vào các tham số nếu cần
            .query(queryString);
    }).then(result => {
        return result.recordset;
    }).catch(err => {
        console.error('Error executing parameterized query:', err);
        throw new Error('Database query error');
    });
};

module.exports.query = query;
module.exports.executeQuery = executeQuery;






// const sql = require('mssql');

// const config = {
//     user: 'sa',         
//     password: '1111',     
//     server: 'DESKTOP-GVDQ046',
//     database: 'HoSoMoiTruong',
//     options: {
//         encrypt: true,
//         enableArithAbort: true,
//     },
// };

// async function connectDB() {
//     try {
//         await sql.connect(config);
//         console.log('Connected to SQL Server');
//     } catch (err) {
//         console.error('Database connection failed: ', err.message);
//     }
// }

// module.exports = {
//     connectDB,
//     sql,
// };
