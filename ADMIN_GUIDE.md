# JCVIZ Landing — Admin Guide

Hướng dẫn cho admin (không cần biết code) sửa nội dung landing page JCVIZ qua Sanity Studio.

---

## 1. Truy cập

| Mục | Địa chỉ |
|---|---|
| **Landing page (public)** | https://jcviz-landing-sanity.vercel.app |
| **Sanity Studio (admin)** | https://jcviz-landing-sanity.vercel.app/studio |
| **Sanity dashboard (project management)** | https://www.sanity.io/manage/personal/project/zuo7iazu |

**Bookmark cả 3 link** trong browser cho tiện.

---

## 2. Đăng nhập Sanity Studio

1. Mở https://jcviz-landing-sanity.vercel.app/studio
2. Lần đầu vào sẽ redirect sang trang đăng nhập Sanity
3. Đăng nhập bằng **Google** (khuyến nghị) hoặc **GitHub** / **email**
4. Nếu đây là email mới chưa được invite: yêu cầu Creative Director (`hoangnx1288@gmail.com`) **invite vào project zuo7iazu** với role **Editor** hoặc **Administrator**
5. Khi vào được, sẽ thấy sidebar trái với 11 mục:
   - **Site Settings · Hero Section · Positioning · Final CTA · Contact Info · SEO Settings** (singletons — chỉ 1 document mỗi loại)
   - **Service · Value Pillar · Project Type · Process Step · Portfolio Item** (collections — nhiều document)

---

## 3. Quy trình chung khi sửa nội dung

```
Studio → mở document → sửa fields → Publish → đợi 5-10 giây → reload landing page
```

**Quan trọng:** mọi thay đổi chỉ live khi bấm **Publish** (nút xanh ở góc phải dưới). Nếu chỉ Save (Ctrl+S) — content vào "Draft" (bản nháp), website chưa thấy.

---

## 4. Sửa Hero (phần đầu trang)

1. Sidebar → **Hero Section** → click vào document duy nhất
2. Các field có thể sửa:

   | Field | Ý nghĩa | Ví dụ |
   |---|---|---|
   | **Eyebrow** | Dòng nhỏ phía trên headline | `Architectural Visualization Studio` |
   | **Headline → Part 1** | Phần text thường, dòng 1 | `Where` |
   | **Headline → Accent 1** | Phần in chữ vàng nghiêng, dòng 1 | `light` |
   | **Headline → Part 2** | Phần text thường, dòng 2 | `meets` |
   | **Headline → Accent 2** | Phần in chữ vàng nghiêng, dòng 2 | `place.` |
   | **Headline → Suffix** | Dấu kết câu cuối | `?` (hoặc để trống) |
   | **Subheadline** | Đoạn mô tả ngắn bên phải headline | `We craft cinematic...` |
   | **Primary CTA → Label** | Chữ trên nút vàng to | `Send Project Brief` |
   | **Primary CTA → Mode** | Loại link: `url`, `mailto`, hay `tel` | `url` |
   | **Primary CTA → Destination** | Địa chỉ tương ứng | `#contact` (anchor), hoặc `studio@jcviz.vn` (mailto), hoặc `0246 6868 006` (tel) |
   | **Secondary CTA** | Nút thứ 2 (style ghost), 3 field tương tự | (bỏ trống nếu không cần) |
   | **Top meta → Studio location/building/Reel label/volume** | Text 4 góc trên hero | `Studio · Hanoi`, `AZ Sky Tower · Dinh Cong`... |
   | **Marquee aria-label** | Mô tả accessibility cho thanh chạy ngang | `Who we work with` |
   | **Marquee items** | Các dòng chạy ngang dưới hero | `["Leading real estate developers", "Investment groups", ...]` — click `Add item` để thêm |
   | **Scroll caption** | Text dưới hero góc trái | `Reel 04 · Selected Works` |
   | **Credits caption** | Text dưới hero góc phải | `© JCVIZ 2025 — 2026 · All Imagery` |

3. Bấm **Publish** ở góc phải dưới
4. Đợi 5-10 giây, mở landing page → reload → check thấy thay đổi

---

## 5. Sửa Services (4 dịch vụ)

