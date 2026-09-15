# Metadata & Cover Frame Cho Shorts 9:16 (High-Retention & Zero-Part Rule)

Metadata cho Shorts khác video dài ở 3 điểm: **title ngắn hơn nhiều** (feed hiển thị cắt sau ~40-60 ký tự), **tuyệt đối không gắn nhãn series/Part**, và **ưu tiên Visual Gag + Text Hook ở giây 0-3s**.

---

## 🚫 1. QUY TẮC CỐT LÕI: ZERO-PART POLICY (CẤM 100% GẮN SỐ TẬP)

Khán giả lướt Shorts feed sẽ **vuốt bỏ qua ngay lập tức** nếu thấy mình đang ở giữa một tập phim dang dở (`Part 03`, `P5`). Mỗi video Shorts phải là một câu chuyện độc lập, khép kín.

- ❌ **Cấm:** `Part 03: ...`, `Part 05: ...`, `P3 #vikings #oversimplified`
- ✅ **Bắt buộc:** Đổi thành một câu hỏi đập thẳng vào nhận thức sai lầm (*Myth-Busting*) hoặc nghịch lý sốc.

### 📋 Bảng So Sánh Tiêu Đề Shorts Thực Tế

| Tiêu đề Cũ (Bị vuốt bỏ qua) | Tiêu đề Mới Chuẩn High-CTR (Độc Lập 100%) |
|---|---|
| *The Crazy Superpower Bronze Swords Had Over Iron! 🪨✨ P3 #vikings* | **Why Bronze Swords Were Better Than Iron 🗡️ #shorts #history** |
| *Part 05: The Suffocation Chamber: How Knights Breathed* | **How Knight Helmets Almost Killed Them 🪖 #shorts #medieval** |
| *Part 03: Lighter Than Modern Soldiers: Weight & Sliding Rivets* | **Who Carries More Weight: A Knight or Modern Soldier? ⚖️ #shorts** |
| *The $175M Con: How A 28-Year-Old Faked Users (Part 1)* | **She Faked 4 Million Users. JP Morgan Paid $175M. #shorts** |
| *I Locked My Phone in a Safe (P2)* | **I Locked My Phone in a Safe for 30 Days #shorts** |

---

## 🎭 2. KHUNG HÌNH MỞ ĐẦU & VISUAL GAG 0-3S (DỪNG TAY NGƯỜI XEM)

Khán giả quyết định xem tiếp hay lướt đi trong **1-2 giây đầu tiên**. Cần kết hợp:
1. **Visual Gag (Hình ảnh phi lý / hài hước / trớ trêu ngay frame 0)**:
   - Kiếm sĩ chém vào giáp rồi kiếm sắt bị cong queo như sợi mì $\rightarrow$ mặt ngơ ngác gãi đầu.
   - Hiệp sĩ đội mũ sắt kín mít, mắt trợn tròn, khói nhiệt bốc nghi ngút từ khe mũ, tay ôm cổ họng nghẹt thở.
   - Chiếc cân bập bênh: Lính hiện đại với ba lô khổng lồ làm chiếc cân trĩu hẳn xuống đất so với hiệp sĩ giáp thép.
2. **Text Giật Gân Giây 0 (In-image Prompt Text Hook)**:
   - `"IRON WAS WORSE THAN BRONZE?"`
   - `"COOKED ALIVE INSIDE"`
   - `"KNIGHTS WERE LIGHTER?!"`

---

## 💬 3. CAPTION & HASHTAGS (THAY CHO MÔ TẢ DÀI)

```markdown
Why did ancient armies prefer bronze over iron? The metallurgical truth will surprise you. 🗡️

#Shorts #History #AncientWeapons #BronzeAge #Science
```

- 1-2 câu hook ngắn gọn + 1 emoji liên quan.
- `#Shorts` + 3-5 hashtag chủ đề cụ thể (tránh hashtag rác như `#viral #fyp`).

---

## 🖼️ 4. COVER FRAME (ẢNH BÌA SHORTS)

- Nền tảng lấy 1 frame từ video làm ảnh đại diện.
- Chọn timestamp có biểu cảm rõ nhất hoặc khoảnh khắc Visual Gag cao trào nhất:
  ```bash
  npx remotion still src/index.ts Shorts out/cover.jpg --frame=45
  ```
- Ghi rõ frame được chọn vào `metadata.md`.

---

## 📝 5. TEMPLATE METADATA.MD CHUẨN CHO SHORTS

```markdown
# Title
Why Bronze Swords Were Better Than Iron 🗡️ #shorts #history

# Visual Gag & 0s Text Hook
- Visual: Stickman with iron sword bent like a noodle, scratching head in confusion.
- 0s Text: "IRON WAS WORSE THAN BRONZE?"

# Caption
Ancient blacksmiths knew a secret that modern people forgot: bronze was actually superior to early iron. 🗡️

#Shorts #History #BronzeAge #AncientWeapons

# Cover Frame
Frame 30 (~1.0s) — Shocked stickman holding a bent iron sword

# Duration
55s / 22 shots
```
