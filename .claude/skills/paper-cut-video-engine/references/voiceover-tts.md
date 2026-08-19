# Tạo giọng đọc bằng NVIDIA Magpie TTS Multilingual

Dùng khi user không tự thu voiceover, muốn tạo giọng đọc AI. Model: [magpie-tts-multilingual](https://build.nvidia.com/nvidia/magpie-tts-multilingual) trên build.nvidia.com — hỗ trợ tiếng Việt (`vi-VN`).

## Setup (1 lần)

```
pip install nvidia-riva-client
```

Cần biến môi trường `NVIDIA_API_KEY` (tạo tại trang model, mục "Get API Key"). Model được gọi qua gRPC (`grpc.nvcf.nvidia.com:443`), không phải REST — không dùng `requests`/`curl` trực tiếp.

## Chạy

```bash
# 1 câu thoại
python scripts/magpie_tts.py --text "Vì sao bầu trời lại có màu xanh?" --voice Magpie-Multilingual.VI-VN.Long.Neutral --out ./public/audio/vo_scene01.wav

# Cả bảng kịch bản (mỗi dòng VO text → 1 file wav), dùng sau khi user duyệt script ở bước 2
python scripts/magpie_tts.py --script scenes.json --out-dir ./public/audio/
```

Script tự in thời lượng thật (giây) của mỗi file `.wav` tạo ra — dùng số này để điền `durationInFrames` ở bước 3 (scene breakdown), chính xác hơn ước lượng "số từ / 2.5".

## Chọn giọng phù hợp nội dung — để đạt tiêu chí "tự nhiên, có cảm xúc" ở `script-writing.md` mục 3

- Voice tiếng Việt duy nhất hiện có: speaker `Long`, 3 biến thể cảm xúc — `Magpie-Multilingual.VI-VN.Long.Neutral` (mặc định), `.Calm`, `.Sad` (không có `.Aria`/`.Happy`/`.Angry` cho vi-VN). Nếu đổi giọng và server báo lỗi `subvoice requested not found`, đừng đoán tên — lấy danh sách `subvoices` thật từ server:
  ```python
  import os, riva.client, riva.client.proto.riva_tts_pb2 as rtts
  auth = riva.client.Auth(uri="grpc.nvcf.nvidia.com:443", use_ssl=True, metadata_args=[
      ["function-id", "877104f7-e885-42b9-8de8-f6e4c6303969"],
      ["authorization", f"Bearer {os.environ['NVIDIA_API_KEY']}"],
  ])
  service = riva.client.SpeechSynthesisService(auth)
  resp = service.stub.GetRivaSynthesisConfig(rtts.RivaSynthesisConfigRequest(), metadata=auth.get_auth_metadata())
  print(dict(resp.model_config[0].parameters)["subvoices"])  # "VI-VN.Long.Neutral:61,VI-VN.Long.Calm:63,..."
  ```
  Voice name để dùng = `Magpie-Multilingual.` + key trước dấu `:` (ví dụ `Magpie-Multilingual.VI-VN.Long.Sad`).
- Nếu 1 payoff cần sắc thái khác hẳn phần còn lại (ví dụ đoạn plot-twist cần giọng ngạc nhiên), có thể tách riêng dòng đó thành 1 lệnh generate với voice/emotion khác rồi ghép — không đổi voice giữa chừng 1 video trừ khi cố ý tạo hiệu ứng.
- Giữ nguyên 1 voice xuyên suốt 1 video (đồng nhất kênh) trừ khi kịch bản có nhiều nhân vật thoại.

## Lưu ý

- File audio sinh ra là nguồn timing thật cho scene breakdown — không ước lượng lại bằng tay sau khi đã có file.
- Nếu script dài (video 16:9 nhiều phút), gọi theo từng dòng thoại (không dồn cả kịch bản vào 1 lần synthesize) — dễ kiểm tra/sửa lại từng câu nếu phát âm sai, và khớp đúng 1 dòng = 1 scene ở `scenes.json`.