1. Sidebar → **Service** → list 4 cards
2. Click vào card cần sửa
3. Các field:

   | Field | Ý nghĩa |
   |---|---|
   | **Title (plain)** | Phần tên dịch vụ thường | `Masterplan & Urban` |
   | **Accent (gold italic suffix)** | Phần in chữ vàng nghiêng, sau title | `Visualization` |
   | **Description** | Đoạn mô tả ngắn (3-4 câu) |
   | **Chip tags** | Các tag nhỏ in hoa cuối card. Mỗi item = 1 chip. Mảng strings. |
   | **Visual tag** | Tag overlay góc trái-trên ảnh placeholder | `— 01 Masterplan` |
   | **Placeholder visual** | Chọn 1 trong 4 gradient: master / apt / land / camp |
   | **Image (optional)** | Upload ảnh thật từ máy. Khi có ảnh → ảnh thay placeholder. Bắt buộc điền **Alt text**. |
   | **Display order** | Số thứ tự — nhỏ hơn lên trên. 4 cards đang dùng order 1-4. |
   | **Visible on site** | Checkbox bật/tắt hiển thị. **Bỏ tick** = ẩn không xóa. |

4. Publish → reload landing.

**Thêm service mới:** Sidebar → Service → nút **Create** ở trên cùng → fill như trên → set order tiếp theo (5, 6...) → Publish. Nhưng landing chỉ có style cho 4 cards (grid 2 cột) — thêm > 4 sẽ render 6 hoặc 8 cards (vẫn đẹp nhờ 2-col).

---

## 6. Sửa Value Pillars (6 cột giá trị)

1. Sidebar → **Value Pillar** → list 6 documents
2. Mỗi document có:
   - **Title** — tên giá trị (vd `Cinematic Lighting`)
   - **Eyebrow** — dòng nhỏ phía trên (vd `— 01`)
   - **Description** — mô tả ngắn 2-3 câu
   - **Display order** — 1-6
   - **Visible on site** — checkbox

3. Publish.

Landing render 3 cột × 2 hàng. Order quyết định thứ tự.

---

## 7. Sửa Project Types (8 loại dự án)

1. Sidebar → **Project Type** → list 8 documents
2. Field:
   - **Title** — vd `Urban Masterplan`
   - **Number label** — `01`, `02`, ...
   - **Description** — mô tả 2-3 câu
   - **Placeholder visual** — chọn 1 trong 8: pt-master / pt-mixed / pt-villa / pt-shop / pt-apt / pt-resort / pt-land / pt-club
   - **Image (optional)** — ảnh thay placeholder
   - **Display order** — 1-8
   - **Visible on site**

3. Publish. Landing render 4 cột × 2 hàng.

---

## 8. Sửa Process Steps (5 bước quy trình)

1. Sidebar → **Process Step** → list 5 documents
2. Field:
   - **Title** — vd `Brief & Visual Direction`
   - **Roman numeral** — `i`, `ii`, `iii`, `iv`, `v` (chữ thường)
   - **Description**
   - **Duration label** — vd `~3 days`, `~1 week`
   - **Display order** — 1-5
   - **Visible**

3. Publish. Landing render 5 cột.

---

## 9. Sửa Portfolio (6 cell editorial)

1. Sidebar → **Portfolio Item** → list 6 documents
2. Field:
   - **Title** — vd `Riverbend Heights — Bird's Eye`
   - **Sub-label** — dòng mono phía dưới, vd `Masterplan · 2026`
   - **Image** — upload ảnh render thật. **Alt text bắt buộc.**
   - **Placeholder gradient (fallback)** — chọn 1 trong 6 gradient màu (ph-master / ph-villa / ph-shop / ph-apt / ph-land / ph-camp). Dùng khi chưa có ảnh.
   - **Grid span (editorial layout)** — chọn 1 trong 6 layout: g-1 (wide hero) / g-2 (square) / g-3 (tall portrait) / g-4 (wide) / g-5 (half-wide) / g-6 (half-wide alt). Mix các size để tạo nhịp visual.
   - **Display order** — 1-6
   - **Visible**

3. Publish. Landing render lưới 12-column editorial.

**Khi nào upload ảnh thật:** mỗi khi có render JCVIZ mới — drag-drop ảnh vào field Image, gõ alt text mô tả ngắn (1 câu, dùng cho SEO + accessibility), Publish. Ảnh tự crop theo grid span.

**Recommended:** ảnh JPEG, ≥1600×1000 px, chất lượng 85+. Sanity sẽ tự CDN + responsive resize.

---

## 10. Sửa Final CTA (phần cuối trang)

1. Sidebar → **Final CTA Section**
2. Field:
   - **Eyebrow** — dòng nhỏ trên headline, vd `— Now booking · Q3 2026`
   - **Headline → 5 parts** (giống Hero — partA / accentA / partB / accentB / suffix)
   - **Body** — đoạn mô tả ngắn dưới headline
   - **Primary CTA** — nút vàng (label + mode + destination)
   - **Secondary CTA** — nút ghost

3. Publish.

---

## 11. Sửa Contact Info

