# Kiểm tra bản triển khai dự án lớp 12

## Đã thực hiện trong phiên
- Biên dịch cú pháp app.js, guide.js, project-core.js và tests/project.test.cjs bằng JavaScript V8.
- Kiểm tra HTML lồng thẻ, ID duy nhất, liên kết trong trang và ID mà JavaScript tham chiếu.
- Thực thi hàm thuần: CSV xử lý dấu nháy/xuống dòng, ngăn ô công thức; thống kê tách theo mô hình/phiên bản/tập; loại các lần ngoài phạm vi khỏi mẫu số; kiểm tra kết luận mâu thuẫn.
- Chạy sự kiện giao diện với DOM và mô hình được giả lập kiểm thử: chưa có mô hình, nhãn mô hình, lỗi URL giao diện, tệp sai, dự đoán thành công giả lập, ghi một lần, cập nhật kết quả, ngoài phạm vi, xuất CSV/thẻ, xóa nhật ký, lỗi suy luận/tải lại không giữ kết quả cũ, preset Playground.
- Đối chiếu getClassLabels() và predict(image) với README thư viện ảnh Teachable Machine chính thức.
- Analytics.js được giữ nguyên; mã mới không gửi ảnh, nhật ký hoặc biểu mẫu tới máy chủ.

## Giới hạn
- Môi trường máy làm việc chuyển sang không khả dụng; không chạy Node CLI hoặc kiểm tra trực quan bằng trình duyệt trong phiên này.
- Bộ test Node đã lưu gồm thêm kiểm tra URL bằng URL chuẩn của Node; phần này chưa chạy trong phiên vì JavaScript điều phối không cung cấp URL chuẩn. Các điều kiện kiểm tra URL đã được rà soát mã.
- DOM/mô hình giả lập chỉ kiểm tra logic ứng dụng, không xác nhận CSS, CDN, CORS, iframe, tốc độ hoặc độ chính xác mô hình thật.
- Chưa có mô hình rác thật/bộ ảnh được xác minh để thực hiện end-to-end. Người dạy cần thử URL mô hình và ảnh mới trước buổi học.

## Tái kiểm tra
Chạy từ repo bằng Node: `node tests/project.test.cjs` (không cần cài gói).
Kiểm tra thêm trên trình duyệt: 390px và 1280px, Play/Pause minh họa, cả ba preset Playground, tải mô hình thật, đổi mô hình thất bại, ảnh ngoài phạm vi, ghi bảng, xuất CSV/thẻ, in phiếu. Kiểm tra ô CSV bắt đầu bằng = + - @ vẫn là văn bản.

## Phát hành
Chỉ cập nhật main bằng một lần chuyển ref sau khi toàn bộ mã và nội dung đã sẵn sàng. Kiểm tra workflow GitHub Pages cho commit đó; thành công của build không thay thế kiểm tra mô hình thật.
