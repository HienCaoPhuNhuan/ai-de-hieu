# Chuyên đề AI lớp 12: từ dữ liệu đến trợ lý phân loại rác

Ngày chốt bản thiết kế: 24/10/2026.

## 0. Trạng thái và quyết định tiếp tục

- Đã hoàn thành: đọc đối chiếu phần II tài liệu tập huấn AI cấp THPT mới trong Pre; chốt mục tiêu, sản phẩm, tiến trình, dữ liệu, kiểm thử, rubric và thiết kế page dưới đây.
- Chưa thực hiện: sửa giao diện page, tạo bộ ảnh, huấn luyện mô hình rác, thực nghiệm với học sinh. Không có kết quả thực nghiệm để công bố.
- Quyết định đợt này: lưu đầy đủ kế hoạch; giữ nguyên website đang hoạt động. Người dùng báo còn 34% usage trong cửa sổ 5 giờ; trợ lý không kiểm tra được hạn mức thực tế hoặc thời điểm reset nên không cam kết đủ để triển khai và kiểm thử toàn bộ.
- Sau reset: người dùng nhắn tiếp để bắt đầu từ mục 12. Không có tác vụ tự chạy hay lịch tự động đã thiết lập.
- Repo: https://github.com/HienCaoPhuNhuan/ai-de-hieu
- Website: https://hiencaophunhuan.github.io/ai-de-hieu/
- Bản website làm nền: commit `8c92630b7b37fc4e03315626448a8e5f48481c36`. Trước khi sửa phải đọc main mới nhất để bảo toàn thay đổi về sau.

## 1. Ý tưởng và phạm vi sản phẩm

**Tên dùng trên page:** “AI phân loại rác — dự án lớp 12”.

**Tên chính xác của bản thử:** “Trợ lý nhận dạng vật liệu rác trong lớp học”.

**Câu hỏi dẫn dắt:** Làm thế nào để máy hỗ trợ nhận dạng một số vật liệu rác, và làm sao biết khi nào không nên tin dự đoán của máy?

**Người dùng:** học sinh hoặc giáo viên thử một vật sạch, riêng lẻ, thuộc phạm vi dự án.

**Đầu vào:** một ảnh đồ vật. **Đầu ra:** nhãn dự đoán, điểm của từng nhãn, thông báo giới hạn và bước kiểm tra của người dùng.

Ba nhãn khởi đầu: **Giấy/bìa — Chai nhựa — Lon kim loại**. Chọn các vật tiêu biểu, sạch, khô và không sắc nhọn; tiêu chí nhãn do giáo viên duyệt. Đây là ba nhóm vật mẫu phục vụ học máy, không phải danh mục phân loại rác pháp lý hoặc quy tắc thu gom phổ quát.

Không đưa vào phạm vi bản thử: đồ dính thức ăn, bao bì nhiều vật liệu, pin, hóa chất, rác y tế, thủy tinh vỡ, nhiều vật trong một ảnh. Không yêu cầu học sinh tìm kiếm hay xử lý rác bẩn/nguy hiểm; dùng ảnh tình huống hoặc thẻ giáo viên chuẩn bị để thảo luận.

**Phân biệt nhận dạng với quyết định:**

1. Mô hình dự đoán ảnh giống nhóm vật mẫu nào.
2. Người dùng kiểm tra vật thật, tình trạng và phạm vi áp dụng.
3. Quy tắc thu gom đã được trường xác nhận mới quyết định gợi ý thùng tiếp nhận.
4. Nếu chưa có quy tắc hoặc chưa đủ thông tin: “Chưa đủ căn cứ hướng dẫn bỏ thùng; hỏi người phụ trách”. Không tự gán màu thùng.

Không thiết kế robot tự mở nắp hoặc tự phân luồng trong giai đoạn này. Website là bản thử hỗ trợ quyết định, chưa phải hệ thống triển khai tại điểm thu gom thực tế.

## 2. Mục tiêu và sự phù hợp với giáo dục AI THPT

Phần này đối chiếu nội bộ với phần II của “Tài liệu Tập huấn triển khai nội dung Giáo dục AI - cấp THPT.pdf” trong Pre, đặc biệt mục A, B, C, D và E. Không đưa mục tài liệu tham khảo lên giao diện học.

