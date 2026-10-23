# AI, nhìn là hiểu

Website tiếng Việt giúp giáo viên phổ thông giải thích và tổ chức hoạt động học AI. HTML/CSS/JavaScript thuần, không cần build hay khóa API.

## Chạy và xuất bản

- Mở bằng máy chủ tĩnh, ví dụ `python -m http.server 8000`, rồi truy cập `http://localhost:8000`.
- GitHub Pages: Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.
- Địa chỉ dự kiến: https://HienCaoPhuNhuan.github.io/ai-de-hieu/ (chỉ hoạt động sau khi bật Pages và triển khai thành công).

## Nội dung

AI và học máy; dữ liệu huấn luyện/xác thực/kiểm tra; mạng nơ-ron nhỏ học thật; Teachable Machine; AI tạo sinh; vai trò con người; tiết học 45 phút, phiếu in và câu hỏi kiểm tra.

Hai PDF nền trong thư mục Pre được ghi nguồn trên website; không đưa PDF gốc vào repo. Điều chỉnh tiểu học/THCS là đề xuất sư phạm, không thay thế hướng dẫn chương trình chính thức.

## Demo và giới hạn

- Mạng nhỏ tự cài đặt: 2 đầu vào, tùy chọn 8 nơ-ron tanh hoặc hồi quy logistic; binary cross entropy, full-batch gradient descent. 120 mẫu học và 120 mẫu kiểm tra tổng hợp được sinh độc lập, cố định seed. Không dùng test để cập nhật trọng số. Nếu dùng test chọn mô hình, cần tập đánh giá cuối cùng khác.
- Tự chạy khi demo xuất hiện trong màn hình; dừng khi tab ẩn, khi bấm Tạm dừng hoặc khi người dùng bật giảm chuyển động. Có nút học thêm từng bước. Tự dừng tại 5.000 lượt.
- Teachable Machine chặn nhúng trang huấn luyện. Website dùng thư viện ảnh chính thức để tải mô hình đã xuất và dự đoán ảnh cục bộ. Cần URL mô hình Image do giáo viên cung cấp; không có mô hình mẫu giả. Thư viện dùng các phiên bản được ví dụ chính thức nêu: tfjs 1.3.1 và teachablemachine/image 0.8.3, tải khi người dùng yêu cầu. Nên rà soát tương thích khi nâng phiên bản.
- TensorFlow Playground tải iframe theo yêu cầu, có liên kết tab riêng dự phòng. Cần nhấn Play trong công cụ ngoài; điều khiển tạm dừng của website không điều khiển iframe khác nguồn.
- Không có backend, analytics hoặc gửi ảnh lên máy chủ của website. Font Google, CDN, mô hình và iframe là dịch vụ bên ngoài; mạng bị chặn sẽ ảnh hưởng các phần tương ứng. Nội dung văn bản và demo toán học vẫn dùng được khi các dịch vụ này không tải.
- Prompt builder chỉ ghép khung văn bản; không gọi LLM. Hoạt ảnh token và quy trình được ghi rõ là minh họa.

## Kiểm tra trước tiết dạy

Mở thử trên máy chiếu, tải mô hình thật và một ảnh mới; thử mạng trường học; chuẩn bị ảnh cùng bảng kết quả để in khi mất mạng. Không dùng ảnh học sinh hoặc dữ liệu cá nhân cho bài thực hành mẫu.
