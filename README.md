# AI phân loại rác — Dự án lớp 12

Website tiếng Việt một trang, kết hợp kiến thức nền AI với dự án tạo trợ lý nhận dạng vật liệu rác. HTML/CSS/JavaScript thuần, chạy trên GitHub Pages, không backend hoặc khóa API.

Website: https://hiencaophunhuan.github.io/ai-de-hieu/

## Tuyến học
Xác định vấn đề và thiết kế → dữ liệu → hiểu cơ chế bằng Playground → huấn luyện Image bằng Teachable Machine → tải mô hình và kiểm thử → bảo vệ sản phẩm.

Ba nhóm vật mẫu: Giấy/bìa, Chai nhựa, Lon kim loại. Đây không phải quy tắc thu gom phổ quát. Mô hình hỗ trợ dự đoán; người dùng đối chiếu vật thật. Hướng dẫn thùng chỉ hiện khi giáo viên cấu hình, xác nhận quy ước, người dùng xác nhận đúng và ảnh trong phạm vi.

## Chạy
Dùng máy chủ tĩnh tại root, chẳng hạn `python -m http.server 8000`. Không cần build. Kiểm tra bằng `node tests/project.test.cjs`.

## Chức năng
- Minh họa tự chạy, nút dừng, chế độ trình chiếu và in phiếu thiết kế.
- Playground chính thức nhúng sẵn; nhấn Play bên trong iframe. Nút dừng website không điều khiển iframe khác nguồn.
- Tải mô hình Image bằng URL Teachable Machine; các nhãn được đọc từ mô hình, không ánh xạ ngầm. Cần mô hình thật do nhóm/giáo viên cung cấp; không có mô hình rác mẫu mặc định.
- Ảnh JPG/PNG/WebP ≤10 MB, giới hạn kích thước sau giải mã; xử lý trong trình duyệt. Thư viện chính thức tfjs 1.3.1 và teachablemachine/image 0.8.3 chỉ tải khi yêu cầu mô hình.
- Ghi từng phép thử, chống ghi lặp cùng mã ảnh/tập/lần tải; thống kê và bảng nhầm lẫn tách theo lần tải mô hình, phiên bản và tập.
- CSV có chống ô công thức; thẻ mô hình Markdown gồm kết quả đã ghi và thông tin nhóm nhập.
- Nhật ký, quy tắc thu gom và biểu mẫu chỉ trong bộ nhớ phiên. Tải CSV/thẻ trước khi đóng trang.
- Giữ GoatCounter taphuanai; không gửi nội dung dự án, URL mô hình hoặc ảnh vào analytics. Xem ANALYTICS.md.

## Hồ sơ
PROJECT-WASTE-GRADE12.md lưu thiết kế sư phạm, tiến trình 6 tiết, rubric và trạng thái. VALIDATION.md ghi kiểm tra và giới hạn: chưa thử trực quan trình duyệt hoặc end-to-end với mô hình rác thật trong phiên triển khai.

Các tài liệu nền chỉ được ghi trong hồ sơ repo; website không hiển thị danh mục tham khảo. Tự huấn luyện/tích hợp là mở rộng, không bắt buộc cho mọi học sinh để đạt mục tiêu cốt lõi.