| Mục tiêu lớp 12 | Bằng chứng học sinh tạo | Vị trí trong hoạt động |
|---|---|---|
| Chọn ý tưởng ứng dụng phù hợp với vấn đề (12.C2.1) | Bản mô tả người dùng, nhiệm vụ, lợi ích, giới hạn; so sánh với bảng hướng dẫn bằng giấy | Xác định vấn đề |
| Nhận biết công cụ thiết kế/huấn luyện (12.C3.1) | Giải thích vai trò của Teachable Machine và Playground | Chọn giải pháp |
| Nêu cách đánh giá hiệu quả hệ thống (12.C3.2) | Kế hoạch thử độc lập, bảng đúng/sai theo nhãn, phân tích lỗi và giới hạn | Kiểm thử |
| Nhận biết phương án thiết kế/vận hành phù hợp (12.D1.1) | Sơ đồ đầu vào–xử lý–mô hình–giao diện–người kiểm tra, cách xử lý ngoài phạm vi | Thiết kế hệ thống |
| Nhận biết các vai trò phát triển sản phẩm (12.D2.1) | Phân vai và nhật ký đóng góp, có luân phiên | Làm việc nhóm |
| Vận dụng công cụ để tạo mô hình chạy được (12.C3.MR1) | Mô hình ảnh đã xuất và bản thử chạy trên website | Mở rộng theo điều kiện |

**Không đánh đồng cốt lõi với mở rộng:** bản phân tích, thiết kế và minh chứng đánh giá là sản phẩm cốt lõi. Tự thu thập dữ liệu quy mô lớn, huấn luyện, lập trình và tối ưu mô hình là hoạt động mở rộng. Dự án này chọn nhánh mở rộng để tạo bản thử, đồng thời giữ phương án tương đương về mục tiêu cho học sinh thiếu thiết bị. Không mặc định mọi em học Tin học hay biết lập trình.

Sau chuyên đề, học sinh giải thích được:

- Dữ liệu khác thuật toán và mô hình; huấn luyện khác suy luận.
- Nhãn và cách lấy mẫu ảnh hưởng đến kết quả; nhiều ảnh gần trùng không thay thế dữ liệu đa dạng.
- Trọng số là các giá trị được học; learning rate/epoch/batch size là thiết lập quá trình học.
- Độ chính xác trên tập kiểm tra khác điểm dự đoán của một ảnh.
- Mô hình chỉ là một phần của hệ thống; con người kiểm tra và chịu trách nhiệm sử dụng.

## 3. Bộ sản phẩm nộp

Mỗi nhóm 4–5 học sinh nộp một hồ sơ ngắn, không yêu cầu báo cáo dài:

1. **Phiếu thiết kế một trang:** vấn đề, người dùng, đầu vào/đầu ra, ba nhãn, tình huống ngoài phạm vi, sơ đồ hệ thống.
2. **Hồ sơ dữ liệu:** tiêu chí nhãn, nguồn ảnh/quyền dùng, mã vật, điều kiện chụp và cách chia tập; không chứa thông tin cá nhân.
3. **Bản thử:** đường dẫn mô hình Image từ Teachable Machine và khả năng tải ảnh dự đoán trên page. Nếu thiếu thiết bị: dùng mô hình do giáo viên cung cấp, vẫn tự thiết kế phép thử và phân tích kết quả.
4. **Phiếu kiểm thử và cải tiến:** ghi lần thử thật, ít nhất một lỗi hoặc hạn chế được quan sát; so sánh V1/V2 trên tập phát triển, đánh giá bản chốt bằng tập cuối chưa dùng chọn cấu hình.
5. **Thẻ mô tả mô hình:** phạm vi dùng, nhãn, phiên bản, dữ liệu, kết quả kèm số mẫu, giới hạn, cách chuyển cho người xử lý.
6. **Khai báo AI và đóng góp:** công cụ/ngày, mục đích, phần được hỗ trợ, phần tự làm, bằng chứng kiểm tra và chỉnh sửa; mỗi thành viên giải thích được một quyết định.

Không chấm điểm theo độ đẹp của giao diện hoặc một mức accuracy bắt buộc. Một mô hình chưa tốt nhưng được kiểm thử trung thực, tìm đúng nguyên nhân và đề xuất hợp lý vẫn thể hiện năng lực học tập.

## 4. Sáu bước phát triển đúng mạch học

