# grad u ate — brat and phu vinh’s graduation ceremony but also still brat

Thiệp mời lễ tốt nghiệp của Hồ Phú Vinh (HCMUS, khoá 2022 – 2026). Web tĩnh: chỉ có `index.html` + thư mục `assets/`, không cần build.

## Cá nhân hoá link

Thêm `?to=Tên` vào cuối link:

```
https://dinhhoho.github.io/graduation-ceremony-invitation/?to=Minh
```

→ trang hiện "gửi Minh thân mến," và "for: Minh". Tên có dấu hoặc nhiều chữ vẫn được (trình duyệt tự mã hoá), ví dụ `?to=Bảo Anh`.

## Cấu trúc

```
index.html                      toàn bộ giao diện + script (sửa nội dung trong const CONFIG)
assets/images/sticker-vinh1.png sticker chữ "u" ở phần mở đầu
assets/images/sticker-vinh2.png sticker cạnh "u r invited."
assets/images/og-cover.jpg      ảnh xem trước khi gửi link (Messenger, Zalo…)
assets/images/thanks-poster.jpg khung hình chờ của video cuối
assets/videos/thanks.mp4        video cuối (bản nén 1080p của video.mov)
assets/brat and phu vinh’s …/   16 bài nhạc .m4a, phát theo thứ tự tên file
```

## Xem thử trên máy

Mở terminal trong thư mục repo rồi chạy `python -m http.server 8000`, vào http://localhost:8000/?to=Minh

## RSVP → Google Sheet

1. Mở Google Sheet → **Tiện ích mở rộng → Apps Script**, xoá code mặc định, dán nội dung `apps-script/rsvp.gs`, bấm Lưu.
2. **Triển khai → Tùy chọn triển khai mới →** chọn loại **Ứng dụng web**. Thực thi dưới dạng: **Tôi**; Người có quyền truy cập: **Bất kỳ ai** → Triển khai → cấp quyền.
3. Copy **URL ứng dụng web** (kết thúc bằng `/exec`) và dán vào `rsvpEndpoint` trong `const CONFIG` của `index.html`, rồi push.

- Link có `?to=Tên`: bấm "có, tớ sẽ đến" / "tiếc quá, không kịp" → ghi tên + đến/không đến.
- Link không có tên: bấm "có, tớ sẽ đến" → nhập tên → Okay.
- Mỗi tên chỉ được ghi 1 lần (sheet kiểm tra trùng tên, máy người xem cũng nhớ đã trả lời).
- Sửa `rsvp.gs` thì phải **Triển khai → Quản lý triển khai → sửa → Phiên bản mới** thì mới có hiệu lực.