1. Sidebar → **Contact Info**
2. Field:
   - **Studio email** — vd `studio@jcviz.vn`
   - **Studio phone** — vd `0246 6868 006`
   - **Studio address** — multi-line (Enter để xuống dòng)
   - **Booking status eyebrow** — text hiển thị ở Final CTA section nếu Final CTA's eyebrow để trống

3. Publish. Email/phone/address tự động xuất hiện ở footer.

---

## 12. Sửa Site Settings (chrome — header/footer)

1. Sidebar → **Site Settings**
2. Field:
   - **Site title** — title browser tab, fallback SEO
   - **Tagline** — slogan ngắn
   - **Brand name** — chữ logo header (vd `JCVIZ`)
   - **Brand sub-label** — dòng nhỏ sau logo (vd `Architectural Visualization · Est. 2025`)
   - **Primary navigation** — list link nav top (label + href). Drag để đổi thứ tự.
   - **Footer brand description** — đoạn ngắn dưới logo footer
   - **Footer link columns** — 3 cột link footer (mỗi cột = 1 object với heading + links[])
   - **Custom logo** — upload logo PNG/SVG nếu muốn thay JCVIZ wordmark text
   - **Favicon** — icon tab browser

3. Publish.

---

## 13. Sửa SEO Settings

1. Sidebar → **SEO Settings**
2. Field:
   - **Default page title** — title nếu page nào không tự set (≤ 70 chars)
   - **Title template** — pattern, vd `%s | JCVIZ` — `%s` là placeholder cho title page
   - **Default meta description** — ≤ 160 chars
   - **OG image (1200×630)** — upload ảnh share Facebook/Twitter
   - **Twitter handle** — vd `@jcviz`
   - **Robots directive** — `index, follow` (default) hoặc `noindex, nofollow` (ẩn khỏi Google)

3. Publish.

⚠️ **Đổi robots → noindex** chỉ dùng khi muốn ẨN site khỏi Google search. Đừng nhầm.

---

## 14. Cách Publish

1. Sửa xong field
2. Click nút **Publish** (xanh, góc phải dưới)
3. Studio hiện toast `Document published`
4. **Đợi 5-10 giây** để webhook bắn từ Sanity → Vercel
5. Mở landing page → **Reload** (Ctrl+F5 hoặc Ctrl+Shift+R) → thấy thay đổi

**Nếu không thấy thay đổi sau 30 giây:**
- Check Studio: document có status "Published" (xanh) hay "Draft" (cam)?
- Check kết nối mạng
- Liên hệ developer

---

## 15. Cách kiểm tra website sau khi Publish

1. Mở **incognito/private window** (Ctrl+Shift+N) — bỏ qua browser cache
2. Vào https://jcviz-landing-sanity.vercel.app
3. Scroll qua từng section, check:
   - Hero — headline đúng chưa? CTA đúng chưa?
   - Services — đủ 4 cards? text + chips đúng?
   - Portfolio — ảnh hiển thị nếu mới upload? Grid layout có vỡ không?
   - Footer — email/phone/địa chỉ đúng?
4. Mở developer tools (F12) → tab **Console** → check không có lỗi đỏ
5. Test trên điện thoại (responsive)

---

## 16. ⚠️ KHÔNG đưa lên CMS

Sanity dataset hiện là **public** (read-only public). Mọi thứ admin nhập vào → có thể bị scrape qua API (`https://zuo7iazu.api.sanity.io/v2024-12-01/data/query/production?query=...`).

**Tuyệt đối không paste vào bất kỳ field nào:**
- Brief khách hàng đầy đủ (chỉ paste những gì đã được phép public)
- Báo giá / hợp đồng / commercial info
- Email/phone của khách (chỉ studio contact, không cá nhân)
- NDA-protected materials
- Render ảnh chưa được khách approve cho public showcase
- Tên công trình nếu chưa launch (chờ developer cho phép)
- Internal team notes

**Khi không chắc → hỏi Creative Director trước khi Publish.**

---

## 17. Khôi phục content cũ (rollback)

Sanity giữ history tự động.

1. Mở document cần rollback (vd Hero Section)
2. Click icon **History** (đồng hồ ngược, sidebar phải)
3. Chọn version cũ hơn từ timeline
4. Click **Restore** → Publish

History giữ ít nhất 30 ngày.

---

## 18. Liên hệ technical

| Trường hợp | Liên hệ |
|---|---|
| Không đăng nhập được Sanity | Creative Director (cần invite vào project) |
| Publish xong nhưng landing không update sau 1 phút | Developer |
| Upload ảnh lỗi | Developer |
| Cần sửa structure (thêm field mới, thêm section) | Developer (cần code change) |
| Cần đổi domain | Developer |

---

**Last updated:** 2026-05-09. Version 1.0 — Phase 5D handoff.
