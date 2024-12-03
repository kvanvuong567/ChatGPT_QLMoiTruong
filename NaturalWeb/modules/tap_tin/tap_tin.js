// tap_tin.js - Logic cho thẻ Tập tin

// Hàm xử lý sự kiện tải lên tập tin
function handleFileUpload(event) {
    const fileInput = document.getElementById('file-input');
    const fileList = fileInput.files;

    if (fileList.length > 0) {
        const fileName = fileList[0].name;
        alert("Đã chọn tập tin: " + fileName);
        // Tiến hành xử lý tập tin (upload, lưu trữ, v.v...)
    } else {
        alert("Chưa chọn tập tin nào.");
    }
}

// Hàm hiển thị danh sách tập tin đã tải lên (ví dụ giả lập từ server)
function displayFileList() {
    const fileListContainer = document.getElementById('file-list');
    const files = [
        { name: "file1.pdf", size: "1.2MB" },
        { name: "file2.docx", size: "512KB" },
        { name: "file3.jpg", size: "2.3MB" }
    ];

    // Xóa danh sách cũ
    fileListContainer.innerHTML = '';

    // Tạo danh sách các tập tin
    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.classList.add('file-item');
        fileItem.innerHTML = `<p><strong>${file.name}</strong> - ${file.size}</p>`;
        fileListContainer.appendChild(fileItem);
    });
}

// Hàm tải lên tập tin mới
function uploadFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file) {
        // Tiến hành upload tập tin đến server
        const formData = new FormData();
        formData.append("file", file);

        fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Tập tin đã được tải lên thành công.");
                displayFileList(); // Cập nhật danh sách tập tin
            } else {
                alert("Có lỗi xảy ra trong quá trình tải lên.");
            }
        })
        .catch(error => {
            console.error("Lỗi khi tải lên tập tin: ", error);
            alert("Không thể tải lên tập tin.");
        });
    } else {
        alert("Vui lòng chọn một tập tin để tải lên.");
    }
}

// Hàm xóa tập tin đã chọn
function deleteFile(fileName) {
    fetch(`/api/delete/${fileName}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Tập tin đã được xóa.");
            displayFileList(); // Cập nhật danh sách tập tin
        } else {
            alert("Có lỗi khi xóa tập tin.");
        }
    })
    .catch(error => {
        console.error("Lỗi khi xóa tập tin: ", error);
        alert("Không thể xóa tập tin.");
    });
}

// Sự kiện khi tải trang
document.addEventListener("DOMContentLoaded", function() {
    displayFileList(); // Hiển thị danh sách tập tin
    const uploadButton = document.getElementById('upload-button');
    uploadButton.addEventListener('click', uploadFile); // Gán sự kiện cho nút tải lên
});
