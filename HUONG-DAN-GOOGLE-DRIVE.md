# Bật tự sao lưu lên Google Drive (miễn phí)

App có thể tự lưu backup vào **Google Drive của chính bạn** (thư mục ẩn `appDataFolder` — không ai thấy, kể cả bạn khi mở Drive).
Cần làm 2 việc một lần: (A) đưa app lên GitHub Pages, (B) tạo một **Client ID** của Google rồi dán vào app.

---

## A. Đưa app lên GitHub Pages
1. Tạo repo mới trên GitHub (ví dụ tên `my-training`), upload toàn bộ file trong thư mục này.
2. Repo → **Settings → Pages** → Source: nhánh `main`, thư mục `/ (root)` → **Save**.
3. Chờ 1–2 phút, được link dạng:
   `https://<TÊN-GITHUB>.github.io/my-training/`
4. **Ghi nhớ phần gốc (origin)** của link: `https://<TÊN-GITHUB>.github.io` (chỉ tới `.io`, KHÔNG kèm `/my-training`).

## B. Tạo Google OAuth Client ID
1. Vào **https://console.cloud.google.com** → tạo **Project** mới (nút chọn project ở góc trên).
2. Menu trái → **APIs & Services → Library** → tìm **Google Drive API** → **Enable**.
3. **APIs & Services → OAuth consent screen**:
   - User type: **External** → Create.
   - Điền App name (ví dụ *MY TRAINING*), email hỗ trợ, email liên hệ → Save.
   - **Audience / Test users**: bấm **Add users**, thêm **chính email Google của bạn**.
   - Cứ để app ở chế độ **Testing** là đủ dùng cá nhân (không cần Google duyệt).
4. **APIs & Services → Credentials → Create Credentials → OAuth client ID**:
   - Application type: **Web application**.
   - **Authorized JavaScript origins → Add URI**: dán đúng phần gốc ở bước A.4:
     `https://<TÊN-GITHUB>.github.io`
   - (Tùy chọn, để test trên máy: thêm `http://localhost` và `http://localhost:8000`.)
   - **Create** → copy chuỗi **Client ID** (dạng `123...apps.googleusercontent.com`).

## C. Dán Client ID vào app
1. Mở file `index.html`, tìm dòng:
   ```
   const GOOGLE_CLIENT_ID='PASTE_YOUR_CLIENT_ID.apps.googleusercontent.com';
   ```
2. Thay bằng Client ID vừa copy, ví dụ:
   ```
   const GOOGLE_CLIENT_ID='123456-abcxyz.apps.googleusercontent.com';
   ```
3. Lưu file, đẩy lại lên GitHub (commit). Chờ Pages cập nhật ~1 phút.

## D. Dùng
1. Mở app trên iPhone (đã Add to Home Screen) → tab **Chỉ số** → mục **Sao lưu đám mây**.
2. Bấm **Kết nối Google Drive** → đăng nhập Google → chấp nhận.
   - Lần đầu có thể hiện cảnh báo "Google chưa xác minh ứng dụng" — vì app đang ở chế độ Testing và là của riêng bạn. Bấm **Advanced → Go to … (unsafe)** để tiếp tục. (An toàn vì đây là app của chính bạn.)
3. Từ giờ app **tự lưu lên Drive** sau mỗi thay đổi, và **tự khôi phục** khi mở trên máy khác/sau khi cài lại.
   - Nút **Đồng bộ ngay** / **Khôi phục từ Drive** để làm thủ công khi cần.

---

### Ghi chú
- Phạm vi quyền chỉ là `drive.appdata` → app **chỉ đọc/ghi được file do chính nó tạo**, không đụng tới file Drive khác của bạn. Rất riêng tư.
- Đây là backup đám mây, **sống sót qua xóa app / đổi máy** — kết hợp với Persistent Storage trên máy là an toàn nhiều lớp.
- Chỉ chạy trên bản đã host HTTPS (GitHub Pages). Mở file trực tiếp (file://) sẽ không đăng nhập Google được.
- Muốn nhiều người khác cũng dùng (không chỉ mình bạn) thì vào OAuth consent screen bấm **Publish app**.