| Bước | Việc của học sinh | Giáo viên kiểm tra trước khi chuyển bước |
|---|---|---|
| 1. Xác định vấn đề | Quan sát nhu cầu; chọn người dùng và phạm vi; so sánh AI với bảng hướng dẫn/luật đơn giản | Bài toán vừa sức; AI có vai trò rõ; không hứa nhận mọi loại rác |
| 2. Chọn giải pháp | Vẽ hệ thống; chọn ba nhãn; định nghĩa đầu vào/đầu ra và điểm người kiểm tra | Tách dự đoán vật liệu với quyết định thu gom; có đường lui |
| 3. Chuẩn bị dữ liệu | Thu ảnh được phép dùng, duyệt nhãn, ghi mã vật, chia tập theo vật/đợt chụp | Không rò rỉ ảnh gần trùng; các nhóm có biến thiên; dữ liệu an toàn |
| 4. Làm bản thử | Train V1, kiểm tra Preview, Export mô hình Image, tải trên website | Mô hình thật; giao diện không điền kết quả giả; phân biệt Train và Predict |
| 5. Kiểm tra, cải tiến | Thử dữ liệu mới; tìm nguyên nhân; đổi một yếu tố; tạo V2; chốt rồi thử cuối | Kết luận có bằng chứng; báo cả sai; không dùng tập cuối để tinh chỉnh |
| 6. Trình bày, khai báo | Demo, công bố giới hạn, giải thích quyết định, khai báo công cụ và vai trò | Từng thành viên hiểu sản phẩm; không coi điểm cao là bảo đảm đúng |

Trong mỗi hoạt động dạy học, giáo viên xác định **mục tiêu, nội dung, sản phẩm, tổ chức thực hiện**; tổ chức theo **giao nhiệm vụ → học sinh thực hiện → báo cáo/thảo luận → kết luận/đánh giá**. Không thay tiến trình học bằng một danh sách nút bấm.

## 5. Tiến trình gợi ý: 6 tiết × 45 phút

Đây là đề xuất cho chuyên đề dự án có phần mở rộng, không phải số tiết bắt buộc của khung hoặc toàn bộ chương trình AI lớp 12. Thu ảnh có thể thực hiện giữa các tiết với vật mẫu đã được duyệt; giáo viên chuẩn bị bộ dự phòng.

| Tiết | Mục tiêu và nhiệm vụ | Phân bổ gợi ý | Sản phẩm cuối tiết |
|---|---|---|---|
| 1. Vấn đề và hệ thống | Phân biệt nhận dạng vật liệu với hướng dẫn bỏ thùng; so sánh AI và bảng luật; xác định năm thành phần dữ liệu–thuật toán–mô hình–đầu ra–phản hồi | Tình huống 5′; nhiệm vụ 5′; thiết kế nhóm 20′; báo cáo 10′; chốt 5′ | Phiếu thiết kế và phân vai |
| 2. Dữ liệu quyết định điều gì? | Đặt tiêu chí nhãn, phân tích bẫy nền, chia tập theo vật trước khi chụp/chọn ảnh, kiểm tra chất lượng | Khởi động 5′; hướng dẫn 10′; xử lý dữ liệu 20′; đối chiếu 5′; chốt 5′ | Danh mục ảnh và kế hoạch kiểm thử |
| 3. Máy học như thế nào? | Quan sát Playground có sẵn, giải thích trọng số/loss; huấn luyện V1 trên Teachable Machine | Playground 10′; liên hệ 5′; Train/Preview 20′; ghi thiết lập 5′; chốt 5′ | V1 và nhật ký, không đánh giá cuối |
| 4. Ghép thành sản phẩm | Xuất mô hình, đưa vào giao diện; thử đầu vào; thiết kế cách báo ngoài phạm vi và yêu cầu người dùng xác nhận | Demo 5′; giao nhiệm vụ 5′; tích hợp 25′; kiểm tra chéo 5′; chốt 5′ | Bản thử hoạt động hoặc bản thiết kế kèm mô hình GV |
| 5. Đánh giá và cải tiến | Kiểm thử trên tập phát triển; phân tích lỗi; chọn một cải tiến; Train V2; chốt phiên bản; giáo viên mở tập kiểm tra cuối | Giao nhiệm vụ 5′; thử V1 10′; cải tiến 15′; thử cuối 10′; kết luận 5′ | Bảng kết quả có phiên bản, lỗi và giới hạn |
| 6. Bảo vệ sản phẩm | Demo tình huống thuận lợi và khó; giải thích quyết định; đánh giá nhóm/cá nhân; khai báo AI | Chuẩn bị 5′; báo cáo nhóm 25′; phản biện 10′; phiếu cá nhân 5′ | Hồ sơ sản phẩm hoàn chỉnh |

