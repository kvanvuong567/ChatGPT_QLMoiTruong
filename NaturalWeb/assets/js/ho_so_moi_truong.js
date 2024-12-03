// Giả lập dữ liệu hồ sơ môi trường (thay thế bằng dữ liệu thực từ API hoặc cơ sở dữ liệu)
const environmentProfiles = [
    { id: 1, name: "Nguyễn Văn A", type: "Môi trường", date: "2024-12-01", details: "Chi tiết hồ sơ môi trường A" },
    { id: 2, name: "Trần Thị B", type: "Môi trường", date: "2024-12-02", details: "Chi tiết hồ sơ môi trường B" }
];

// Hàm hiển thị danh sách hồ sơ môi trường
function displayProfiles() {
    const profileTableBody = document.getElementById('profileTableBody');
    profileTableBody.innerHTML = ''; // Xóa nội dung bảng hiện tại

    environmentProfiles.forEach(profile => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${profile.id}</td>
            <td>${profile.name}</td>
            <td>${profile.type}</td>
            <td>${profile.date}</td>
            <td>${profile.details}</td>
            <td><button class="btn-view" onclick="viewProfile(${profile.id})">Xem</button></td>
        `;
        profileTableBody.appendChild(row);
    });
}

// Hàm xử lý sự kiện xem chi tiết hồ sơ
function viewProfile(id) {
    const profile = environmentProfiles.find(p => p.id === id);
    if (profile) {
        alert(`Thông tin chi tiết của hồ sơ: \n\nTên: ${profile.name}\nLoại: ${profile.type}\nNgày: ${profile.date}\nChi tiết: ${profile.details}`);
    }
}

// Hàm xử lý sự kiện thêm hồ sơ môi trường mới
document.getElementById('addProfileForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngừng gửi form mặc định

    const name = document.getElementById('profileName').value;
    const type = document.getElementById('profileType').value;
    const details = document.getElementById('profileDetails').value;
    const date = new Date().toISOString().split('T')[0]; // Ngày hiện tại (theo định dạng YYYY-MM-DD)

    if (name && type && details) {
        const newProfile = {
            id: environmentProfiles.length + 1,
            name: name,
            type: type,
            date: date,
            details: details
        };

        environmentProfiles.push(newProfile); // Thêm hồ sơ mới vào mảng
        displayProfiles(); // Cập nhật lại danh sách hồ sơ
        alert("Hồ sơ môi trường đã được thêm thành công!");
        
        // Reset form
        document.getElementById('addProfileForm').reset();
    } else {
        alert("Vui lòng điền đầy đủ thông tin!");
    }
});

// Hàm khởi tạo trang (hiển thị danh sách hồ sơ khi tải trang)
window.onload = function() {
    displayProfiles(); // Hiển thị các hồ sơ có sẵn
};
