// Đây là file JavaScript hỗ trợ chức năng tương tác cho trang "Khác"

// Ví dụ: Thêm một sự kiện khi người dùng nhấn vào các mục trong phần "Thông tin liên hệ"
document.addEventListener("DOMContentLoaded", function () {
    // Thêm sự kiện cho các mục danh bạ
    const contactItems = document.querySelectorAll(".other-content ul li");

    contactItems.forEach(item => {
        item.addEventListener("click", function () {
            alert("Bạn đã nhấn vào mục: " + item.textContent);
        });
    });
});
