// Lắng nghe sự kiện gửi biểu mẫu
document.getElementById('fileUploadForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của biểu mẫu (reload trang)

    // Lấy các giá trị từ biểu mẫu
    const fileName = document.getElementById('fileName').value;
    const fileDescription = document.getElementById('fileDescription').value;
    const fileUpload = document.getElementById('fileUpload').files[0];

    // Kiểm tra xem người dùng đã chọn tập tin chưa
    if (!fileUpload) {
        alert('Vui lòng chọn một tập tin để tải lên.');
        return;
    }

    // Tạo đối tượng FormData để gửi dữ liệu qua AJAX
    const formData = new FormData();
    formData.append('fileName', fileName);
    formData.append('fileDescription', fileDescription);
    formData.append('fileUpload', fileUpload);

    // Gửi dữ liệu qua AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload_endpoint.php', true);

    // Xử lý khi gửi thành công
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Hiển thị thông báo thành công
            alert('Tập tin đã được tải lên thành công!');
            // Có thể thêm mã để hiển thị tập tin mới trong danh sách nếu cần
            updateFileList();
        } else {
            // Xử lý khi có lỗi
            alert('Đã có lỗi xảy ra trong quá trình tải lên.');
        }
    };

    // Gửi yêu cầu
    xhr.send(formData);
});

// Hàm để cập nhật danh sách tập tin (ví dụ, tải lại từ máy chủ)
function updateFileList() {
    // Giả sử bạn có một API trả về danh sách tập tin
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_files_list.php', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const files = JSON.parse(xhr.responseText);
            const tbody = document.querySelector('table tbody');
            tbody.innerHTML = ''; // Xóa bảng hiện tại

            // Thêm từng tập tin vào bảng
            files.forEach((file, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${file.name}</td>
                    <td>${file.description}</td>
                    <td>${file.uploadDate}</td>
                    <td><button class="btn-download" onclick="downloadFile('${file.id}')">Tải Xuống</button></td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            alert('Không thể tải danh sách tập tin.');
        }
    };

    xhr.send();
}

// Hàm tải xuống tập tin
function downloadFile(fileId) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `download_file.php?id=${fileId}`, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const blob = xhr.response;
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `file_${fileId}.ext`; // Đặt tên tập tin khi tải xuống
            link.click();
        } else {
            alert('Không thể tải xuống tập tin.');
        }
    };

    xhr.responseType = 'blob'; // Yêu cầu trả về kiểu blob cho tệp tải về
    xhr.send();
}

// Khi trang được tải, cập nhật danh sách tập tin
window.onload = function () {
    updateFileList();
};