Nếu số nhóm nhiều, tiết 6 dùng trạm trải nghiệm thay cho mọi nhóm thuyết trình dài. Nếu quá trình huấn luyện/tải mạng chậm, chuyển sang bản giáo viên đã chuẩn bị; không cắt bỏ bước đánh giá để chạy kịp phần mềm.

## 6. Dữ liệu và phép thử

### 6.1. Quy ước dữ liệu khởi đầu

- Mỗi ảnh chứa một vật rõ; không chụp mặt người, bảng điểm, tên cá nhân hoặc tài liệu riêng trong nền.
- Dùng nhiều vật thật khác nhau, nhiều góc, nền và ánh sáng. Không để một lớp luôn gắn với một nền.
- Giáo viên duyệt tiêu chí nhãn và các trường hợp giáp ranh. Vật nhiều vật liệu đưa vào danh sách ngoài phạm vi, không gán nhãn tùy tiện.
- Ví dụ khả thi với bộ dùng chung: mỗi nhãn có 15 vật khác nhau, chia 9 vật học / 3 vật phát triển / 3 vật kiểm tra cuối; mỗi vật khoảng 10 ảnh. Tổng 450 ảnh cho ba nhãn: 270/90/90. Đây là kế hoạch minh họa, không phải ngưỡng bảo đảm chất lượng.
- Với ít vật hơn phải nêu giới hạn khái quát; không tăng số khung hình gần trùng để tạo cảm giác bộ dữ liệu lớn.

### 6.2. Chia tập đúng

**Chia theo mã vật trước**, rồi chụp/chọn ảnh cho từng tập. Các ảnh cùng vật, cùng chuỗi chụp liên tiếp không nằm ở cả tập học và tập đánh giá độc lập.

- **Tập học:** đưa vào Teachable Machine để học. Công cụ có thể tự chia nội bộ; vẫn giữ bộ ngoài công cụ để kiểm tra độc lập.
- **Tập phát triển:** so sánh V1/V2 và lựa chọn cải tiến. Khi xem kết quả để sửa mô hình, không còn xem đây là tập kiểm tra cuối chưa biết.
- **Tập cuối:** giáo viên giữ, chỉ mở sau khi chốt phiên bản; dùng mô tả kết quả cuối. Nếu tiếp tục sửa theo kết quả này, phải công bố việc đó và cần tập cuối mới cho lần đánh giá tiếp.

Tên tệp gợi ý: `GIAY_O01_A01.jpg`; bảng đi kèm ghi nhãn, mã vật, góc/nền/ánh sáng, người hoặc nhóm chụp, quyền dùng và tập dữ liệu. Không cần ghi danh tính học sinh trong tên ảnh.

### 6.3. Những phép thử bắt buộc

1. Ảnh đúng phạm vi trên vật chưa học, phủ cả ba nhãn.
2. Cùng loại vật, thay nền hoặc ánh sáng: ghi rõ yếu tố đổi và yếu tố giữ.
3. Một vật khác hình dạng/nhãn hiệu trong cùng nhóm vật liệu.
4. Ảnh ngoài phạm vi: vật không thuộc ba lớp, nhiều vật, ảnh mờ. Dùng vật an toàn hoặc hình minh họa phù hợp.
5. Một lỗi vận hành: đường dẫn mô hình sai, mất mạng hoặc ảnh không hợp lệ.

Các phép thử ngoài phạm vi đánh giá cách hệ thống phản hồi; không trộn tùy tiện vào accuracy ba lớp. Ảnh chưa có nhãn chuẩn không dùng để đếm đúng/sai như ảnh đã được giáo viên xác nhận.

### 6.4. Phiếu kết quả

| Mã ảnh / vật | Tập dữ liệu | Nhãn thật / ngoài phạm vi | Điều kiện | Phiên bản | Dự đoán và điểm | Đúng/sai hoặc xử lý ngoài phạm vi | Nhận xét |
|---|---|---|---|---|---|---|---|
| … | … | … | … | … | … | … | … |

