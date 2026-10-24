# Thống kê lượt truy cập

Hiện trạng: đã cấu hình endpoint `https://taphuanai.goatcounter.com/count` ngày 24/10/2026. Dashboard: https://taphuanai.goatcounter.com/ . Số liệu bắt đầu từ khi người dùng tải phiên bản website có cấu hình này; cần kiểm tra dashboard để xác nhận lượt đã nhận. Không có số đếm giả hoặc bộ đếm localStorage.

## Kích hoạt

1. Chủ website đăng ký tại https://www.goatcounter.com/ và tạo site cho `https://hiencaophunhuan.github.io/ai-de-hieu/`.
2. Lấy endpoint dạng `https://TEN-SITE.goatcounter.com/count` trong hướng dẫn cài đặt của tài khoản.
3. Thay chuỗi rỗng `ANALYTICS_ENDPOINT` trong `analytics.js` bằng endpoint đó; commit để Pages triển khai lại. Đây là địa chỉ công khai, **không phải API token**. Không đưa mật khẩu hoặc khóa API vào repo.
4. Mở website rồi kiểm tra dashboard GoatCounter. Nếu không có dữ liệu, kiểm tra trình chặn theo dõi và kết nối dịch vụ. Thử một lần ở trình duyệt thường, không dùng cửa sổ localhost để kiểm tra bộ đếm.

Script chỉ được bật ở tên miền Pages chính thức. Nó gom URL về `/ai-de-hieu/`, đặt tiêu đề cố định, không gửi referrer, query, hash, nội dung prompt, ảnh hoặc đường dẫn mô hình. Không gắn sự kiện đếm cho từng cú nhấp. Dịch vụ ngoài vẫn tiếp nhận yêu cầu mạng và các dữ liệu thống kê theo thiết kế của họ; xem chính sách dịch vụ trước khi bật.

## Đọc số liệu

- Pageviews: lượt xem được ghi nhận. Một người tải lại trang có thể tạo thêm lượt.
- Visitors: số khách ước tính theo cách dịch vụ phân biệt phiên/khách, không phải danh tính hay số giáo viên chính xác.
- Dashboard lưu tập trung qua nhiều thiết bị. Không thể khôi phục lượt truy cập trước ngày bắt đầu thu thập nếu không có dữ liệu lịch sử khác.
- Trình chặn, mất mạng và bot có thể ảnh hưởng số liệu. Không coi đây là số học sinh đã hoàn thành bài học.
- GitHub repository Traffic đo truy cập repo, không thay thế thống kê website Pages.

## Hiển thị bộ đếm công khai (tùy chọn)

Mặc định chỉ chủ tài khoản xem dashboard. Nếu muốn hiện số ngay trên trang, bật “Allow adding visitor counts on your website” trong GoatCounter rồi tích hợp `goatcounter.visit_count()` theo tài liệu chính thức. Chưa bật tùy chọn này trong phiên bản hiện tại.

Nguồn: https://www.goatcounter.com/help/start ; https://www.goatcounter.com/help/visitor-counter ; https://www.goatcounter.com/help/sessions ; https://docs.github.com/en/rest/metrics/traffic .
