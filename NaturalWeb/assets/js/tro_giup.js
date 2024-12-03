// Khi tài liệu đã được tải xong, chạy hàm này
document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các phần tử câu hỏi (dt) trong phần FAQ
    const questionItems = document.querySelectorAll('.help-content dt');
    
    questionItems.forEach(item => {
        // Thêm sự kiện click cho mỗi câu hỏi
        item.addEventListener('click', function() {
            // Lấy phần tử câu trả lời (dd) tương ứng với câu hỏi
            const answer = item.nextElementSibling;

            // Toggle trạng thái hiển thị câu trả lời (hiện/ẩn)
            if (answer.style.display === 'none' || answer.style.display === '') {
                answer.style.display = 'block'; // Hiển thị câu trả lời
            } else {
                answer.style.display = 'none'; // Ẩn câu trả lời
            }
        });
    });
});