Tính **số dự đoán đúng / tổng số ảnh có nhãn được đánh giá**, đồng thời ghi số đúng/tổng số từng nhãn. Lập bảng nhãn thật × nhãn dự đoán để thấy nhóm dễ nhầm. Các ảnh cùng một vật không hoàn toàn độc lập; khi báo kết quả cần nêu cả số ảnh lẫn số vật.

Nếu có cơ chế từ chối tự đưa gợi ý, báo thêm **số được đưa gợi ý / tổng số thử** và **số gợi ý đúng / số đã đưa gợi ý**. Không loại hết trường hợp khó rồi chỉ công bố accuracy đẹp.

**Không tự điền số liệu mẫu vào báo cáo thật.** Page chỉ có bảng rỗng hoặc ví dụ gắn nhãn “minh họa”.

## 7. Gắn lý thuyết vào đúng thời điểm thực hiện

| Khái niệm | Minh họa trong dự án | Câu hỏi giúp học sinh giải thích |
|---|---|---|
| Mẫu – đặc trưng – nhãn | Ảnh một lon; dấu hiệu từ ảnh; nhãn “Lon kim loại” | Máy có thể dựa vào nền thay vì vật không? |
| Thuật toán – mô hình | Cách cập nhật khi học và kết quả tham số đã học | Xuất mô hình có phải xuất cả bộ ảnh không? Cần kiểm tra những tệp gì? |
| Huấn luyện – suy luận | Train sau khi chuẩn bị dữ liệu; Predict trên ảnh mới | Thử một ảnh sai có tự dạy lại mô hình không? |
| Trọng số – bias – activation | Quan sát đường nối/nơ-ron trên Playground; mở giải thích ngắn khi cần | Vì sao nhiều lớp Linear với chỉ x₁/x₂ vẫn không bao được vòng tròn? |
| Epoch – batch – learning rate | Ghi cấu hình V1; chỉ đổi một yếu tố nếu muốn nghiên cứu | Nhiều epoch hơn có luôn tốt hơn không? |
| Loss – accuracy – điểm dự đoán | Loss phục vụ học; accuracy đo tập; điểm hiển thị cho ảnh | Điểm 99% có chứng minh đúng không? |
| Học chuyển giao | Teachable Machine tận dụng phần trích xuất đặc trưng học trước | Vì sao nhóm không phải dạy máy nhìn từ con số không? |
| Khái quát và quá khớp | Kết quả ảnh học tốt nhưng vật mới kém | Thiếu bối cảnh, nhãn sai hay quá khớp? Cần thêm phép thử nào? |
| Mô hình – hệ thống | Mô hình cộng giao diện, quy tắc, dữ liệu và con người | Dự đoán đúng nhưng chỉ sai thùng thì hệ thống có tốt không? |
| Tương đồng với con người | Luyện tập, nhận phản hồi, thử tình huống mới | Vì sao không thể kết luận AI hiểu vật liệu như người? |

Playground dùng dữ liệu toán học tổng hợp để hiểu cơ chế. Nó không huấn luyện ảnh rác và không chuyển trọng số sang mô hình Teachable Machine. Không làm lại một Playground tự chế.

## 8. Đặc tả bản thử trên page

### Luồng người dùng

1. Đọc phạm vi ba nhãn và xác nhận ảnh thuộc điều kiện thử: vật sạch, riêng lẻ, nhìn rõ. Xác nhận này là bước người dùng kiểm tra, không phải máy tự phát hiện.
2. Tải mô hình Image bằng URL hợp lệ từ Teachable Machine; hiển thị nhãn thực tế đọc từ mô hình.
3. Chọn ảnh cục bộ; hiển thị ảnh và điểm từng lớp sau khi dự đoán thật.
4. Hiển thị: “Dự đoán: … — cần đối chiếu với vật thật”. Người dùng xác nhận đúng/sai/chưa xác định để ghi phiếu.
5. Chỉ hiện gợi ý thùng nếu có bảng quy tắc do giáo viên cấu hình và xác nhận phù hợp nơi thu gom; mặc định chưa có.
6. Có nút ghi một lần thử và tải CSV; cho phép xóa nhật ký. Không gửi ảnh/nhật ký lên máy chủ.

### Giới hạn phải nói rõ

