// Chờ DOM tải xong
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("complaintForm");
    const tbody = document.querySelector("table tbody");

    // Biến lưu trữ ID khiếu nại (tăng dần)
    let complaintID = 3;

    // Xử lý sự kiện khi gửi form
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Ngăn trang reload

        // Lấy giá trị từ form
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const complaintType = document.getElementById("complaintType").value;
        const details = document.getElementById("details").value.trim();

        // Kiểm tra dữ liệu
        if (!name || !email || !complaintType || !details) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        // Tạo hàng mới trong bảng
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${complaintID++}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${getComplaintTypeText(complaintType)}</td>
            <td>${details}</td>
            <td><button class="btn-view">Xem</button></td>
        `;

        // Thêm hàng vào bảng
        tbody.appendChild(newRow);

        // Reset form
        form.reset();

        // Thông báo thành công
        alert("Khiếu nại của bạn đã được gửi thành công!");
    });

    // Lấy mô tả loại khiếu nại
    function getComplaintTypeText(value) {
        switch (value) {
            case "environment":
                return "Môi trường";
            case "service":
                return "Dịch vụ";
            case "other":
                return "Khác";
            default:
                return "Không xác định";
        }
    }

    // Xử lý nút "Xem"
    tbody.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-view")) {
            const row = event.target.closest("tr");
            const name = row.children[1].textContent;
            const email = row.children[2].textContent;
            const complaintType = row.children[3].textContent;
            const details = row.children[4].textContent;

            // Hiển thị thông tin khiếu nại
            alert(`Thông tin khiếu nại:\n\nHọ và Tên: ${name}\nEmail: ${email}\nLoại Khiếu Nại: ${complaintType}\nChi Tiết: ${details}`);
        }
    });
});
