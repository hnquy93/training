# MY TRAINING — Cài như app trên iPhone (PWA)

App này giờ là một **Progressive Web App**: cài vào màn hình chính, chạy toàn màn hình như app thật,
**không cần ký lại 7 ngày**, chạy **offline**, dữ liệu lưu ngay trên iPhone.

## Nội dung thư mục
- `index.html` — app
- `manifest.webmanifest` — khai báo tên/icon/chế độ standalone
- `sw.js` — service worker (chạy offline + lưu cache ảnh bài tập đã xem)
- `icon-*.png` — icon app

> Service worker cần **HTTPS**, nên phải đưa lên một host (mở trực tiếp file `index.html` sẽ KHÔNG chạy offline).
> Mọi lựa chọn dưới đây đều **miễn phí**.

## Cách 1 — Netlify Drop (dễ nhất, không cần tài khoản)
1. Vào **https://app.netlify.com/drop** trên máy Mac.
2. **Kéo cả thư mục này** thả vào ô trên trang → có ngay một link HTTPS dạng `https://ten-ngau.netlify.app`.
3. Mở link đó bằng **Safari trên iPhone**.
4. Bấm nút **Chia sẻ** (ô vuông có mũi tên) → **Thêm vào MH chính / Add to Home Screen** → **Thêm**.
5. Xong! Mở app từ icon quả tạ trên màn hình chính.

## Cách 2 — GitHub Pages (link cố định, giữ lâu dài)
1. Tạo repo mới trên GitHub, upload toàn bộ file trong thư mục này.
2. Repo → **Settings → Pages** → chọn nhánh `main`, thư mục `/root` → Save.
3. Chờ 1–2 phút, được link `https://<tên>.github.io/<repo>/`.
4. Mở bằng Safari trên iPhone → **Chia sẻ → Add to Home Screen**.

## Về dữ liệu (quan trọng)
- Web app trên màn hình chính có **bộ đếm ngày dùng riêng** — mỗi lần mở app sẽ reset lại, nên
  dùng thường xuyên thì **dữ liệu giữ nguyên**. Mốc “xóa sau 7 ngày” của iOS chủ yếu ảnh hưởng
  web bạn **không mở tới** trong 7 ngày.
- Để chắc 100%: thỉnh thoảng vào **Chỉ số → Sao lưu** để tải file JSON (lưu vào Files/iCloud Drive).
  Đổi máy hay lỡ mất thì bấm **Khôi phục** là có lại toàn bộ.

## Ghi chú nhỏ
- Ảnh minh họa bài tập tải từ internet; sau khi đã xem một lần, service worker lưu lại nên xem offline được.
  Phần ghi chép/tính toán chạy offline hoàn toàn.
- Muốn app **hoàn toàn offline kể cả ảnh** (đóng gói sẵn ~112 ảnh vào app) thì báo mình làm thêm.
- Nhắc lịch tập: dùng nút **Tải .ics** trong app để đưa lịch lặp vào Lịch iPhone (có chuông báo thật).