- Mô hình ba lớp thường vẫn chọn một lớp cho vật lạ. Điểm thấp có thể dùng nhắc kiểm tra, nhưng điểm cao không bảo đảm đúng hoặc thuộc phạm vi.
- Không tự tạo một nhãn “khác” trên giao diện rồi coi mô hình đã học nhãn đó. Nếu bổ sung lớp khác, phải có dữ liệu và huấn luyện/đánh giá lại; lớp này cũng không bao phủ mọi vật lạ.
- Không đặt ngưỡng cố định 80%/90% rồi gọi là “an toàn”. Nếu có ngưỡng để nghiên cứu, chọn trên tập phát triển và báo cả tỉ lệ từ chối; quyết định cuối vẫn cần người kiểm tra.
- Không có URL mô hình hợp lệ thì hiển thị “Chưa tải mô hình”, không giả lập kết quả nhận dạng. Mô hình mẫu do giáo viên cung cấp phải có thẻ mô tả và kết quả thật trước khi dùng.
- Mô hình đã xuất không tự trở thành thùng rác thông minh. Cơ cấu cơ khí, cảm biến và triển khai thực tế là dự án khác.

### Ghi dữ liệu và lỗi kỹ thuật

- Nhật ký trong bộ nhớ phiên, tải CSV để lưu; thông báo tải lại trang sẽ mất dữ liệu chưa xuất. Không lưu ảnh hoặc nội dung nhật ký vào analytics.
- CSV gồm phiên bản mô hình, mã thử, nhãn thật, nhãn dự đoán, điểm, điều kiện, quyết định, ghi chú. Xử lý dấu phẩy/xuống dòng và chống công thức spreadsheet cho ô do người dùng nhập.
- Kiểm tra URL đúng miền và đường dẫn mô hình, loại/giới hạn tệp; khóa nút khi đang xử lý, báo lỗi rõ, cho thử lại. Hiển thị nhãn bằng text an toàn.
- Nếu nhãn mô hình không khớp ba nhãn dự án: vẫn có thể xem điểm, nhưng yêu cầu giáo viên ánh xạ rõ trước khi đưa hướng dẫn thu gom. Không ánh xạ ngầm theo thứ tự lớp.
- Ưu tiên chọn ảnh có sẵn, chưa bổ sung camera trong đợt đầu để giảm yêu cầu quyền truy cập và xử lý ảnh học sinh.

## 9. Rubric đánh giá 100 điểm

Mỗi tiêu chí chấm theo bốn mức: **3 – vững**, **2 – đạt**, **1 – cần hỗ trợ**, **0 – chưa có bằng chứng**. Điểm tiêu chí = trọng số × mức/3; cộng và làm tròn tổng. Chấm năng lực với minh chứng, không xếp hạng chỉ bằng accuracy.

| Tiêu chí | Trọng số | Mức 3 | Mức 2 | Mức 1 |
|---|---:|---|---|---|
| Vấn đề và thiết kế hệ thống | 15 | Người dùng/phạm vi rõ, so sánh cách không AI, có điểm người kiểm tra và xử lý ngoài phạm vi | Đủ đầu vào/đầu ra, phạm vi cơ bản; giải thích được vai trò mô hình | Nêu ý tưởng chung, lẫn dự đoán vật liệu với quyết định bỏ thùng |
| Dữ liệu và trách nhiệm | 20 | Nhãn có tiêu chí, nguồn hợp lệ, đa dạng theo vật/bối cảnh, chia tập không rò rỉ, giải thích hạn chế | Hồ sơ và chia tập hợp lý, còn ít biến thiên nhưng nhận ra giới hạn | Nhãn/nguồn/chia tập thiếu kiểm tra; chưa nhận ra ảnh gần trùng |
| Giải thích bản thử | 15 | Giải thích đúng dữ liệu–thuật toán–mô hình, Train/Predict, tham số/thiết lập; biết xử lý lỗi | Bản thử hoặc mô hình GV dùng được; giải thích đúng quy trình chính | Chủ yếu mô tả thao tác, chưa hiểu vì sao mô hình sai |
| Kiểm thử và cải tiến | 25 | Kết quả thật theo nhãn/điều kiện, phân tích lỗi, cải tiến có giả thuyết, tập cuối độc lập, kết luận có giới hạn | Có dữ liệu mới và bảng kết quả; cải tiến có lý do, còn ít phép thử | Thử ít tình huống hoặc chỉ ảnh đã học; kết luận chủ yếu theo cảm giác |
| Hồ sơ và minh bạch | 10 | Thẻ mô hình, giới hạn, khai báo AI và nhật ký rõ, nhất quán với demo | Đủ hồ sơ chính, khai báo được hỗ trợ và phần tự làm | Thiếu giới hạn/khai báo, khó truy nguyên kết quả |
| Hiểu biết và đóng góp cá nhân | 15 | Giải thích một quyết định bằng chứng, nhận ra giới hạn và đề xuất thử tiếp; đóng góp xác thực | Nêu được phần việc, trả lời đúng câu hỏi chính | Khó giải thích phần việc hoặc chỉ nhắc lại kết luận nhóm |

