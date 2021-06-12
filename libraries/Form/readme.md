Khởi tạo
var ajxForm = new Form.Ajax();
ajxForm.execute();

Khi đó duyệt qua tất cả các form có tag là: tech5s-ajax-form
Đối với Form upload ảnh cần có enctype="multipart/form-data"
Các thuộc tính của form bao gồm
tech5s-ajax-success: Tên function callback khi chạy thành công, Function có thể là chỉ bao gồm tên, hoặc dạng GUI.success
tech5s-ajax-error: Function gọi khi Error
tech5s-ajax-always: Gọi khi hoàn thành
tech5s-ajax-before: Gọi khi chạy request
method: Phương thức gửi dữ liệu
action: URL gửi dữ liệu
tech5s-content-type: Content type gửi dữ liệu, Nếu form có field File thì contentType này không nhận, nếu không có field type=file nào sẽ nhận contentType này nếu có

Các Field của Input
Hỗ trợ các input text, checkbox, file, select
tech5s-required ="Nội dung thông báo": Tất cả các input có tech5s required sẽ check value trước khi gửi đi
tech5s-clear-error-on-click nếu có attribute này sẽ clear toàn bộ message khi click vào input đó
tech5s-regex="email" Có thể nhập nội dung là number|email|ip hoặc là regex như \d+ ... Validate value theo regex
tech5s-text-regex="Nhập đúng định dạng Email" Nội dung hiển thị khi không thỏa mãn regex
Đối với type = file sẽ có thêm
tech5s-max-file=1 Maximun File có thể upload
tech5s-max-file-error="Nhập tối đa 1 file" Thông báo khi up max file
tech5s-max-size=5 Max size có thể upload tính theo KB
tech5s-max-size-error="File tối đa 5KB" Thông báo khi up kích thước sai
tech5s-file-types="pdf,jpg,png,txt" Các định dạng cho phép nhập, chú ý hiện tại chỉ check đuôi file không check mime, do vậy cần phải validate code = PHP
tech5s-file-types-error="Chỉ được phép nhập file PDF, JPG, PNG, TXT" Thông báo khi sai định dạng
