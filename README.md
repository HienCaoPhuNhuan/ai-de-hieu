# AI, nhìn là hiểu

Website tiếng Việt giúp giáo viên THPT giải thích và tổ chức hoạt động học AI. HTML/CSS/JavaScript thuần, không cần build hay khóa API.

## Chạy và xuất bản

- Mở bằng máy chủ tĩnh, ví dụ `python -m http.server 8000`, rồi truy cập `http://localhost:8000`.
- GitHub Pages: Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.
- Địa chỉ dự kiến: https://HienCaoPhuNhuan.github.io/ai-de-hieu/ (chỉ hoạt động sau khi bật Pages và triển khai thành công).

## Nội dung

AI và học máy; dữ liệu huấn luyện/xác thực/kiểm tra; Playground chính thức được nhúng; Teachable Machine; AI tạo sinh; vai trò con người; tiết học 45 phút, phiếu in và câu hỏi kiểm tra.

Nội dung được biên tập lại theo phần II của tài liệu tập huấn AI cấp THPT mới trong Pre, kết hợp nội dung đã xây dựng. Không hiển thị nguồn tham khảo trên trang và không đưa PDF gốc vào repo. Chi tiết quyết định biên tập nằm trong CONTENT-THPT.md. Phân biệt mục tiêu cốt lõi và hoạt động mở rộng, không mặc định học sinh biết lập trình.

## Demo và giới hạn

- Playground chính thức được nhúng sẵn bằng iframe; ba bài có cấu hình URL gồm quan sát vòng tròn, Linear và dữ liệu nhiễu. Người học nhấn Play trong công cụ. Không còn mô hình huấn luyện hoặc sandbox nơ-ron tự cài đặt.
- Các minh họa giải thích quy trình của website vẫn tự chạy theo vùng nhìn thấy và có nút tạm dừng. Nút này không điều khiển iframe khác nguồn.
- Teachable Machine chặn nhúng trang huấn luyện. Website dùng thư viện ảnh chính thức để tải mô hình đã xuất và dự đoán ảnh cục bộ. Cần URL mô hình Image do giáo viên cung cấp; không có mô hình mẫu giả. Thư viện dùng các phiên bản được ví dụ chính thức nêu: tfjs 1.3.1 và teachablemachine/image 0.8.3, tải khi người dùng yêu cầu. Nên rà soát tương thích khi nâng phiên bản.
- TensorFlow Playground có iframe sẵn, tải khi đến gần vùng thực hành, có liên kết tab riêng dự phòng. Cần nhấn Play trong công cụ ngoài; điều khiển tạm dừng của website không điều khiển iframe khác nguồn.
- Không có backend hoặc gửi ảnh lên máy chủ của website. Đã kết nối thống kê GoatCounter taphuanai; xem ANALYTICS.md. Font Google, CDN, mô hình và iframe là dịch vụ bên ngoài; mạng bị chặn sẽ ảnh hưởng các phần tương ứng. Nội dung văn bản và hình minh họa SVG vẫn xem được khi các dịch vụ này không tải.
- Prompt builder chỉ ghép khung văn bản; không gọi LLM. Hoạt ảnh token và quy trình được ghi rõ là minh họa.

## Kiểm tra trước tiết dạy

Mở thử trên máy chiếu, tải mô hình thật và một ảnh mới; thử mạng trường học; chuẩn bị ảnh cùng bảng kết quả để in khi mất mạng. Không dùng ảnh học sinh hoặc dữ liệu cá nhân cho bài thực hành mẫu.

## Bổ sung 24/10/2026

So sánh mạng nơ-ron với cách học của con người kèm giới hạn; phép tính trọng số/bias và đồ thị bốn hàm kích hoạt; ma trận độ phủ dữ liệu; bảng tra thuật ngữ Teachable Machine/Playground; phân biệt vòng vận hành với vòng cải tiến hệ thống. `guide.js` phụ thuộc `app.js` và chạy sau nó. Nội dung nằm trực tiếp trong `index.html`, đọc được ngay cả khi tắt JavaScript. `guide.html` là bản đoạn nguồn dùng khi biên soạn, không phải trang độc lập.

## Cập nhật ví dụ đời sống và Playground

Ba sơ đồ SVG tự biên soạn: ảnh quả có nhãn và ảnh ngoài phạm vi; đổi nền để kiểm tra; hệ thống thùng rác thông minh. Các tình huống là minh họa, không phải kết quả thực nghiệm. Bài thực hành dùng trực tiếp https://playground.tensorflow.org/ cùng cấu hình URL có seed cố định. Thay bài sẽ tạo iframe mới để đưa công cụ về cấu hình ban đầu. Nội dung có lời dẫn, bước thực hiện, câu hỏi và giải thích dự kiến; không khẳng định mọi lần chạy đều quá khớp.