Mức 0 áp dụng khi không có minh chứng cho tiêu chí tương ứng. Không tự động cho điểm 0 cả dự án khi mô hình chạy kém. Dữ liệu không phù hợp phải được sửa hoặc thay trước khi chia sẻ/thử nghiệm tiếp.

85 điểm đầu đánh giá hồ sơ/sản phẩm nhóm; 15 điểm cuối đánh giá riêng từng em. Nếu lớp chỉ học mức cốt lõi, dùng mô hình GV hoặc bảng kết quả được cung cấp rõ nguồn gốc hoạt động; vẫn chấm thiết kế phép thử và lập luận, không trừ điểm vì không tự Train.

## 10. Bố cục page sẽ triển khai

Giữ website một trang, dễ trình chiếu và tự học. Dùng dự án rác làm ví dụ xuyên suốt để thay các ví dụ rời rạc, tránh thêm một chương dài vào cuối.

1. **Đích đến:** xem sản phẩm, biết nó giúp gì và chưa làm được gì.
2. **Vấn đề và hệ thống:** sơ đồ tự chạy ảnh → mô hình → dự đoán → người kiểm tra → phản hồi; phân biệt mô hình/hệ thống.
3. **Dữ liệu:** minh họa vật/nền, nhãn, chia tập theo vật; nhiệm vụ thiết kế bộ ảnh.
4. **Máy học:** so sánh với luyện tập của con người; Playground chính thức nhúng sẵn; thuật ngữ mở khi cần.
5. **Làm sản phẩm:** bốn bước TM và khung nhận dạng ảnh thật; hướng dẫn thu gom có điều kiện.
6. **Thử và cải tiến:** bảng ghi, CSV, lỗi theo nhóm, thẻ mô hình. Không điền số liệu giả.
7. **Bảo vệ sản phẩm:** checklist nộp, rubric, khai báo AI và câu hỏi cá nhân.

Mỗi chặng có ba ô ngắn: **Hiểu điều gì – Làm việc gì – Nộp bằng chứng gì**. Phần dành giáo viên có tiến trình 6 tiết và phương án thiếu thiết bị, thu gọn mặc định. Không đưa tài liệu tham khảo/đọc thêm lên giao diện; giữ các liên kết thao tác đến TM và Playground.

Hoạt ảnh tự chạy để giải thích chuyển động của dữ liệu/quy trình, có dừng và tôn trọng giảm chuyển động. Ghi rõ minh họa; không dùng hoạt ảnh làm kết quả AI thật. Nút dừng của page không điều khiển iframe Playground khác nguồn; hướng dẫn nhấn Play/Pause bên trong công cụ.

Giữ GoatCounter hiện có; không bổ sung theo dõi ảnh, nhãn thật, điểm từng em hay nhật ký nhóm.

## 11. Điều kiện và phương án dự phòng

- Có phòng máy: nhóm dùng thiết bị trường; luân phiên người chuẩn bị dữ liệu, huấn luyện, kiểm thử, ghi chép và trình bày.
- Chỉ có máy chiếu: GV chạy mô hình, nhóm thiết kế phép thử và ghi độc lập; các nhóm đối chiếu kết quả.
- Mạng yếu: ảnh, video hoặc bảng kết quả chuẩn bị sẵn, luôn ghi rõ đâu là kết quả cung cấp sẵn.
- Không thiết bị: thẻ ảnh, sơ đồ quy trình, bảng dự đoán GV cung cấp, lập luận cải tiến. Không tuyên bố học sinh đã huấn luyện mô hình thật.
- Trước giờ dạy: rà soát công cụ/độ tuổi/tài khoản/quyền dùng dữ liệu; thử toàn bộ luồng. Không bắt buộc tài khoản cá nhân hoặc dịch vụ trả phí.
- AI tạo sinh có thể hỗ trợ gợi ý kế hoạch và diễn đạt, nhưng không được bịa kết quả kiểm thử hoặc viết thay phần giải thích cá nhân; phải khai báo và kiểm tra.

## 12. Kế hoạch triển khai sau reset — chia theo điểm dừng an toàn

### Chặng A: nội dung và giao diện

- Đọc lại file này, CONTENT-THPT.md và main mới nhất; kiểm tra hướng dẫn AGENTS nếu có.
- Biên tập tuyến học xuyên suốt dự án rác, đưa lý thuyết vào chặng cần dùng, giữ phần sâu thu gọn.
- Giữ style hiện tại và chức năng đang chạy; tạo hình sơ đồ chính xác, có chữ/alt tiếng Việt. Không cần sinh ảnh trang trí để hoàn thành.
- Kiểm tra văn bản, liên kết, IDs, responsive theo khả năng công cụ. Lưu một commit hoàn chỉnh trước khi chuyển chặng.

### Chặng B: bản thử và bằng chứng

- Mở rộng TM loader hiện có: nhãn rõ, xác nhận phạm vi, ghi lần thử, bảng kết quả, xuất CSV, thẻ mô hình.
- Không thêm backend, không tự thu ảnh, không nhúng khóa API. Không cần mô hình rác công khai để hoàn thiện giao diện nhận URL do nhóm cung cấp.
- Kiểm tra luồng không có mô hình, URL sai, ảnh sai, nhãn lạ, lỗi mạng, dự đoán thành công khi có mô hình hợp lệ; kiểm tra CSV và xóa nhật ký.
- Nếu chưa có mô hình thật để thử end-to-end, ghi rõ giới hạn kiểm tra; không thay bằng dữ liệu giả rồi báo đã thử mô hình rác thành công.
- Lưu commit hoàn chỉnh.

### Chặng C: nghiệm thu và phát hành

- Kiểm tra toàn bộ tuyến học chỉ dành lớp 12, không nhập nhằng nội dung cốt lõi/mở rộng, không đồng nhất nhãn vật liệu với luật thu gom.
- Kiểm tra cú pháp, cấu trúc HTML, anchors, asset, DOM và chức năng thay đổi. Kiểm tra trình duyệt chỉ bằng công cụ được phép; nếu không có, báo giới hạn.
- Xác nhận animation có dừng, Playground vẫn là bản chính thức, analytics giữ đúng endpoint và không nhận dữ liệu dự án.
- Đẩy phiên bản hoàn chỉnh lên GitHub Pages, kiểm tra build/deploy thành công. Không thay website đang hoạt động bằng bản làm dở.
- Cập nhật trạng thái đầu file: đã làm gì, commit nào, còn gì cần mô hình/dữ liệu thật; trả lại URL công khai.

**Nguyên tắc khi gần giới hạn sử dụng:** dừng ở cuối chặng đã kiểm tra, ghi checkpoint cụ thể vào file này; không bắt đầu phần tích hợp mới khi chưa có khả năng kiểm thử. Chỉ phát hành page khi đạt điều kiện nghiệm thu, không hẹn tự chạy sau reset.

## 13. Các giả định đã chọn, không cần hỏi lại để bắt đầu

- Lớp 12, nhóm 4–5, dự án 6 tiết gợi ý, có nhánh mở rộng tạo bản thử.
- Dùng ba nhóm vật mẫu Giấy/bìa – Chai nhựa – Lon kim loại, ảnh tải lên, TM Image, không yêu cầu lập trình.
- Chưa có bộ ảnh hoặc mô hình rác đã được xác minh trong phiên này. Không tuyên bố đã tạo các tài sản đó.
- Chưa có quy tắc thu gom được trường xác nhận. Mặc định page chỉ nhận dạng và yêu cầu kiểm tra, chưa chỉ định thùng/màu thùng.
- Có thể triển khai page từ các giả định này; dữ liệu thực tế và quy tắc thu gom bổ sung sau, không chặn phần biên tập/giao diện.

**Lệnh tiếp tục gợi ý:** “Tiếp tục triển khai page dự án phân loại rác lớp 12 theo PROJECT-WASTE-GRADE12.md trong repo ai-de-hieu. Đọc main mới nhất, thực hiện từng chặng A–C, ghi checkpoint và chỉ phát hành khi hoàn chỉnh.”
